# Visual Annotation Protocol

Date: 2026-10-04
Status: `OWNER-APPROVED PROTOCOL`; annotation version, case counts, and QC thresholds remain to be assigned.

## Annotation principles

- Annotate what is observable in each modality and preserve its source.
- Keep text spans, OCR spans, DOM elements, semantic roles, visual regions, masks, page-state facts, and action targets as distinct linked objects.
- Use the approved taxonomy version; do not invent a label during annotation.
- Mark uncertainty and policy dependency explicitly.
- Use synthetic or approved controlled data only. Annotators must not enter real credentials or private account data.

## Case-level record

Each case must identify the corpus version, case and lineage IDs, browser/platform/capture metadata, split role, source/provenance, synthetic/controlled-real status, taxonomy version, annotation version, annotators/review state, and integrity hashes. All coordinates must declare their coordinate system and the viewport/capture dimensions.

## Proposed annotation units

| Layer | Unit | Required fields | Use |
| --- | --- | --- | --- |
| Source text | character span | start/end offsets, exact source field, category, context, confidence/uncertainty | text PII detection |
| OCR | OCR span | recognized text, word/line box, category, link to image and optional DOM evidence | rendered-text detection and OCR error analysis |
| Visual | bounding box | coordinates, category, visibility/occlusion, source frame | object/region localization and coarse redaction |
| Visual | polygon or segmentation mask | geometry/mask reference, category, source frame, boundary ambiguity | precise redaction where boxes would expose or remove too much |
| Visual entity | face, signature, QR/barcode, document, credential region | category-specific region plus context and sensitivity label | non-text and composite sensitive regions |
| Browser semantic | DOM element | stable case-local node reference, tag/type/name/value policy, bounds, state | semantic detection and grounding |
| Browser semantic | accessibility or derived semantic node | case-local reference, role/name/state, acquisition method, linked DOM/visual region | accessible control semantics; never assume a full browser AX tree when unavailable |
| Browser semantic | visual region and semantic role | region, role, state, task relevance | visual-only controls and layout context |
| Browser task | requested action | action intent, allowed/unsafe class, prerequisites | task definition and policy evaluation |
| Browser task | target and expected outcome | target reference/region, expected state change, acceptable alternatives, rejection condition | action grounding and result validation |
| Sanitization | expected protected output | sanitized span/value, placeholder, box/mask, allowed utility region | redaction and residual-leakage evaluation |

## Boundary rules

### Text and OCR spans

- Offsets use a declared encoding and source string version.
- Include only the characters needed for the approved entity boundary; record nested/overlapping candidates without collapsing them until the owner defines overlap policy.
- OCR annotations preserve both image geometry and the recognized string, including transcription errors.
- Line-wrapped, split, or repeated entities link to one case-level entity when appropriate.

### Boxes, polygons, and masks

- Boxes must contain the intended visible region using the recorded viewport coordinate system.
- Masks or polygons are required candidates where a box would expose protected pixels or remove substantial task-relevant content.
- Occluded, truncated, tiny, or offscreen regions receive explicit visibility states.
- Repeated frames or scroll captures keep separate geometry linked to the same entity lineage.

### DOM and semantic alignment

- DOM values remain local protected evidence and are not copied into outbound examples.
- Element bounds must identify the capture and transformation used to align CSS coordinates to screenshot pixels.
- A DOM node, semantic role, OCR span, and visual region may disagree. Preserve each observation and add a disagreement record rather than overwriting one source.
- Browser-owned UI or inaccessible frames must be labeled unsupported or captured through an explicitly approved path.

### Action annotations

- Record task intent separately from the target.
- Require preconditions, allowed action class, target reference, expected state, and rejection/re-observation conditions.
- Coordinate-only targets are insufficient when a stable semantic/element reference exists.
- Unsafe, stale, ambiguous, or policy-prohibited actions must have explicit negative cases.

## Ambiguity policy

Annotators may use `UNCERTAIN-SENSITIVITY`, `UNCERTAIN-BOUNDARY`, `SOURCE-DISAGREEMENT`, `UNSUPPORTED-CONTENT`, or `POLICY-DEPENDENT` review states. These are workflow states, not PII classes. The owner must decide how each state affects release and evaluation.

## Annotation workflow

1. Validate case rights, synthetic/controlled status, manifest, and taxonomy version.
2. Annotate source-level text/DOM evidence without exposing it outside the approved workspace.
3. Annotate OCR and visual geometry independently.
4. Link cross-modal evidence and record disagreements.
5. Annotate expected sanitization, allowed utility, task state, and action targets where applicable.
6. Run automated schema, coordinate, offset, and referential-integrity checks.
7. Perform independent review or adjudication under the owner-approved policy.
8. Freeze the annotation version and content hashes before role assignment.

## Adjudication and disagreement

The owner must choose single-review, dual-review with adjudication, or another documented workflow. Adjudication records must preserve the original labels, final decision, reason, adjudicator, taxonomy/protocol version, and whether a policy decision was required. Reviewers must not resolve policy questions by personal preference.

## Quality control

Candidate controls include blinded re-annotation, class/modality coverage review, offset and geometry validation, mask-coverage inspection, negative-case review, cross-modal consistency checks, and targeted review of high-risk/uncertain categories. The owner must approve sampling and acceptance thresholds; no numeric threshold is set here.

## Versioning and invalidation

Changing taxonomy meaning, coordinate conventions, capture processing, source strings, sanitizer targets, or adjudication policy creates a new annotation version. Cases become invalid for scored evaluation when source artifacts change without matching annotations, lineage is missing, leakage is found, a required reviewer conflict remains unresolved, or policy changes alter the expected label/output. Invalidated results must not be carried forward.

## Owner decision recorded

The owner approved source text spans, rendered OCR spans, visual boxes, masks where pixel-level redaction requires them, DOM elements, accessibility nodes where available, semantic roles, action targets, expected outcomes, sensitivity labels, and lineage metadata. Primary annotation, independent review for evaluation-critical cases, adjudication, versioning, and alignment/completeness checks are required. Ambiguity labels are `UNKNOWN`, `UNCERTAIN`, and `NOT_APPLICABLE`.

## Remaining protocol details

The taxonomy and initial units are approved. The annotation version, overlap/nesting policy, QC thresholds, version custodian, and final sample counts remain to be assigned in the execution plan. Personal real data remains prohibited for the initial gate.
