const { PILOT_ROLES } = require('./schema.cjs');

const HARD_GROUP_FIELDS = ['case_family_id', 'template_id', 'identity_fixture_id', 'task_id'];

function assignPilotRoles(cases) {
  const assignments = {};
  const seen = new Map();
  const counts = { PILOT_TRAIN: 0, PILOT_VALIDATION: 0, PILOT_HOLDOUT: 0 };
  for (const item of cases) {
    if (!PILOT_ROLES.has(item.role)) throw new Error(`invalid pilot role for ${item.case_id}: ${item.role}`);
    if (assignments[item.case_id]) throw new Error(`duplicate case_id: ${item.case_id}`);
    assignments[item.case_id] = item.role;
    counts[item.role] += 1;
    for (const field of HARD_GROUP_FIELDS) {
      const key = `${field}:${item[field]}`;
      const prior = seen.get(key);
      if (prior && prior.role !== item.role) {
        throw new Error(`${item[field]} crosses ${prior.role} and ${item.role} via ${field}`);
      }
      seen.set(key, { role: item.role, case_id: item.case_id });
    }
  }
  for (const role of PILOT_ROLES) {
    if (counts[role] === 0) throw new Error(`pilot role has no cases: ${role}`);
  }
  return {
    schema_version: 'pilot-split-1.0.0',
    status: 'PASS',
    assignments,
    counts,
    hard_group_fields: HARD_GROUP_FIELDS,
    pre_freeze_only: true,
    frozen_evaluation: false,
  };
}

module.exports = { HARD_GROUP_FIELDS, assignPilotRoles };
