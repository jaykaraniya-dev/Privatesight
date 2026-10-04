# Pilot Annotation QA

**Gate B result:** PASS  
**QA schema:** `pilot-annotation-qa-1.0.0`

## Automated checks

The QA implementation checks required schema fields; manifest and case references; complete lineage; screenshot bounds; non-negative and finite coordinates; boxes within image bounds; mask/image dimension agreement; rendered-text record references and geometry; DOM and accessibility references; allowed taxonomy, sensitivity, and ambiguity values; duplicate/conflicting annotation IDs; expected-action targets; and expected outcomes.

Outcomes are `PASS`, `REVIEW`, `REANNOTATE`, `QUARANTINE`, and `FAIL`. The end-to-end runner stops when any generated case is not `PASS`.

## Measured result

All 12 current qualification cases passed. Unit fixtures also demonstrated rejection of out-of-bounds geometry, missing lineage, conflicting annotations, and invalid references. No quality percentage is claimed.

## Limitations

The gate verifies schema and cross-artifact consistency. It does not substitute for independent review, adjudication, completeness audits on natural screenshots, or inter-annotator analysis in a future corpus.

## Source locations

- QA implementation: [`src/pilot/qa.cjs`](../src/pilot/qa.cjs)
- Tests: [`tests/unit/pilot-qa.test.cjs`](../tests/unit/pilot-qa.test.cjs) and [`tests/integration/pilot-annotation-flow.test.cjs`](../tests/integration/pilot-annotation-flow.test.cjs)
- Runtime results: ignored `artifacts/pilot/current/qa-results.jsonl`
