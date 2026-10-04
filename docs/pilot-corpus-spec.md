# Pilot Corpus Specification

**Status:** implemented qualification corpus  
**Version:** `pilot-corpus-1.0.0`  
**Authority:** Prompt 7, Prompt 6 work packages, D-01 through D-06 and D-11  
**Data policy:** project-authored synthetic and controlled non-personal content only

## Boundary

The pilot proves the data and evaluation lifecycle at small scale. It is not a training corpus, a representative production corpus, or an official SIH evaluation set. The canonical source definitions are in [`pilot/config/cases.v1.json`](../pilot/config/cases.v1.json). Generated captures are local runtime artifacts under ignored `artifacts/pilot/`.

## Implemented cases

| Case | Family | Scenario | Privacy condition | Pilot role |
| --- | --- | --- | --- | --- |
| `case-ordinary-001` | ordinary | public status board | none | `PILOT_TRAIN` |
| `case-contact-001` | contact | identity/contact card | ordinary PII | `PILOT_TRAIN` |
| `case-auth-001` | authentication | synthetic login | high risk | `PILOT_VALIDATION` |
| `case-dashboard-001` | dashboard | synthetic account state | ordinary PII | `PILOT_TRAIN` |
| `case-message-001` | messaging | synthetic private message | high risk | `PILOT_VALIDATION` |
| `case-document-001` | document | synthetic document | high risk | `PILOT_HOLDOUT` |
| `case-security-001` | settings/security | token and private URL | high risk | `PILOT_TRAIN` |
| `case-modal-001` | modal | controlled overlay | none | `PILOT_TRAIN` |
| `case-scroll-001` | scrolling | off-screen target | none | `PILOT_TRAIN` |
| `case-ambiguous-001` | ambiguous | unknown QR-like content | uncertain | `PILOT_HOLDOUT` |
| `case-contact-002` | contact | related contact variant | ordinary PII | `PILOT_TRAIN` |
| `case-negative-001` | negative control | identifier-like public text | hard negative | `PILOT_VALIDATION` |

There are 12 cases across 11 case families. The related contact pair deliberately exercises lineage co-grouping and similarity calibration.

## Machine-readable case package

Each captured case contains a manifest plus screenshot, DOM HTML, structured DOM, ARIA snapshot, rendered-text region artifact, task record, annotation, and QA result. The manifest includes stable case, family, task, generator, template, identity, session, platform, runtime, timestamp, parent, source-family, seed, role, and rights fields. SHA-256 digests bind the generated artifacts to the manifest.

## Limits

- Chrome desktop on the reference Windows machine is the only implemented browser target.
- The rendered-text region artifact is a deterministic DOM-derived alignment surrogate. It is a `TEST INFRASTRUCTURE DEPENDENCY`, not pixel OCR and not a final OCR-engine decision.
- The pilot does not include Firefox, privileged pages, real accounts, personal data, video-heavy pages, or unrestricted canvas workloads.
- `PILOT_HOLDOUT` is pre-freeze qualification data and is not the official frozen evaluation set.

## Traceability

This corpus implements Prompt 6 WP-01 through WP-04 under D-01, D-04, D-05, D-06, and D-11. Its definitions do not use any candidate file in `datasets/raw/`.
