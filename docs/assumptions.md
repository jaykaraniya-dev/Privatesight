# Assumptions and Unsafe Assumptions

## Confirmed facts
- PrivateSight targets SIH26171, “On-device Visual Perception for Light-weight Browser Agents.”
- The required prototype includes a browser client, local vision processing, client-side sensitive-data sanitization, a server-side LLM/VLM loop, and an end-to-end assisted task.
- A local ViT or equivalent vision model is required, but no model or runtime is selected.
- Chrome and Firefox are named browser families.
- The five SIH evaluation weights are confirmed; formulas and thresholds are not.
- All 11 local datasets remain candidates and are text-only for the capabilities that matter here.

## Working assumptions for research only
- “Local” means processing on the user's device inside or alongside the browser; the exact extension, worker, native, and storage boundaries remain open.
- “Sanitized” means a representation from which protected values and identifying visual content have been removed while enough non-sensitive structure remains for the task.
- The server is invoked only when local processing cannot complete the required reasoning.
- The official examples of faces, passwords, and PII indicate expected sensitive-content coverage, while the full taxonomy remains open.
- The user-supplied official text and template are authentic for project intake; an independently hosted SIH source has not been verified.

## Unsafe assumptions
- A generic ViT classifier, ViT-base checkpoint, or one multimodal model can satisfy every visual, OCR, PII, redaction, and action task.
- A model's class prediction provides a redaction location.
- DOM text and CSS state fully represent pixels, canvas, video, PDFs, cross-origin frames, or accessibility content.
- OCR output is complete or safe enough to pass through the gate without independent PII checks.
- A black box, blur, placeholder, or token automatically makes a person or page unidentifiable.
- A sanitized screenshot proves DOM, accessibility, metadata, logs, telemetry, exceptions, caches, and network payloads are sanitized.
- Detector confidence alone is a security control.
- The privacy gate is secure because it appears in a diagram or UI.
- The competitor's “raw PII sent: 0,” latency, resource, TLS, zero-knowledge, or model/runtime claims are verified.
- Any publisher `test` split is independent final evaluation data.
- Synthetic data is automatically accurate, private, license-safe, or representative of real browser pages.
- Dataset folder names, cards, or embedded claims are enough to approve use.
- Text NER results establish visual-region or browser-task performance.
- Chrome and Firefox have identical capture, extension, WebGPU, permission, and debugging behavior.
- Consequential browser actions can execute without a defined local policy and confirmation model.
- Customary metric formulas or thresholds can fill gaps in the SIH rubric.

## Evidence rule
Every future claim must identify one of: official source, user requirement, repository policy, direct observation, measured result, attributed third-party claim, inference, recommendation, or unresolved question.

