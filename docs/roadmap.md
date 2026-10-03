# Roadmap

## Gate 0 - Repository reconciliation
Complete on 2026-10-03. Project-control documents, repository scaffold, tool roles, and candidate-folder inventory were reconciled.

## Gate 1 - Authoritative project intake
Complete on 2026-10-03. The supplied SIH text, evaluation weights, presentation template, reference PDFs, competitor evidence, and local dataset metadata were classified and traced. Requirements, trust boundary, dataset gaps, risks, assumptions, and open questions are now explicit.

No product implementation, model choice, training, dataset merge, raw-data change, or architecture lock occurred.

## Gate 2 - Evidence gathering before architecture planning
Complete on 2026-10-03 as a research gate. Prompt 2:
- checked for additional SIH protocol information and recorded the unresolved formulas and thresholds;
- documented the browser/workflow/device questions and current API constraints;
- bounded the threat-model, outbound-contract, failure-policy, and action-policy decisions;
- identified benchmark references and the missing permitted visual/browser data plan;
- researched capability-matched local vision/runtime options without selecting a model;
- recorded that live browser verification remains blocked by the unavailable Playwright MCP tool;
- compared evidence categories against the five weighted criteria without selecting an architecture.

The gate produced `docs/prompt2-evidence.md`, but owner decisions remain open where the SIH source is silent.

## Gate 3 - Owner decisions and architecture/model comparison
Complete on 2026-10-03 as a decision-boundary stage. Prompt 3 produced architecture candidates, browser/runtime comparisons, privacy/action boundaries, and owner-required decisions without selecting a final model, runtime, browser matrix, or architecture.

## Gate 4 - Owner decisions before implementation planning
Prompt 4 must obtain the required metric, threat-model, outbound-contract, browser/device, data-rights, action-policy, and evaluation-plan decisions. Only then may implementation planning compare and select an approved architecture/model scope.

Architecture planning begins only after these inputs are available and owner decisions are recorded.

