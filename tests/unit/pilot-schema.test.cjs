const test = require('node:test');
const assert = require('node:assert/strict');

const { validateCaseDefinition } = require('../../src/pilot/schema.cjs');

const validCase = {
  case_id: 'case-ordinary-001',
  case_family_id: 'family-ordinary',
  task_id: 'task-observe',
  generator_id: 'privatesight-pilot-generator',
  generator_version: '1.0.0',
  template_id: 'template-ordinary',
  template_version: '1.0.0',
  identity_fixture_id: 'identity-none',
  capture_session_id: 'capture-pilot-v1',
  browser: 'Google Chrome',
  browser_version: 'CAPTURE_TIME',
  os: 'Windows',
  os_version: 'CAPTURE_TIME',
  runtime_context_id: 'pilot-node-playwright',
  creation_timestamp: '2026-10-04T00:00:00+05:30',
  parent_case_id: null,
  page_family: 'public',
  privacy_condition: 'none',
  role: 'PILOT_TRAIN',
  title: 'Ordinary UI',
  seed: 7001,
  source_family_id: 'source-local-synthetic',
  content: { heading: 'Project board', sections: [] },
  expected_action: { type: 'observe', target_id: 'main-heading' },
  expected_outcome: { state: 'ready' },
};

test('manifest validation accepts a complete synthetic case definition', () => {
  assert.deepEqual(validateCaseDefinition(validCase), { valid: true, errors: [] });
});

test('manifest validation rejects missing lineage fields', () => {
  const invalid = { ...validCase };
  delete invalid.template_version;
  const result = validateCaseDefinition(invalid);
  assert.equal(result.valid, false);
  assert.ok(result.errors.includes('missing required field: template_version'));
});

test('manifest validation rejects unsupported pilot roles', () => {
  const result = validateCaseDefinition({ ...validCase, role: 'FROZEN_EVALUATION' });
  assert.equal(result.valid, false);
  assert.ok(result.errors.includes('invalid role: FROZEN_EVALUATION'));
});

