const APPROVED_CATEGORIES = new Set([
  'person_name', 'email', 'username', 'password', 'account_identifier',
  'private_message', 'private_document', 'access_token', 'private_url',
  'qr_barcode_unknown',
]);

function buildAnnotations(definition, dom, ocr, screenshotBounds) {
  const entities = [];
  for (const section of definition.content.sections) {
    if (!section.sensitive) continue;
    const domElement = dom.elements.find((item) => item.id === section.id);
    const ocrRecord = ocr.records.find((item) => item.dom_id === section.id);
    if (!domElement || !ocrRecord) throw new Error(`alignment missing for ${definition.case_id}:${section.id}`);
    const box = { ...domElement.box };
    entities.push({
      annotation_id: `ann-${definition.case_id}-${section.id}`,
      source_span: { text: section.value, start: 0, end: section.value.length },
      ocr_span: { record_id: ocrRecord.record_id, text: ocrRecord.text, start: 0, end: ocrRecord.text.length },
      visual: {
        box,
        sensitive_region: true,
        mask: { type: 'rectangle', ...box, image_width: screenshotBounds.width, image_height: screenshotBounds.height },
      },
      browser_semantics: {
        dom_ref: `#${section.id}`,
        accessibility_ref: section.id,
        semantic_role: section.role || domElement.role || 'text',
      },
      privacy: {
        category: section.sensitive.category,
        sensitivity_level: section.sensitive.level,
        ambiguity: section.sensitive.ambiguity,
        canary_id: section.sensitive.canary_id || null,
        expected_gate: ['high', 'critical', 'uncertain'].includes(section.sensitive.level) ? 'BLOCK_OR_REDACT' : 'REDACT',
      },
    });
  }
  return {
    schema_version: 'pilot-annotation-1.0.0',
    taxonomy_version: 'privatesight-pii-working-2026-10-04',
    case_id: definition.case_id,
    annotator: { id: 'synthetic-ground-truth', version: '1.0.0', method: 'generator-derived with capture alignment' },
    source_artifacts: { screenshot: 'screenshot.png', dom: 'dom.json', accessibility: 'accessibility.yml', ocr: 'ocr.json' },
    lineage: {
      case_family_id: definition.case_family_id,
      generator_id: definition.generator_id,
      generator_version: definition.generator_version,
      template_id: definition.template_id,
      template_version: definition.template_version,
      identity_fixture_id: definition.identity_fixture_id,
      capture_session_id: definition.capture_session_id,
      source_family_id: definition.source_family_id,
    },
    agent_behavior: { task_id: definition.task_id, expected_action: definition.expected_action, expected_outcome: definition.expected_outcome },
    entities,
  };
}

module.exports = { APPROVED_CATEGORIES, buildAnnotations };

