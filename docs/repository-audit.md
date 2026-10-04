# Repository Audit — Prompt 0

**Date:** 2026-10-03 (client local date)
**Scope:** Repository and documentation reconciliation only. No product feature, model selection, training, or raw-data edits.

## Project summary
PrivateSight is a privacy-preserving browser agent for the SIH problem context “On-device Visual Perception for Light-weight Browser Agents.” The intended flow is local DOM/accessibility and screen observation, local understanding and sensitive-data detection, local sanitization, a hard privacy gate, sanitized-only server-side LLM/VLM use when needed, structured action receipt, local action validation, and browser execution. A local ViT or equivalent computer-vision model is required by the supplied context, but no specific model is selected.

## Confirmed requirements
- The five supplied weights: visual-context accuracy 25%; sensitive/PII detection precision and recall 20%; redaction precision 20%; client-side resource utilization 20%; end-to-end latency 15%.
- Privacy by default, local processing where practical, reliable detection/redaction, a hard pre-network privacy boundary, low client resource use/latency, browser usability, reproducible evaluation, Chrome/Firefox consideration, and evidence-driven choices.
- Future evidence must establish that raw sensitive context cannot bypass the privacy gate.
- Existing datasets are candidates only; no merge, relabel, raw overwrite, or training in this gate. Text-only data cannot validate visual PII detection.

## Repository inventory and findings
- `src/` contains only `.gitkeep`; no product implementation exists.
- `tests/` contains one placeholder Playwright test against `example.com` and short README placeholders for unit/integration/extension/e2e suites. There is no PrivateSight-specific acceptance or privacy-gate evidence.
- `package.json` exposes Playwright Test test/UI/report scripts and declares `@playwright/test` as `latest`; no build/package script is present. `playwright.config.ts` has generic HTML/list reporting, timeouts, and failure artifacts, but no extension/browser matrix.
- `.codex/config.toml` declares Playwright MCP extension mode via `npx @playwright/mcp@latest`. This is configuration, not proof of a running MCP service or verified browser behavior.
- In Prompt 0, `datasets/raw/` was catalogued by folder name only and raw contents were not opened or modified. Prompt 1 later performed the authorized local metadata audit recorded below.
- `datasets/dataset-registry.csv` had one blank placeholder row marked `training`, which was unsafe. It now records observed folders as `candidate; not assigned`, with unknown metadata left blank.
- `references/` contains only `README.md`; no supplied SIH document, research file, video note, or design artifact is present.
- `.git` metadata is absent. `git rev-parse` fails, so branch, dirty state, remotes, and local-vs-GitHub freshness could not be checked. This folder cannot currently provide Git change history.
- GitHub search for a repository named/described as `PrivateSight` returned no results; Google Drive search for `PrivateSight SIH` returned no files. Playwright MCP listed a tab titled “Playwright Extension Status”; no browser behavior was tested. Notion tools are exposed, but the required access-discovery call for Notion search was unavailable. Figma, Context7, and OpenAI developer tools are exposed; no Figma file was supplied and Context7/OpenAI lookups were unnecessary. Tool exposure does not prove project-specific authentication/access.

