const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function normalizeBenchmarkResult(value) {
  const normalized = clone(value);
  if (normalized.environment) delete normalized.environment.captured_at;
  delete normalized.measured;
  return normalized;
}

function normalizeEnvironment(value) {
  const normalized = clone(value);
  delete normalized.captured_at;
  return normalized;
}

function compareArtifactHashSets(left, right, artifactKinds) {
  const rightByCase = new Map(right.map((item) => [item.case_id, item]));
  const mismatches = [];
  for (const leftCase of left) {
    const rightCase = rightByCase.get(leftCase.case_id);
    for (const artifact of artifactKinds) {
      const leftSha = leftCase.artifacts?.[artifact]?.sha256 ?? null;
      const rightSha = rightCase?.artifacts?.[artifact]?.sha256 ?? null;
      if (leftSha !== rightSha) {
        mismatches.push({ case_id: leftCase.case_id, artifact, left_sha256: leftSha, right_sha256: rightSha });
      }
    }
  }
  return {
    status: mismatches.length === 0 && left.length === right.length ? 'PASS' : 'FAIL',
    compared_cases: left.length,
    compared_artifact_kinds: artifactKinds,
    mismatches,
  };
}

function readJson(file) {
  return JSON.parse(fs.readFileSync(file, 'utf8'));
}

function readJsonl(file) {
  return fs.readFileSync(file, 'utf8').trim().split(/\r?\n/).filter(Boolean).map((line) => JSON.parse(line));
}

function digest(value) {
  return crypto.createHash('sha256').update(JSON.stringify(value)).digest('hex');
}

function compareJsonFile(leftDir, rightDir, file, normalizer = (value) => value) {
  const left = normalizer(readJson(path.join(leftDir, file)));
  const right = normalizer(readJson(path.join(rightDir, file)));
  return {
    file,
    status: JSON.stringify(left) === JSON.stringify(right) ? 'PASS' : 'FAIL',
    left_sha256: digest(left),
    right_sha256: digest(right),
  };
}

function comparePilotRuns(leftDir, rightDir) {
  const artifactComparison = compareArtifactHashSets(
    readJsonl(path.join(leftDir, 'manifests.jsonl')),
    readJsonl(path.join(rightDir, 'manifests.jsonl')),
    ['screenshot', 'dom_html', 'dom', 'accessibility', 'ocr', 'task'],
  );
  const checks = [
    compareJsonFile(leftDir, rightDir, 'contamination-report.json'),
    compareJsonFile(leftDir, rightDir, 'split.json'),
    compareJsonFile(leftDir, rightDir, 'privacy-canary.json'),
    compareJsonFile(leftDir, rightDir, 'run-summary.json'),
    compareJsonFile(leftDir, rightDir, 'benchmark-perfect.json', normalizeBenchmarkResult),
    compareJsonFile(leftDir, rightDir, 'benchmark-known-errors.json', normalizeBenchmarkResult),
    compareJsonFile(leftDir, rightDir, 'environment.json', normalizeEnvironment),
  ];
  for (const file of ['annotations.jsonl', 'qa-results.jsonl']) {
    const left = fs.readFileSync(path.join(leftDir, file));
    const right = fs.readFileSync(path.join(rightDir, file));
    checks.push({
      file,
      status: left.equals(right) ? 'PASS' : 'FAIL',
      left_sha256: crypto.createHash('sha256').update(left).digest('hex'),
      right_sha256: crypto.createHash('sha256').update(right).digest('hex'),
    });
  }
  return {
    schema_version: 'pilot-reproducibility-report-1.0.0',
    status: artifactComparison.status === 'PASS' && checks.every((item) => item.status === 'PASS') ? 'PASS' : 'FAIL',
    label: 'MEASURED PROJECT RESULT; qualification fixtures only',
    left_run: path.resolve(leftDir),
    right_run: path.resolve(rightDir),
    artifact_comparison: artifactComparison,
    result_comparisons: checks,
    excluded_run_time_fields: [
      'capture_duration_ms',
      'local ephemeral URL port',
      'environment.captured_at',
      'benchmark.measured.harness_wall_ms',
      'benchmark.measured.rss_start_bytes',
      'benchmark.measured.rss_end_bytes',
    ],
  };
}

module.exports = {
  compareArtifactHashSets,
  comparePilotRuns,
  normalizeBenchmarkResult,
  normalizeEnvironment,
};
