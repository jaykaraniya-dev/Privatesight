# Visual and Browser Corpus Specification

Date: 2026-10-04
Status: `OWNER-APPROVED SCOPE`; detailed case counts, exact versions, and release artifacts remain `BENCHMARK-DEPENDENT`.

## Objective

Define a rights-cleared, privacy-safe corpus that can support browser-context understanding, multimodal sensitive-content detection, pixel/region redaction, sanitized-context evaluation, and action grounding. This specification does not create data, set sample counts, or assign any current candidate dataset to a role.

## Unit of collection

One case represents one controlled browser state and, where applicable, one state transition. A case should use a stable ID and keep these aligned artifacts together:

- browser, version, OS, viewport, zoom, theme, locale, font scale, and capture boundary;
- page/template/site/task/generator/synthetic-identity/capture-session lineage IDs;
- screenshot or frame sequence;
- DOM snapshot and page metadata permitted by policy;
- DOM-derived roles/states and accessibility evidence available through the approved acquisition path;
- OCR text with word or line geometry;
- PII/sensitive spans, regions, boxes, polygons, or masks;
- expected sanitized screenshot and structured context;
- page-state predicates and task-relevant regions;
- requested action, target, preconditions, expected result, and rejection label where applicable;
- annotation version, reviewer state, split role, provenance, rights status, and integrity hashes.

All artifacts from one underlying case and all of its render variants must remain in a single split role.

## Owner-approved browser coverage

Phase 1 is Chrome desktop on the reference Windows environment. Phase 2 adds Firefox after Phase 1 acceptance evidence. This staged choice does not support universal browser compatibility claims.

## Browser coverage choices

| Scope option | What it establishes | Limitation | Owner decision |
| --- | --- | --- | --- |
| Chrome corpus first | Faster initial generation on the already verified tool path | Cannot support Firefox parity claims | APPROVED — Phase 1 |
| Firefox corpus first | Exercises Firefox-specific extension/runtime behavior | Cannot support Chrome parity claims | DEFERRED — Phase 2 |
| Parallel Chrome and Firefox | Enables paired rendering and behavior comparisons | Greater annotation and capture cost | DEFERRED |
| Shared page corpus with staged browser captures | Separates page/task design from browser expansion | Browser-specific evidence arrives later | APPROVED pattern |

Exact browser versions must be frozen in the platform matrix before a corpus release is captured.

## Page and workflow categories

The owner may approve any subset and explicit exclusions.

| Category | Candidate scenarios | Required evidence if included |
| --- | --- | --- |
| Public informational pages | articles, search/results, product/help pages | task-relevant context and hard-negative public identifiers |
| Forms | contact, registration, profile, application | field semantics, values, validation states, autofill/password behavior where safely simulated |
| Login-like and recovery pages | sign-in, OTP, recovery code, reset flow | synthetic credentials only; credential-region and action-safety labels |
| Account pages | profile, account switcher, preferences | synthetic account state and context-sensitive identifiers |
| Dashboards | tables, charts, cards, filters | relevant-region labels, visual-only values, state predicates |
| Payment-like pages | checkout, invoices, statements | synthetic payment data and financial-region annotations |
| Messaging and notifications | inbox, chat, notification preview | sender/body/attachment/preview regions and private/public context labels |
| Document pages | PDF-like view, scans, forms, images | OCR, document region, signature/face/QR/barcode labels where present |
| Browser or extension settings | permission and configuration views | explicit support boundary; no personal profile data |
| Error and security prompts | warnings, permission prompts, auth failures | prompt type, allowed observation, and required action/rejection policy |

Canvas, video, shadow DOM, cross-origin frames, browser-owned UI, and built-in PDF viewers must be declared included, excluded, or deferred. Inclusion requires an acquisition and annotation method that works on the selected browser/version.

## Visual-condition matrix

The corpus manifest must record, and the owner must select coverage for:

- viewport dimensions and device-pixel ratio;
- page zoom and browser text/font scaling;
- light, dark, high-contrast, and forced-color conditions where supported;
- responsive breakpoints and orientation;
- locale, script direction, language, date/number formats, and font fallback;
- page-only versus browser-chrome-inclusive capture;
- dialogs, popups, menus, tooltips, toasts, and notification overlays;
- top, middle, bottom, and horizontally scrolled positions where relevant;
- loading, empty, success, error, disabled, selected, and stale states;
- occlusion, compression, small text, images/canvas, and mixed text/visual PII.

The owner approved the scope and reference classes. Exact browser versions, capture distributions, and benchmark case counts remain to be fixed in the versioned benchmark protocol.

## Synthetic-data policy

### Allowed synthetic elements under an approved policy

- fully synthetic browser pages and DOM;
- fictitious identities with stable lineage identifiers;
- nonfunctional synthetic credentials, tokens, cookies, OTPs, and account states;
- synthetic PII overlays, document images, messages, notifications, forms, and dashboards;
- generated screenshots and OCR-region truth;
- controlled browser tasks and expected safe actions.

Every case must be marked synthetic at the case and field level. Synthetic secrets must be nonfunctional, clearly tied to test-only namespaces where possible, and never copied from real accounts.

### Owner decision recorded

The owner approved synthetic and controlled non-personal data for training, validation, frozen evaluation, and demos, with lineage separation. Personal real-data collection is deferred. The corpus must vary generator, template, site/category, identity fixture, task, capture session, DOM, and visual layout.

The following remain protocol details:

- the acceptable synthetic-to-controlled-real mix;
- whether the same generator family may appear across roles;
- whether synthetic data may support final claims and under what source separation.

No percentage, minimum count, or diversity threshold is selected here.

## Controlled-real data

Any real or controlled-real proposal requires documented consent or public-source justification, purpose limitation, minimization, access control, encryption, retention, deletion, withdrawal handling, license/provenance, and exclusion from public Git history. Real credentials, cookies, tokens, private accounts, and personal browser profiles are prohibited.

## Required negatives and uncertainty cases

Each approved category should include non-sensitive lookalikes, public-context identifiers, partially visible values, OCR failures, source disagreement, unsupported content, empty states, and ambiguous cases. Ambiguity labels must preserve the disagreement rather than force a sensitive/non-sensitive answer before the owner policy exists.

## Role and release gates

A corpus release cannot receive a training, validation, frozen-evaluation, or demo role until it has:

- approved intended use and rights;
- an approved taxonomy and annotation version;
- complete lineage/grouping identifiers;
- contamination audit results under the approved policy;
- a case manifest and integrity hashes;
- explicit role assignment and access controls;
- documented exclusions and known coverage gaps.

## Open owner choices

The approved first scope is Chrome/Windows with the listed page categories and no personal real data. Exact versions, languages, capture distributions, sample counts, and release manifests remain benchmark-design work.
