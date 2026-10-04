# SIH Evaluation Protocol Decision Specification

Date: 2026-10-04
Status: the PrivateSight Internal Evaluation Protocol is `OWNER-APPROVED`; official SIH formulas and acceptance rules remain `UNKNOWN`.

## Evidence boundary

| Dimension | Confirmed weight | Official formula/protocol status |
| --- | ---: | --- |
| Visual-context accuracy | 25% | UNKNOWN |
| Sensitive/PII detection precision and recall | 20% | UNKNOWN beyond the named metric family |
| Redaction precision | 20% | UNKNOWN |
| Client resource utilization | 20% | UNKNOWN |
| End-to-end latency | 15% | UNKNOWN |

No combined score, threshold, pass/fail rule, annotation standard, browser/device matrix, or aggregation rule is official unless authoritative SIH evidence supplies it. The sections below define decisions needed for an internal, clearly labeled protocol.

## Protocol-wide decisions

The owner approved the internal protocol, the synthetic-first corpus policy, staged Chrome/Windows then Firefox scope, full-chain primary latency interval, stage timings, and warm/cold separation. Case counts, exact versions, matching thresholds, aggregation details, measurement tools, and failure accounting remain to be versioned before execution.

Every result must identify the exact corpus, code/configuration, browser, OS, hardware, runtime backend, model artifact, quantization, screenshot resolution, and protocol version.

## Visual-context accuracy — 25%

### Required clarification

Decide whether the evaluation object is a page-state fact, task-relevant context set, UI element/region, OCR-aware fact, action target, completed browser task, or a reported combination of separate submetrics. Define the matching rule, partial credit, unanswerable/unsupported cases, aggregation, and required negative cases.

### Candidate internal evidence

- screen-state predicates compared with gold predicates;
- task-relevant regions/elements and missed/extra context;
- element or region grounding against annotated targets;
- OCR-aware interpretation linked to visual and semantic sources;
- action-target grounding and expected state transition, reported separately from semantic understanding.

These are candidate subtests, not an official SIH formula.

## Sensitive/PII precision and recall — 20%

### Units requiring approval

Text character/token span, OCR span plus geometry, visual box, polygon/mask, semantic entity, DOM field, and case-level contextual sensitivity must be evaluated separately or under an explicitly approved mapping.

### Event definitions

- A false positive is a predicted protected item that fails the approved category, boundary/region, and context match against gold evidence.
- A false negative is a gold protected item without an approved matching prediction.
- A true positive requires the approved category and match relation. Boundary and class partial matches must have an explicit policy.

### Aggregation choices

The owner must choose per-class/per-modality reporting and whether any micro, macro, weighted, or case-level aggregation is used. Precision, recall, F1, per-label errors, false positives, and false negatives are repository reporting requirements; their use in SIH scoring remains unknown.

## Redaction precision — 20%

### Required ground truth

Raw/sanitized pairs; protected spans/boxes/masks; allowed utility regions; expected placeholders or removal behavior; residual OCR/secret probes; and category/context labels.

### Candidate internal components

- under-redaction: protected content or recoverable information left exposed;
- over-redaction: allowed/task-relevant content removed or covered;
- region agreement: approved box/polygon/mask comparison;
- residual leakage: text/secret/visual-identification probes on sanitized output;
- sanitized task utility, reported separately so privacy and usefulness are not collapsed silently.

The owner must define whether boxes, pixels, masks, semantic fields, or a combination form the scoring unit. No overlap threshold or formula is selected here.

## Client resource utilization — 20%

### Candidate measurements

- model and extension package/download/transfer size;
- cold initialization time and memory;
- peak and steady memory attributable to the extension/local pipeline;
- CPU utilization/time and sustained load;
- GPU/WebGPU utilization and memory where the platform exposes them;
- preprocessing, OCR, vision, sanitization, and privacy-gate costs;
- idle-browser baseline and incremental browser overhead.

The owner must select the reference hardware, process-attribution method, sampling interval/window, warm/cold state, workload duration, background-process policy, and aggregation. Energy/battery measurement is included only if the approved platform can measure it reproducibly.

## End-to-end latency — 15%

### Candidate trace points

```text
request accepted
→ capture
→ observation construction
→ OCR / visual / semantic detection
→ sanitization
→ privacy-gate decision
→ sanitized outbound request
→ server response
→ local action validation
→ browser action committed / resulting state observed
```

### Candidate boundaries

| Boundary | Start | End | Use |
| --- | --- | --- | --- |
| Local privacy path | capture request | sanitized package approved or blocked | isolates local privacy cost |
| Server round trip | gate-approved request dispatch | structured response received | isolates network/server variation |
| Local action path | response received | action rejected or committed | isolates schema/policy/grounding cost |
| Full task | user request accepted | validated result state observed | captures user-visible end-to-end behavior |

The approved internal primary boundary is full-chain: local observation/capture through browser action completion/observed result. Stage timings are also required; network wait is included and reported separately, user think-time is excluded, and cold start/model download/browser startup are separate measurements. Official SIH latency boundaries remain unknown.

## Run validity and failures

A run is invalid for comparison if the corpus/protocol/platform version is missing, the frozen set was exposed for tuning, required instrumentation failed, raw sensitive data crossed the gate, contamination invalidated cases, or the configured platform differs from the declared matrix. Privacy-gate failure is reported as a security/evaluation failure, not removed as an ordinary timing outlier.

## Owner and SIH actions

- Seek authoritative SIH formulas, definitions, and benchmark conditions.
- Approve a separate internal protocol only for development and evidence gathering.
- Preserve official and internal labels in every report.
- Reconcile the internal protocol when authoritative SIH evidence arrives; do not rewrite prior results as if they used the official rules.
