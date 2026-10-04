# Open Questions After Prompt 5 Decision Specification

Prompt 3 translated Prompt 2 evidence into candidate architectures and explicit decision boundaries. The following list is the continuing evidence backlog. Items resolved by D-01 through D-12 are retained with their disposition so they are not mistaken for unanswered owner questions.

`owner-question-pack.md` was the canonical minimum question set for the owner response. The response is now recorded in `owner-decision-gate.md`; the longer list below remains the evidence backlog and must not be treated as a second decision form. Decision IDs D-01 through D-12 are defined there.

## Official evaluation protocol
1. Is there a complete SIH26171 source page or rubric that defines metric formulas, scoring ranges, aggregation, tie-breaking, or minimum acceptance?
2. What task set and ground truth define “accuracy of visual context from screen”?
3. How does SIH score PII precision/recall across text spans, OCR spans, boxes, masks, and contextual sensitivity?
4. What does “precision of redaction” measure, and how are missed leakage and excessive redaction handled?
5. Which client resources count, on what device/browser, and over what sampling window?
6. What are the start and end events for end-to-end latency, and which network/server conditions apply?

## Users and browser workflows
7. Which end users and domains are in the initial scope?
8. Which concrete browser tasks must the final demo perform? Are form filling, Meet/video masking, click, and scroll required or only examples?
9. Which Chrome and Firefox versions, operating systems, hardware classes, and extension stores/packages are required?
10. Is feature parity required across Chrome and Firefox?
11. Which page types must work: ordinary DOM, canvas, video, PDF viewer, shadow DOM, cross-origin frames, authenticated apps, and single-page applications?

## Privacy and security
12. What threat model covers hostile pages, page scripts, extension components, compromised server responses, logs, telemetry, caches, and the model provider?
13. Which data classes and contextual rules define protected information?
14. What exact fields may cross the gate, and may coordinates, layout, hashes, OCR text, semantic labels, or cropped regions leave the device?
15. Must the client fail closed on detector uncertainty, sanitizer failure, unsupported page content, or network errors?
16. What evidence standard will establish that raw context cannot bypass the gate?
17. What retention, logging, regional-processing, and deletion terms apply to the server or cloud provider?
18. Which actions require confirmation, and what local policy governs allow, deny, stale targets, and recovery?

## Visual and ML evidence
19. Which capabilities must the local vision model itself perform versus OCR, rules, DOM/accessibility logic, or other local models?
20. Is face detection mandatory, and which other visual identifiers or sensitive objects are required?
21. Is OCR mandatory, and which languages, scripts, fonts, zoom levels, and rendering conditions are in scope?
22. What screenshot/window/tab capture APIs and permissions are acceptable?
23. What local model size, memory, CPU/GPU, energy, and latency budgets apply?
24. Which permitted visual/browser datasets or generation methods can supply screenshot, box/mask, DOM, accessibility, and action ground truth?

## Dataset approval
25. What use category applies to the project: academic competition only, open-source release, later commercial use, or another status?
26. Who approves dataset licenses and the conflicting Ai4Privacy 500k terms?
27. Which PII languages and label taxonomy are mandatory?
28. May the Russian benchmark be frozen as a text-only evaluation subset?
29. Should non-commercial candidates be excluded now to preserve future deployment options?
30. What checks are required for synthetic-generation memorization, template leakage, near duplicates, and real-data domain shift?

## Connected sources and delivery
31. Is there an actual PrivateSight Notion space, Drive folder, or Figma file that should be linked? The GitHub repository is now identified as `https://github.com/jaykaraniya-dev/Privatesight.git`.
32. What is the final SIH submission date, demo environment, pitch duration, and acceptance owner?
34. Should the local competitor video be treated as the supplied YouTube reference despite the unverified URL-to-file linkage?

## Prompt 4 dataset and evidence decision dispositions

35. **Resolved by D-01:** SIH/demo, academic research, internal development, rights-cleared training, and public methodology/sanitized metadata are allowed; uncleared redistribution/commercial use remains blocked.
36. **Authority resolved by D-01; case-specific evidence remains:** the owner may approve only clearly permitted project-policy use; institutional/legal or licensor clarification handles unclear terms.
37. **Resolved in principle by D-02/D-03:** the working taxonomy and fail-closed categories are approved; exact context predicates remain versioned benchmark/policy work.
38. **Staged by D-04/D-11/D-12:** Phase 1 is Chrome desktop on the reference Windows/device class; exact versions and measured condition coverage remain execution evidence.
39. **Resolved in principle by D-06:** multimodal annotation, independent evaluation review, adjudication, versioning, and ambiguity labels are approved; operational schema/version and measured QA remain work.
40. **Resolved in principle by D-07:** owner custody, named backup, protected labels, immutable versioning, and invalidation rules are approved; the names/access list are recorded at freeze.
41. **Methods/actions resolved by D-08; thresholds remain benchmark-dependent:** calibration and audit-version details must be fixed before role assignment/freeze.
42. **Resolved by D-05:** synthetic and controlled non-personal data are sufficient for the initial gate; personal real-data collection is deferred.

## Prompt 2 disposition

Prompt 2 did not invent SIH formulas or thresholds. It established proposed measurement options, documented their annotation needs and error sources, and recorded current browser/runtime constraints in [`prompt2-evidence.md`](prompt2-evidence.md).

## Prompt 3 disposition

Prompt 3 produced architecture candidates and technology comparisons without selecting a model, runtime, browser support matrix, or topology. See `system-architecture.md`, `architecture-options.md`, `browser-architecture.md`, `privacy-architecture.md`, `observation-architecture.md`, `inference-runtime-analysis.md`, `action-validation.md`, and `architecture-decisions.md`.

## Resolved checkpoint

The Playwright MCP connection was runtime verified on 2026-10-04 through Chrome Profile 8 using TodoMVC. See `human-verification.md`. This closes the tool-connectivity question only; Firefox, PrivateSight extension behavior, privacy containment, and performance remain unverified.

## Next decision gate

Prompt 6 may proceed using the owner-approved scope. Remaining questions are exact dataset clearances and role assignments, operational contamination thresholds, internal aggregation/run-validity details, exact browser/OS/hardware/runtime versions, and official SIH definitions. Architecture/runtime/model choices remain benchmark-dependent.

