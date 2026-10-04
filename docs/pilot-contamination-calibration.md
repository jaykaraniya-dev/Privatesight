# Pilot Contamination Calibration

**Result:** functional and pilot-calibrated  
**Threshold version:** `pilot-contamination-1.0.0`

## Implemented checks

The utility compares exact text, normalized text, trigram near-text similarity, byte-histogram image similarity, DOM-role layout similarity, template lineage, generator lineage, identity lineage, source-family lineage, task lineage, and case-family lineage. Every pair has scores, flags, and a review disposition.

## Pilot thresholds

| Check | Threshold |
| --- | ---: |
| near-text Jaccard | 0.72 |
| image byte-histogram cosine | 0.985 |
| layout Jaccard | 0.80 |

These are `INTERNAL ENGINEERING DECISION` values calibrated only for this 12-case qualification corpus. They are not official SIH, production, universal, or model-selection thresholds.

## Calibration observations

- Deliberately related contact variants: near-text score `0.8421052632`; correctly flagged.
- Deliberately independent ordinary/document pair: near-text score `0.0243902439`; not flagged.
- All 66 unordered case pairs were compared.
- Shared local generator/source lineage is recorded for review and is not alone treated as semantic duplication.

The small controls do not establish a false-positive or false-negative rate for a larger corpus. Image and layout thresholds require broader calibration before any frozen set.

## Source locations

- Configuration: [`pilot/config/contamination-thresholds.v1.json`](../pilot/config/contamination-thresholds.v1.json)
- Implementation: [`src/pilot/contamination.cjs`](../src/pilot/contamination.cjs)
- Runtime report: ignored `artifacts/pilot/current/contamination-report.json`
