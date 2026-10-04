# Pilot Split Report

**Result:** PASS  
**Schema:** `pilot-split-1.0.0`

| Role | Cases |
| --- | ---: |
| `PILOT_TRAIN` | 7 |
| `PILOT_VALIDATION` | 3 |
| `PILOT_HOLDOUT` | 2 |

Role assignment follows generation, capture, annotation, QA, and contamination analysis. Family, template, identity fixture, and task are hard co-grouping dimensions. The two related contact variants remain together in `PILOT_TRAIN`; the guard fails on a prohibited cross-role group.

`PILOT_HOLDOUT` is a pre-freeze workflow qualification role. It is not immutable, labels are not hidden from this engineering run, and it is not the official frozen evaluation set. Creating a frozen set remains governed by D-07 and the Prompt 6 freeze plan.

Sources: [`src/pilot/split.cjs`](../src/pilot/split.cjs), [`tests/unit/pilot-split.test.cjs`](../tests/unit/pilot-split.test.cjs), and ignored `artifacts/pilot/current/split.json`.
