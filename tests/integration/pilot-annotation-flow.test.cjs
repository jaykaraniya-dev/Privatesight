const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');

const { loadCaseDefinitions } = require('../../src/pilot/generator.cjs');
const { startPilotServer } = require('../../src/pilot/server.cjs');
const { capturePilotCases } = require('../../src/pilot/capture.cjs');
const { buildAnnotations } = require('../../src/pilot/annotation.cjs');
const { runAnnotationQa } = require('../../src/pilot/qa.cjs');

test('captured synthetic case produces QA-approved aligned annotations', { timeout: 60_000 }, async () => {
  const definitions = loadCaseDefinitions(path.resolve('pilot/config/cases.v1.json')).filter((item) => item.case_id === 'case-auth-001');
  const outputDir = fs.mkdtempSync(path.join(os.tmpdir(), 'privatesight-annotation-'));
  const server = await startPilotServer({ definitions });
  try {
    const [capture] = await capturePilotCases({ definitions, baseUrl: server.baseUrl, outputDir, browserChannel: 'chrome' });
    const dom = JSON.parse(fs.readFileSync(path.join(outputDir, capture.artifacts.dom.path), 'utf8'));
    const ocr = JSON.parse(fs.readFileSync(path.join(outputDir, capture.artifacts.ocr.path), 'utf8'));
    const annotation = buildAnnotations(definitions[0], dom, ocr, capture.screenshot_bounds);
    const result = runAnnotationQa({ capture, dom, ocr, annotation });
    assert.equal(result.outcome, 'PASS');
    assert.ok(annotation.entities.some((entity) => entity.privacy.category === 'password'));
  } finally {
    await server.close();
    fs.rmSync(outputDir, { recursive: true, force: true });
  }
});
