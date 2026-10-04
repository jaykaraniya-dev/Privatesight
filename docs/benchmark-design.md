# Benchmark Design

**Status:** `OWNER-APPROVED INTERNAL DESIGN`. This document defines a model-neutral benchmark structure. It contains no benchmark scores, official SIH formulas, selected model, or selected architecture.

## Purpose

The benchmark must determine whether a candidate PrivateSight system understands browser context, detects and localizes sensitive content, sanitizes it without unnecessary information loss, enforces the outbound boundary, and operates within the approved client resource and latency conditions.

An evaluation case should reference the aligned case bundle defined in `visual-browser-corpus-spec.md`: rendered state, DOM/accessibility views where permitted, OCR and visual annotations, privacy labels, task definition, expected action/outcome where applicable, and lineage metadata.

## Suite A — Browser understanding

| Item | Specification |
| --- | --- |
| Inputs | Approved screenshot, DOM, accessibility, and browser-state views for the case |
| Candidate outputs | Relevant regions/elements, semantic roles, page state, task-relevant context, grounded target references |
| Required ground truth | Task-relevant regions/elements, roles/state labels, and action target where applicable |
| Evidence produced | Per-capability correctness and error analysis by page/browser/visual condition |
| Unresolved choices | Unit of visual-context accuracy, partial credit, aggregation, dynamic-state policy |

This suite must separate OCR recognition, semantic understanding, localization, and action grounding so one capability does not conceal another's failure.

## Suite B — Sensitive-content detection

| Item | Specification |
| --- | --- |
| Inputs | Positive and hard-negative cases across the owner-approved PII taxonomy and observation channels |
| Candidate outputs | Category, span/region/node location, confidence/uncertainty, and source channel |
| Required ground truth | Text/OCR spans, boxes/masks, DOM/accessibility references, category, visibility, and ambiguity state |
| Evidence produced | Precision, recall, F1, per-category results, false positives, and false negatives at each approved unit |
| Unresolved choices | Evaluation unit, class mapping, overlap matching, confidence policy, micro/macro aggregation |

## Suite C — Redaction

| Item | Specification |
| --- | --- |
| Inputs | Cases with region-level sensitive and task-relevant ground truth |
| Candidate outputs | Sanitized screenshot/structure plus masks or transformation record |
| Required ground truth | Sensitive boxes/masks and protected non-sensitive/task-relevant regions |
| Evidence produced | Under-redaction, over-redaction, residual OCR/secret leakage, and category-specific errors |
| Unresolved choices | Box/mask matching, acceptable transformations, region aggregation, treatment of uncertainty |

## Suite D — Sanitized-context quality and privacy boundary

| Item | Specification |
| --- | --- |
| Inputs | Paired raw local case and candidate sanitized outbound package |
| Candidate outputs | Only the package proposed for release plus gate decision and reason |
| Required ground truth | Prohibited fields/regions, permitted derived fields, expected task-relevant content, synthetic canaries |
| Evidence produced | Residual leakage findings, unnecessary removals, downstream task utility, blocked-failure behavior, outbound-channel traces |
| Unresolved choices | Permitted derived-data contract, utility task, release policy, acceptance authority |

Any raw-sensitive release is a privacy failure to report directly. A combined utility/privacy score must not be invented without an approved definition.

## Suite E — Client resource cost

| Item | Specification |
| --- | --- |
| Workload | Locked cases and inference schedule on the approved platform matrix |
| Candidate measures | CPU, process/runtime memory, GPU/WebGPU measures where observable, model/download/bundle size, initialization and preprocessing cost |
| Run controls | Browser/OS/hardware/runtime versions, cold/warm state, cache, threads, power mode, background load |
| Evidence produced | Per-stage distributions and peak/sustained measures with failures and fallbacks |
| Unresolved choices | Required measures, sampling method, aggregation, run count, target bounds |

## Suite F — End-to-end latency

Instrument these candidate boundaries separately:

```text
capture
→ observation
→ detection
→ sanitization
→ privacy gate
→ outbound request
→ server response
→ local action validation
→ browser execution / observed result
```

The approved PrivateSight internal primary interval is the full chain from local observation/capture through browser action completion/observed result. Network wait is included and separately reported; user think-time, browser startup, and model download are separate measurements. Any later authoritative SIH source may define a different official boundary.

## Data roles and access

| Role | Benchmark use |
| --- | --- |
| Training | May fit an approved model; never used for reported final results |
| Validation | May tune thresholds, preprocessing, architecture, runtime, and policy |
| Frozen evaluation | Scored only under approved access, version, and invalidation rules |
| Demo/manual | Supports presentation and human/tool checks; never contributes scored evidence |

Lineage grouping and contamination checks occur before assignment. All modalities and variants of one underlying case stay in one role.

## Execution lifecycle

1. Confirm the recorded owner decisions in `owner-decision-gate.md` apply to the run.
2. Lock corpus, annotation, contamination, split, metric, latency, and platform protocol versions.
3. Validate case integrity and privacy-safe handling; quarantine invalid cases.
4. Run development diagnostics only on training/validation/demo roles.
5. Record the candidate configuration and immutable artifact identifiers.
6. Execute the frozen evaluation under the approved access policy.
7. Preserve raw per-case outputs, stage timings, resource samples, errors, fallbacks, and protocol deviations.
8. Invalidate affected results if leakage, annotation changes, protocol drift, or implementation access to the frozen labels is discovered.

## Minimum result record

- candidate identifier and architecture/runtime configuration;
- corpus, split, annotation, taxonomy, policy, and protocol versions;
- platform and browser metadata from `evaluation-platform-matrix.md`;
- result per case and evaluation unit;
- timing/resource traces and cold/warm classification;
- privacy-gate decision and outbound artifact digest or safe structural summary;
- failures, timeouts, fallbacks, unsupported cases, and exclusions;
- aggregation method and whether it is official, owner-approved internal, or exploratory.

## Readiness gate

Benchmark implementation may proceed into bounded internal tooling once the corpus, annotation, contamination, and platform versions are assigned. Candidate models, OCR engines, runtimes, and architectures remain `BENCHMARK-DEPENDENT`; this design supplies a common comparison structure and does not choose among them.
