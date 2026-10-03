# Evaluation Plan

Status: Prompt 2 confirms the five dimensions and weights remain the only official scoring details available. No benchmark has been approved or run.

Use `evaluation-metrics.md` as the metric register. Before evaluation begins, Prompt 3 must resolve task cases, ground truth, formulas, target browsers/devices, workload, timing boundaries, resource measures, sample sizes, aggregation, thresholds, and acceptance owner. Prompt 2 recorded bounded options and evidence gaps but did not invent decisions.

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

