# Dataset Split Strategy

Date: 2026-10-04
Status: `PROPOSED`; no candidate has been assigned a final role.

## Split roles

| Role | Permitted use | Prohibited use | Current status |
| --- | --- | --- | --- |
| Training | Fit model parameters or develop learned components on rights-approved data. | Metric reporting as independent evidence; inclusion of frozen or demo cases. | OWNER-REQUIRED |
| Validation | Tune thresholds, preprocessing, taxonomy mappings, runtime choices, policies, architecture settings, and prompts. | Final claims or any access to frozen answers. | BENCHMARK-DEPENDENT. |
| Frozen evaluation | Measure the five SIH dimensions under a versioned protocol after all tuning decisions are locked. | Training, prompt design, debugging, threshold selection, model/runtime selection, or repeated manual inspection. | OWNER-REQUIRED |
| Demo/manual verification | Demonstrations, browser connectivity checks, presentation evidence, and human workflow review. | Scored evaluation or parameter tuning unless explicitly reclassified before use. | PROPOSED |

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

`OWNER-REQUIRED`: annotation protocol, adjudication, quality sampling, language/browser/device coverage, frozen-set custodian, and access policy.

`UNKNOWN`: final sample counts. Counts depend on the unresolved SIH metric definitions, taxonomy, class prevalence, browser/device matrix, and statistical confidence target.

## Real-data policy

Any real-data collection requires explicit consent, purpose limitation, data minimization, controlled access, encryption, retention/deletion schedules, revocation handling, and a prohibition on public-repository storage. Real credentials, tokens, cookies, private accounts, and personal browser profiles are excluded from collection.
