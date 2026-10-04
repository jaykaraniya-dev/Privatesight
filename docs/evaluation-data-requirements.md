# Evaluation Data Requirements

Date: 2026-10-04

The five weights are `CONFIRMED`. D-06, D-09, D-10, D-11, and D-12 now define the working annotation policy, the separation of internal from official metrics, the internal full-chain latency boundary, and the staged platform/hardware scope. Official SIH formulas, thresholds, aggregation, and pass/fail rules remain unresolved.

| SIH dimension | Required cases and ground truth | Candidate measurements, not official SIH formulas | Unresolved decisions | Status |
| --- | --- | --- | --- | --- |
| Visual-context accuracy — 25% | Frozen browser screenshots paired with task intent, relevant regions, DOM/semantic state, OCR where needed, page-state predicates, and action targets; negatives and visual-only content | state-predicate accuracy; task-relevant context completeness; element/region grounding; OCR-aware interpretation | official unit, matching rule, aggregation; internal matching and aggregation calibration | INTERNAL PROTOCOL / BENCHMARK-DEPENDENT |
| Sensitive/PII precision and recall — 20% | Category-balanced positives and hard negatives across text spans, OCR spans, DOM fields, visual boxes/masks, contextual classes, and browser secrets | precision, recall, F1, per-class and per-modality error analysis under a documented match rule | official unit/aggregation; internal nested, overlap, matching, and aggregation calibration | INTERNAL PROTOCOL / BENCHMARK-DEPENDENT |
| Redaction precision — 20% | Raw/sanitized pairs; gold spans/boxes/masks; permitted utility regions; residual OCR and secret-leakage probes | protected-region coverage, missed leakage, collateral redaction, region/pixel overlap, task utility | official meaning of “precision”; internal matching and reversible-transform policy validation | INTERNAL PROTOCOL / BENCHMARK-DEPENDENT |
| Client resource utilization — 20% | Versioned browser/device/OS/runtime/model workload; idle browser baseline; cold and warm runs; sampling method | model/download size, initialization cost, peak/steady RAM, CPU, GPU/WebGPU and GPU memory where observable, preprocessing/inference cost, extension overhead | exact measurement tools, sampling window, process attribution, aggregation | INTERNAL PROTOCOL / BENCHMARK-DEPENDENT |
| End-to-end latency — 15% | Frozen tasks with trace IDs and component timestamps for capture, preprocessing, OCR, vision, privacy gate, sanitized-package construction, network/server, action validation, and committed page result | component distributions and the D-10 full-chain distribution, including retries and network wait | official SIH boundary; internal percentile, timeout, and environment policy calibration | INTERNAL PROTOCOL / BENCHMARK-DEPENDENT |

## Required visual/browser evaluation corpus

`CONFIRMED`: the current 11 datasets cannot supply the required corpus. The evaluation set must include ordinary DOM, custom controls, canvas/image content, forms, account pages, document views, notifications, dialogs, responsive layouts, difficult OCR, mixed visual/text PII, safe negatives, and unsupported-content cases. Cross-origin frames, shadow DOM, PDFs, video, and browser-owned UI require explicit support decisions before inclusion.

`PROPOSED`: every visual case carries a stable case ID and aligned artifacts:

- task and expected page-state facts;
- screenshot and viewport/browser metadata;
- DOM snapshot and approved semantic/ARIA representation where available;
- OCR text with word/line coordinates;
- category and modality-specific spans, boxes, polygons, or masks;
- expected sanitized structured context and/or screenshot;
- residual-leakage probes and allowed utility regions;
- action target, preconditions, expected result, and unsafe-action labels where relevant;
- source/template/generator/identity/site/task grouping keys.

## Resource and latency evidence

Resource and latency results must name the exact browser, version, OS, hardware, runtime backend, model artifact, quantization, screenshot resolution, workload, cold/warm state, network/server condition, and instrumentation. The TodoMVC manual verification is connectivity evidence only and supplies no performance result.

## Gate before measurement

D-02 and D-06 through D-12 authorize the working taxonomy, annotation/freeze governance, internal protocol separation, latency boundary, and staged platform/hardware scope. Evaluation still cannot begin until cases are generated and QA-approved, contamination review and role assignment are complete, the frozen version and hidden labels exist, instrumentation is qualified, and internal matching/aggregation rules are versioned. No combined weighted score is valid until the five component scales and aggregation rule are defined, and no internal result may be described as official SIH scoring.
