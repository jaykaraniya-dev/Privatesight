# Contamination and Leakage Audit

Date: 2026-10-04

## Terminology

- **CONFIRMED CONTAMINATION:** observed duplicate or overlap evidence.
- **POSSIBLE / NEEDS AUDIT:** a plausible leakage path without proof that split integrity is violated.

## Findings

| Finding | Classification | Status | Affected data | Evidence | Risk | Mitigation / next action |
| --- | --- | --- | --- | --- | --- | --- |
| 2,930 duplicate-text rows in DS-004 | CONFIRMED CONTAMINATION | CONFIRMED | DS-004 | prior local aggregate comparison | inflated sample counts and split leakage if duplicates cross partitions | hash/deduplicate only in derived working copies after approval; group duplicates before splitting |
| 23 duplicate-text rows in DS-007 | CONFIRMED CONTAMINATION | CONFIRMED | DS-007 | prior local aggregate comparison | same | dataset blocked; retain evidence and review derived-copy policy |
| 127 duplicate-text rows in DS-008 | CONFIRMED CONTAMINATION | CONFIRMED | DS-008 | prior local aggregate comparison | same | dataset blocked; retain evidence and review derived-copy policy |
| Two exact text matches between DS-004 and DS-008 | CONFIRMED CONTAMINATION | CONFIRMED | DS-004, DS-008 | prior local cross-dataset comparison | cross-corpus leakage if assigned to different roles | shared hash/family exclusion list before any role assignment |
| Zero exact matches for DS-007/008, DS-007/004, and DS-005/006 | No exact overlap observed | CONFIRMED | named pairs | prior local comparison | does not rule out near, semantic, identity, or template overlap | run normalized, fuzzy, template, and entity-family audits later |
| Meddies contains mixed/derived views | POSSIBLE / NEEDS AUDIT | CONFIRMED | DS-002 and named upstream views | local card | same example or generator family may appear under multiple configs | reconstruct lineage graph and group by source record before splitting |
| DS-005 and DS-006 share production/synthetic lineage | POSSIBLE / NEEDS AUDIT | CONFIRMED | DS-005, DS-006 | local/current cards | source/template/identity leakage despite disjoint exact text | group by source, template, generator, and pseudonym family; freeze benchmark first |
| Synthetic source splits may share generator/templates | POSSIBLE / NEEDS AUDIT | UNKNOWN | DS-002/003/004/007/008/010/011 | publisher descriptions; no template IDs verified | inflated generalization estimates | require generator/template metadata or derive similarity clusters before splitting |
| PiiScan manifest references absent derived corpus and mixed upstream data | POSSIBLE / NEEDS AUDIT | CONFIRMED | DS-009 | local manifest/card | rebuilding could import restricted data or overlap candidates | treat as recipe only; approve each upstream source independently |
| Privasis hard splits lack gold sanitized output | Evaluation leakage/validity risk | CONFIRMED | DS-010 | local card | tuning against incomplete targets or scoring an undefined task | exclude from scored redaction evaluation unless gold is created independently |
| Public candidate data could overlap future public benchmark material | POSSIBLE / NEEDS AUDIT | UNKNOWN | all public candidates | no authoritative SIH corpus disclosed | hidden benchmark contamination cannot be ruled out | ask SIH/owner for corpus disclosure; keep final evaluation source-diverse and frozen |
| Synthetic browser templates could leak across train/evaluation | POSSIBLE / NEEDS AUDIT | PROPOSED | future visual corpus | design risk | memorization of layout/text combinations | assign template, identity, task, site-family, and generator groups before splitting |

## Leakage controls

`PROPOSED` controls for any approved derived dataset:

- immutable source inventory with content hashes and version/commit identifiers;
- split assignment by source/template/generator/identity/site/task family before augmentation;
- exact and normalized hashes across every modality;
- near-duplicate image perceptual hashes and text similarity clusters;
- DOM-template and screenshot-layout fingerprints;
- no threshold, prompt, OCR, runtime, or model tuning on frozen evaluation;
- evaluation access log and separate storage permissions;
- demo fixtures excluded from scored metrics;
- record every removal or transformation in a derived-data manifest without altering raw files.

## Open gate

D-08 approves the method families and default dispositions, while D-07 approves frozen-set custody and access principles. Numeric or algorithm-specific similarity thresholds remain `BENCHMARK-DEPENDENT` and must be calibrated, versioned, and reviewed on the actual corpus. Screening against any undisclosed official SIH corpus remains `UNKNOWN` until an authoritative source is available.

