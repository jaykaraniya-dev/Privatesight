function ratio(numerator, denominator, emptyValue = 0) {
  return denominator === 0 ? emptyValue : numerator / denominator;
}

function classificationMetrics(expected, predicted) {
  const truth = new Set(expected);
  const output = new Set(predicted);
  let tp = 0;
  for (const value of output) if (truth.has(value)) tp += 1;
  const fp = output.size - tp;
  const fn = truth.size - tp;
  const precision = ratio(tp, tp + fp, truth.size === 0 ? 1 : 0);
  const recall = ratio(tp, tp + fn, 1);
  const f1 = precision + recall === 0 ? 0 : 2 * precision * recall / (precision + recall);
  return { tp, fp, fn, precision, recall, f1 };
}

function visualContextMetrics(expected, predicted) {
  const base = classificationMetrics(expected, predicted);
  return {
    correct: base.tp,
    unexpected: base.fp,
    missing: base.fn,
    precision: base.precision,
    completeness: base.recall,
    f1: base.f1,
  };
}

function redactionMetrics(sensitiveRegions, redactedRegions) {
  const base = classificationMetrics(sensitiveRegions, redactedRegions);
  return {
    covered: base.tp,
    missed: base.fn,
    unwanted: base.fp,
    sensitive_coverage: base.recall,
    redaction_precision: base.precision,
    preservation_precision: ratio(Math.max(0, redactedRegions.length - base.fp), redactedRegions.length, 1),
  };
}

function summarizeLatency(stages) {
  const fullChain = Object.values(stages).reduce((sum, value) => sum + value, 0);
  return { stages: { ...stages }, full_chain_ms: fullChain };
}

module.exports = { classificationMetrics, redactionMetrics, summarizeLatency, visualContextMetrics };