## Classification of inconsistencies and weaknesses
| Classification | Finding | Reconciliation |
| --- | --- | --- |
| Missing requirement | `PROJECT.md` used `[USER TO SUPPLY]` / `[TO BE DERIVED]` despite current project context. | Replaced with the supplied project identity, dataflow, weights, constraints, and explicit unknowns. |
| Contradiction | `CODEX_MASTER_PROMPT.md` asked for general intake/architecture/implementation planning without a Prompt 0 stop boundary. | Rewrote the master control prompt to preserve the explicit gate and require Prompt 1 intake before planning/implementation. |
| Outdated requirement | `docs/requirements.md` left all requirements blank and proposed deriving them later. | Reconciled to user-confirmed requirements and separated open operational definitions. |
| Unsupported assumption | Placeholder evaluation docs suggested Codex would derive thresholds, which could invite invented targets. | Marked supplied weights as confirmed and formulas/thresholds as unresolved and owner-supplied. |
| Stale implementation assumption | Architecture/plans implied future choices without documenting privacy gate and sanitized-only boundary. | Revised placeholders to specify requirements while retaining architecture/model choice as deferred. |
| Missing test/evidence | Scaffold contains no gate-bypass tests or PrivateSight browser behavior. | Recorded as a future acceptance requirement and current gap; no product tests were invented or added. |
| Risk | Registry preassigned an empty row to training. | Replaced it with 11 name-only candidate entries; no raw dataset changes. |
| Duplicate documentation | Root planning placeholders overlap with `docs/` knowledge files, and old prompts listed a parallel set without ownership. | `PROJECT.md` now points to canonical docs; master prompt preserves legacy planning files as subordinate rather than competing sources. |
| Unresolved technical question | “ViT” could be misread as generic classifier selection. | Recorded that the family requirement does not select a model or establish localization/interaction capability. |
| Risk | No Git metadata prevents history and remote verification. | Documented the limitation; source hierarchy still names verified GitHub as source control if identified. |
| Risk | `package.json` and `.codex/config.toml` use floating `latest` package tags. | Recorded as a reproducibility concern; dependency/configuration pinning is deferred because it is not needed to make the documentation gate operable. |
| Unresolved technical question | Connected app tools are exposed but project-specific access was not established for Notion/Figma, and GitHub/Drive searches returned no matching sources. | Recorded the exact probe results and tool roles; Prompt 1 must identify intended pages/repositories/designs and provide authoritative references. |
| Missing reference | References folder has no authoritative SIH statement. | Added this as a required Prompt 1 input; no external source was guessed. |

## Documentation changes recorded
- Added: `docs/repository-audit.md`, `docs/problem-definition.md`, `docs/evaluation-metrics.md`, `docs/assumptions.md`, `docs/open-questions.md`, `docs/source-of-truth.md`, `docs/tooling-and-knowledge-architecture.md`.
- Rewrote: `PROJECT.md`, `docs/requirements.md`, `CODEX_MASTER_PROMPT.md`, `docs/architecture.md`, `docs/dataset-strategy.md`, `docs/evaluation-plan.md`, `docs/implementation-plan.md`, `docs/ml-plan.md`, `docs/pii-taxonomy.md`, `docs/research.md`, `docs/risk-register.md`, `docs/roadmap.md`, `docs/testing-strategy.md`, `docs/decisions.md`, `README_FIRST.md`, `references/README.md`, `tools/playwright-mcp/SETUP.md`, and test/script/experiment/report README files.
- Updated metadata only: `datasets/dataset-registry.csv`.
- `AGENTS.md` was reviewed and does not contradict the supplied requirements; it was not changed.

## Completion gate and stop
All ten Prompt 0 reporting questions are answered in `PROJECT.md` and the linked documents. Confirmed items versus unresolved items are explicit. No tests were run because this gate changes documentation/metadata only and the user did not request test execution. No architecture research, model selection, training, implementation, or raw data modification was performed.

**Historical Prompt 0 handoff:** Prompt 1 still had to supply or point to the official SIH statement/rubric, product scope, threat model, browser/device constraints, dataset metadata, and reference material. The Prompt 1 section below records what was resolved and what remains open.


# Repository Audit - Prompt 1 Intake

**Date:** 2026-10-03
**Scope:** Authoritative project intake and documentation reconciliation. No implementation, architecture selection, model selection, training, or raw-data modification.

## Evidence inspected
- User-supplied SIH26171 problem statement, proposed solution, and evaluation weights.
- SIH 2026 PPTX template, including the instruction slide.
- Three supplied PDFs, rendered and inspected where text extraction was insufficient.
- Local competitor video, transcript, and 13 timestamped frames.
- All 11 candidate folders through local cards, licenses, schemas, file/row aggregates, and split metadata.
- Existing repository scaffold, Playwright configuration, tool configuration, and Git state.

