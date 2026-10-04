# Corpus Work Packages

Date: 2026-10-04
Status: `SPECIFIED`; no corpus has been generated.

## WP-01 — Corpus blueprint

### Case taxonomy

Each case is classified across independently reportable axes:

- page family: public information, form, login/recovery, account/profile, dashboard, messaging, document, settings, notification, error/security prompt;
- task family: observe, identify relevant context, locate target, sanitize, validate action, execute safe action, verify outcome;
- browser state: initial, loading, modal/open overlay, scrolled, edited, submitted, success, error, stale, unsupported;
- visual condition: viewport, scale, theme, responsive layout, font/locale, occlusion, small text, compression, dynamic update;
- privacy condition: no sensitive content, ordinary PII, high-risk secret, mixed content, ambiguous/context-dependent, unsupported/uncertain;
- case polarity: positive, hard negative/lookalike, ambiguous, control;
- expected gate result: release sanitized package, release approved derived state, block, or re-observe/review.

### Required artifacts

A valid case bundle contains or explicitly marks unavailable:

- manifest and lineage record;
- screenshot or frame/state sequence;
- DOM snapshot and approved semantic/accessibility representation;
- OCR record with coordinates and engine/configuration identity;
- browser/page/platform metadata;
- task, preconditions, requested action, target, and expected outcome;
- source/OCR spans, boxes/masks, semantic links, privacy labels, and allowed utility regions;
- expected sanitized representation and gate decision;
- integrity hashes, annotation/QA status, contamination groups, and eventual role.

A screenshot alone is not a valid case.

### Pilot coverage

`INTERNAL ENGINEERING TARGET`: cover all ten Phase 1 page families at least once, every included task family, all privacy-condition classes, and both static and transition states before expansion. Coverage is measured as a matrix; no total sample count is claimed sufficient.

Expansion requires a recorded reason: uncovered taxonomy/page/task cell, unstable annotation, inadequate hard negatives, missing runtime stress case, or insufficient family independence for a controlled comparison.

## WP-02 — Controlled case generation

### Inputs

- rights-cleared templates and assets;
- versioned synthetic identity/secret fixtures;
- owner-approved taxonomy and outbound policy;
- declared task and expected-state specifications.

### Outputs

- deterministic source bundle;
- generator configuration and seed where applicable;
- template/site/task/identity family identifiers;
- generation log and content hashes;
- proof that fixture secrets are synthetic and nonfunctional.

### Prohibitions

- no real credentials, tokens, cookies, private accounts, personal screenshots, or browser profiles;
- no reuse of restricted candidate content without per-operation clearance;
- no unrecorded remote generator or asset dependency;
- no post-generation edits that bypass lineage/versioning.

## WP-03 — Browser capture

Capture one synchronized browser state at a time. Store screenshot, DOM, semantic/accessibility representation, OCR input/output, task state, expected action/outcome, browser metadata, and alignment transforms under a common capture-session ID. Dynamic transitions receive ordered state IDs.

The detailed acquisition and validity rules are in `capture-protocol.md`.

## WP-04 — Annotation

Annotate each modality separately and link across modalities. Required layers, reviewer workflow, ambiguity states, and versioning are in `annotation-work-package.md`. Annotation cannot begin until the pilot schema and taxonomy version are frozen.

## WP-05–WP-07 — QA, contamination, roles, and freeze

- QA applies the five outcomes in `annotation-qa-gate.md`.
- Only `ACCEPT` cases proceed to contamination review.
- Role assignment occurs after contamination grouping, never before.
- All variants and aligned artifacts from one underlying family remain in one role.
- Frozen release follows `frozen-evaluation-build-plan.md` and is never exposed for tuning.

## Work-package records

Every work package emits a machine-readable record later implemented from these specifications, plus a human-readable summary. The minimum record includes input/output artifact IDs, versions, operator/tool identity, start/end time, result, deviations, review status, and hashes. Record schemas are an `INTERNAL ENGINEERING DECISION` to be locked before execution.

## Work-package stop rules

Work stops on unclear rights, missing lineage, real/private data, failed deterministic regeneration, artifact misalignment, missing required annotation, unresolved QA failure, unresolved contamination, role leakage, or integrity mismatch. The case moves to review/quarantine/rejection; it does not advance silently.
