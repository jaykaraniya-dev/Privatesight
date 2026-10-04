const test = require('node:test');
const assert = require('node:assert/strict');
const childProcess = require('node:child_process');

test('pilot build command validates the controlled case source without generating runtime artifacts', () => {
  const result = childProcess.spawnSync(process.execPath, ['scripts/pilot-cli.cjs', 'build'], { encoding: 'utf8', cwd: process.cwd() });
  assert.equal(result.status, 0, result.stderr);
  const output = JSON.parse(result.stdout);
  assert.equal(output.status, 'PASS');
  assert.equal(output.case_count, 12);
  assert.equal(output.synthetic_only, true);
});
