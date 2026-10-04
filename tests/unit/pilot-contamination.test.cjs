const test = require('node:test');
const assert = require('node:assert/strict');

const {
  byteHistogramCosine,
  comparePilotCases,
  nearTextSimilarity,
  normalizeText,
} = require('../../src/pilot/contamination.cjs');

test('normalization makes case and punctuation differences exact', () => {
  assert.equal(normalizeText(' Avery  Example! '), 'avery example');
});

test('near-text similarity separates deliberate variants from unrelated text', () => {
  const variant = nearTextSimilarity('Synthetic profile Avery Example avery@example.invalid', 'Synthetic profile Avery Example avery+variant@example.invalid');
  const different = nearTextSimilarity('Synthetic profile Avery Example', 'Delivery error public order');
  assert.ok(variant > 0.72);
  assert.ok(different < 0.3);
});

test('byte histogram image similarity is exact for identical buffers and lower for distinct buffers', () => {
  assert.equal(byteHistogramCosine(Buffer.from([0, 1, 2, 3]), Buffer.from([0, 1, 2, 3])), 1);
  assert.ok(byteHistogramCosine(Buffer.alloc(100, 0), Buffer.alloc(100, 255)) < 0.1);
});

test('case comparison reports text image layout and lineage signals with configurable thresholds', () => {
  const a = { case_id: 'a', case_family_id: 'family-a', template_id: 'template-a', generator_id: 'gen', identity_fixture_id: 'identity-a', source_family_id: 'source', task_id: 'task-a', text: 'Synthetic profile Avery Example' };
  const b = { ...a, case_id: 'b', text: 'Synthetic profile Avery Example variant' };
  const report = comparePilotCases(a, b, {
    thresholds: { near_text_jaccard: 0.5, image_histogram_cosine: 0.9, layout_jaccard: 0.5 },
    imageA: Buffer.from([0, 1, 2]), imageB: Buffer.from([0, 1, 2]),
    layoutA: ['h1', 'text'], layoutB: ['h1', 'text'],
  });
  assert.equal(report.flags.case_family, true);
  assert.equal(report.flags.near_text, true);
  assert.equal(report.flags.image_similarity, true);
  assert.equal(report.flags.layout_similarity, true);
});

