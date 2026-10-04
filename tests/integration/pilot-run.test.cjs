const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');

const { runPilot } = require('../../src/pilot/run-pilot.cjs');

test('end-to-end pilot run produces aligned QA split benchmark privacy and environment artifacts', { timeout: 120_000 }, async () => {
  const outputDir = fs.mkdtempSync(path.join(os.tmpdir(), 'privatesight-pilot-run-'));
  try {
    const result = await runPilot({
      definitionsPath: path.resolve('pilot/config/cases.v1.json'),
      thresholdsPath: path.resolve('pilot/config/contamination-thresholds.v1.json'),
      outputDir,
      browserChannel: 'chrome',
    });
    assert.equal(result.status, 'PASS');
    assert.deepEqual(result.gates, { corpus: 'PASS', annotation: 'PASS', benchmark: 'PASS', privacy: 'PASS' });
    assert.equal(result.case_count, 12);
    assert.equal(result.qa_counts.PASS, 12);
    assert.equal(result.split.pre_freeze_only, true);
    assert.equal(result.privacy.status, 'PASS');
    assert.equal(result.privacy.negative_control_detected, true);
    for (const file of ['manifests.jsonl', 'annotations.jsonl', 'qa-results.jsonl', 'contamination-report.json', 'split.json', 'benchmark-perfect.json', 'benchmark-known-errors.json', 'privacy-canary.json', 'environment.json', 'run-summary.json']) {
      assert.ok(fs.statSync(path.join(outputDir, file)).size > 0, `${file} must be non-empty`);
    }
  } finally {
    fs.rmSync(outputDir, { recursive: true, force: true });
  }
});
