# Decisions

Record material project decisions here. This log records Prompt 0 reconciliation decisions; it does not record an architecture or model selection.

## DEC-001 — User-supplied project context supersedes bootstrap placeholders
- **Date:** 2026-10-03
- **Context:** `PROJECT.md` and requirements docs still contained `[USER TO SUPPLY]` placeholders, while the current control prompt provides the identity, dataflow, priorities, weights, and constraints.
- **Decision:** Reconcile project docs to the current user-supplied context and preserve unknown operational details as open questions.
- **Alternatives:** Continue treating bootstrap placeholders as authoritative; rejected by the supplied source-of-truth hierarchy.
- **Tradeoffs:** Current context is usable, while exact SIH source/rubric still needs verification.
- **Evidence:** Current user prompt; see `repository-audit.md`.

## DEC-002 — ViT remains a family-level requirement only
- **Date:** 2026-10-03
- **Context:** User requires a local ViT or equivalent but explicitly prohibits final vision model selection in Prompt 0.
- **Decision:** Document the model-family requirement and capability caveat; defer architecture/model selection.
- **Alternatives:** Interpret ViT as generic ViT-base; rejected because family label alone does not satisfy localization/PII/action requirements.
- **Tradeoffs:** Intake remains open for capability-specific evidence.
- **Evidence:** Current user prompt.

## DEC-003 — Existing datasets remain candidates
- **Date:** 2026-10-03
- **Context:** Registry had an empty row with intended use `training`; user declares all existing datasets candidate-only.
- **Decision:** Change registry to name-only candidates with unknown metadata and no assigned use; do not read or alter raw contents.
- **Alternatives:** Preserve training assignment; rejected as unsupported.
- **Tradeoffs:** No dataset can enter training until provenance/rights/modality/split review.
- **Evidence:** Candidate directories and user prompt; see `dataset-strategy.md`.

## DEC-004 - Separate official requirements from proposed mechanisms and references
- **Date:** 2026-10-03
- **Context:** Prompt 1 contains official problem text, an expected-solution proposal, presentation guidance, and competitor material.
- **Decision:** Treat the required client/server behavior and five weights as authoritative; keep WebGPU, ONNX, DOM fusion, semantic tokens, confirmations, and competitor architecture as options or references until supported.
- **Evidence:** User-supplied SIH26171 text; `docs/research.md`.

## DEC-005 - Keep all dataset roles unassigned after local intake
- **Date:** 2026-10-03
- **Context:** Local cards and schemas establish useful text resources but reveal license conflicts, derived views, synthetic-domain limits, and no visual/browser ground truth.
- **Decision:** Record candidate-specific suitability and rejection reasons without approving training, validation, or final evaluation use.
- **Evidence:** `docs/dataset-strategy.md`; `datasets/dataset-registry.csv`.

## DEC-006 - Require capability-based vision research
- **Date:** 2026-10-03
- **Context:** The official text requires a local ViT or equivalent while the task needs screen understanding and redaction localization.
- **Decision:** Evaluate image classification, feature extraction, localization, OCR, visual PII, browser-state understanding, and action grounding separately. Do not infer a named ViT checkpoint.
- **Evidence:** `docs/requirements.md`; `docs/architecture.md`.

## DEC-007 - Do not synchronize to unidentified connected spaces
- **Date:** 2026-10-03
- **Context:** No actual PrivateSight Notion space, Drive folder, GitHub repository, or Figma file was identified.
- **Decision:** Keep the repository canonical and perform no external writes during Prompt 1.
- **Evidence:** `docs/tooling-and-knowledge-architecture.md`.

## DEC-008 - Keep SIH formulas and thresholds unresolved
- **Date:** 2026-10-03
- **Context:** Prompt 2 research found the five supplied weights but no authoritative formulas, annotation protocol, target device, browser matrix, aggregation, or thresholds.
- **Decision:** Record bounded measurement options and decision requests without presenting any as SIH rules.
- **Evidence:** `docs/prompt2-evidence.md`; `docs/evaluation-metrics.md`.

## DEC-009 - Treat browser/runtime support as capability evidence, not architecture selection
- **Date:** 2026-10-03
- **Context:** Current browser and runtime documentation shows permission differences and browser-dependent accelerated execution, including a broad WebAssembly path and non-parity for WebGPU.
- **Decision:** Require capability-level comparison and a verified fallback plan before selecting a runtime or model.
- **Evidence:** `docs/prompt2-evidence.md`.

