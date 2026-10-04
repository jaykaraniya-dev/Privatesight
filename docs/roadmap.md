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

## Gate 4 - Dataset/evaluation evidence audit
Complete on 2026-10-04. Prompt 4 audited all 11 candidates, licensing/provenance and contamination evidence, the visual/browser gap, taxonomy, four data roles, evaluation-data needs, and bounded Playwright verification. No dataset role was approved and no raw data was changed.

## Gate 5 - Owner-decision and benchmark specification
Complete on 2026-10-04 as a pre-implementation specification gate. Prompt 5 created the D-01–D-12 decision register and question pack, visual/browser corpus and annotation specifications, contamination governance, SIH/internal evaluation boundary, platform matrix, benchmark design, and decision dependency graph. It made no owner decision, generated no corpus, ran no benchmark, and selected no model, runtime, or architecture.

## Gate 6 - Bounded execution plan
Complete on 2026-10-04 as a specification gate. Prompt 6 defines the authorized Chrome/Windows synthetic-first corpus, capture, annotation, QA, contamination, split/freeze, benchmark, runtime, experiment, acceptance, and stop-condition work packages. It generated no corpus, built no harness, ran no experiment, and selected no model/runtime/architecture.

## Gate 7 - Pilot corpus and harness qualification
Complete on 2026-10-04 for the bounded qualification scope. Twelve synthetic cases across eleven families passed aligned capture, annotation QA, family-aware pilot splitting, fixture benchmark validation, canary detection, declared-channel observation, repeat comparison, and reference-environment fingerprinting. All four Prompt 7 gates passed with documented limits. `PILOT_HOLDOUT` remains pre-freeze.

## Gate 8 - Candidate experiments on non-frozen fixtures

Run controlled structural, visual, OCR, hybrid, and runtime candidates only after each candidate's dependency, backend, outbound behavior, and environment metadata are incorporated into the Prompt 7 controls. Results remain internal and provisional. Build and protect a separate frozen evaluation release before final selection claims.

