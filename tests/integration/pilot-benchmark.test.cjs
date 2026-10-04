const test = require('node:test');
const assert = require('node:assert/strict');

const { runFixtureBenchmark, serializeBenchmarkResult } = require('../../src/pilot/benchmark.cjs');

const cases = [
  { case_id: 'case-a', role: 'PILOT_TRAIN', expected_action: { target_id: 'target-a' }, fixture_latency_ms: { capture: 1, observation: 2, privacy_gate: 3, network: 4, action_validation: 5, browser_execution: 6 } },
  { case_id: 'case-b', role: 'PILOT_VALIDATION', expected_action: { target_id: 'target-b' }, fixture_latency_ms: { capture: 2, observation: 2, privacy_gate: 2, network: 2, action_validation: 2, browser_execution: 2 } },
];
const annotations = {
  'case-a': { entities: [{ annotation_id: 'secret-a' }] },
  'case-b': { entities: [] },
};

test('fixture benchmark records per-case and aggregate internal results', () => {
  const result = runFixtureBenchmark({ cases, annotations, mode: 'known-errors', environment: { node: 'test' } });
  assert.equal(result.label, 'PRIVATESIGHT INTERNAL METRIC');
  assert.equal(result.fixture_mode, 'known-errors');
  assert.equal(result.per_case.length, 2);
  assert.equal(result.aggregate.failures, 1);
  assert.equal(result.aggregate.pii.tp, 0);
  assert.equal(result.aggregate.pii.fp, 2);
  assert.equal(result.aggregate.pii.fn, 1);
  assert.equal(result.environment.node, 'test');
});

test('fixture benchmark serialization is stable after removing measured wall-clock fields', () => {
  const first = runFixtureBenchmark({ cases, annotations, mode: 'perfect', environment: { node: 'test' } });
  const second = runFixtureBenchmark({ cases, annotations, mode: 'perfect', environment: { node: 'test' } });
  assert.equal(serializeBenchmarkResult(first, { normalizeMeasured: true }), serializeBenchmarkResult(second, { normalizeMeasured: true }));
});
