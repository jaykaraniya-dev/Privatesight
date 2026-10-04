# Owner Question Pack

These were the minimum project-owner answers needed before Prompt 6 could turn the specifications into a bounded corpus and benchmark work plan. The owner response sheet is now recorded in `owner-decision-gate.md`; this document remains the question trace and answer template. Neutral options are retained for future scope changes.

When answering, the owner may mark an item **approve**, **revise**, **defer**, or **seek authoritative/legal evidence**.

## 1. Project use and licensing authority — D-01

Which uses are allowed now, prohibited now, or deferred: SIH submission/demo, academic research, internal development, public GitHub documentation, model training, derived-data redistribution, and commercial use?

Who must approve a dataset whose license or provenance is unclear: the project owner, an institutional/legal reviewer, SIH organizers, or another named authority? Choosing a narrower current scope reduces immediate rights questions but does not establish permission for later uses.

## 2. PII taxonomy — D-02

Do you approve the proposed categories in `pii-taxonomy.md` as the working annotation taxonomy, or which categories should be added, removed, merged, or separated?

Specify whether the same content can receive different sensitivity treatment when it is public, authenticated/user-visible, private, credential-bearing, or security-sensitive.

## 3. Fail-closed and ambiguous-content policy — D-03

For each category or context, choose the default outcome when detection is positive or uncertain: block the whole release, redact and release, allow a safe derived label only, require user review, or reject the operation.

Explicitly decide the treatment of uncertain names, account state, faces, QR/barcodes, document images, private notifications, private URLs, and biometric-like content. Also classify labels, boxes, masks, OCR text, semantic summaries, account-state indicators, and action targets as permitted, prohibited, or owner-review-required outbound data.

## 4. Visual/browser corpus scope — D-04

Which browsers, page categories, languages, and capture classes must the first corpus include? Choose among Chrome, Firefox, or a staged/parallel scope; and among public pages, forms, login/recovery, account pages, dashboards, payment, messaging, documents, settings, notifications, and error/security prompts.

State whether page-only captures, browser chrome, PDFs, canvas/video, shadow DOM, cross-origin frames, popups/modals, scrolling states, and privileged browser pages are in the initial scope or deferred. A larger scope increases coverage and annotation cost.

## 5. Synthetic and controlled-real data policy — D-05

For each role—training, validation, frozen evaluation, and demo—may it contain synthetic browser cases, controlled non-personal cases, or consented real cases?

Define the required generator/template/site/identity/capture diversity and whether synthetic data may appear in the frozen evaluation. Also decide whether any real-data collection is allowed; if yes, name the consent, access, retention, and deletion authority. No percentage is assumed.

## 6. Annotation protocol — D-06

Which annotation units are mandatory for the first corpus: source text spans, rendered OCR spans, boxes, masks, DOM elements, accessibility nodes, semantic roles, action targets, and expected outcomes?

Who annotates, who adjudicates disagreements, which ambiguity labels are allowed, which quality checks are mandatory, and who may approve an annotation-version change? More detailed masks and multimodal alignment improve localization evidence but cost more to produce and review.

## 7. Frozen-set governance — D-07

Who is the frozen-set custodian, who may access cases and labels, when does the set become immutable, and what event authorizes a new version?

Confirm that leakage, case edits, label exposure to development, role reassignment, or protocol-incompatible changes invalidate affected results, and name who records that decision.

## 8. Contamination policy — D-08

Which checks are mandatory before role assignment: exact/normalized/near text, exact/near image, layout, template, generator, identity, source family, task, and semantic similarity?

Who approves operational thresholds and reviews flagged pairs? For confirmed or suspected overlap, choose the allowed responses: co-group, remove/quarantine, reassign before freeze, or invalidate affected results after freeze.

## 9. SIH metric authority and internal protocol — D-09

Can you provide a newer authoritative SIH rubric that defines formulas, thresholds, aggregation, annotation, hardware, browser versions, latency boundary, or pass/fail rules?

If no such source exists, may the project define a clearly labeled internal evaluation protocol while preserving the five official weights separately? This allows reproducible comparisons without presenting internal formulas as SIH rules.

## 10. Latency boundary — D-10

Which interval should the internal benchmark report as the primary end-to-end measure: local capture through privacy-gate release, outbound request through server response, local action validation through observed result, or the full chain?

May the benchmark report all stage timings plus the chosen primary interval? State whether user/network wait, cold start, model download, retries, and browser execution are included or reported separately.

## 11. Browser and operating-system matrix — D-11

Which exact browser families/channels and operating systems are required for the first benchmark, and which may be deferred?

State whether Chrome and Firefox must be tested in parallel or in stages, and identify any minimum browser versions or compatibility claim the project intends to make.

## 12. Hardware matrix — D-12

Which hardware class is the reference benchmark device, and which additional classes are required: CPU/WASM fallback, integrated-GPU WebGPU, discrete-GPU WebGPU, or a lower-memory device?

Provide or authorize recording the exact CPU, RAM, GPU, driver, power mode, display scale, and runtime metadata. Decide whether comparisons across unmatched devices are allowed or must remain separate.

## Compact answer template

```text
D-01 Project uses / licensing authority:
D-02 Taxonomy changes or approval:
D-03 Fail-closed and outbound-derived-data policy:
D-04 Corpus scope:
D-05 Synthetic/controlled-real policy:
D-06 Annotation protocol:
D-07 Frozen-set governance:
D-08 Contamination policy:
D-09 SIH source or internal-protocol authority:
D-10 Latency boundary:
D-11 Browser/OS matrix:
D-12 Hardware matrix:
Deferred items and named decision authorities:
```
