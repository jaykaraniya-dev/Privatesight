# PrivateSight

## Status
Prompt 1 authoritative intake, Prompt 2 evidence research, and Prompt 3 architecture/technology decision-boundary work are complete as of 2026-10-03. The official problem text and evaluation weights supplied by the user, reference evidence, candidate datasets, current browser/runtime constraints, architecture candidates, and owner decision boundaries have been reconciled.

No product feature, final architecture, final model, training run, dataset merge, or production deployment has been authorized or completed. Prompt 4 may begin only after the owner resolves the required decision set and approves an implementation-planning scope.

## Project definition
PrivateSight is a privacy-preserving browser agent for **SIH26171 - On-device Visual Perception for Light-weight Browser Agents**. It must use local visual perception in the browser, detect sensitive information before network transmission, sanitize that context locally, send only anonymized and unidentifiable context to a server-side LLM/VLM when server reasoning is needed, receive an actionable command, validate it locally, and execute it in the browser.

The official problem requires a local Vision Transformer (ViT) or equivalent computer-vision model. This is a capability requirement, not a model selection. A generic image-classification ViT does not by itself provide screenshot understanding, sensitive-region localization, OCR, redaction masks, browser-state understanding, or action grounding.

## Confirmed prototype scope
- A working client-side browser extension/JavaScript component for popular browsers, with Chrome and Firefox explicitly named.
- Local vision processing that evaluates the current screen state.
- Dynamic local detection and redaction of sensitive or personal visual data before any network request.
- A server component that receives anonymized visual context, uses an LLM/VLM to interpret it, and returns processed data or a browser action.
- Local validation and execution of returned browser actions.
- An end-to-end user-assistance demonstration.
- Balance accuracy against inference latency and client resource use.

WebGPU, WebAssembly, ONNX Runtime Web, Transformers.js, DOM tags, bounding boxes, semantic obfuscation, and specific redaction styles are examples or proposed mechanisms. They are not selected technologies.

## Trust boundary
The required boundary is:

`raw sensitive browser context -> local detection -> local sanitization/redaction -> privacy gate -> sanitized context only may leave the device`

Raw screenshots, sensitive DOM/accessibility text, credentials, tokens, account data, faces or other visual identifiers, form values, sensitive page content, and raw browser state must be treated as protected where present. The eventual implementation must prove that no outbound path, including logs, telemetry, errors, model requests, or derived context, can bypass the gate.

## Evaluation dimensions

| Official dimension | Weight |
| --- | ---: |
| Accuracy of visual context from screen | 25% |
| Recall and precision for sensitive/PII detection | 20% |
| Precision of redaction | 20% |
| Client-side resource utilization | 20% |
| Overall end-to-end task latency | 15% |

The official material supplied no formulas, thresholds, target devices, workloads, or aggregation rules. No pass/fail number may be invented.

## Users and journeys
The authoritative source describes browser users who need agent assistance while their screen may contain sensitive data. Specific market segments and accessibility requirements remain unconfirmed.

The confirmed primary journey is: a user requests assistance, PrivateSight observes relevant browser state locally, detects and sanitizes sensitive context, sends only sanitized context when server reasoning is needed, receives a structured result or action, validates it locally, and executes it. Form interaction, click, and scroll are explicitly illustrated in the supplied problem material. Confirmation rules for consequential actions remain an open product and security decision.

## Repository and data state
The repository remains a scaffold: `src/` contains no product implementation and the only Playwright test is a placeholder against `example.com`. Playwright MCP extension mode is configured but a live browser connection has not been verified. This workspace has no Git metadata and no matching GitHub repository has been identified.

All 11 folders under `datasets/raw/` remain candidates. The local audit found text-only NER, span, and sanitization resources. None contains browser screenshots, visual boxes or masks, DOM/accessibility captures, or action traces. The collection therefore cannot establish the SIH visual/browser requirements. See `docs/dataset-strategy.md` and `datasets/dataset-registry.csv`.

## Canonical project documents
- Problem and scope: `docs/problem-definition.md`
- Requirements and traceability: `docs/requirements.md`
- Evaluation: `docs/evaluation-metrics.md`
- Reference evidence: `docs/research.md`
- Dataset intake: `docs/dataset-strategy.md`
- Privacy and project risks: `docs/risk-register.md`
- Assumptions and unknowns: `docs/assumptions.md`, `docs/open-questions.md`
- Source hierarchy and tools: `docs/source-of-truth.md`, `docs/tooling-and-knowledge-architecture.md`
- Audit history: `docs/repository-audit.md`

## Next gate
Prompt 3 produced architecture candidates, browser/runtime constraints, privacy/action boundaries, and a decision matrix without ranking or selecting a final design. Prompt 4 must obtain or record owner decisions for the metric protocol, threat model/outbound contract, browser/device scope, visual/browser data plan, dataset rights, action policy, and final evaluation criteria before implementation planning or model selection.

