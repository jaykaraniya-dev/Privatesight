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

