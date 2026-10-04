# Contamination Policy

Date: 2026-10-04
Status: `OWNER-APPROVED POLICY`; operational thresholds and audit-version details remain `BENCHMARK-DEPENDENT`.

## Scope

This policy applies across source datasets, derived text, screenshots, DOM/semantic snapshots, OCR output, annotations, synthetic generators, templates, identities, tasks, and demonstrations. It complements the observed findings in `contamination-audit.md`; it does not modify raw data.

## Classification

- `CONFIRMED CONTAMINATION`: an observed duplicate, overlap, or role violation supported by evidence.
- `POSSIBLE / NEEDS AUDIT`: a plausible shared source, generator, template, identity, semantic, or visual lineage without proven role leakage.
- `NO MATCH OBSERVED`: the selected method found no match; this is not proof of independence.

## Confirmed baseline

Prompt 4 confirmed duplicate-text rows in DS-CAND-004, DS-CAND-007, and DS-CAND-008, plus two exact text matches between DS-CAND-004 and DS-CAND-008. These findings remain confirmed. Near, semantic, template, identity, screenshot, and source-family overlap remain unaudited or only partially evidenced.

## Candidate detection methods

| Overlap type | Candidate methods | Required grouping/evidence | Threshold status |
| --- | --- | --- | --- |
| Exact text | byte/content hash of canonical source field; duplicate ID check | dataset/version/record and role | deterministic equality; approved quarantine/co-group/remove action policy |
| Normalized text | hashes after documented Unicode, whitespace, case, punctuation, and placeholder normalization | raw and normalized hash plus normalization version | normalization recipe and version remain to be fixed |
| Near-duplicate text | token/shingle similarity, edit distance, MinHash/LSH, or comparable clustering | matched excerpts kept local, similarity method/version, cluster ID | method family approved; threshold BENCHMARK-DEPENDENT |
| Semantic similarity | frozen embedding model or task-specific similarity review | model/version, source text kept local, candidate pair/cluster | model and threshold BENCHMARK-DEPENDENT |
| Exact image | decoded-pixel and file hashes | image/capture IDs and render metadata | deterministic equality; approved quarantine/co-group/remove action policy |
| Near-image similarity | perceptual hash, feature similarity, or structural comparison | viewport/render metadata, candidate cluster, visual review | method/threshold BENCHMARK-DEPENDENT |
| Screenshot layout similarity | DOM/layout fingerprints, region geometry, element-role sequences, or visual layout features | template/site/page-state lineage | method/threshold BENCHMARK-DEPENDENT |
| Generator overlap | generator/model/prompt/pipeline identifiers | immutable generator lineage | D-08 co-group rule approved; encoding/version to be fixed |
| Template overlap | template ID, DOM skeleton, stylesheet/layout fingerprint, document pattern | template family and version | D-08 co-group rule approved; encoding/version to be fixed |
| Identity overlap | synthetic-person/organization/account/document lineage IDs; approved local entity fingerprint | privacy-preserving identity family | D-08 co-group rule approved; encoding/version to be fixed |
| Source-family overlap | publisher/upstream record/source collection/derivation graph | provenance graph and source version | D-08 co-group rule approved; encoding/version to be fixed |
| Task overlap | task family, target, state transition, instruction paraphrase cluster | task lineage and outcome | D-08 co-group rule approved; encoding/version to be fixed |

## Required audit sequence

1. Freeze source inventory, versions, checksums, and lineage metadata.
2. Build grouping keys before randomization, augmentation, rendering, or role assignment.
3. Run exact checks across all roles and datasets.
4. Run approved normalized and near/semantic checks on derived working copies.
5. Run image, layout, DOM-template, identity, generator, source-family, and task checks for multimodal cases.
6. Review candidate cross-role clusters under the approved threshold/action policy.
7. Assign an entire cluster/family to one role or exclude it.
8. Record the audit version, methods, thresholds, exclusions, reviewer, and unresolved risks.

## Split actions

The approved default actions are quarantine for suspected overlap, co-group for confirmed shared family, remove/reassign before freeze for confirmed invalid cases, and invalidation of affected frozen results. No cross-role match may be silently ignored.

If contamination is discovered after a scored run, the frozen-set custodian must determine the affected cases and decisions. Results influenced by the overlap are discarded, the evaluation version is invalidated, and a replacement set/version is issued before new claims.

## Threshold governance

No numeric similarity threshold is approved by this document. Threshold selection must use representative within-family and independent-source pairs, record false merge/split behavior, and occur before the frozen set is exposed. Changing a method, model, preprocessing recipe, or threshold creates a new contamination-policy version and requires re-audit.

## Privacy constraints

Similarity computation must remain local for protected or licensed data. Reports use case IDs, cluster IDs, aggregate counts, and approved excerpts only. Identity fingerprints must not expose the underlying synthetic or controlled-real identity.

## Owner decision recorded

The owner approved all listed exact, normalized, near, image, layout, template, generator, identity, source-family, task, and semantic checks. Suspected overlap is quarantined; confirmed shared families are co-grouped; invalid cases are removed or reassigned before freeze; confirmed frozen-set contamination invalidates affected results.

## Remaining protocol details

Normalization recipes, operational similarity thresholds, audit version, reviewer assignment, public-benchmark screening, and replacement records remain to be fixed before a frozen set is released.
