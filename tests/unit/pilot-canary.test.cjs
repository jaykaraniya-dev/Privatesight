const test = require('node:test');
const assert = require('node:assert/strict');

const { buildCanaryRegistry, scanForCanaries } = require('../../src/pilot/canary.cjs');

const definitions = [{
  case_id: 'case-auth',
  content: { sections: [{ id: 'secret', value: 'PS-CANARY-CREDENTIAL-001', sensitive: { category: 'password', canary_id: 'PS-CANARY-CREDENTIAL-001' } }] },
}];

test('canary registry records unique synthetic marker provenance', () => {
  const registry = buildCanaryRegistry(definitions);
  assert.equal(registry.length, 1);
  assert.deepEqual(registry[0], {
    canary_id: 'PS-CANARY-CREDENTIAL-001',
    case_id: 'case-auth',
    element_id: 'secret',
    category: 'password',
    value: 'PS-CANARY-CREDENTIAL-001',
    synthetic: true,
  });
});

test('canary scanner finds raw synthetic values and ignores sanitized placeholders', () => {
  const registry = buildCanaryRegistry(definitions);
  assert.equal(scanForCanaries({ body: 'PS-CANARY-CREDENTIAL-001' }, registry).length, 1);
  assert.deepEqual(scanForCanaries({ body: '[REDACTED:password]' }, registry), []);
});

