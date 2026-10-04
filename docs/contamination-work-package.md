# Contamination Work Package

Date: 2026-10-04
Status: `SPECIFIED`; no new contamination scan or threshold calibration was performed.

## Entry condition

Input cases have QA status `ACCEPT`, complete lineage, immutable source/capture/annotation hashes, and approved rights for the intended role.

## Required analyses

| Relationship | Candidate evidence | Deterministic or calibration work |
| --- | --- | --- |
| Exact text | raw-field hashes and exact equality | Deterministic after field definition |
| Normalized text | versioned Unicode/whitespace/case/punctuation/placeholder transform plus hashes | Normalization recipe must be calibrated and frozen |
| Near text | shingles/edit similarity/MinHash or comparable method | Method and threshold calibration required |
| Exact image | decoded-pixel hash plus source-file hash | Deterministic after decoding policy |
| Near image | perceptual or feature similarity | Method and threshold calibration required |
| Layout | DOM skeleton, element-role sequence, geometry/layout fingerprint | Representation and threshold calibration required |
| Template | declared template family/version and structural fingerprint | Lineage deterministic; fingerprint policy versioned |
| Generator | generator/model/prompt/pipeline family | Lineage deterministic when complete |
| Identity | synthetic identity/account/document fixture family | Lineage deterministic when complete |
| Source family | upstream record/collection/derivation graph | Provenance review |
| Task | task intent, target, transition, paraphrase family | Taxonomy and similarity calibration |
| Semantic | frozen embedding or reviewed semantic relation | Model/version/threshold calibration required |

## Calibration work

No numeric threshold is selected in Prompt 6. For every empirical similarity method:

1. assemble known same-family, intentionally varied, and known independent calibration pairs from non-frozen pilot data;
2. record score distributions and false merge/split examples;
3. propose a review threshold and an automatic-match threshold only if evidence separates them;
4. obtain owner approval and version the method, preprocessing, model, and thresholds;
5. re-run the full audit whenever these change.

Thresholds cannot be tuned to reduce reviewer workload or improve evaluation scores.

## Flag review record

Every flag records method/version, threshold/version, case/artifact IDs, score or deterministic relation, family/role metadata, reviewer, evidence, disposition, rationale, and affected release/run.

Approved dispositions:

- suspected overlap: `QUARANTINE FOR REVIEW`;
- confirmed shared family: `CO-GROUP` into one role;
- confirmed duplicate/invalid case before freeze: `REMOVE OR REASSIGN` in derived manifests only;
- confirmed frozen contamination: `INVALIDATE AFFECTED RESULTS` and issue a replacement release.

Raw source files are never deleted or rewritten.

## Role-assignment output

Produce a contamination graph whose connected components capture approved family and similarity relations. Role assignment operates on components, not individual variants. Unresolved edges block all connected cases from frozen evaluation.

## Existing evidence

Prompt 4 confirmed exact duplicate rows within DS-CAND-004, DS-CAND-007, and DS-CAND-008 and two exact text overlaps between DS-CAND-004 and DS-CAND-008. These findings remain evidence; Prompt 6 does not rerun or expand the raw-data audit.

## Exit condition

All required methods for the release have versioned configurations, every flag has a disposition, all connected families are co-grouped, and the audit summary identifies residual unknowns. Otherwise role assignment stops.
