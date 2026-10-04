# PrivateSight Owner Decision Gate

Date: 2026-10-04

## Owner response recorded

The project owner supplied the Prompt 5 response sheet on 2026-10-04. Decisions D-01 through D-12 are recorded below. They authorize a restricted, synthetic-first Chrome/Windows benchmark scope and a separately named internal evaluation protocol. They do not clear any unresolved dataset license, establish official SIH formulas, or select a model, runtime, production architecture, or universal browser-support claim.

## Purpose

This is the authoritative register of owner decisions after Prompt 4 and the decision baseline for Prompt 6. It records approved scope and remaining evidence boundaries. It does not approve any unclear dataset, final model, runtime, or production architecture.

The repository evidence supporting these choices is in `prompt4-evidence.md`, `dataset-audit.md`, `data-licensing.md`, `pii-taxonomy.md`, `dataset-split-strategy.md`, and `evaluation-data-requirements.md`.

## Decision rules

- A blank or unverified detail remains `OWNER-REQUIRED`, `UNKNOWN`, or `BENCHMARK-DEPENDENT`; repository text must not silently fill it.
- An owner decision may define an internal benchmark policy but cannot be described as an official SIH rule without authoritative SIH evidence.
- Dataset approval is per dataset, intended use, version, and operation. Permission for local research does not imply permission for training, redistribution, or public artifacts.
- The privacy invariant remains fixed: raw sensitive context is detected and sanitized locally, and only gate-approved sanitized context may leave the device.

## Group A — Project data use and rights

### A1. Intended-use envelope — approved with restrictions

SIH submission/controlled demo, academic research, internal development, rights-cleared training, and public methodology/sanitized metadata are approved. Redistribution of restricted/unclear data or derived data, reconstructable sensitive examples, and commercial use of uncleared assets remain prohibited or deferred.

| Use | Decision needed | Consequence |
| --- | --- | --- |
| Academic research | Whether restricted/noncommercial sources may be considered | May allow research candidates that cannot support later commercial work. |
| SIH submission and demo | Whether competition use is within the approved license purpose | Approval must name the dataset/version and permitted artifacts. |
| Internal development | Whether local team access and derived working copies are permitted | Does not authorize public release. |
| Public GitHub documentation | Whether metadata, examples, or derived annotations may be published | Raw candidate data remains excluded. |
| Model training | Which sources and derived artifacts may fit model parameters | Requires explicit rights, provenance, and split approval. |
| Derived-dataset redistribution | Whether annotations, renders, masks, or transformed records may be shared | May be restricted even when local use is allowed. |
| Commercial use | Whether future commercial compatibility is required now | Excluding restricted sources now preserves later options; including them may create a separate research-only path. |

### A2. Dataset operation policy

For every dataset and version, the owner or designated licensing authority must independently approve: local download, metadata inspection, research use, training, validation, frozen evaluation, transformation/annotation, redistribution, and inclusion in public artifacts. Unchecked operations are prohibited by project policy until reviewed.

### A3. Licensing authority — approved

The project owner may authorize project-policy use only where terms and provenance clearly permit it. Otherwise institutional/legal or dataset-owner clarification is required. A dataset marked `REQUIRES_REVIEW` is not eligible for training, publication, redistribution, or frozen evaluation until cleared.

## Group B — PII taxonomy and privacy policy

### B1. Default fail-closed classes — approved

Credentials/secrets/tokens, payment data, authentication/recovery data, private notifications, security-sensitive browser state, biometric-like/face content, uncertain QR/barcodes, and private document content block release when detection, sanitization, or verification is uncertain.

### B2. Ambiguous content — approved

For uncertain names, account state, QR/barcodes, faces, biometric-like content, document screenshots, private notifications, private URLs, and derived account state, choose one policy per category:

- block the outbound package;
- redact the uncertain region/value and continue;
- request local user review;
- allow only an approved derived predicate;
- allow under an explicit public-context rule.

Ambiguous names, account state, and private content use fail-closed behavior by default. A safe derived representation may be released only when the task demonstrably requires it and the policy permits it.

### B3. Public/private context — approved principle

Publicly visible information may have lower contextual sensitivity than authenticated/private content, but public context never makes credentials, session state, payment information, or security-sensitive data permissible to transmit. Any reduced protection requires a testable classification rule; uncertainty falls back to the D-03 fail-closed policy. Exact context predicates remain benchmark and policy-version work.

### B4. Derived outbound context

Each field class must be marked `PERMITTED`, `PROHIBITED`, or `OWNER-REVIEW-REQUIRED` in the future outbound contract.

| Derived field | Decision questions |
| --- | --- |
| Category labels | May a label reveal a sensitive condition or document type? |
| Bounding boxes | Can geometry identify a person, field, page template, or account layout? |
| Redaction masks | Can mask shape or count reveal protected content? |
| OCR text | Is only fully sanitized OCR allowed, or are typed placeholders permitted? |
| Semantic summaries | Which facts may remain and at what granularity? |
| Account-state indicators | May generic signed-in state leave the device without identity/account details? |
| Action targets | Which local references, roles, descriptions, and coordinates may be exported? |

Raw sensitive pixels, raw sensitive OCR, credential/token values, and sensitive DOM/accessibility values are prohibited. Non-sensitive semantic summaries and UI roles/geometry are permitted. Masks/boxes are internal by default; action targets require sanitized opaque references; account-state indicators remain review-required unless safely derived.

## Group C — Visual/browser corpus scope

