# Controlled Corpus Generation Plan

Date: 2026-10-04
Status: `SPECIFIED`; generation has not begun.

## Generation boundary

The initial corpus uses synthetic browser pages, synthetic identities and nonfunctional secrets, and controlled non-personal public content whose rights are documented. Personal real data and uncleared candidate-dataset content are excluded.

## Identifier model

`INTERNAL ENGINEERING DECISION`: use stable opaque identifiers with separate lineage fields.

```text
case_family_id  -> underlying semantic scenario
case_id         -> one browser state or transition case
variant_id      -> one render/configuration variant
capture_id      -> one capture attempt
artifact_id     -> one immutable file or record
```

IDs must not encode PII, secret values, role assignment, or frozen labels. Role assignment is metadata applied after QA and contamination review.

## Generation manifest

Every case family records:

- generator name, version/commit, configuration, and deterministic seed where supported;
- template ID/version and site/page-family ID;
- synthetic identity fixture ID/version;
- task ID/version and expected state transition;
- source asset identifiers, licenses, provenance, and approved operations;
- DOM-structure family and dynamic-behavior version;
- privacy fixture categories and synthetic/nonfunctional assertion;
- creation timestamp, environment, operator/process, and content hashes;
- parent/derived relationships for every variant.

## Template rules

- Templates are local, versioned, deterministic, and independent of private accounts.
- Visual and DOM variation is explicit: theme, viewport, zoom, font, locale, responsive state, content density, modal/overlay, scrolling, and dynamic update.
- A template change that affects layout, text, semantics, sensitive regions, or expected action produces a new template version.
- Template families are contamination groups; changing colors or text alone does not create an independent family.

## Fixture rules

- Synthetic identities are generated from controlled vocabularies and carry stable fixture-family IDs.
- Credentials, OTPs, tokens, cookies, recovery codes, payment data, and URL secrets are nonfunctional test fixtures.
- Hard negatives resemble protected formats without being valid secrets or PII and are labeled explicitly.
- Ambiguous fixtures do not receive forced binary labels; they retain the approved ambiguity state and expected fail-closed outcome.

## Page and task coverage

The pilot implements the ten D-04 page classes as independent scenario families. For every family, the blueprint declares the task, page preconditions, task-relevant regions, sensitive regions, expected sanitized context, allowed action target, and expected outcome.

`INTERNAL ENGINEERING TARGET`: each pilot family includes a no-sensitive control, at least one ordinary-PII variant, and a high-risk or ambiguous variant where the scenario supports it. This is a coverage target, not a performance threshold.

## Variant generation

Variants may change browser-rendered conditions while preserving the parent semantic scenario. All variants inherit the family lineage and remain in one eventual role. Variant generation must not occur after role assignment unless the entire family is reassigned and the release version changes.

## Deterministic regeneration check

Before capture, regenerate a selected case with the same generator/template/configuration/seed and compare the declared deterministic artifacts. Differences are recorded. Unexplained differences block release; inherently nondeterministic fields must be isolated, normalized only in derived copies, and documented.

## Expansion criteria

Expand only when the coverage report shows:

- an owner-approved taxonomy category has no representative case;
- a page/task/privacy/visual cell needed by an experiment is empty;
- hard negatives or ambiguity cases are inadequate;
- capture/annotation failures reveal a missing controlled condition;
- existing families are not independent enough for train/validation/frozen separation.

No expansion is justified solely to reach an impressive sample count.

## Outputs

Generation produces source bundles and manifests only. It does not assign roles, create frozen evaluation, approve licensing, annotate evidence, or establish model readiness.
