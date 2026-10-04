# Evaluation Plan

Status: Prompt 6 specifies the Internal Evaluation Protocol and Prompt 7 implements its minimum fixture-mode harness. Perfect and known-error fixtures validate calculation and serialization paths, and repeat runs validate deterministic content after declared run-time exclusions. These are harness tests, not model results. The five dimensions and weights remain the only official SIH scoring details available.

Use `evaluation-metrics.md` as the metric register, `evaluation-data-requirements.md` for the required corpus/evidence, `sih-evaluation-protocol.md` for the official/internal boundary, `benchmark-harness-spec.md` for instrumentation, `experiment-matrix.md` for controlled comparisons, and `acceptance-gates.md` for readiness. Before execution, version task cases, ground truth, workload, aggregation, resource measures, sample policy, contamination thresholds, and exact platform metadata.

The later plan must include:
- frozen screen/browser tasks with modality-specific ground truth;
- separate text-span, OCR, visual-region/mask, redaction, and action results;
- precision, recall, F1, per-label analysis, and false-positive/false-negative review;
- leakage and over-redaction evidence;
- instrumented privacy-gate tests across every outbound channel;
- client resource and end-to-end latency measurements under reproducible conditions;
- Chrome and Firefox validation on the confirmed support matrix;
- protected final evaluation data, provenance, versions, and contamination controls;
- task-utility checks on sanitized context;
- no combined weighted score until compatible scales and aggregation are defined.

