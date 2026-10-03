# Prompt 2 Evidence, Research, and Technical-Gap Gate

**Date:** 2026-10-03  
**Status:** Research gate complete; no architecture, model, training, or product implementation selected.

## Scope and evidence labels

- **FACT:** directly supported by an official or primary source.
- **INFERENCE:** a technical interpretation of one or more facts.
- **OPEN QUESTION:** not established by the available evidence.
- **PRACTICAL RECOMMENDATION:** an engineering option requiring owner approval.

The official SIH problem text and five weights remain authoritative. Public mirrors are used only to check whether additional protocol details are visible; they do not replace the supplied source.

## SIH protocol finding

The supplied SIH material defines five weighted dimensions but does not define formulas, annotation rules, test-case count, target hardware, browser versions, aggregation, or thresholds. A public community-maintained mirror reproduces the problem statement and adds a metadata note that open-source data may be used and evaluation use cases may be provided at the finale. That mirror is **secondary and unverified**, so it is not treated as a confirmed judging rule.

**Consequence:** PrivateSight must maintain a reproducible internal protocol, but no internal formula or threshold may be represented as an SIH requirement until an authoritative rubric is supplied.

Source: [community-maintained SIH26171 mirror](https://sih2026.vuce.in/en/ps/SIH26171) (secondary; not official SIH authority).

## Metric evidence matrix

| SIH dimension | Confirmed fact | Bounded measurable options | Required evidence/annotations | Main error sources | Status |
| --- | --- | --- | --- | --- | --- |
| Visual-context accuracy (25%) | The system must read current screen context locally. | Separate screen-state predicate accuracy, UI-element localization, OCR interpretation, and task-relevant context completeness. A grounding task can use point-in-box or box overlap; a state task can use exact or partial predicate match. | Frozen screenshots plus task instructions, relevant regions/elements, state predicates, and expected action targets. | Resolution/zoom, responsive layout, animation, hidden state, OCR errors, DOM/screenshot disagreement, evaluator subjectivity. | Official outcome; formulation proposed only. |
| Sensitive/PII precision and recall (20%) | The SIH criterion explicitly names precision and recall for sensitive/PII detection. | Score separately by modality: text span, OCR span, visual region/box, and semantic entity. Use a documented matching rule and report micro/macro/per-label results. | Gold taxonomy, spans or regions, negative cases, modality labels, and whether overlapping/nested entities are allowed. | Ambiguous sensitivity, entity-boundary disagreement, OCR errors, duplicate evidence across modalities, class imbalance. | Official metric family; unit and matching unresolved. |
| Redaction precision (20%) | Dynamic local redaction is required and redaction precision is weighted. | Report at least protected-region coverage and collateral-redaction rate; add residual OCR/text leakage checks. IoU or pixel masks are candidate measures, not official formulas. | Raw/sanitized pairs, gold masks/boxes/spans, permitted utility regions, and residual-leakage probes. | Anti-aliasing, blur reversibility, readable context loss, small text, overlapping masks, screenshot compression. | Official outcome; two-sided formulation proposed only. |
| Client resource utilization (20%) | Client-side resource use is weighted. | Measure model/package size, cold initialization, peak and steady RAM, CPU time/utilization, GPU use/memory where available, and battery/energy only if a target device exposes it. Report extension overhead relative to a baseline browser session. | Fixed browser/device/software versions, warm/cold state, workload duration, sampling interval, and baseline. | Thermal throttling, background tabs, driver differences, profiler overhead, browser process attribution, WebGPU availability. | Official outcome; resource vector and protocol unresolved. |
| End-to-end task latency (15%) | Overall latency of the provided task is weighted. | Define a trace from user request/capture through local detection, sanitization, gate decision, network, server response, validation, and browser execution. Report component timings plus p50/p95/p99 and failures. | Frozen tasks, start/end event definitions, warm/cold runs, network/server conditions, timeout policy, and synchronized trace IDs. | Cache state, server queueing, network variance, retries, model initialization, page load/animation, measurement instrumentation. | Official outcome; boundary and aggregation unresolved. |

### Proposed measurement boundary

**INFERENCE / PRACTICAL RECOMMENDATION:** for comparability, report each component separately and define one end-to-end trace. A defensible candidate is `user request accepted` to `validated browser action committed`, with an alternate local-only trace from `capture requested` to `sanitized payload ready`. These are proposals, not SIH definitions.

## Browser and extension capability evidence

**Verification limitation:** this session exposed no callable Playwright MCP browser-control tool. Therefore the points below are documentation facts, not live Chrome/Firefox behavior measurements. A safe-profile Playwright verification remains a Prompt 3 entry condition.

### Screen capture

- **FACT:** Chrome `tabs.captureVisibleTab()` captures the active tab and requires `activeTab` or `<all_urls>`; Chrome documents a maximum of two calls per second and describes the method as expensive. Source: [Chrome tabs API](https://developer.chrome.com/docs/extensions/reference/api/tabs).
- **FACT:** Firefox `browser.tabs.captureVisibleTab()` returns a data URL and requires the same permission family. Firefox versions before 126 had a stricter `<all_urls>` requirement. Source: [MDN captureVisibleTab](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/tabs/captureVisibleTab).
- **INFERENCE:** capture permission, capture frequency, and browser-specific restricted pages must be explicit benchmark variables. A DOM-only design cannot cover pixels in canvas, images, or video.

### DOM and semantic observation

- **FACT:** Chrome and Firefox content scripts can read/modify page content only under matching host access; content scripts have limited extension APIs and communicate with background/service-worker contexts through messaging. Sources: [Chrome messaging](https://developer.chrome.com/docs/extensions/develop/concepts/messaging) and [MDN content scripts](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Content_scripts).
- **FACT:** Chrome `scripting.executeScript()` requires `scripting` plus host permissions or `activeTab`; it can target the main frame, all frames, or selected frames. Source: [Chrome scripting API](https://developer.chrome.com/docs/extensions/reference/api/scripting).
- **INFERENCE:** same-origin and cross-origin frames, restricted browser pages, PDF viewers, shadow DOM, and dynamic SPAs must be separate coverage cases. DOM and screenshot observations cannot be assumed equivalent.

### Permissions and privacy implications

- **FACT:** Chrome permissions and host permissions govern access to tabs, script injection, cross-origin fetch, and request APIs; optional permissions can reduce initial access. Source: [Chrome permission declaration](https://developer.chrome.com/docs/extensions/develop/concepts/declare-permissions).
- **FACT:** Chrome extension pages are constrained by a minimum content-security policy, and Manifest V3 disallows remotely hosted extension code. Sources: [Chrome extension CSP](https://developer.chrome.com/docs/extensions/reference/manifest/content-security-policy) and [Manifest V3](https://developer.chrome.com/docs/extensions/develop/migrate/what-is-mv3).
- **INFERENCE:** permissions and CSP reduce exposure but do not, by themselves, prove that raw data cannot reach a server. Gate evidence still needs outbound instrumentation for extension fetch, page messaging, logs, errors, telemetry, and any native or server bridge.

## Local runtime capability evidence

- **FACT:** ONNX Runtime Web exposes WebAssembly, WebGL, WebGPU, and WebNN execution paths, but accelerated providers support only subsets of operators. Source: [ONNX Runtime Web tutorial](https://onnxruntime.ai/docs/tutorials/web/).
- **FACT:** ONNX Runtime's current browser table lists WebAssembly for Chrome/Edge, Safari, and Firefox, while WebGPU is listed for Chromium-based browsers and not Firefox; its notes include version-dependent Chromium requirements. Source: [ONNX Runtime Web setup](https://onnxruntime.ai/docs/get-started/with-javascript/web.html).
- **FACT:** Transformers.js documents browser WebGPU execution but notes that Firefox may require a feature flag and that browser support varies. Source: [Transformers.js WebGPU guide](https://huggingface.co/docs/transformers.js/guides/webgpu).
- **INFERENCE:** a cross-browser client needs a tested CPU/WASM fallback path if Firefox is in scope. WebGPU availability cannot be used as a project-wide assumption.
- **OPEN QUESTION:** exact browser versions, hardware classes, model formats, operators, quantization, and fallback behavior remain unapproved.

These sources establish runtime capability only. They do not justify a named model or final architecture.

## Visual/browser benchmark evidence

| Resource | What it measures | Relevance | Limitation for PrivateSight | Current disposition |
| --- | --- | --- | --- | --- |
| [ScreenSpot paper](https://aclanthology.org/2024.acl-long.505/) | Screenshot-based GUI grounding across mobile, desktop, and web interfaces. | Useful precedent for screen-region/action-target annotations. | Does not evaluate PII detection, redaction, privacy leakage, or browser extension behavior. | Research reference; license and release contents require review before use. |
| [ScreenSpot-Pro](https://arxiv.org/abs/2504.07981) and [official repository](https://github.com/likaixin2000/ScreenSpot-Pro-GUI-Grounding) | High-resolution GUI grounding with human-annotated target boxes. | Useful for high-resolution localization stress cases. | Professional desktop domains; not a privacy/redaction benchmark and not necessarily browser-focused. | Candidate external evaluation reference; rights and fit unresolved. |
| [WebArena](https://webarena.dev/) and [repository](https://github.com/web-arena-x/webarena) | Reproducible web tasks and functional task completion. | Useful for browser workflow/task-state validation; repository is Apache-2.0. | Does not provide PrivateSight visual PII masks or a privacy gate; environment setup and third-party site content require separate review. | Candidate environment/reference, not an approved dataset. |
| [BrowserGym](https://github.com/ServiceNow/BrowserGym) | Unified framework wrapping multiple browser-agent benchmarks. | Useful for task/action-space research and repeatability. | Framework is not a PII/redaction corpus and is explicitly not a consumer product. | Research reference only. |

**PRACTICAL RECOMMENDATION:** create a small, synthetic, locally generated benchmark of browser pages with paired DOM/accessibility trees, screenshots, text/OCR spans, visual boxes/masks, task instructions, and expected safe actions. Keep it separate from model-selection and final evaluation until split and contamination rules are approved.

## Public competitor evidence

Current public SIH26171 repositories show that other teams are exploring hybrid DOM/visual redaction and structured actions. They are useful for competitor awareness, not proof of performance or security. Examples include [NAYAN](https://github.com/Rohinth-S/NAYAN), [V.E.I.L](https://github.com/Krissh360/V.E.I.L), and [SIH26171 Privacy Browser Agent](https://github.com/111shivamrai/SIH26171-Privacy-Browser-Agent). Their claims require code, network, license, and reproducibility review before being treated as evidence.

## Data gap determination

The 11 local candidates remain text-focused. None provides the required combination of screenshot pixels, visual PII boxes/masks, DOM/accessibility alignment, browser actions, and privacy-leakage probes. Existing text datasets can support a future text-only experiment only after license and split approval; they cannot establish the visual/browser requirement.

## Privacy and security research boundary

The required invariant remains:

`raw context -> local detection -> local sanitization -> privacy gate -> sanitized context only`

The evidence standard must include:

1. Synthetic secrets in DOM text, rendered pixels, accessibility output, canvas/image content, credentials, tokens, and metadata.
2. Instrumented checks for extension fetch/XHR, page-to-extension messages, server requests, logs, telemetry, errors, caches, WebSockets, and native bridges where applicable.
3. Byte-level assertions over every outbound request and negative tests for detector/sanitizer/gate failure.
4. Separate utility checks showing that sanitized context still supports the approved task.

**OPEN QUESTION:** the threat actor, server/provider trust, retention, regional processing, and fail-closed policy still require owner decisions.

## Prompt 3 entry gate

Before architecture or model selection, Prompt 3 must receive owner decisions or evidence for:

- the SIH metric protocol or explicit internal decision requests for each missing definition;
- target browsers, versions, OS/hardware classes, and parity expectations;
- the threat model, protected-data taxonomy, outbound schema, failure policy, and action-risk policy;
- the approved visual/browser benchmark or a permitted synthetic-data plan;
- dataset license decisions and contamination controls;
- capability-level comparison criteria for local vision, OCR, semantic extraction, redaction, and runtime fallback;
- a verified Playwright browser connection and a safe test profile.

