# Architecture Constraints

Status: Prompt 1 defines required boundaries and capabilities. No final topology, model, runtime, API, or deployment has been selected.

## Required trust boundary
`raw local context -> local detection -> local sanitization/redaction -> privacy gate -> sanitized-only outbound context`

The gate must cover every component that can transmit data, not only the primary model request. Protected inputs include applicable raw pixels, screenshots, video frames, DOM/accessibility text, form values, credentials, tokens, account details, faces and other identifiers, sensitive page content, browser state, and derived data that preserves protected values.

## Required end-to-end roles
- Browser client/extension observes the screen and relevant browser context.
- A local ViT or equivalent vision component evaluates the current screen.
- Local detection and sanitization run before any external request containing context.
- A server-side LLM/VLM processes sanitized context and returns processed data or an action.
- The client validates and executes permitted actions.
- Chrome and Firefox must be considered.

This is a role decomposition from the source material, not a selected component architecture.

## Evidence needed for the privacy claim
A later implementation must provide:
- an explicit outbound data schema and inventory of every network-capable path;
- instrumented capture of requests, WebSockets, telemetry, logs, errors, and extension/service-worker traffic;
- synthetic canary values placed in pixels, form fields, DOM, accessibility text, metadata, and browser state;
- negative tests showing canaries cannot appear beyond the gate;
- failure-path evidence for unsupported pages, detector uncertainty, sanitizer errors, network errors, and malformed server responses;
- server-side evidence that only the allowed sanitized representation was received and retained;
- artifact review showing tests, screenshots, traces, and logs do not retain private data.

The exact protocol requires threat-model approval. An architecture diagram or UI counter is not security evidence.

## Options left open
- DOM/accessibility fusion, OCR, rules, text PII models, visual detectors, segmentation, and multimodal components.
- WebGPU, WebAssembly, ONNX Runtime Web, Transformers.js, workers, or other local runtimes.
- Screenshot, crop, structure, semantic-token, or mixed sanitized representations.
- Server model and hosting choice within the supplied open/open-weights permission.
- Extension manifest design, permissions, storage, telemetry, action schema, confirmation policy, and browser-specific execution APIs.

## Model-selection guardrail
“ViT or equivalent” does not imply `google/vit-base-patch16-224` or any named checkpoint. Candidate models must be evaluated against screenshot understanding, localization, PII-region detection, redaction support, browser-state utility, client resources, and latency. Image-classification accuracy alone cannot satisfy the requirement.

