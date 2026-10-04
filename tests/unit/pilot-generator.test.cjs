const test = require('node:test');
const assert = require('node:assert/strict');

const { buildCaseManifest, renderCaseHtml } = require('../../src/pilot/generator.cjs');

const definition = {
  case_id: 'case-contact-001',
  case_family_id: 'family-contact',
  task_id: 'task-identify-contact',
  generator_id: 'privatesight-pilot-generator',
  generator_version: '1.0.0',
  template_id: 'template-contact-card',
  template_version: '1.0.0',
  identity_fixture_id: 'identity-fixture-a',
  capture_session_id: 'capture-pilot-v1',
  browser: 'Google Chrome',
  browser_version: 'CAPTURE_TIME',
  os: 'Windows',
  os_version: 'CAPTURE_TIME',
  runtime_context_id: 'pilot-node-playwright',
  creation_timestamp: '2026-10-04T00:00:00+05:30',
  parent_case_id: null,
  page_family: 'account_profile',
  privacy_condition: 'ordinary_pii',
  role: 'PILOT_TRAIN',
  title: 'Synthetic contact card',
  seed: 7002,
  source_family_id: 'source-local-synthetic',
  content: {
    heading: 'Profile',
    sections: [{ id: 'profile-name', label: 'Name', value: 'Avery Example', role: 'text', sensitive: { category: 'person_name', level: 'ordinary', ambiguity: 'KNOWN' } }],
  },
  expected_action: { type: 'observe', target_id: 'profile-name' },
  expected_outcome: { state: 'profile_visible' },
};

test('rendering the same case definition is byte-for-byte deterministic', () => {
  assert.equal(renderCaseHtml(definition), renderCaseHtml(structuredClone(definition)));
});

test('rendered sensitive values carry stable semantic and privacy references', () => {
  const html = renderCaseHtml(definition);
  assert.match(html, /id="profile-name"/);
  assert.match(html, /data-sensitive-category="person_name"/);
  assert.match(html, />Avery Example</);
});

test('case manifest retains required lineage and a deterministic source hash', () => {
  const first = buildCaseManifest(definition, { os_version: '10.0.26100', browser_version: '141.0.0.0' });
  const second = buildCaseManifest(definition, { os_version: '10.0.26100', browser_version: '141.0.0.0' });
  assert.equal(first.source_sha256, second.source_sha256);
  assert.equal(first.case_family_id, 'family-contact');
  assert.equal(first.browser_version, '141.0.0.0');
  assert.equal(first.parent_case_id, null);
});
