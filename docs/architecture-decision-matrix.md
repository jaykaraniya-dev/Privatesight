# Architecture Decision Matrix

This is a qualitative comparison only. It intentionally contains no numerical scores or ranking because SIH formulas, devices, and acceptance thresholds are unresolved.

| Criterion | DOM-first | Screenshot/vision-first | Hybrid | Evidence and decision state |
| --- | --- | --- | --- | --- |
| Visual-context accuracy potential | Limited to exposed semantics. | Strong coverage of visible layout; model-dependent. | Broadest potential coverage. | BENCHMARK-DEPENDENT. |
| Text PII detection suitability | Strong on normal DOM text. | OCR/model dependent. | Can cross-check sources. | PROPOSED. |
| Visual PII/redaction suitability | Weak for visual-only content. | Direct visual localization path; detector/mask dependent. | Covers DOM and visual-only content. | PROPOSED. |
| Privacy containment | Smaller observation surface, but raw DOM is still sensitive. | Raw captures are high-risk local artifacts. | Most paths to inventory and gate. | CONFIRMED requirement; implementation effectiveness UNKNOWN. |
| Chrome/Firefox compatibility | Depends on permissions/page type. | Capture and acceleration behavior differs. | Inherits both constraint sets. | CONFIRMED constraints; support target OWNER-REQUIRED. |
| Client resource cost | Likely lower pixel cost. | Potentially high visual model/OCR cost. | Potentially highest unless benchmark proves selective invocation. | BENCHMARK-DEPENDENT. |
| End-to-end latency | Potentially lower local observation, but task dependent. | Capture/inference cost adds latency. | Fusion cost may trade for fewer retries. | BENCHMARK-DEPENDENT. |
| Maintainability | Simpler representation but blind spots. | Clear visual pipeline but specialized models. | More interfaces and disagreement handling. | PROPOSED. |
| Observability/debuggability | DOM provenance is inspectable but sensitive. | Needs careful artifact scrubbing. | Needs per-source provenance and privacy-safe traces. | PROPOSED. |
| Benchmarkability | Needs rendered-state gap cases. | Needs boxes/masks/OCR ground truth. | Needs all annotations plus ablations. | CONFIRMED data gap. |

## Decision criteria for Prompt 4+

Select only after an approved benchmark compares: task-relevant screen understanding, PII precision/recall by modality, redaction coverage plus collateral damage and residual leakage, package/runtime resource use, latency distribution, browser coverage, and privacy-gate bypass evidence.

