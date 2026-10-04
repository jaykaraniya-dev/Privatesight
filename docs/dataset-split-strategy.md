# Dataset Split Strategy

Date: 2026-10-04
Status: `OWNER-APPROVED ROLE GOVERNANCE`; no current external candidate has been cleared or assigned a final role.

## Split roles

| Role | Permitted use | Prohibited use | Current status |
| --- | --- | --- | --- |
| Training | Fit model parameters or develop learned components on rights-approved synthetic, controlled non-personal, or explicitly cleared data. | Metric reporting as independent evidence; inclusion of frozen or demo cases. | APPROVED POLICY |
| Validation | Tune thresholds, preprocessing, taxonomy mappings, runtime choices, policies, architecture settings, and prompts on family-separated data. | Final claims or any access to frozen answers. | APPROVED POLICY |
| Frozen evaluation | Measure the five SIH dimensions under a versioned protocol after all tuning decisions are locked, using synthetic/controlled non-personal holdouts. | Training, prompt design, debugging, threshold selection, model/runtime selection, or repeated manual inspection. | APPROVED POLICY |
| Demo/manual verification | Demonstrations, browser connectivity checks, presentation evidence, and human workflow review using synthetic or controlled non-personal cases. | Scored evaluation or parameter tuning unless explicitly reclassified before use. | APPROVED POLICY |

Publisher split names do not assign PrivateSight roles. A publisher `test` split can share generator, template, identity, or source lineage with its train split and cannot automatically become frozen evaluation.

## Assignment sequence

1. Record immutable source identity, version/commit, license text, checksums, provenance, modality, and lineage.
2. Approve intended use and redistribution/derivative rights.
3. Map labels to the owner-approved taxonomy without editing raw data.
4. Create grouping keys before splitting: source, upstream record, generator, template, synthetic identity, site/page family, task, document family, and capture session.
5. Reserve frozen evaluation by group before model, threshold, runtime, or architecture comparison.
6. Allocate remaining groups to training and validation; keep demo cases separate.
7. Run exact, normalized, semantic, image perceptual, layout, DOM-template, identity, and source-lineage checks across roles.
8. Write a derived-data manifest for every transformation and exclusion. Raw folders remain immutable.

## Anti-leakage rules

- A source/template/generator/identity/site/task family must live in one role only.
- Render variants of one synthetic page stay together, including browser, viewport, zoom, theme, locale, and screenshot-resolution variants.
- DOM, accessibility, screenshot, OCR, region annotations, sanitized output, and action traces from one case stay in the same role.
- Demo or competitor-derived examples cannot enter scored evaluation.
- Frozen cases and answers use separate access controls and an access log.
- No error analysis on frozen examples during model selection. A compromised frozen set is retired and replaced, not silently reused.
- The registry records role eligibility; role assignment belongs in a versioned derived-data manifest.

## Visual/browser corpus proposal

`PROPOSED`: create controlled pages with fictitious identities and nonfunctional synthetic secrets, then capture paired DOM, semantic/ARIA signals, screenshots, OCR boxes/text, sensitive boxes/masks, expected sanitized output, page-state predicates, and safe action targets. Record template and generator identifiers at creation time.

`OWNER-APPROVED POLICY`: D-06 approves annotation/adjudication and D-07 approves custody/access governance. D-04, D-11, and D-12 establish the staged Chrome/Windows/reference-device scope. Exact protocol versions, named custodians, quality sampling, and measured coverage remain execution work.

`UNKNOWN`: final sample counts. Counts depend on pilot coverage, class prevalence, variance, internal metric calibration, and any later official SIH protocol.

## Real-data policy

D-05 defers personal real-data collection. The initial corpus uses synthetic and controlled non-personal cases only. Any later proposal requires a new owner decision plus explicit consent, purpose limitation, data minimization, controlled access, encryption, retention/deletion schedules, revocation handling, and public-repository exclusion. Real credentials, tokens, cookies, private accounts, and personal browser profiles remain excluded.