## DEC-010 - Do not reuse browser-agent benchmarks as privacy benchmarks
- **Date:** 2026-10-03
- **Context:** ScreenSpot, ScreenSpot-Pro, WebArena, and BrowserGym provide grounding or task-completion precedents but do not establish PII redaction or privacy-gate leakage evidence.
- **Decision:** Keep them as references and require separate approved visual/privacy data for PrivateSight evaluation.
- **Evidence:** `docs/prompt2-evidence.md`.

## DEC-011 - Keep architecture candidates unranked
- **Date:** 2026-10-03
- **Context:** Prompt 3 compared DOM-first, screenshot/vision-first, and hybrid candidates, but SIH formulas, target devices, data, and browser scope remain unresolved.
- **Decision:** Document candidate strengths, limits, and benchmark dependencies without selecting or ranking a topology.
- **Evidence:** `docs/architecture-options.md`; `docs/architecture-decision-matrix.md`.

## DEC-012 - Separate privacy gate and action validator from model/server roles
- **Date:** 2026-10-03
- **Context:** The confirmed privacy invariant and local action-validation requirement cannot be established by a model choice alone.
- **Decision:** Treat a gate-owned outbound path and local structured-action validation as proposed architectural boundaries that must be independently tested.
- **Evidence:** `docs/system-architecture.md`; `docs/privacy-architecture.md`; `docs/action-validation.md`.

## DEC-013 - Record Playwright MCP as not verifiable in this session
- **Date:** 2026-10-03
- **Context:** The repository config declares extension mode, but the safe browser inventory exposed only Codex's in-app browser and no extension-attached clean profile.
- **Decision:** Do not claim navigation, DOM, screenshot, or interaction verification. Require a dedicated connected profile for a later live check.
- **Evidence:** `docs/browser-architecture.md`; `docs/prompt3-evidence.md`.

## DEC-014 - Record the later bounded Playwright runtime verification
- **Date:** 2026-10-04
- **Context:** Chrome Profile 8 exposed the existing TodoMVC page to Playwright MCP after the Prompt 3 session.
- **Decision:** Treat existing-tab access, title/DOM observation, screenshot capture, one harmless todo interaction, and resulting-state observation as confirmed tool-connectivity evidence. Preserve Prompt 3's earlier result as historical rather than rewriting it.
- **Limit:** This is not evidence for PrivateSight extension behavior, browser parity, privacy containment, reliability, or performance.
- **Evidence:** `docs/human-verification.md`; `docs/evidence/playwright-todomvc-before.png`.

## DEC-015 - Keep all 11 candidate roles unassigned after Prompt 4
- **Date:** 2026-10-04
- **Context:** The candidates provide text-oriented labels but have licensing, lineage, contamination, domain, or evaluation-independence limits and no visual/browser ground truth.
- **Decision:** Approve no candidate for training, validation, or final evaluation. Preserve descriptive suitability and rejection/hold reasons until owner rights and protocol decisions are made.
- **Evidence:** `docs/dataset-audit.md`; `docs/data-licensing.md`; `docs/contamination-audit.md`.

## DEC-016 - Separate development, frozen evaluation, and demo evidence by lineage
- **Date:** 2026-10-04
- **Context:** Publisher split labels and exact-text disjointness do not prevent generator, template, source, identity, page-family, or render-variant leakage.
- **Decision:** Any approved derived corpus must be grouped by lineage before role assignment; demo/manual cases cannot supply scored evidence; final evaluation is frozen before tuning.
- **Evidence:** `docs/dataset-split-strategy.md`.

## DEC-017 - Centralize unresolved owner choices without deciding them
- **Date:** 2026-10-04
- **Context:** Prompt 4 exposed interdependent rights, privacy, corpus, annotation, split, metric, and platform choices across several documents.
- **Decision:** Use `docs/owner-decision-gate.md` as the canonical D-01–D-12 register and `docs/owner-question-pack.md` as the minimum response form. Status remains owner-required, unknown, or benchmark-dependent until evidence or an explicit owner answer changes it.
- **Evidence:** Prompt 5; `docs/decision-dependency-graph.md`.

## DEC-018 - Keep official SIH facts separate from the internal benchmark protocol
- **Date:** 2026-10-04
- **Context:** Only the five SIH dimensions and weights are confirmed; formulas, thresholds, aggregation, devices, browser versions, annotation rules, latency boundary, and pass/fail rules remain unavailable.
- **Decision:** Preserve the official weights verbatim and design any reproducible project protocol as explicitly internal unless a later authoritative SIH source supplies the missing definitions.
- **Evidence:** `docs/sih-evaluation-protocol.md`; `docs/evaluation-metrics.md`.

