# Pilot Annotation Report

**Result:** implemented and aligned  
**Schema:** `pilot-annotation-1.0.0`  
**Taxonomy:** `privatesight-pii-working-2026-10-04`

## Contents

The generator-derived annotation package binds each case to screenshot, DOM, accessibility, rendered-text, task, and lineage evidence. It records the annotation method and version, source/OCR spans, visual boxes and rectangular masks, DOM and accessibility references, semantic role, expected action and outcome, PII category, sensitivity, ambiguity, canary ID, and expected privacy-gate behavior.

The 12 cases contain 12 sensitive entities and 12 aligned masks, DOM references, and accessibility references:

| Category | Count |
| --- | ---: |
| person name | 2 |
| email | 2 |
| username | 1 |
| password | 1 |
| account identifier | 1 |
| private message | 1 |
| private document | 1 |
| access token | 1 |
| private URL | 1 |
| unknown QR/barcode-like content | 1 |

The ordinary, modal, scrolling, and hard-negative cases also provide empty/negative annotation controls where appropriate.

## Interpretation

These annotations are deterministic synthetic ground truth for qualification. They have not received independent human review and do not establish coverage or annotation quality for a future representative corpus. The ambiguity label on the QR-like case validates fail-closed handling mechanics.

## Source locations

- Builder: [`src/pilot/annotation.cjs`](../src/pilot/annotation.cjs)
- Machine-readable aggregate: ignored `artifacts/pilot/current/annotations.jsonl`
- Per-case annotation: ignored `artifacts/pilot/current/<case_id>/annotation.json`
