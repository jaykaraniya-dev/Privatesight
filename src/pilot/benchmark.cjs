const { performance } = require('node:perf_hooks');
const { classificationMetrics, redactionMetrics, summarizeLatency, visualContextMetrics } = require('./metrics.cjs');

function predictionFor(caseItem, annotation, mode, index) {
  const expectedEntities = annotation.entities.map((entity) => entity.annotation_id);
  if (mode === 'perfect') {
    return {
      visual: [caseItem.expected_action.target_id],
      pii: [...expectedEntities],
      redactions: [...expectedEntities],
      status: 'SUCCESS',
    };
  }
  if (mode === 'known-errors') {
    return {
      visual: index === 0 ? [] : [caseItem.expected_action.target_id],
      pii: [...expectedEntities.slice(1), `fixture-fp-${caseItem.case_id}`],
      redactions: [...expectedEntities.slice(1), `fixture-public-redaction-${caseItem.case_id}`],
      status: index === 0 ? 'FAILED_FIXTURE' : 'SUCCESS',
    };
  }
  throw new Error(`unknown fixture mode: ${mode}`);
}

function sumClassification(results) {
  const totals = results.reduce((out, result) => ({ tp: out.tp + result.tp, fp: out.fp + result.fp, fn: out.fn + result.fn }), { tp: 0, fp: 0, fn: 0 });
  return classificationMetrics(
    Array.from({ length: totals.tp + totals.fn }, (_, index) => `truth-${index}`),
    [
      ...Array.from({ length: totals.tp }, (_, index) => `truth-${index}`),
      ...Array.from({ length: totals.fp }, (_, index) => `fp-${index}`),
    ],
  );
}

function runFixtureBenchmark({ cases, annotations, mode, environment }) {
  const wallStart = performance.now();
  const rssStart = process.memoryUsage().rss;
  const perCase = cases.map((caseItem, index) => {
    const annotation = annotations[caseItem.case_id] || { entities: [] };
    const prediction = predictionFor(caseItem, annotation, mode, index);
    const truthIds = annotation.entities.map((entity) => entity.annotation_id);
    return {
      case_id: caseItem.case_id,
      role: caseItem.role,
      status: prediction.status,
      visual_context: visualContextMetrics([caseItem.expected_action.target_id], prediction.visual),
      pii: classificationMetrics(truthIds, prediction.pii),
      redaction: redactionMetrics(truthIds, prediction.redactions),
      latency: summarizeLatency(caseItem.fixture_latency_ms || { capture: 1, observation: 1, privacy_gate: 1, network: 1, action_validation: 1, browser_execution: 1 }),
    };
  });
  const pii = sumClassification(perCase.map((item) => item.pii));
  const fullChainValues = perCase.map((item) => item.latency.full_chain_ms);
  return {
    schema_version: 'pilot-benchmark-result-1.0.0',
    benchmark_version: 'privatesight-pilot-benchmark-1.0.0',
    label: 'PRIVATESIGHT INTERNAL METRIC',
    official_sih_score: false,
    fixture_mode: mode,
    environment,
    per_case: perCase,
    aggregate: {
      cases: perCase.length,
      successes: perCase.filter((item) => item.status === 'SUCCESS').length,
      failures: perCase.filter((item) => item.status !== 'SUCCESS').length,
      pii,
      latency: {
        mean_full_chain_ms: fullChainValues.reduce((sum, value) => sum + value, 0) / Math.max(1, fullChainValues.length),
        min_full_chain_ms: Math.min(...fullChainValues),
        max_full_chain_ms: Math.max(...fullChainValues),
      },
    },
    measured: {
      harness_wall_ms: performance.now() - wallStart,
      rss_start_bytes: rssStart,
      rss_end_bytes: process.memoryUsage().rss,
    },
  };
}

function stable(value) {
  if (Array.isArray(value)) return value.map(stable);
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.keys(value).sort().map((key) => [key, stable(value[key])]));
  }
  return value;
}

function serializeBenchmarkResult(result, { normalizeMeasured = false } = {}) {
  const copy = structuredClone(result);
  if (normalizeMeasured) delete copy.measured;
  return JSON.stringify(stable(copy), null, 2);
}

module.exports = { runFixtureBenchmark, serializeBenchmarkResult };
