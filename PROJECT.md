# PrivateSight

## Status
Prompt 1 authoritative intake through Prompt 6 controlled experimental-readiness planning are complete. Prompt 7 has implemented and qualified a bounded 12-case synthetic pilot corpus, aligned Chrome capture, annotations and QA, contamination/split machinery, fixture benchmark harness, privacy canaries, outbound observation for declared channels, and a reference-environment fingerprint as of 2026-10-04.

No production product feature, final architecture, final model/runtime/OCR choice, training run, raw-dataset merge, official frozen evaluation set, or deployment has been authorized or completed. Prompt 7 outputs are test infrastructure and qualification fixtures; their measurements are internal and must not be presented as official SIH results.

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
The repository now contains Prompt 7 qualification infrastructure under `src/pilot/`, source fixtures under `pilot/`, layered tests, and ignored runtime outputs under `artifacts/pilot/`. It still contains no production browser extension, detector, OCR engine, redaction pipeline, model, or action planner. The workspace is a Git checkout on `main`, with verified checkpoint `3544fa1` and remote `https://github.com/jaykaraniya-dev/Privatesight.git` supplied by the owner. Playwright MCP was runtime verified first through Chrome Profile 8 against TodoMVC and again against a controlled synthetic auth case; both claims remain bounded tool/capture evidence.

All 11 folders under `datasets/raw/` remain candidates. The local audit found text-only NER, span, and sanitization resources. None contains browser screenshots, visual boxes or masks, DOM/accessibility captures, or action traces. The collection therefore cannot establish the SIH visual/browser requirements. See `docs/dataset-strategy.md` and `datasets/dataset-registry.csv`.

## Canonical project documents
- Problem and scope: `docs/problem-definition.md`
- Requirements and traceability: `docs/requirements.md`
- Evaluation: `docs/evaluation-metrics.md`
- Owner decisions: `docs/owner-decision-gate.md`, `docs/owner-question-pack.md`
- Corpus and annotation: `docs/visual-browser-corpus-spec.md`, `docs/visual-annotation-protocol.md`
- Benchmark protocol: `docs/sih-evaluation-protocol.md`, `docs/evaluation-platform-matrix.md`, `docs/benchmark-design.md`
- Experimental readiness: `docs/prompt6-experimental-plan.md`, `docs/corpus-work-packages.md`, `docs/benchmark-harness-spec.md`, `docs/experiment-matrix.md`, `docs/acceptance-gates.md`, `docs/stop-conditions.md`
- Pilot implementation and evidence: `docs/prompt7-implementation-plan.md`, `docs/pilot-corpus-spec.md`, `docs/pilot-capture-report.md`, `docs/pilot-annotation-qa.md`, `docs/pilot-benchmark-report.md`, `docs/privacy-canary-report.md`, `docs/reference-environment.md`, `docs/prompt7-evidence.md`
- Contamination governance: `docs/contamination-policy.md`
- Decision dependencies: `docs/decision-dependency-graph.md`
- Reference evidence: `docs/research.md`
- Dataset intake: `docs/dataset-strategy.md`
- Privacy and project risks: `docs/risk-register.md`
- Assumptions and unknowns: `docs/assumptions.md`, `docs/open-questions.md`
- Source hierarchy and tools: `docs/source-of-truth.md`, `docs/tooling-and-knowledge-architecture.md`
- Audit history: `docs/repository-audit.md`

## Next gate
Bounded candidate model/runtime experiments may begin against the qualified non-frozen pilot fixtures when their dependencies and outbound paths are added to the same test, environment, and privacy-observation controls. They cannot justify final selection. Broader OCR/visual evidence, contamination calibration, candidate-channel observation, and a separately governed frozen evaluation set are required before final comparison or selection claims.

