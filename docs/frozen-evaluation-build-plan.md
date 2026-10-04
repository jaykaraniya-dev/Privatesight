# Frozen Evaluation Build Plan

Date: 2026-10-04
Status: `SPECIFIED`; no frozen set has been created.

## Role-assignment order

```text
generate → capture → annotate → QA → contamination audit → role assignment → freeze
```

Publisher split names and random row splits do not determine PrivateSight roles.

## Grouping unit

The smallest assignable unit is the connected lineage/contamination family. It includes generator, template, identity, source family, site/page family, task family, document family, capture session, and aligned screenshot/DOM/semantic/OCR/annotation variants. A family cannot span training, validation, frozen evaluation, or demo.

## Role assignment

| Role | Eligibility | Prohibited use |
| --- | --- | --- |
| Training | Rights-cleared synthetic/controlled non-personal or explicitly approved external data; QA accepted; contamination grouped | Final claims or access to frozen artifacts |
| Validation | Independent families; same gates as training | Final reporting as unseen evidence |
| Frozen evaluation | Independent holdout families; complete required annotations; hidden labels; custodian approval | Training, debugging, tuning, model/runtime selection, repeated manual inspection |
| Demo/manual | Synthetic/controlled non-personal presentation or tool-check cases | Scored evidence or tuning unless reclassified before any exposure |

## Freeze procedure

1. Confirm rights, provenance, synthetic/controlled status, QA acceptance, contamination disposition, and role independence.
2. Lock corpus, taxonomy, annotation, contamination, metric, platform, and benchmark protocol versions.
3. Serialize an immutable case manifest listing every artifact ID, relative path/object reference, media type, size, and cryptographic hash.
4. Separate inputs from protected labels/expected outputs and define the harness-only access boundary.
5. Assign a version identifier: `privatesight-eval-<major>.<minor>.<patch>` (`INTERNAL ENGINEERING DECISION`).
6. Produce a release checksum manifest and a digest of that manifest.
7. Record project-owner custodian, named backup, authorized identities/roles, storage location class, access mechanism, and access log location.
8. Mark the release immutable and record the declaration timestamp and owner approval.
9. Run a dry qualification with non-frozen fixtures; do not expose frozen labels.

## Immutable case format

The release contains versioned manifests, input artifacts, protected labels/expected outputs, protocol references, provenance/rights records, contamination group IDs, and integrity hashes. It excludes raw candidate datasets and any uncontrolled personal data.

## Access and label protection

- Development processes receive only approved inputs and opaque case IDs.
- The scoring component reads protected labels in an isolated evaluation context and emits per-case results without exposing label content to tuning workflows.
- Every access to frozen inputs or labels is logged with identity/role, purpose, time, version, and affected cases.
- Manual error analysis on frozen labels invalidates their use for model selection unless the set is retired and replaced.

## Invalidation

A frozen result is invalid when leakage, case/label modification, development-label exposure, membership change, integrity mismatch, incompatible protocol/annotation change, or undisclosed contamination affects comparability. The custodian records scope, evidence, affected runs, and invalidation time.

## Replacement

A replacement receives a new version, independent eligible families where needed, a complete audit/freeze cycle, and a supersession record linking the prior release and reason. Prior results remain archived as invalidated evidence and cannot be silently re-labeled as results for the replacement.

## Exit condition

The release is not frozen until custody, backup, access roles, manifests, hashes, hidden-label separation, audit versions, and owner declaration are complete. Until then, status is `FROZEN EVALUATION: NOT BUILT`.
