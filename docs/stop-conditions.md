# Prompt 6 Stop Conditions

Date: 2026-10-04
Status: binding workflow controls for later execution.

## Stop-condition rule

When a stop condition occurs, do not advance the affected case, release, platform, channel, or experiment. Record evidence, scope, owner, corrective action, and re-entry gate. Quarantine preserves artifacts and audit history; it does not alter raw sources.

| Stop condition | Scope stopped | Required response | Re-entry evidence |
| --- | --- | --- | --- |
| Unresolved license/provenance or unapproved operation | Dataset/case family | Mark `REQUIRES_REVIEW`; exclude from generation/training/evaluation/publication | Authoritative terms and approval record |
| Personal real data or functional credential found | Case/release and related artifacts | Isolate, restrict access, assess exposure, reject or regenerate | Safe replacement and incident closure |
| Incomplete lineage | Case family | Quarantine all connected variants | Complete validated lineage graph |
| Generation not reproducible | Generator/template version | Stop derived captures; diagnose nondeterminism | Regeneration evidence or declared/stabilized nondeterminism |
| Missing or misaligned capture artifact | Case | Recapture or reject | Valid cross-artifact alignment record |
| Annotation schema/required-field/geometry failure | Case/annotation version | Reannotate or reject | QA ACCEPT under valid version |
| Privacy-label or sensitive-region completeness failure | Case/release | Quarantine and independent review | Corrected annotation plus clean QA |
| Unresolved contamination flag | Connected component | Block role assignment/freeze | Reviewed disposition and grouping update |
| Cross-role family leakage | Affected roles/release | Invalidate split; reassign by component | New split and clean contamination audit |
| Frozen-set label exposure or case/membership change | Frozen release and affected results | Invalidate and retire affected version | Replacement release and new runs |
| Privacy-gate bypass or prohibited outbound content | Outbound path/experiment | Stop network/server runs; preserve local evidence; investigate | Root-cause fix and Gate C requalification |
| Missing benchmark artifact or metric-version mismatch | Run | Mark run invalid | Complete rerun under one locked protocol |
| Irreproducible measurement | Configuration/platform group | Stop comparison | Repeated qualified runs with explained variance |
| Unstable metric definition or post-hoc formula change | Metric/run set | Freeze interpretation; create new protocol version | Recomputed results under approved version |
| Unexplained experimental variance | Experiment/configuration | Stop selection inference; investigate order/environment | Variance explanation and revised registered design |
| Unsupported or silent runtime/browser fallback | Configuration | Stop comparison; classify unsupported/fallback | Actual provider verified and separately grouped |
| Missing hardware/browser/OS/runtime metadata | Run | Mark run invalid | Rerun with complete fingerprint |
| Timeout/crash/error produces release instead of fail-closed result | Configuration/outbound path | Treat as privacy failure | Clean fault-injection evidence |
| Manual change to frozen or generated artifact without versioning | Artifact family/release | Quarantine and integrity audit | New version and hashes |

## Non-blocking observations

A lower accuracy result, slower configuration, unsupported optional backend, or expected hard negative is evidence rather than a workflow blocker when privacy, integrity, and protocol validity hold. It may make a candidate infeasible later but does not justify altering data or metrics.

## Escalation

Legal/licensing ambiguity goes to the authority defined in D-01. Privacy policy ambiguity goes to the project owner. Official SIH ambiguity remains `UNKNOWN` pending an organizer source. Technical calibration questions remain benchmark-dependent and are resolved only on non-frozen pilot evidence.