The owner approved a staged scope: Phase 1 Chrome desktop on the reference Windows environment, with public pages, forms, synthetic login/recovery, account/profile pages, dashboards, messaging, documents, settings, notifications, and error/security prompts. Privileged/browser-internal UI, unrestricted payment flows, personal-account data, broad video-heavy pages, and unrestricted canvas-heavy workloads are deferred. Firefox and additional classes follow Phase 1 acceptance evidence.

## Group D — Synthetic-data policy

Synthetic and controlled non-personal data are approved for training, validation, frozen evaluation, and demos under family separation. Personal real-data collection is deferred. Generator, template, site/category, identity fixture, task, capture session, DOM, and visual diversity are required; no percentage or sample count is fixed.

## Group E — Annotation protocol

Source text, OCR, boxes, masks where needed, DOM, accessibility nodes where available, semantic roles, action targets, expected outcomes, sensitivity labels, and lineage metadata are mandatory initial units. Primary annotation, independent evaluation-case review, adjudication, schema versioning, and alignment/coverage checks are approved. Ambiguity labels remain `UNKNOWN`, `UNCERTAIN`, and `NOT_APPLICABLE`.

## Group F — Data split governance

The project owner is custodian with a named backup when the frozen set is created. Frozen labels are not exposed for development/tuning. Formal baseline declaration creates the immutable version; leakage, edits, exposure, membership changes, or incompatible changes invalidate affected results.

## Group G — Contamination policy

Exact, normalized, near, image, layout, template, generator, identity, source-family, task, and semantic checks are approved. Suspected overlap is quarantined; confirmed shared families are co-grouped; invalid cases are removed/reassigned before freeze; frozen contamination invalidates affected results. Operational thresholds remain benchmark-dependent.

## Group H — SIH evaluation protocol

The owner approved a separately named/versioned PrivateSight Internal Evaluation Protocol. Official SIH formulas, thresholds, annotation rules, platform requirements, and pass/fail rules remain unconfirmed and must not be represented by internal results.

## Owner decision table

| ID | Decision | Options / proposed choices | Evidence | Status | Owner action |
| --- | --- | --- | --- | --- | --- |
| D-01 | Intended project/data use | Restricted SIH/demo, academic, internal, rights-cleared training, public methodology/metadata; no uncleared redistribution/commercial use | `data-licensing.md`; `dataset-audit.md`; owner response | EVIDENCE-SUFFICIENT | Apply per-dataset rights review; unclear assets remain blocked. |
| D-02 | Approved PII taxonomy | Existing taxonomy approved with context-dependent sensitivity | `pii-taxonomy.md`; owner response | EVIDENCE-SUFFICIENT | Version taxonomy before annotation. |
| D-03 | Fail-closed categories | High-risk/uncertain content blocks; ordinary PII is locally redacted; derived fields follow outbound policy | `privacy-architecture.md`; owner response | EVIDENCE-SUFFICIENT | Encode policy cases and failure evidence. |
| D-04 | Visual corpus scope | Staged Chrome desktop/Windows Phase 1; Firefox and broader classes Phase 2 | `visual-browser-corpus-spec.md`; owner response | EVIDENCE-SUFFICIENT | Record exact versions and generate only approved classes. |
| D-05 | Synthetic-data policy | Synthetic and controlled non-personal data allowed across roles with family separation; personal data deferred | `visual-browser-corpus-spec.md`; owner response | EVIDENCE-SUFFICIENT | Maintain lineage and role eligibility. |
| D-06 | Annotation protocol | Multimodal aligned units, independent evaluation review, adjudication, versioning, ambiguity labels | `visual-annotation-protocol.md`; owner response | EVIDENCE-SUFFICIENT | Freeze schema/version before annotation release. |
| D-07 | Frozen-set governance | Owner custodian plus backup; immutable formal baseline; exposure/leakage invalidates results | `dataset-split-strategy.md`; owner response | EVIDENCE-SUFFICIENT | Name backup and access list at freeze. |
| D-08 | Contamination policy | Mandatory multi-modal and lineage checks with quarantine/co-group/remove/invalidate actions | `contamination-policy.md`; owner response | BENCHMARK-DEPENDENT | Set operational thresholds and version audit method. |
| D-09 | SIH metric formulas | PrivateSight Internal Evaluation Protocol approved; official SIH formulas remain unconfirmed | `evaluation-metrics.md`; owner response | EVIDENCE-SUFFICIENT | Keep internal results separate from official scoring. |
| D-10 | Latency boundary | Full-chain end-to-end primary interval plus stage timings; warm/cold separately | `sih-evaluation-protocol.md`; owner response | EVIDENCE-SUFFICIENT | Instrument approved boundaries and report network separately. |
| D-11 | Browser/OS matrix | Phase 1 Chrome desktop on reference Windows; Firefox same OS class after Phase 1 acceptance | `evaluation-platform-matrix.md`; owner response | EVIDENCE-SUFFICIENT | Record exact browser/OS versions per run. |
| D-12 | Hardware benchmark matrix | Current development PC class as reference plus CPU/WASM fallback; wider hardware deferred | `evaluation-platform-matrix.md`; owner response | EVIDENCE-SUFFICIENT | Record exact machine metadata; keep unmatched groups separate. |

## Gate interpretation

The owner response resolves the project-policy decisions needed for a bounded Prompt 6 work plan. It does not clear any specific unresolved dataset license, establish official SIH formulas, set contamination thresholds, or select a model, runtime, architecture, or production support claim.
