const REQUIRED_CASE_FIELDS = [
  'case_id', 'case_family_id', 'task_id', 'generator_id', 'generator_version',
  'template_id', 'template_version', 'identity_fixture_id', 'capture_session_id',
  'browser', 'browser_version', 'os', 'os_version', 'runtime_context_id',
  'creation_timestamp', 'parent_case_id', 'page_family', 'privacy_condition',
  'role', 'title', 'seed', 'source_family_id', 'content', 'expected_action',
  'expected_outcome',
];

const PILOT_ROLES = new Set(['PILOT_TRAIN', 'PILOT_VALIDATION', 'PILOT_HOLDOUT']);

function validateCaseDefinition(value) {
  const errors = [];
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    return { valid: false, errors: ['case definition must be an object'] };
  }
  for (const field of REQUIRED_CASE_FIELDS) {
    if (!(field in value) || value[field] === undefined || value[field] === '') {
      errors.push(`missing required field: ${field}`);
    }
  }
  if (value.role && !PILOT_ROLES.has(value.role)) errors.push(`invalid role: ${value.role}`);
  if (value.content && !Array.isArray(value.content.sections)) {
    errors.push('content.sections must be an array');
  }
  return { valid: errors.length === 0, errors };
}

module.exports = { PILOT_ROLES, REQUIRED_CASE_FIELDS, validateCaseDefinition };

