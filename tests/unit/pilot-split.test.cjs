const test = require('node:test');
const assert = require('node:assert/strict');

const { assignPilotRoles } = require('../../src/pilot/split.cjs');

const cases = [
  { case_id: 'contact-1', case_family_id: 'family-contact', template_id: 'template-contact', identity_fixture_id: 'identity-a', task_id: 'task-contact', role: 'PILOT_TRAIN' },
  { case_id: 'contact-2', case_family_id: 'family-contact', template_id: 'template-contact', identity_fixture_id: 'identity-a', task_id: 'task-contact', role: 'PILOT_TRAIN' },
  { case_id: 'auth-1', case_family_id: 'family-auth', template_id: 'template-auth', identity_fixture_id: 'identity-b', task_id: 'task-auth', role: 'PILOT_VALIDATION' },
  { case_id: 'doc-1', case_family_id: 'family-doc', template_id: 'template-doc', identity_fixture_id: 'identity-c', task_id: 'task-doc', role: 'PILOT_HOLDOUT' },
];

test('pilot role assignment keeps related case variants in one role', () => {
  const result = assignPilotRoles(cases);
  assert.equal(result.status, 'PASS');
  assert.equal(result.assignments['contact-1'], 'PILOT_TRAIN');
  assert.equal(result.assignments['contact-2'], 'PILOT_TRAIN');
  assert.deepEqual(result.counts, { PILOT_TRAIN: 2, PILOT_VALIDATION: 1, PILOT_HOLDOUT: 1 });
  assert.equal(result.pre_freeze_only, true);
});

test('pilot role assignment rejects shared lineage across roles', () => {
  const invalid = structuredClone(cases);
  invalid[1].role = 'PILOT_HOLDOUT';
  assert.throws(() => assignPilotRoles(invalid), /family-contact crosses PILOT_TRAIN and PILOT_HOLDOUT/);
});