## Prompt 1 findings
- The official problem requires a working browser client and server, local vision processing, client-side sensitive-data sanitization, sanitized-context server reasoning, returned actions, and an end-to-end task.
- Chrome and Firefox are named; exact versions and parity remain open.
- The five weights are official as supplied, but formulas, thresholds, devices, workloads, and aggregation remain absent.
- The SIH template requires six submitted slides including the title and PDF upload.
- Competitor footage directly demonstrates form filling, displayed sanitized layout, face/name masking, and action confirmation. Its architecture, privacy, and performance statements remain unverified claims.
- All local data candidates are text-only for PrivateSight's needed modalities. None supplies visual/browser PII ground truth.
- License and lineage risks block automatic use. Ai4Privacy 500k has conflicting local license signals; PiiScan contains a recipe and 78 sample rows rather than the large corpus claimed in its manifest.
- The Playwright MCP extension connection remains unverified.
- No PrivateSight Notion, Drive, GitHub, or Figma source was identified, so no synchronization occurred.

## Weakness classification and reconciliation

| Classification | Finding | Reconciliation |
| --- | --- | --- |
| Outdated requirement | Prompt 0 marked the official problem statement and prototype scope as missing. | Replaced with the user-supplied SIH26171 wording and traced requirements. |
| Missing requirement | Earlier docs did not record the client/server prototype, end-to-end demo, server-model permission, or SIH deck constraints. | Added to `PROJECT.md`, requirements, problem definition, and research notes. |
| Contradiction | Ai4Privacy 500k metadata says CC-BY-4.0 while its README invokes Llama Community terms and the local dataset license file is empty. | Marked the candidate blocked pending authoritative license resolution. |
| Unsupported assumption | Competitor narration presents zero leakage, zero lag, WebGPU/MobileViT, TLS, and zero-knowledge behavior without reproducible evidence. | Kept as attributed claims, never PrivateSight facts. |
| Stale implementation assumption | PiiScan manifest reports a large prepared corpus although only recipe files and 78 sample rows are present locally. | Reclassified it as a recipe/reference, not a local training dataset. |
| Missing test/evidence | No dataset covers screenshots, boxes/masks, DOM/accessibility, or actions. | Added a critical visual/browser data gap and Prompt 2 gate. |
| Duplicate documentation | Problem, metric, dataset, and reference facts could drift across files. | Kept canonical ownership: requirements/traceability, metrics, research, and dataset strategy each own their domain; `PROJECT.md` summarizes and links. |
| Unresolved technical question | “ViT” does not state which visual capabilities the model owns. | Added a capability matrix and deferred model selection. |
| Risk | Demo/reference artifacts may expose personal-like values. | Documentation records only aggregate observations and requires synthetic fixtures/artifact scrubbing. |
| Risk | Chrome/Firefox and Playwright connectivity remain unverified. | Preserved as browser evidence blockers for Prompt 2. |

## Meaningful documentation changes
- Rewrote `PROJECT.md` with the authoritative Prompt 1 project definition and next gate.
- Rewrote `docs/requirements.md` with requirement IDs, evidence labels, capability status, acceptance gates, and traceability.
- Rewrote `docs/problem-definition.md` with users, personas, journeys, constraints, scope, and source-supported success criteria.
- Updated `docs/evaluation-metrics.md` and `docs/evaluation-plan.md` to preserve official weights and unresolved definitions.
- Rewrote `docs/research.md` with source classification, competitor matrix, timestamps, observations, and claim limitations.
- Rewrote `docs/dataset-strategy.md` and expanded `datasets/dataset-registry.csv` with per-candidate metadata, rights, risks, suitability, and rejection status.
- Updated `docs/risk-register.md`, `docs/assumptions.md`, `docs/open-questions.md`, `docs/pii-taxonomy.md`, and `docs/architecture.md`.
- Updated `docs/source-of-truth.md`, `docs/tooling-and-knowledge-architecture.md`, `docs/roadmap.md`, `docs/decisions.md`, and `references/README.md`.
- Updated `README_FIRST.md` and `CODEX_MASTER_PROMPT.md` so the project-control gate now points to Prompt 2.
- `AGENTS.md` remains consistent and was not changed.
- Raw files under `datasets/raw/` were not modified.