## DEC-019 - Use an aligned case bundle and family-level split governance as a proposal
- **Date:** 2026-10-04
- **Context:** PrivateSight needs screenshot, DOM/accessibility, OCR, visual-region, privacy, and action evidence aligned to the same browser state, while variants can leak across roles.
- **Decision:** Propose a versioned aligned case bundle and keep every source/template/generator/identity/site/task/document/capture family in one data role. Corpus generation and role assignment still require owner approval.
- **Evidence:** `docs/visual-browser-corpus-spec.md`; `docs/visual-annotation-protocol.md`; `docs/contamination-policy.md`.

## DEC-020 - Record the owner-approved bounded Prompt 6 scope
- **Date:** 2026-10-04
- **Context:** The owner response sheet resolved the Prompt 5 project-policy questions.
- **Decision:** Use a restricted SIH/demo, academic, and internal-development scope; rights-clear training only; synthetic and controlled non-personal data; Phase 1 Chrome desktop on the reference Windows environment; Phase 2 Firefox after Chrome acceptance; owner-held frozen evaluation; fail-closed high-risk privacy policy; full-chain internal latency; and CPU/WASM fallback alongside the reference integrated-GPU class.
- **Limit:** Unclear licenses, personal real data, official SIH formulas, contamination thresholds, final model/runtime/architecture, and universal browser support remain unresolved.
- **Evidence:** Owner response sheet; `docs/owner-decision-gate.md`.

## DEC-021 - Require the complete corpus-to-experiment gate chain
- **Date:** 2026-10-04
- **Context:** Owner-approved scope is insufficient for reproducible experiments without aligned artifacts, QA, contamination grouping, frozen custody, and qualified instrumentation.
- **Decision:** Progress as blueprint → generation → capture → annotation → QA → contamination → role assignment/freeze → harness qualification → baselines. An affected artifact cannot bypass a failed gate.
- **Evidence:** `docs/prompt6-experimental-plan.md`; `docs/acceptance-gates.md`; `docs/stop-conditions.md`.

## DEC-022 - Keep Prompt 6 metrics internal and decomposed
- **Date:** 2026-10-04
- **Context:** Official SIH formulas remain unavailable, while reproducible engineering comparisons require explicit units.
- **Decision:** Label formulas as `PRIVATE SIGHT INTERNAL METRIC`; report visual, PII, redaction, resource, and latency components separately; do not create an official or combined weighted score.
- **Evidence:** `docs/benchmark-harness-spec.md`; `docs/sih-evaluation-protocol.md`.

## DEC-023 - Use persistent lineage IDs and component-level role assignment
- **Date:** 2026-10-04
- **Context:** Screenshots, DOM, semantic representations, OCR, annotations, render variants, and tasks from one scenario can leak across roles.
- **Decision:** Give every family/case/variant/capture/artifact a stable opaque ID and assign connected lineage/contamination components to one role only.
- **Evidence:** `docs/corpus-generation-plan.md`; `docs/contamination-work-package.md`; `docs/frozen-evaluation-build-plan.md`.

## DEC-024 - Implement Prompt 7 as non-production qualification infrastructure

- **Date:** 2026-10-04
- **Decision:** Keep controlled fixtures, capture, annotation, QA, contamination, split, benchmark, canary, and fingerprint logic under the pilot namespace. Generated evidence stays under ignored `artifacts/pilot/`.
- **Limit:** This does not select or implement the production architecture, model, OCR engine, or runtime.
- **Evidence:** `docs/prompt7-implementation-plan.md`; `docs/prompt7-evidence.md`.

## DEC-025 - Use DOM-derived rendered text only as an alignment surrogate

- **Date:** 2026-10-04
- **Decision:** Use `dom-rendered-text-surrogate@1.0.0` to qualify geometry and cross-artifact handling without introducing an OCR selection.
- **Limit:** It supplies no pixel OCR accuracy evidence and cannot enter an OCR candidate comparison as a measured OCR result.
- **Evidence:** `docs/pilot-capture-report.md`; D-06; Prompt 7 §9.

## DEC-026 - Calibrate contamination thresholds only for the pilot controls

- **Date:** 2026-10-04
- **Decision:** Version the three current thresholds as `pilot-contamination-1.0.0` after they separated the deliberate related and independent control pairs.
- **Limit:** Thresholds are not universal and require broader non-frozen calibration before freeze.
- **Evidence:** `docs/pilot-contamination-calibration.md`.

