const test = require('node:test');
const assert = require('node:assert/strict');

const { runAnnotationQa } = require('../../src/pilot/qa.cjs');

function validInput() {
  return {
    capture: {
      case_id: 'case-auth-001', case_family_id: 'family-auth', task_id: 'task-protect-auth',
      generator_id: 'generator', generator_version: '1.0.0', template_id: 'template-login', template_version: '1.0.0',
      identity_fixture_id: 'identity-b', capture_session_id: 'capture-1', source_family_id: 'source-local',
      screenshot_bounds: { width: 1280, height: 720 },
    },
    dom: { elements: [{ id: 'auth-secret', box: { x: 20, y: 30, width: 200, height: 40 } }] },
    ocr: { records: [{ record_id: 'ocr-1', dom_id: 'auth-secret', box: { x: 20, y: 30, width: 200, height: 40 } }] },
    annotation: {
      schema_version: 'pilot-annotation-1.0.0', case_id: 'case-auth-001',
      annotator: { id: 'synthetic-ground-truth', version: '1.0.0' },
      source_artifacts: { screenshot: 'screenshot.png', dom: 'dom.json', ocr: 'ocr.json' },
      agent_behavior: { expected_action: { type: 'block_outbound', target_id: 'auth-secret' }, expected_outcome: { state: 'blocked' } },
      entities: [{
        annotation_id: 'ann-auth-secret',
        source_span: { text: 'PS-CANARY-CREDENTIAL-001', start: 0, end: 24 },
        ocr_span: { record_id: 'ocr-1', text: 'PS-CANARY-CREDENTIAL-001', start: 0, end: 24 },
        visual: { box: { x: 20, y: 30, width: 200, height: 40 }, mask: { type: 'rectangle', x: 20, y: 30, width: 200, height: 40, image_width: 1280, image_height: 720 } },
        browser_semantics: { dom_ref: '#auth-secret', accessibility_ref: 'auth-secret', semantic_role: 'textbox' },
        privacy: { category: 'password', sensitivity_level: 'critical', ambiguity: 'KNOWN' },
      }],
    },
  };
}

test('annotation QA passes a complete aligned package', () => {
  const result = runAnnotationQa(validInput());
  assert.equal(result.outcome, 'PASS');
  assert.deepEqual(result.issues, []);
});

test('annotation QA sends out-of-bounds geometry to reannotation', () => {
  const input = validInput();
  input.annotation.entities[0].visual.box.x = 1270;
  input.annotation.entities[0].visual.box.width = 30;
  const result = runAnnotationQa(input);
  assert.equal(result.outcome, 'REANNOTATE');
  assert.ok(result.issues.some((issue) => issue.code === 'BOX_OUT_OF_BOUNDS'));
});

test('annotation QA quarantines missing lineage and unknown categories', () => {
  const input = validInput();
  delete input.capture.template_version;
  input.annotation.entities[0].privacy.category = 'unapproved_secret_class';
  const result = runAnnotationQa(input);
  assert.equal(result.outcome, 'QUARANTINE');
  assert.ok(result.issues.some((issue) => issue.code === 'LINEAGE_INCOMPLETE'));
  assert.ok(result.issues.some((issue) => issue.code === 'INVALID_CATEGORY'));
});

test('annotation QA detects duplicate conflicting annotations', () => {
  const input = validInput();
  const duplicate = structuredClone(input.annotation.entities[0]);
  duplicate.privacy.category = 'access_token';
  input.annotation.entities.push(duplicate);
  const result = runAnnotationQa(input);
  assert.equal(result.outcome, 'REANNOTATE');
  assert.ok(result.issues.some((issue) => issue.code === 'CONFLICTING_ANNOTATION'));
});

