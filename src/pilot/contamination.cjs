const crypto = require('node:crypto');

function normalizeText(value) {
  return String(value || '')
    .normalize('NFKC')
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, ' ')
    .trim()
    .replace(/\s+/g, ' ');
}

function shingles(value, size = 3) {
  const normalized = normalizeText(value);
  if (!normalized) return new Set();
  if (normalized.length <= size) return new Set([normalized]);
  const output = new Set();
  for (let index = 0; index <= normalized.length - size; index += 1) output.add(normalized.slice(index, index + size));
  return output;
}

function jaccard(setA, setB) {
  if (setA.size === 0 && setB.size === 0) return 1;
  let intersection = 0;
  for (const value of setA) if (setB.has(value)) intersection += 1;
  return intersection / (setA.size + setB.size - intersection);
}

function nearTextSimilarity(a, b) {
  return jaccard(shingles(a), shingles(b));
}

function byteHistogram(buffer) {
  const bins = new Array(256).fill(0);
  for (const value of buffer || Buffer.alloc(0)) bins[value] += 1;
  return bins;
}

function cosine(a, b) {
  let dot = 0;
  let aa = 0;
  let bb = 0;
  for (let index = 0; index < a.length; index += 1) {
    dot += a[index] * b[index];
    aa += a[index] * a[index];
    bb += b[index] * b[index];
  }
  return aa === 0 && bb === 0 ? 1 : (aa === 0 || bb === 0 ? 0 : dot / Math.sqrt(aa * bb));
}

function byteHistogramCosine(a, b) {
  return cosine(byteHistogram(a), byteHistogram(b));
}

function layoutSimilarity(a, b) {
  return jaccard(new Set(a || []), new Set(b || []));
}

function comparePilotCases(a, b, { thresholds, imageA, imageB, layoutA, layoutB }) {
  const normalizedA = normalizeText(a.text);
  const normalizedB = normalizeText(b.text);
  const scores = {
    exact_text: crypto.createHash('sha256').update(String(a.text || '')).digest('hex') === crypto.createHash('sha256').update(String(b.text || '')).digest('hex') ? 1 : 0,
    normalized_text: normalizedA === normalizedB ? 1 : 0,
    near_text: nearTextSimilarity(a.text, b.text),
    image_histogram: byteHistogramCosine(imageA, imageB),
    layout: layoutSimilarity(layoutA, layoutB),
  };
  const flags = {
    exact_text: scores.exact_text === 1,
    normalized_text: scores.normalized_text === 1,
    near_text: scores.near_text >= thresholds.near_text_jaccard,
    image_similarity: scores.image_histogram >= thresholds.image_histogram_cosine,
    layout_similarity: scores.layout >= thresholds.layout_jaccard,
    case_family: a.case_family_id === b.case_family_id,
    template_lineage: a.template_id === b.template_id,
    generator_lineage: a.generator_id === b.generator_id,
    identity_lineage: a.identity_fixture_id === b.identity_fixture_id,
    source_family_lineage: a.source_family_id === b.source_family_id,
    task_lineage: a.task_id === b.task_id,
  };
  return {
    schema_version: 'pilot-contamination-comparison-1.0.0',
    pair: [a.case_id, b.case_id],
    thresholds,
    scores,
    flags,
    review_required: Object.values(flags).some(Boolean),
  };
}

module.exports = {
  byteHistogramCosine,
  comparePilotCases,
  jaccard,
  layoutSimilarity,
  nearTextSimilarity,
  normalizeText,
};

