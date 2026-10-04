const { APPROVED_CATEGORIES } = require('./annotation.cjs');

const LINEAGE_FIELDS = [
  'case_id', 'case_family_id', 'task_id', 'generator_id', 'generator_version',
  'template_id', 'template_version', 'identity_fixture_id', 'capture_session_id',
  'source_family_id',
];

function boxValid(box) {
  return box && [box.x, box.y, box.width, box.height].every(Number.isFinite) && box.width > 0 && box.height > 0;
}

function boxInside(box, bounds) {
  return boxValid(box) && box.x >= 0 && box.y >= 0 && box.x + box.width <= bounds.width && box.y + box.height <= bounds.height;
}

function issue(code, severity, detail) {
  return { code, severity, detail };
}

function runAnnotationQa({ capture, dom, ocr, annotation }) {
  const issues = [];
  if (!annotation || annotation.case_id !== capture?.case_id) issues.push(issue('CASE_REFERENCE_INVALID', 'FAIL', 'annotation case does not match capture'));
  for (const field of LINEAGE_FIELDS) {
    if (capture?.[field] === undefined || capture[field] === null || capture[field] === '') {
      issues.push(issue('LINEAGE_INCOMPLETE', 'QUARANTINE', `missing ${field}`));
    }
  }
  const domIds = new Set((dom?.elements || []).map((item) => item.id));
  const ocrIds = new Set((ocr?.records || []).map((item) => item.record_id));
  const seen = new Map();
  for (const entity of annotation?.entities || []) {
    if (!APPROVED_CATEGORIES.has(entity.privacy?.category)) {
      issues.push(issue('INVALID_CATEGORY', 'QUARANTINE', entity.privacy?.category || 'missing'));
    }
    if (!boxInside(entity.visual?.box, capture.screenshot_bounds)) {
      issues.push(issue('BOX_OUT_OF_BOUNDS', 'REANNOTATE', entity.annotation_id));
    }
    const mask = entity.visual?.mask;
    if (!mask || mask.image_width !== capture.screenshot_bounds.width || mask.image_height !== capture.screenshot_bounds.height || !boxInside(mask, capture.screenshot_bounds)) {
      issues.push(issue('MASK_DIMENSION_INVALID', 'REANNOTATE', entity.annotation_id));
    }
    if (!ocrIds.has(entity.ocr_span?.record_id) || !boxValid((ocr.records.find((item) => item.record_id === entity.ocr_span?.record_id) || {}).box)) {
      issues.push(issue('OCR_REFERENCE_INVALID', 'REANNOTATE', entity.annotation_id));
    }
    const domId = entity.browser_semantics?.dom_ref?.replace(/^#/, '');
    if (!domIds.has(domId)) issues.push(issue('DOM_REFERENCE_INVALID', 'REANNOTATE', entity.annotation_id));
    if (seen.has(entity.annotation_id) && seen.get(entity.annotation_id) !== entity.privacy?.category) {
      issues.push(issue('CONFLICTING_ANNOTATION', 'REANNOTATE', entity.annotation_id));
    }
    seen.set(entity.annotation_id, entity.privacy?.category);
  }
  const targetId = annotation?.agent_behavior?.expected_action?.target_id;
  if (targetId && !domIds.has(targetId)) issues.push(issue('ACTION_TARGET_INVALID', 'REANNOTATE', targetId));

  const severities = new Set(issues.map((item) => item.severity));
  let outcome = 'PASS';
  if (severities.has('FAIL')) outcome = 'FAIL';
  else if (severities.has('QUARANTINE')) outcome = 'QUARANTINE';
  else if (severities.has('REANNOTATE')) outcome = 'REANNOTATE';
  else if (severities.has('REVIEW')) outcome = 'REVIEW';
  return {
    schema_version: 'pilot-annotation-qa-1.0.0',
    case_id: capture?.case_id || annotation?.case_id || null,
    outcome,
    checks: ['required_fields', 'lineage', 'coordinates', 'image_bounds', 'mask_dimensions', 'ocr_reference', 'dom_reference', 'category', 'conflicts', 'action_target'],
    issues,
  };
}

module.exports = { boxInside, boxValid, runAnnotationQa };
