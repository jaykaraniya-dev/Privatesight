const test = require('node:test');
const assert = require('node:assert/strict');

const {
  classificationMetrics,
  redactionMetrics,
  summarizeLatency,
  visualContextMetrics,
} = require('../../src/pilot/metrics.cjs');

test('PII metrics compute hand-derived TP FP FN precision recall and F1', () => {
  const result = classificationMetrics(['a', 'b', 'c'], ['a', 'c', 'x']);
  assert.deepEqual(result, { tp: 2, fp: 1, fn: 1, precision: 2 / 3, recall: 2 / 3, f1: 2 / 3 });
});

test('visual context metrics identify expected and missing target references', () => {
  const result = visualContextMetrics(['heading', 'submit'], ['heading']);
  assert.equal(result.correct, 1);
  assert.equal(result.missing, 1);
  assert.equal(result.completeness, 0.5);
});

test('redaction metrics separate sensitive coverage from unwanted redaction', () => {
  const result = redactionMetrics(['secret-a', 'secret-b'], ['secret-a', 'public-label']);
  assert.equal(result.covered, 1);
  assert.equal(result.missed, 1);
  assert.equal(result.unwanted, 1);
  assert.equal(result.sensitive_coverage, 0.5);
  assert.equal(result.redaction_precision, 0.5);
});

test('latency summary preserves known stage values and full-chain total', () => {
  const result = summarizeLatency({ capture: 2, observation: 3, privacy_gate: 5, network: 7, action_validation: 11, browser_execution: 13 });
  assert.equal(result.full_chain_ms, 41);
  assert.equal(result.stages.network, 7);
});

