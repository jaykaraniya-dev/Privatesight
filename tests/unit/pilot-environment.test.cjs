const test = require('node:test');
const assert = require('node:assert/strict');

const { captureReferenceEnvironment } = require('../../src/pilot/environment.cjs');

test('environment fingerprint records observed hardware software and runtime fields', () => {
  const result = captureReferenceEnvironment({ browserVersion: '141.0.0.0' });
  assert.equal(result.schema_version, 'pilot-environment-1.0.0');
  assert.ok(result.hardware.cpu.model.length > 0);
  assert.ok(result.hardware.cpu.logical_processors > 0);
  assert.ok(result.hardware.ram_bytes > 0);
  assert.ok(result.hardware.gpu.name || result.hardware.gpu.unavailable_reason);
  assert.ok(result.software.os.name.length > 0);
  assert.equal(result.software.browser.version, '141.0.0.0');
  assert.match(result.software.node, /^v\d+/);
  assert.equal(result.runtime.model, 'NONE_FIXTURE_MODE');
  assert.equal(result.runtime.ocr, 'dom-rendered-text-surrogate@1.0.0');
});

