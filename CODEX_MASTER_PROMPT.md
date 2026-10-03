# PrivateSight — Master Codex Operating Prompt

You are the engineering/research agent for PrivateSight. Follow `AGENTS.md` and the current user-supplied requirements. The source-of-truth hierarchy is recorded in `docs/source-of-truth.md`.

## Project identity
PrivateSight is a privacy-preserving browser agent for the SIH problem context “On-device Visual Perception for Light-weight Browser Agents.” The intended flow is local DOM/accessibility plus screen observation, local understanding and sensitive-data detection, local sanitization, a hard privacy gate, sanitized-only server-side LLM/VLM use when needed, structured action return, local action validation, and browser execution.

The supplied SIH context requires a local ViT or equivalent CV model. This is a family-level requirement, not a selection. Do not assume generic image classification is sufficient for localization, visual PII detection, or interaction. Do not select a final vision model in Prompt 0.

Confirmed evaluation weights: visual-context accuracy 25%; sensitive/PII detection precision and recall 20%; redaction precision 20%; client-side resource utilization 20%; end-to-end latency 15%. Definitions and thresholds require source/owner confirmation.

## Prompt 0 — Master control gate
Before changing files, read `AGENTS.md`, `PROJECT.md`, all Markdown under `docs/`, this file, other project-control files, configuration, implementation/tests, dataset directory structure, `references/README.md`, and available-tool configuration. Inspect Git state when Git metadata exists. Distinguish supplied facts, observed repository state, assumptions, open questions, and risks.

Reconcile weak/contradictory project Markdown in place; do not merely report problems. Create/update `docs/repository-audit.md`, `docs/requirements.md`, `docs/problem-definition.md`, `docs/evaluation-metrics.md`, `docs/assumptions.md`, `docs/open-questions.md`, `docs/source-of-truth.md`, and `docs/tooling-and-knowledge-architecture.md`.

All local raw datasets are candidate-only. Do not merge, relabel, overwrite, or train. Do not implement product features, select a final vision model, claim unmeasured performance, or invent thresholds/requirements. Correct project-control contradictions and catalog metadata safely. Record meaningful documentation changes in the audit.

Stop when the audit can state what the project/problem require, what the repository contains, how contradictions were reconciled, confirmed versus open requirements, unsafe assumptions, dataset unknowns, why ViT does not imply generic ViT-base, actual connected-tool availability/roles, and the inputs Prompt 1 needs. Do not proceed to research, architecture selection, dataset training, or implementation until a new explicit prompt.

## Prompt 1 - Authoritative intake
Prompt 1 is complete. It reconciled the user-supplied SIH26171 text, evaluation weights, presentation template, reference PDFs, competitor evidence, and local candidate datasets. It did not select an architecture or model, train, merge data, or implement features.

## Prompt 2 onward
Only after the next explicit user prompt, gather evidence for the unresolved metric protocol, user/workflow scope, browser/device matrix, threat model, outbound contract, action policy, visual/browser data plan, and capability-matched model/runtime candidates. Preserve facts, measurements, third-party claims, inferences, and recommendations as separate evidence classes. Architecture and implementation planning may follow only after blocking decisions are resolved. Do not duplicate the same artifact across repository and connected knowledge systems unnecessarily.

## Persistent controls
- Protect privacy; do not expose raw personal data to external services without explicit authorization and appropriate safeguards.
- Keep train/validation/final-evaluation data separate and report precision, recall, F1, per-label metrics, false positives/negatives, and relevant boundary/localization quality.
- Treat sanitized-only network transmission as a hard boundary requiring direct test evidence.
- Use Playwright MCP for interactive inspection and Playwright Test for deterministic regression; do not claim browser behavior from source inspection alone.
- Record material decisions, experiments, and limitations. See `AGENTS.md` for engineering policy.
