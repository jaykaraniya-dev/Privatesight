const fs = require('node:fs');
const path = require('node:path');
const { chromium } = require('playwright');
const { loadCaseDefinitions } = require('./generator.cjs');
const { startPilotServer } = require('./server.cjs');
const { capturePilotCases } = require('./capture.cjs');
const { buildAnnotations } = require('./annotation.cjs');
const { runAnnotationQa } = require('./qa.cjs');
const { comparePilotCases } = require('./contamination.cjs');
const { assignPilotRoles } = require('./split.cjs');
const { runFixtureBenchmark, serializeBenchmarkResult } = require('./benchmark.cjs');
const { buildCanaryRegistry } = require('./canary.cjs');
const { observeOutboundEvent, summarizeOutboundObservation } = require('./outbound-observer.cjs');
const { captureReferenceEnvironment } = require('./environment.cjs');

function writeJson(outputDir, name, value) {
  const target = path.join(outputDir, name);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, `${JSON.stringify(value, null, 2)}\n`);
}

function writeJsonl(outputDir, name, values) {
  fs.writeFileSync(path.join(outputDir, name), `${values.map((item) => JSON.stringify(item)).join('\n')}\n`);
}

function caseText(definition) {
  return [definition.content.heading, ...definition.content.sections.map((item) => `${item.label} ${item.value}`)].join(' ');
}

function reviewDisposition(report) {
  if (report.flags.case_family || report.flags.template_lineage || report.flags.identity_lineage || report.flags.task_lineage) return 'CO_GROUP';
  if (report.flags.exact_text || report.flags.normalized_text || report.flags.near_text) return 'REVIEW_TEXT_SIMILARITY';
  if (report.flags.image_similarity || report.flags.layout_similarity) return 'REVIEW_VISUAL_SIMILARITY';
  if (report.flags.generator_lineage || report.flags.source_family_lineage) return 'SHARED_LOCAL_TOOL_ORIGIN_RECORDED';
  return 'NO_RELATIONSHIP_FLAGGED';
}

async function observeSafeOutbound({ definitions, baseUrl, registry, serverRequests, browserChannel }) {
  const browser = await chromium.launch({ channel: browserChannel, headless: true });
  const consoleEvents = [];
  try {
    const page = await browser.newPage();
    page.on('console', (message) => consoleEvents.push(observeOutboundEvent({ channel: 'CONSOLE', payload: message.text(), registry })));
    for (const definition of definitions) {
      const before = serverRequests.length;
      await page.goto(`${baseUrl}/case/${encodeURIComponent(definition.case_id)}`, { waitUntil: 'networkidle' });
      await page.evaluate(() => document.querySelector('#outbound-action').click());
      await page.waitForFunction((count) => document.querySelector('#status').textContent.length > 0, before);
    }
  } finally {
    await browser.close();
  }
  const httpEvents = serverRequests.map((request) => observeOutboundEvent({ channel: 'HTTP', payload: request.body, registry }));
  const negative = observeOutboundEvent({
    channel: 'SERVER_PAYLOAD',
    payload: JSON.stringify({ controlled_negative: registry[0].value }),
    registry,
    negative_control: true,
  });
  return summarizeOutboundObservation([...httpEvents, ...consoleEvents, negative], ['HTTP', 'SERVER_PAYLOAD', 'CONSOLE']);
}