## Stop condition
Prompt 1 stops here. Architecture research/selection, implementation, model training, dataset assembly, and production work remain outside this gate.

# Repository Audit — Prompt 4 Dataset and Verification Gate

**Date:** 2026-10-04
**Scope:** dataset metadata, licensing/provenance, contamination, taxonomy, split/evaluation-data requirements, and bounded human browser verification. No product implementation, training, raw-data modification, model selection, architecture selection, or Git push.

## Current repository corrections

- The historical Prompt 0/1 statements about absent Git metadata and an unidentified GitHub repository are superseded by the current checkout on `main`, verified checkpoint `3544fa1`, and owner-supplied remote `https://github.com/jaykaraniya-dev/Privatesight.git`.
- The historical Prompt 2/3 Playwright status remains accurate for those sessions. It is superseded for current connectivity by the 2026-10-04 Chrome Profile 8 TodoMVC runtime verification recorded in `human-verification.md`.
- All 11 registry entries were audited individually. DS-CAND-006 and DS-CAND-010 source URLs were resolved from local cards/current publisher pages; no raw dataset content changed.

## Prompt 4 documentation changes

- Created or completed: `dataset-audit.md`, `dataset-gap-analysis.md`, `pii-taxonomy.md`, `dataset-split-strategy.md`, `contamination-audit.md`, `data-licensing.md`, `evaluation-data-requirements.md`, `human-verification.md`, and `prompt4-evidence.md`.
- Updated current project/gate state in `PROJECT.md`, `README_FIRST.md`, `dataset-strategy.md`, `evaluation-plan.md`, `evaluation-metrics.md`, `open-questions.md`, `risk-register.md`, `decisions.md`, `browser-architecture.md`, `tooling-and-knowledge-architecture.md`, and `tools/playwright-mcp/SETUP.md`.
- Added immutable screenshot evidence at `docs/evidence/playwright-todomvc-before.png`; it contains the empty public TodoMVC page and no private browser content.
- Added `.playwright-mcp/` to `.gitignore` so local MCP session logs and page snapshots cannot be committed as browser state.
- Updated metadata only in `datasets/dataset-registry.csv`; `datasets/raw/` was not changed.

## Gate finding

The text candidates can support limited future text research only after rights and quality approval. They do not supply the visual/browser evidence needed for screenshot understanding, OCR localization, visual PII regions, redaction masks, DOM/accessibility alignment, browser state, or action grounding. Owner decisions and a rights-cleared visual/browser corpus remain prerequisites for experiments and implementation planning.

# Repository Audit — Prompt 5 Decision and Benchmark Specification

**Date:** 2026-10-04
**Scope:** pre-implementation owner decisions, visual/browser corpus and annotation specification, contamination governance, SIH/internal evaluation boundary, platform matrix, benchmark design, and dependency mapping.

## Prompt 5 documentation changes

- Created `owner-decision-gate.md` with the canonical D-01–D-12 register and explicit owner-required choices.
- Created `owner-question-pack.md` with the minimum neutral questions required before Prompt 6.
- Created `visual-browser-corpus-spec.md` and `visual-annotation-protocol.md` without generating or assigning data.
- Created `contamination-policy.md` while preserving Prompt 4's confirmed duplicate counts and separating candidate methods from unapproved thresholds.
- Created `sih-evaluation-protocol.md`, `evaluation-platform-matrix.md`, and `benchmark-design.md` without inventing SIH formulas, platform parity, thresholds, or results.
- Created `decision-dependency-graph.md` to distinguish blocking decisions from work that can proceed after an approved bounded scope.
- Updated current status and links in `PROJECT.md`, `README_FIRST.md`, `open-questions.md`, `risk-register.md`, `decisions.md`, `roadmap.md`, `dataset-strategy.md`, `evaluation-plan.md`, `evaluation-metrics.md`, and `research.md`.

