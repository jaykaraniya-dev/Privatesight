# Browser Capture Protocol

Date: 2026-10-04
Status: `SPECIFIED`; no Prompt 6 capture run was performed.

## Scope

Phase 1 capture targets Chrome desktop on the reference Windows class. Firefox capture is staged. Playwright may drive deterministic controlled pages and preserve test artifacts; extension capture APIs are a separate capability and must be evaluated independently before they are used to claim product behavior.

## Current documentation boundary

- Context7 Playwright `/microsoft/playwright/v1.63.0` documents page screenshots, locator interactions/assertions, page URL/title state, and trace/snapshot inspection. These support deterministic capture tooling but do not prove extension capture behavior.
- Current Chrome Tabs documentation defines `chrome.tabs.captureVisibleTab()` for the active tab's visible area and requires `activeTab` or `<all_urls>`; it also documents a maximum capture rate of two calls per second. Permissions and restricted-page behavior must be represented in the capability record.
- Current MDN WebExtensions documentation defines `tabs.captureVisibleTab()` as a Promise returning a data URL for the active tab's visible area and records Firefox permission/version differences. Firefox remains Phase 2.

These API facts are capability evidence only. Capture correctness, latency, and parity require experiments.

## Capture sequence

1. Validate case manifest, rights status, synthetic/non-personal status, and expected browser state.
2. Start the declared browser/profile with network, cache, viewport, display scale, locale, theme, and zoom controls recorded.
3. Load the local/controlled case and wait on a case-defined readiness predicate rather than an arbitrary delay.
4. Record page URL/origin class, title, browser/version, OS/build, viewport, device-pixel ratio, zoom, scroll position, theme, locale, and timestamp.
5. Capture the screenshot or ordered frames for the declared state.
6. Capture the DOM representation and element geometry locally.
7. Capture the approved semantic/accessibility representation and acquisition method; do not label a partial Playwright accessibility-oriented snapshot as a complete OS accessibility tree.
8. Preserve OCR input; later run the registered OCR candidate and store text, word/line coordinates, confidence if supplied, engine/version/configuration, and duration.
9. Record task state, action target, expected action, and expected outcome.
10. Compute artifact hashes and write the alignment/capture manifest.
11. Run capture validation; failed or mismatched captures are retried only under a new capture ID.

## Required artifacts

| Artifact | Minimum metadata | Validity condition |
| --- | --- | --- |
| Screenshot/frame | pixel dimensions, DPR, viewport, scroll, format, hash | Represents declared state without unintended private content |
| DOM snapshot | acquisition method, document/frame ID, hash | Corresponds to the same state and capture session |
| Semantic/accessibility representation | API/method, scope/depth, node references, hash | Scope and omissions are declared |
| OCR record | engine/version/config, input hash, geometry system, duration | Input is the captured image; coordinates transform to screenshot space |
| Page/browser metadata | URL class, title, browser/version, profile class, OS/display metadata | Exact run environment is reproducible |
| Task state | task ID, preconditions, requested action, target, expected outcome | References valid artifacts/nodes/regions |
| Alignment record | coordinate transforms and cross-artifact links | Sampled points and bounds validate across modalities |

## Frames and restricted content

- Each frame receives a frame ID, origin class, access status, bounds, and parent relation.
- Safe reproducible cross-origin fixtures may be captured only when source and permission behavior are controlled.
- Inaccessible frames are labeled unsupported; their content is not inferred from the surrounding DOM.
- Shadow roots, canvas, and PDFs require an explicit acquisition result and cannot be assumed covered by ordinary DOM capture.
- Privileged/browser-internal pages remain deferred under D-04.

## Dynamic cases

Dynamic UI is captured as ordered state checkpoints with a shared case ID and distinct state/capture IDs. Each checkpoint defines a readiness predicate and expected differences. Animation or nondeterministic content is disabled or versioned when possible; otherwise the case is exploratory and cannot enter frozen evaluation until stabilized.

## Capture privacy

Capture runs use a dedicated clean profile and controlled fixtures. Raw case artifacts remain local. Logs, traces, screenshots, DOM, semantic snapshots, OCR, errors, and debug output are all treated as potentially sensitive and cannot be uploaded or emitted through an uncontrolled tool channel.

## Capture acceptance

A capture is accepted only when every required artifact is present or explicitly unavailable, hashes match, state predicates pass, screenshot/DOM/OCR coordinate systems align, metadata is complete, and no uncontrolled personal data appears. A screenshot-only record is rejected.
