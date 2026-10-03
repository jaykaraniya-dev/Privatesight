# Requirements and Traceability

## Evidence labels
- **Official:** stated in the SIH problem text or evaluation criteria supplied by the user.
- **User:** explicitly required by the PrivateSight project prompts.
- **Repository:** required by `AGENTS.md`.
- **Inferred:** a reasonable implication that still needs owner confirmation.
- **Reference-only:** observed in competitor or guidance material and not binding.

## Confirmed requirements

| ID | Requirement | Source and status |
| --- | --- | --- |
| FR-001 | Observe relevant DOM/accessibility/semantic state and browser screen state locally. | Official screen requirement plus explicit PrivateSight user dataflow. |
| FR-002 | Run a local ViT or equivalent computer-vision model in the browser to evaluate the current screen and contribute to decisions. | Official: SIH26171. |
| FR-003 | Dynamically detect sensitive or personal information and sanitize/redact it locally before any network request containing visual context. | Official: SIH26171. |
| FR-004 | Enforce a hard privacy boundary so only anonymized, unidentifiable context may leave the client. | Official plus User. |
| FR-005 | Provide a server component that receives sanitized context, uses an LLM/VLM, and returns processed data or an actionable browser command. | Official proposed-solution deliverable. |
| FR-006 | Validate returned actions locally before browser execution. | User PrivateSight requirement. |
| FR-007 | Demonstrate an end-to-end task that assists the user. | Official proposed-solution deliverable. |
| FR-008 | Support redaction behavior capable of handling visual and textual sensitive elements; the official examples name faces, passwords, and PII. | Official examples define expected demonstration coverage; exact taxonomy remains open. |
| BR-001 | Build the client as a browser extension/JavaScript component for popular browsers, with Chrome and Firefox named. | Official proposed-solution deliverable. Exact versions and parity remain open. |
| PR-001 | Protect raw sensitive context from network transmission, including applicable screenshots, DOM/accessibility content, credentials, tokens, account data, visual identifiers, form values, sensitive page content, and browser state. | User; some categories are explicit examples and others are required “where applicable.” |
| PR-002 | Eventually provide evidence that raw sensitive context cannot bypass the gate through any outbound path. | User. |
| EV-001 | Evaluate visual-context accuracy (25%), sensitive/PII detection recall and precision (20%), redaction precision (20%), client resource use (20%), and end-to-end latency (15%). | Official SIH evaluation criteria supplied by the user. |
| EV-002 | Do not invent formulas, thresholds, limits, aggregation, or judging criteria absent from an official source. | User. |
| ML-001 | Keep image classification, feature extraction, localization, screenshot understanding, text-region detection, OCR, visual PII detection, redaction support, browser-state understanding, and action grounding as distinct capabilities during research. | User. |
| DATA-001 | Treat all 11 local datasets as candidates; do not merge, relabel, overwrite raw files, train, or upload raw content during Prompt 1. | User. |
| DATA-002 | Separate train, validation/model-selection, and frozen final evaluation data; record provenance, licenses, versions, and contamination controls. | Repository and User. |
| SUB-001 | Limit the SIH idea deck to six slides including the title, retain the supplied template prompts, use concise points/diagrams/pictures, delete the instruction slide, and submit PDF. | User-supplied SIH 2026 template, slide 7. |

## Proposed and inferred requirements

These items are useful candidates but are not confirmed requirements:

| ID | Proposal or inference | Basis | Confirmation needed |
| --- | --- | --- | --- |
| IR-001 | Combine pixels with DOM/accessibility/semantic information. | User-proposed hybrid and official permission to use DOM tags or other methods. | Decide required observation sources and fallback order. |
| IR-002 | Use OCR, text PII detection, and visual-region detection as separate local components. | User-proposed hybrid; current datasets are text-only. | Evidence-based architecture comparison. |
| IR-003 | Fail closed when detection, sanitization, or gate validation is uncertain or unavailable. | Privacy-boundary implication. | Threat model and user experience policy. |
| IR-004 | Require explicit confirmation for consequential actions. | Competitor reference and common safety implication. | Define action risk classes and confirmation policy. |
| IR-005 | Use a strict allowlisted outbound schema and deny all other egress. | Evidence strategy for PR-002. | Architecture and threat-model approval. |
| IR-006 | Preserve non-sensitive layout/structure while replacing sensitive values with semantic placeholders. | Official goal plus competitor demonstration. | Utility and leakage evaluation. |
| PRP-001 | Consider an offline-deployable open-source/open-weights server model; the supplied proposal permits a cloud-hosted version during SIH. | Proposed-solution permission, not a selected requirement. | Confirm server deployment and provider policy. |