## Gate finding

The repository now contains an owner-approved bounded scope for Prompt 6. No raw dataset was modified, no corpus was generated, no benchmark was run, no external service was written, and no final model, runtime, browser matrix beyond the staged benchmark scope, metric formula, or architecture was selected.

# Repository Audit — Owner Response Integration

**Date:** 2026-10-04

The owner response sheet was incorporated into `owner-decision-gate.md`, `decision-dependency-graph.md`, `PROJECT.md`, `README_FIRST.md`, `roadmap.md`, `open-questions.md`, `decisions.md`, `evaluation-plan.md`, `evaluation-metrics.md`, `visual-browser-corpus-spec.md`, `visual-annotation-protocol.md`, `contamination-policy.md`, `sih-evaluation-protocol.md`, `evaluation-platform-matrix.md`, and `benchmark-design.md`.

The update changes project-policy decisions from owner-required to recorded outcomes where the response supplied an answer. It preserves unresolved per-dataset rights, exact platform versions, contamination thresholds, official SIH formulas, benchmark results, and final model/runtime/architecture choices as open or benchmark-dependent.

# Repository Audit — Prompt 6 Experimental Readiness Planning

**Date:** 2026-10-04
**Scope:** bounded corpus, capture, annotation, QA, contamination, frozen-evaluation, benchmark-harness, runtime-experiment, acceptance-gate, and stop-condition specifications.

## Documentation changes

- Created the 14 required Prompt 6 documents: the experimental plan, corpus work packages and generation plan, capture protocol, annotation package and QA gate, contamination work package, frozen-evaluation build plan, benchmark-harness specification, experiment matrix, runtime-experiment plan, acceptance gates, stop conditions, and Prompt 6 evidence ledger.
- Updated `PROJECT.md`, `README_FIRST.md`, roadmap, decisions, research, risk, evaluation, dependency, source-of-truth, and tooling records to reflect specification readiness without claiming experimental completion.
- Reconciled Prompt 4 status language with the binding D-01 through D-12 decisions while preserving unresolved dataset rights, official SIH formulas, calibration thresholds, benchmark results, and final technical selections.
- Consulted current Context7 documentation for Playwright, ONNX Runtime, and Transformers.js, plus official Chrome and MDN browser/runtime documentation. These sources bound planned experiments; they do not supply performance results.

## Safety and scope

No product code, corpus case, annotation, frozen set, benchmark result, trained model, runtime selection, final architecture, or external-system write was produced. No Playwright interaction was repeated. Raw candidate data remained read-only and excluded from Git.

The Prompt 6 read-only integrity check matched the supplied baseline exactly: 11 top-level folders, 394 files, and 14,154,310,444 bytes under `datasets/raw/`; Git reported no raw-path change.

# Repository Audit — Prompt 7 Pilot Qualification

**Date:** 2026-10-04

Prompt 7 added bounded pilot source fixtures, `src/pilot/` qualification utilities, Node and Playwright tests, a fixture benchmark, canary observation, environment fingerprinting, and the 13 requested Prompt 7 reports. Runtime screenshots and machine results remain under ignored `artifacts/pilot/`. The placeholder `example.com` Playwright smoke test was replaced by the controlled local pilot test.

No raw candidate data, final model/runtime/OCR choice, production extension feature, official SIH formula, or frozen evaluation release was introduced. Final verification records tests, repeat comparison, raw-data integrity, ignored-artifact behavior, Markdown links, Git whitespace, and changed-file review.

