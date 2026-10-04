const test = require('node:test');
const assert = require('node:assert/strict');

const {
  compareArtifactHashSets,
  normalizeBenchmarkResult,
} = require('../../src/pilot/reproducibility.cjs');

test('benchmark normalization removes only declared run-time measurements', () => {
  const input = {
    schema_version: 'pilot-benchmark-result-1.0.0',
    environment: { captured_at: '2026-10-04T00:00:00Z', software: { node: 'v24.21.0' } },
    measured: { harness_wall_ms: 4.2, rss_start_bytes: 10, rss_end_bytes: 12 },
    aggregate: { successes: 12 },
  };
  assert.deepEqual(normalizeBenchmarkResult(input), {
    schema_version: 'pilot-benchmark-result-1.0.0',
    environment: { software: { node: 'v24.21.0' } },
    aggregate: { successes: 12 },
  });
});

test('artifact comparison reports matching and mismatching case artifacts', () => {
  const left = [{ case_id: 'case-1', artifacts: { screenshot: { sha256: 'a' }, dom: { sha256: 'b' } } }];
  const right = [{ case_id: 'case-1', artifacts: { screenshot: { sha256: 'a' }, dom: { sha256: 'different' } } }];
  assert.deepEqual(compareArtifactHashSets(left, right, ['screenshot', 'dom']), {
    status: 'FAIL',
    compared_cases: 1,
    compared_artifact_kinds: ['screenshot', 'dom'],
    mismatches: [{ case_id: 'case-1', artifact: 'dom', left_sha256: 'b', right_sha256: 'different' }],
  });
});
