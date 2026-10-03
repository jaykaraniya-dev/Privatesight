# Risk Register

Likelihood is a qualitative Prompt 1 assessment, not a measured probability.

| ID | Risk | Impact | Likelihood | Required mitigation or evidence | Status |
| --- | --- | --- | --- | --- | --- |
| R-001 | Candidate license or provenance conflicts with intended use | High | High | Resolve custom, non-commercial, Reuters, NVIDIA, and conflicting Ai4Privacy terms before assignment. | Open |
| R-002 | Train/validation/final-evaluation contamination through shared sources, templates, identities, or derived views | High | High | Freeze final data early; perform exact, near-duplicate, template, generator, and lineage checks. | Open |
| R-003 | False negatives leak sensitive information | Critical | Unknown | Define threat model and taxonomy; test every modality and fail path with synthetic secrets. | Open |
| R-004 | False positives remove task-critical context and break usability | High | Unknown | Define over-redaction protocol and inspect errors per class and workflow. | Open |
| R-005 | Raw context bypasses the privacy gate through a secondary egress path | Critical | Unknown | Gate all network-capable paths; inspect requests, logs, telemetry, errors, caches, and derived payloads. | Open |
| R-006 | No visual/browser dataset supports the central SIH requirements | Critical | Confirmed | Find a permitted source or approve a synthetic browser-page and annotation plan before model selection. | Open |
| R-007 | A generic ViT is selected despite lacking localization, OCR, or interaction capability | High | Medium | Compare candidates against the separated capability matrix; keep model choice open. | Open |
| R-008 | Undefined SIH metric formulas or thresholds lead to invalid optimization claims | High | High | Obtain the rubric or seek owner decisions; never infer scoring formulas from weights. | Open |
| R-009 | Chrome and Firefox capture, permissions, WebGPU, and execution behavior diverge | High | High | Define browser/version matrix and verify behavior in both families before claiming support. | Open |
| R-010 | Returned actions are unsafe, stale, ambiguous, or hallucinated | Critical | Unknown | Define a local action schema, target checks, risk classes, confirmation, and failure behavior. | Open |
| R-011 | Hostile page content manipulates observations or model instructions | Critical | Unknown | Include prompt-injection and untrusted-content boundaries in the threat model and validation plan. | Open |
| R-012 | Server or provider retention/logging undermines the privacy claim | Critical | Unknown | Define provider, deployment, retention, logging, and deletion contracts before integration. | Open |
| R-013 | Competitor marketing claims are mistaken for verified architecture or performance | Medium | Medium | Keep all competitor technology and performance statements attributed until code or measurements exist. | Open |
| R-014 | Test, demo, screenshot, or trace artifacts retain PII | High | Medium | Use synthetic fixtures; scrub artifacts; restrict retention; review captured video and screenshots. | Open |
| R-015 | Missing Git metadata prevents history, remote, and change-state verification | Medium | Confirmed historically | Git checkout, `main`, checkpoint `3544fa1`, and the owner-supplied remote are now present. | Closed 2026-10-04 |
| R-016 | Playwright MCP extension configuration is mistaken for a verified browser connection | Medium | Confirmed historically | Runtime verification passed through Chrome Profile 8; preserve the bounded evidence and limitations in `human-verification.md`. | Mitigated for connectivity only |
| R-017 | No identified Notion, Drive, or Figma project source causes fragmented planning | Medium | Confirmed | Link only verified project spaces; keep repository canonical meanwhile. GitHub is now identified. | Open |
| R-018 | Floating `latest` dependencies reduce reproducibility | Medium | Confirmed | Pin versions during implementation planning after runtime choices are made. | Open |
| R-019 | Synthetic text performance does not transfer to real rendered browser content | High | High | Add real-world-like, rights-cleared visual/browser evaluation and domain-shift analysis. | Open |
| R-020 | Sanitized layout still reveals identity or removes information needed for reasoning | Critical | Unknown | Evaluate residual identification risk and task utility together on paired cases. | Open |
| R-021 | WebGPU availability and operator support differ across Chrome, Firefox, OS, and hardware | High | Confirmed | Require a tested WASM fallback and record browser/device/runtime versions before comparison. | Open |
| R-022 | Capture, DOM access, script injection, and cross-origin frames use different permissions and failure modes | High | Confirmed | Build a browser capability matrix and test restricted pages, frames, canvas, and dynamic navigation separately. | Open |
| R-023 | Public browser-agent benchmarks measure grounding or task completion but not PII redaction or privacy leakage | High | Confirmed | Use them only as references and approve a separate synthetic visual/privacy benchmark. | Open |
| R-024 | No authoritative SIH scoring protocol beyond the five weighted dimensions is available | High | Confirmed | Preserve proposed formulas as decision requests; do not claim thresholds or combined scores. | Open |
| R-025 | Extension lifecycle differences cause loss of transient state or unguarded retry behavior | High | Confirmed | Design for non-persistent coordinator behavior; test Chrome/Firefox lifecycle and state recovery after scope approval. | Open |
| R-026 | Partial cross-origin frame access yields inconsistent observation or action behavior | High | Confirmed | Define frame policy and test per browser before support claim. | Open |
| R-027 | A local detector/sanitizer fails open under timeout, error, or unsupported content | Critical | Unknown | Owner must approve failure policy; later test every failure path with synthetic canaries. | Open |
| R-028 | In-app browser evidence is mistaken for Playwright MCP extension verification | Medium | Confirmed historically | Chrome Profile 8 produced actual Playwright MCP evidence; keep it distinct from in-app browser observations. | Closed 2026-10-04 |
| R-029 | A candidate is used under incompatible or unreviewed license/provenance terms | High | High | Treat all 11 as unapproved; require authoritative license/version and intended-use review before assignment. | Open |
| R-030 | Text-only candidates are treated as evidence for visual/browser PII performance | Critical | High | Require paired screenshot/DOM/OCR/region/action data and a frozen visual/browser evaluation set. | Open |
| R-031 | Synthetic templates, identities, or render variants cross development and evaluation roles | High | High | Split by source/template/generator/identity/site/task/capture family before augmentation and run multimodal similarity checks. | Open |