## Visual and ML capability status

| Capability | Status |
| --- | --- |
| Local screenshot/screen-state understanding | Explicitly required. |
| Local ViT or equivalent vision component | Explicitly required; model unspecified. |
| Sensitive-region localization sufficient for redaction | Required by dynamic visual redaction, but annotation and scoring format are unresolved. |
| Visual PII detection | Explicit outcome; taxonomy and modalities unresolved. |
| Redaction support | Explicitly required. |
| Browser-state understanding | Required at outcome level; representation unresolved. |
| Image classification | Not independently required. |
| Visual feature extraction | Possible internal function, not specified. |
| OCR and text-region detection | Candidate mechanisms, not mandated. |
| Action grounding in the local vision model | Not specified; the server returns actions and the client validates them. |
| Generic `google/vit-base-patch16-224` or another named model | Not selected or implied. |

## Acceptance criteria supported by sources
- A working browser client and server demonstrate the confirmed end-to-end journey.
- Sensitive context is dynamically sanitized on the client before network transmission.
- The server receives anonymized context and returns a processable response or browser action.
- The client validates and executes the action.
- The demonstration and report address all five official weighted dimensions.
- Evidence shows that raw sensitive context cannot bypass the privacy boundary.

Numeric acceptance thresholds and the exact evidence protocol remain unresolved.

## Requirement traceability

| Source | Requirement | Implementation implication | Test implication | Evaluation implication |
| --- | --- | --- | --- | --- |
| SIH26171 official text | FR-001, FR-002, ML-001 | Provide local visual screen processing; select components only after capability research. | Frozen screenshot/browser-state cases. | Visual-context accuracy, 25%. |
| SIH26171 official text | FR-003, FR-008 | Local detection plus region/span-aware sanitization before request creation. | Positive, negative, and missed-sensitive-region cases across named examples. | PII recall/precision, 20%; redaction precision, 20%. |
| User privacy boundary | FR-004, PR-001, PR-002 | Put an enforceable gate at every relevant network egress. | Instrument outbound channels and seed synthetic secrets in pixels, DOM, accessibility, logs, and metadata. | Leakage evidence reported separately from weighted metrics unless SIH defines otherwise. |
| SIH proposed solution | FR-005, SR-001 | Server consumes sanitized representations and returns structured results/actions. | Contract tests with sanitized payload fixtures and malformed responses. | End-to-end task success and latency. |
| User PrivateSight requirement | FR-006 | Local action policy and target validation are required before execution. | Allow/deny, invalid-target, stale-state, and failure-path cases. | Browser reliability and task outcome; official scoring mapping unresolved. |
| SIH proposed solution | FR-007, BR-001 | Package an extension/JS client plus server and an end-to-end demo for Chrome/Firefox consideration. | Browser-specific deterministic regression after a real build exists. | Resource use, latency, and visual accuracy on agreed browsers/devices. |
| SIH evaluation criteria | EV-001, EV-002 | Add measurement hooks without assuming formulas. | Reproducible benchmark harness after protocol approval. | Five official weights; scales and aggregation unresolved. |
| User dataset rules and AGENTS.md | DATA-001, DATA-002 | Keep raw candidates immutable and roles unassigned until review. | Integrity, split-lineage, license, and leakage checks before use. | Final results must identify frozen evaluation data and contamination controls. |
| SIH template slide 7 | SUB-001 | Later presentation work must retain the supplied six-slide structure and export PDF. | Slide-count, prompt-retention, and PDF-format review. | Submission compliance, not one of the five supplied scoring dimensions. |

## Out of scope for Prompt 1
Implementation, model selection, training, data merging or relabeling, architecture lock, production deployment, and performance claims.

