# Visual and Browser Dataset Gap Analysis

Date: 2026-10-04

## Core finding

`CONFIRMED`: the 11-candidate collection supports only text-oriented research. It cannot establish PrivateSight's visual-context accuracy, browser-state understanding, visual PII localization, pixel/region redaction, DOM/accessibility alignment, or action grounding.

## Capability coverage

| Capability | Current coverage | Status | Required evidence |
| --- | --- | --- | --- |
| Generic text PII detection | Several span/BIO text sources across English, Russian, and other languages | CONFIRMED | Rights-cleared taxonomy mapping, category-balanced positives/negatives, hard negatives, independent sources |
| OCR / text localization | Text strings/spans only; no rendered-image OCR coordinates | CONFIRMED | Rendered browser screenshots paired with text, word/line boxes, OCR transcripts, difficult fonts/zoom/themes |
| Screenshot understanding | None | CONFIRMED | Page screenshots with task-relevant regions, state labels, and cross-resolution/browser coverage |
| Browser UI understanding | None directly | CONFIRMED | Browser/page UI screenshots plus DOM/accessibility semantics and control labels |
| Visual PII localization | None | CONFIRMED | Boxes/polygons/masks for text and non-text sensitive regions |
| Bounding boxes | None | CONFIRMED | Human-verified region annotations linked to category and source modality |
| Redaction masks | None | CONFIRMED | Pixel masks or explicit region ground truth plus sanitized outputs |
| Face detection/redaction | None | CONFIRMED | Consented or synthetic faces in browser contexts with boxes/masks and redaction targets |
| Password/form protection | Text labels occasionally include passwords, but no browser fields or states | CONFIRMED | Synthetic forms with DOM input types, displayed/hidden values, autofill states, screenshots, and expected protection policy |
| Credential detection | Partial text categories; no browser secrets/channels | CONFIRMED | Synthetic tokens, API keys, OTPs, cookies/session IDs, recovery codes, URL secrets, and negative lookalikes across DOM/OCR/visual layers |
| Browser state understanding | None | CONFIRMED | Paired state transitions, selected tabs/pages, modal/loading/error/auth states, and expected semantic summaries |
| Accessibility/DOM semantics | None | CONFIRMED | DOM snapshots and accessibility trees aligned with screenshots and stable element references |
| Visual-action grounding | None | CONFIRMED | Safe task traces with target elements/boxes, preconditions, expected result state, and rejected unsafe actions |
| Browser task/action labels | None | CONFIRMED | Structured action labels and transition outcomes on controlled pages |
| Sensitive visual region detection | None | CONFIRMED | Non-text faces, signatures, document images, QR/barcodes, notifications, avatars, and mixed text/visual regions |
| Safe sanitized visual context | None | CONFIRMED | Raw/sanitized paired screenshots plus residual-leakage and over-redaction ground truth |

## What the current data can support

- `CONFIRMED`: exploratory text-span taxonomy mapping and rule/model baselines, after license and provenance approval.
- `PROPOSED`: development of synthetic text fixtures for unit-level detection checks, kept separate from evaluation.
- `BENCHMARK-DEPENDENT`: testing whether text candidates improve OCR-output PII detection once rendered-browser OCR data exists.

## Missing data sources

### Synthetic browser data

`PROPOSED`: generate controlled local pages using fictitious identities and secrets, render them under fixed browser profiles, and retain paired DOM, accessibility, screenshot, OCR, sensitive-region, sanitized-output, and action-target artifacts. Every case must carry generator/template/family identifiers so related variants remain in one split.

Useful synthetic scenarios include forms, account pages, inbox/chat views, medical/financial documents, notifications, tables, modals, login/recovery pages, QR/barcodes, document previews, and pages with false-positive lookalikes.

### Browser-derived evidence

`PROPOSED`: collect screenshots and semantic snapshots only from controlled fixtures or public non-account pages. Browser-derived cases are required to expose rendering, iframe, shadow DOM, canvas, zoom, theme, OCR, and extension-permission behavior that text corpora cannot represent.

### Human annotation

`CONFIRMED`: D-06 approves primary annotation, independent review for evaluation-critical cases, adjudication, versioned schemas, and explicit ambiguity labels. Prompt 6 defines the work package and QA outcomes. The process has not yet been executed, so measured agreement and case acceptance remain unavailable.

### Frozen evaluation

`CONFIRMED` policy / `NOT BUILT`: D-07 approves versioned, immutable, access-controlled frozen evaluation with protected labels and explicit invalidation. Prompt 6 defines the build procedure. No existing candidate can serve as the overall frozen evaluation set, and no frozen set currently exists.

## Real-data constraints

Personal real-data collection is `DEFERRED` by D-05. The initial corpus permits synthetic and controlled non-personal cases only. Any later real-data proposal requires a new owner decision plus documented consent, purpose limitation, minimization, access control, retention/deletion, revocation, and repository exclusion. Real credentials, cookies, tokens, private accounts, and personal browser profiles remain prohibited.

## Gap closure gate

The owner has approved the working taxonomy, staged scope, synthetic/controlled-non-personal policy, annotation protocol, contamination policy, and frozen-set governance through D-02 and D-04 through D-08. Before candidate experimentation, rights-cleared fixtures must be built; aligned annotations must pass QA; contamination review must precede role assignment; and the frozen set and harness must be qualified. Final corpus size remains `BENCHMARK-DEPENDENT`.