async function runPilot({ definitionsPath, thresholdsPath, outputDir, browserChannel = 'chrome' }) {
  fs.mkdirSync(outputDir, { recursive: true });
  const definitions = loadCaseDefinitions(definitionsPath);
  const thresholds = JSON.parse(fs.readFileSync(thresholdsPath, 'utf8'));
  const server = await startPilotServer({ definitions });
  try {
    const captures = await capturePilotCases({ definitions, baseUrl: server.baseUrl, outputDir, browserChannel });
    const annotations = [];
    const qaResults = [];
    const byCase = {};
    for (let index = 0; index < definitions.length; index += 1) {
      const definition = definitions[index];
      const capture = captures[index];
      const dom = JSON.parse(fs.readFileSync(path.join(outputDir, capture.artifacts.dom.path), 'utf8'));
      const ocr = JSON.parse(fs.readFileSync(path.join(outputDir, capture.artifacts.ocr.path), 'utf8'));
      const annotation = buildAnnotations(definition, dom, ocr, capture.screenshot_bounds);
      const qa = runAnnotationQa({ capture, dom, ocr, annotation });
      annotations.push(annotation);
      qaResults.push(qa);
      byCase[definition.case_id] = { definition, capture, dom, ocr, annotation };
      writeJson(outputDir, path.join(definition.case_id, 'annotation.json'), annotation);
      writeJson(outputDir, path.join(definition.case_id, 'qa.json'), qa);
    }
    if (qaResults.some((item) => item.outcome !== 'PASS')) throw new Error('annotation QA gate failed');

    const comparisons = [];
    for (let left = 0; left < definitions.length; left += 1) {
      for (let right = left + 1; right < definitions.length; right += 1) {
        const a = definitions[left];
        const b = definitions[right];
        const stateA = byCase[a.case_id];
        const stateB = byCase[b.case_id];
        const report = comparePilotCases(
          { ...a, text: caseText(a) },
          { ...b, text: caseText(b) },
          {
            thresholds,
            imageA: fs.readFileSync(path.join(outputDir, stateA.capture.artifacts.screenshot.path)),
            imageB: fs.readFileSync(path.join(outputDir, stateB.capture.artifacts.screenshot.path)),
            layoutA: stateA.dom.elements.map((item) => `${item.tag}:${item.role || ''}`),
            layoutB: stateB.dom.elements.map((item) => `${item.tag}:${item.role || ''}`),
          },
        );
        report.review_disposition = reviewDisposition(report);
        comparisons.push(report);
      }
    }
    const contactPair = comparisons.find((item) => item.pair.includes('case-contact-001') && item.pair.includes('case-contact-002'));
    const independentPair = comparisons.find((item) => item.pair.includes('case-ordinary-001') && item.pair.includes('case-document-001'));
    const contamination = {
      schema_version: 'pilot-contamination-report-1.0.0',
      threshold_version: thresholds.version,
      threshold_status: 'PILOT_CALIBRATED_FOR_12_CASE_QUALIFICATION',
      thresholds,
      calibration_observations: {
        deliberate_variant_near_text: contactPair?.scores.near_text ?? null,
        deliberate_variant_flagged: contactPair?.flags.near_text ?? null,
        deliberate_independent_near_text: independentPair?.scores.near_text ?? null,
        deliberate_independent_flagged: independentPair?.flags.near_text ?? null,
      },
      comparisons,
    };
    const split = assignPilotRoles(definitions);
    const annotationMap = Object.fromEntries(annotations.map((item) => [item.case_id, item]));
    const benchmarkCases = definitions.map((item, index) => ({
      ...item,
      fixture_latency_ms: { capture: 1 + index, observation: 2, privacy_gate: 3, network: 4, action_validation: 2, browser_execution: 2 },
    }));
    const browserVersion = captures[0].browser_version;
    const environment = captureReferenceEnvironment({ browserVersion });
    const benchmarkPerfect = runFixtureBenchmark({ cases: benchmarkCases, annotations: annotationMap, mode: 'perfect', environment });
    const benchmarkKnownErrors = runFixtureBenchmark({ cases: benchmarkCases, annotations: annotationMap, mode: 'known-errors', environment });
    const registry = buildCanaryRegistry(definitions);
    const privacy = await observeSafeOutbound({ definitions, baseUrl: server.baseUrl, registry, serverRequests: server.requests, browserChannel });
    if (privacy.status !== 'PASS') throw new Error('privacy canary gate failed on non-control event');

    writeJsonl(outputDir, 'manifests.jsonl', captures);
    writeJsonl(outputDir, 'annotations.jsonl', annotations);
    writeJsonl(outputDir, 'qa-results.jsonl', qaResults);
    writeJson(outputDir, 'contamination-report.json', contamination);
    writeJson(outputDir, 'split.json', split);
    fs.writeFileSync(path.join(outputDir, 'benchmark-perfect.json'), `${serializeBenchmarkResult(benchmarkPerfect)}\n`);
    fs.writeFileSync(path.join(outputDir, 'benchmark-known-errors.json'), `${serializeBenchmarkResult(benchmarkKnownErrors)}\n`);
    writeJson(outputDir, 'privacy-canary.json', { registry: registry.map(({ value, ...entry }) => entry), observation: privacy });
    writeJson(outputDir, 'environment.json', environment);
    const qaCounts = qaResults.reduce((counts, item) => ({ ...counts, [item.outcome]: (counts[item.outcome] || 0) + 1 }), {});
    const result = {
      schema_version: 'pilot-run-summary-1.0.0',
      status: 'PASS',
      label: 'MEASURED PROJECT RESULT; qualification fixtures only',
      case_count: definitions.length,
      case_family_count: new Set(definitions.map((item) => item.case_family_id)).size,
      qa_counts: qaCounts,
      split,
      contamination: { threshold_version: contamination.threshold_version, calibration_observations: contamination.calibration_observations, comparison_count: comparisons.length },
      benchmark: { perfect_fixture_status: 'PASS', known_error_fixture_status: 'PASS', official_sih_score: false },
      privacy,
      environment_artifact: 'environment.json',
      gates: { corpus: 'PASS', annotation: 'PASS', benchmark: 'PASS', privacy: 'PASS' },
      frozen_evaluation_created: false,
    };
    writeJson(outputDir, 'run-summary.json', result);
    return result;
  } finally {
    await server.close();
  }
}

module.exports = { runPilot };
