# Annotation Work Package

Date: 2026-10-04
Status: `SPECIFIED`; no annotation has begun.

## Entry criteria

Annotation begins only for a valid captured case with approved rights/provenance, complete lineage, aligned required artifacts, an owner-approved taxonomy version, and a frozen annotation-schema version.

## Annotation package

| Layer | Unit | Required fields | Cross-links |
| --- | --- | --- | --- |
| Source text | character span | source artifact/field, offsets, text digest, category, context, ambiguity | entity, DOM, OCR, region IDs |
| OCR | word/line/span | OCR artifact, text, geometry, category, OCR error state | screenshot region, source span, entity ID |
| Visual | box | screenshot/frame, coordinate system, category, visibility/occlusion | entity, OCR, DOM/semantic target |
| Visual | mask/polygon | mask artifact/hash, category, boundary uncertainty | box, source frame, expected redaction |
| Browser semantics | DOM element | case-local node reference, bounds, role/state, value-protection class | screenshot region, semantic node, action target |
| Browser semantics | accessibility/semantic node | acquisition method, node reference, role/name/state policy | DOM element, visual region, target |
| Task | action target | task/action type, target reference, preconditions, allowed/unsafe class | expected outcome/state |
| Outcome | expected state | observable predicates, acceptable alternatives, rejection/re-observation result | task and target IDs |
| Privacy | sensitivity label | taxonomy class, context class, high-risk flag, ambiguity, expected gate decision | all evidence supporting the label |
| Lineage | family/group record | generator, template, identity, source, site/page, task, session IDs | case and all derived variants |

## Boundary and context rules

- Text offsets identify the exact source string and encoding/version.
- OCR annotations preserve recognized text and screenshot geometry, including OCR errors.
- Boxes describe visible extent; masks are required where box redaction would leave sensitive pixels or remove materially more non-sensitive content.
- Context-dependent sensitivity records public/authenticated/private/security context separately from the entity type.
- Cross-modal disagreement is preserved; one source cannot silently overwrite another.
- Unsupported content is labeled explicitly and follows fail-closed expected behavior.
- Raw secret values are never copied into public annotation summaries.

## Ambiguity

The owner-approved case-level values are `UNKNOWN`, `UNCERTAIN`, and `NOT_APPLICABLE`. Fine-grained review reasons may additionally record boundary uncertainty, source disagreement, unsupported content, or policy dependency, but map to one approved case-level value.

## Workflow

1. Primary annotator validates case/version and labels each required layer independently.
2. Automated schema, reference, offset, geometry, and completeness checks run.
3. Evaluation-critical cases receive independent review without seeing the primary decision where practical.
4. Disagreements are adjudicated with original labels retained.
5. QA assigns ACCEPT, REVIEW, REANNOTATE, QUARANTINE, or REJECT.
6. Accepted annotations are hashed and bound to the exact case artifacts and schema/taxonomy versions.

## Adjudication record

Record case/layer/object ID, primary label, review label, disagreement type, final label, rationale, adjudicator, timestamp, taxonomy/schema versions, and whether the change requires a new corpus or protocol version.

## Versioning

`INTERNAL ENGINEERING DECISION`: use independent semantic versions for taxonomy, annotation schema, annotator instructions, and QA protocol. Any change to label meaning, required fields, coordinate convention, masking target, or adjudication policy creates a new incompatible version unless explicitly documented as backward-compatible.

## Deliverables

- versioned annotation schema and instructions;
- per-case annotation packages;
- reviewer/adjudication records;
- coverage and unresolved-ambiguity report;
- artifact hashes and version manifest.

No annotation count or agreement percentage is an acceptance threshold until measured and approved.
