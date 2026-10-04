const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');

const { loadCaseDefinitions } = require('../../src/pilot/generator.cjs');
const { startPilotServer } = require('../../src/pilot/server.cjs');
const { capturePilotCases } = require('../../src/pilot/capture.cjs');

test('controlled page capture writes aligned screenshot DOM accessibility OCR-surrogate and task artifacts', { timeout: 60_000 }, async () => {
  const definitions = loadCaseDefinitions(path.resolve('pilot/config/cases.v1.json'));
  const selected = definitions.filter((item) => item.case_id === 'case-contact-001');
  const outputDir = fs.mkdtempSync(path.join(os.tmpdir(), 'privatesight-capture-'));
  const server = await startPilotServer({ definitions });
  try {
    const [record] = await capturePilotCases({
      definitions: selected,
      baseUrl: server.baseUrl,
      outputDir,
      browserChannel: 'chrome',
    });
    assert.equal(record.case_id, 'case-contact-001');
    assert.equal(record.viewport.width, 1280);
    assert.equal(record.viewport.height, 720);
    assert.ok(record.browser_version.length > 0);
    assert.ok(fs.statSync(path.join(outputDir, record.artifacts.screenshot.path)).size > 0);
    const dom = JSON.parse(fs.readFileSync(path.join(outputDir, record.artifacts.dom.path), 'utf8'));
    assert.ok(dom.elements.some((item) => item.id === 'profile-email' && item.box.width > 0));
    const ocr = JSON.parse(fs.readFileSync(path.join(outputDir, record.artifacts.ocr.path), 'utf8'));
    assert.equal(ocr.engine, 'dom-rendered-text-surrogate');
    assert.ok(ocr.records.some((item) => item.text.includes('avery@example.invalid')));
    const aria = fs.readFileSync(path.join(outputDir, record.artifacts.accessibility.path), 'utf8');
    assert.match(aria, /Synthetic profile/);
    const task = JSON.parse(fs.readFileSync(path.join(outputDir, record.artifacts.task.path), 'utf8'));
    assert.equal(task.expected_action.target_id, 'profile-name');
  } finally {
    await server.close();
    fs.rmSync(outputDir, { recursive: true, force: true });
  }
});

