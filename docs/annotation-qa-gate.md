# Annotation QA Gate

Date: 2026-10-04
Status: `SPECIFIED`; thresholds are not yet calibrated.

## Mandatory checks

| Check | Failure example | Default outcome |
| --- | --- | --- |
| Schema validation | Unknown field/type, incompatible schema version | REANNOTATE or REJECT |
| Required fields | Missing category, coordinates, task state, or lineage | REANNOTATE |
| Referential integrity | Annotation points to missing artifact/node/entity | REANNOTATE |
| Coordinate validation | Out-of-bounds, wrong origin/scale, invalid polygon/mask | REANNOTATE |
| OCR/screenshot alignment | OCR geometry maps to wrong pixels/state | REVIEW then REANNOTATE |
| DOM/visual alignment | Node bounds/state disagree without explanation | REVIEW |
| Box/mask consistency | Mask is outside source box or leaves labeled sensitive pixels | REVIEW or REANNOTATE |
| Privacy-label consistency | High-risk value has a release expectation or conflicting context | QUARANTINE |
| Sensitive-region completeness | Visible protected region lacks required label | QUARANTINE then REANNOTATE |
| Action-target validity | Missing/stale target or impossible precondition/outcome | REVIEW or REANNOTATE |
| Expected-outcome validity | Predicate is unobservable, ambiguous, or mismatched to task | REVIEW |
| Lineage completeness | Missing generator/template/identity/site/task/session family | QUARANTINE |
| Rights/provenance | Missing or unclear approved operation | QUARANTINE or REJECT |
| Personal-data scan | Uncontrolled real personal/credential material appears | REJECT and incident review |

## Outcomes

- `ACCEPT`: all mandatory checks pass; any non-blocking limitation is documented.
- `REVIEW`: evidence is complete but requires human resolution; role assignment is blocked.
- `REANNOTATE`: correctable annotation failure; original record is retained and superseded.
- `QUARANTINE`: privacy, rights, lineage, contamination, or material ambiguity prevents normal handling.
- `REJECT`: case is unusable or unsafe; it cannot enter any scored role.

Only `ACCEPT` proceeds to contamination audit and role assignment.

## Review policy

Evaluation-critical cases receive independent review and adjudication. Training/validation cases may use risk-based independent review only after the pilot measures error patterns; this is an `INTERNAL ENGINEERING DECISION`, not an official SIH rule.

No agreement percentage or sampling percentage is fixed before pilot evidence. The pilot must report disagreement by layer/category and identify whether errors are systematic, ambiguous, or tool-induced. Proposed numeric thresholds require owner-approved QA protocol versioning.

## QA record

Each run records case ID, artifact hashes, taxonomy/schema/instruction/QA versions, check results, automated tool versions, reviewers, adjudication reference, outcome, reasons, corrective action, and timestamps.

## Gate failure handling

The pipeline stops for the case. The QA record identifies the failed check, owner, corrective action, and re-entry requirement. Re-running QA creates a new record; prior failure evidence is retained.
