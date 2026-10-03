# Evaluation Data Requirements

Date: 2026-10-04

The five weights are `CONFIRMED`. Formulas, thresholds, aggregation, annotation protocol, hardware/browser matrix, latency boundary, and pass/fail rules remain unresolved.

| SIH dimension | Required cases and ground truth | Candidate measurements, not official SIH formulas | Unresolved decisions | Status |
| --- | --- | --- | --- | --- |
| Visual-context accuracy — 25% | Frozen browser screenshots paired with task intent, relevant regions, DOM/semantic state, OCR where needed, page-state predicates, and action targets; negatives and visual-only content | state-predicate accuracy; task-relevant context completeness; element/region grounding; OCR-aware interpretation | official unit, matching rule, aggregation, browser/device/task corpus | OWNER-REQUIRED |
| Sensitive/PII precision and recall — 20% | Category-balanced positives and hard negatives across text spans, OCR spans, DOM fields, visual boxes/masks, contextual classes, and browser secrets | precision, recall, F1, per-class and per-modality error analysis under a documented match rule | span/box/entity unit; nested/overlap policy; micro/macro aggregation; taxonomy | OWNER-REQUIRED |
| Redaction precision — 20% | Raw/sanitized pairs; gold spans/boxes/masks; permitted utility regions; residual OCR and secret-leakage probes | protected-region coverage, missed leakage, collateral redaction, region/pixel overlap, task utility | official meaning of “precision,” reversible-blur policy, acceptable derived fields | OWNER-REQUIRED |
| Client resource utilization — 20% | Versioned browser/device/OS/runtime/model workload; idle browser baseline; cold and warm runs; sampling method | model/download size, initialization cost, peak/steady RAM, CPU, GPU/WebGPU and GPU memory where observable, preprocessing/inference cost, extension overhead | benchmark hardware, measurement tools, sampling window, process attribution, aggregation | OWNER-REQUIRED |
| End-to-end latency — 15% | Frozen tasks with trace IDs and component timestamps for capture, preprocessing, OCR, vision, privacy gate, sanitized-package construction, network/server, action validation, and committed page result | component distributions and one defined end-to-end distribution, including failures/timeouts | official start/end events, server/network conditions, warm/cold policy, percentiles, timeout handling | OWNER-REQUIRED |

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

Evaluation cannot begin until the owner approves the taxonomy, matching units, aggregation, browser/device/task matrix, frozen-set isolation, measurement boundaries, and artifact-retention policy. No combined weighted score is valid until the five component scales and aggregation rule are defined.
