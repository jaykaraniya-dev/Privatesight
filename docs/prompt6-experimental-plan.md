# Prompt 6 Controlled Experimental Readiness Plan

Date: 2026-10-04
Status: `SPECIFIED`; execution has not begun.

## Objective

Move PrivateSight from the owner-approved Prompt 5 specification to a controlled, auditable state in which bounded candidate model/runtime experiments can be run without changing the privacy, licensing, corpus, or evaluation policy.

This plan does not authorize production implementation, training on any uncleared candidate dataset, frozen-set scoring, or selection of a final model, OCR engine, runtime, architecture, or browser-support matrix.

## Binding inputs

| Input | Effect on Prompt 6 |
| --- | --- |
| Prompt 0–3 evidence | Preserves the source hierarchy, privacy invariant, unranked architecture candidates, and browser/runtime evidence boundaries. |
| Prompt 4 | Preserves the 11-candidate audit, unresolved rights, visual/browser data gap, contamination findings, and Playwright evidence. |
| Prompt 5 and D-01–D-12 | Authorizes a rights-reviewed, synthetic/controlled non-personal, Chrome/Windows-first internal benchmark plan with fail-closed privacy behavior. |
| Current documentation | Provides capability constraints only; it does not supply benchmark performance. |

## Operating chain

```text
rights and source approval
→ bounded case blueprint
→ controlled generation
→ aligned browser capture
→ multimodal annotation
→ annotation QA
→ contamination audit
→ family-level role assignment
→ frozen evaluation release
→ benchmark-harness qualification
→ baseline experiments
→ candidate comparison in a later gate
```

No stage may consume an artifact that failed or bypassed the preceding gate.

## Work-package map

| Work package | Owner | Inputs | Deliverables | Entry condition | Exit condition |
| --- | --- | --- | --- | --- | --- |
| WP-01 Corpus blueprint | Corpus steward | D-02, D-04, D-05, taxonomy | Case/task taxonomy, pilot coverage matrix, manifest schema | Owner scope recorded | Required page/privacy/task dimensions mapped |
| WP-02 Controlled generation | Generator maintainer | WP-01, rights policy | Versioned templates, fixtures, lineage graph, generation manifest | Synthetic/controlled source approved | Deterministic regeneration evidence and no real personal data |
| WP-03 Browser capture | Capture maintainer | Generated cases, platform record | Screenshot, DOM, semantic/accessibility representation, metadata, task state, capture manifest | Chrome/Windows environment fingerprinted | Cross-artifact alignment and integrity checks pass |
| WP-04 Annotation | Annotation lead | Valid captured case bundle | Versioned text, OCR, region/mask, semantic, action, outcome, and privacy labels | Annotation schema frozen for pilot | Required layers complete or explicitly unavailable |
| WP-05 Annotation QA | Independent reviewer | WP-04 outputs | ACCEPT/REVIEW/REANNOTATE/QUARANTINE/REJECT record | Primary annotation complete | No blocking validation error remains for accepted cases |
| WP-06 Contamination audit | Data auditor | QA-approved cases and lineage | Match clusters, review records, grouping constraints | QA status ACCEPT | Every flag adjudicated; thresholds/version recorded |
| WP-07 Role assignment and freeze | Evaluation custodian | Cleared cases and contamination groups | Training, validation, frozen, demo manifests; immutable frozen release | Rights, QA, contamination gates pass | Signed release manifest, hashes, custody/access record |
| WP-08 Benchmark harness qualification | Evaluation maintainer | Frozen protocol and non-frozen qualification fixtures | Metric, resource, latency, privacy, and provenance logs | Schema/platform versions locked | Repeated qualification runs reproduce outputs within documented variance |
| WP-09 Baseline experiments | Experiment owner | Qualified harness, training/validation roles | Structural, visual, hybrid, OCR, runtime, and trade-off results | Gates A–D pass | Evidence package supports later candidate comparison without declaring a winner |

Owners are roles, not named people. The project owner names individuals before execution.

## Initial readiness scope

`INTERNAL ENGINEERING TARGET`:

- Represent each of the ten owner-approved Phase 1 page classes with at least one independent case family.
- For each included sensitive category, include a positive case, a non-sensitive lookalike, and an ambiguous or unsupported case where meaningful.
- Include static and state-transition cases; cover scrolling, modal/dynamic state, shadow DOM, and safe cross-origin framing only where capture is reproducible.
- Use synthetic or controlled non-personal fixtures only. No current external candidate is assigned a role by this target.

These are pilot coverage targets, not SIH requirements or statistical sufficiency claims. Expansion occurs only when coverage reports expose a missing taxonomy, page, visual, privacy, or task dimension, or when the pilot cannot support a planned controlled comparison.

## Experiment entry conditions

Candidate model/runtime experiments may begin only when:

1. a non-frozen development corpus release passes Gate A;
2. the annotation and contamination protocols have version identifiers;
3. a validation role exists with family separation from training;
4. the benchmark harness passes qualification on non-frozen fixtures;
5. the Chrome/Windows reference environment and CPU/WASM fallback are fingerprinted;
6. no raw sensitive value can enter outbound benchmark artifacts;
7. experiment variables, controls, metrics, stop conditions, and artifact retention are registered before the run.

Frozen evaluation is not required to begin development baselines, but it must be created and protected before any final comparison or selection claim.

## Traceability convention

Every case manifest, QA record, contamination decision, split manifest, run configuration, and result identifies:

- source requirement or decision: Prompt 0–5 and D-01–D-12;
- schema/protocol/version identifiers;
- source, generator, template, identity, site/page, task, and capture-session lineage;
- code/configuration commit and artifact hashes;
- evidence status: confirmed, owner-approved, internal engineering decision, benchmark-dependent, or unknown.

New choices in this plan are labeled `INTERNAL ENGINEERING DECISION`. They are not official SIH rules.

## Prompt 6 completion boundary

Prompt 6 completes the documentation and readiness design. It does not create cases, annotate data, calibrate thresholds, implement the harness, execute experiments, train models, or freeze an evaluation release.
