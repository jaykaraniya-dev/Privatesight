# Observation Architecture

## Strategy comparison

| Strategy | Strengths | Main failures / privacy exposure | GUI and action grounding | Status |
| --- | --- | --- | --- | --- |
| DOM-first | Semantic labels, form types, values, element relationships, lower pixel cost. | Misses canvas/image/video content and may disagree with rendered state; raw values remain sensitive. | Strong for structured pages; weak for visual-only targets. | PROPOSED. |
| Accessibility-tree-first | Potentially useful semantic roles/states for user-facing controls. | No generic extension AX-tree extraction capability is verified; can omit visual-only content. | UNKNOWN until browser acquisition path is verified. | UNKNOWN. |
| Screenshot-first | Covers rendered pixels, layout, canvas/image/video visible content. | Capture permission/rate, high local sensitivity, OCR/localization cost, hidden/offscreen DOM absent. | Strong visual grounding potential; semantics must be inferred. | PROPOSED. |
| OCR-first | Extracts rendered text that DOM cannot expose. | Cannot reliably infer all UI controls, faces, icons, or sensitive non-text; OCR text is raw sensitive data. | Helps text context/localization; insufficient alone. | PROPOSED. |
| Hybrid DOM + semantic signals + OCR + vision | Combines semantic structure and visual coverage; can cross-check sources. | Fusion disagreement, larger attack surface, resource/latency and leakage complexity. | Strong candidate coverage; requires ablation benchmarks. | PROPOSED. |

## Capability matrix

| Capability | DOM | Accessibility | OCR | Lightweight Vision | Rules / Regex | Hybrid |
| --- | --- | --- | --- | --- | --- |
| Textual PII in normal page text | SUPPORTED | PARTIALLY SUPPORTED | PARTIALLY SUPPORTED | NOT SUITABLE alone | SUPPORTED for patterned classes | SUPPORTED |
| Password/form-field protection | SUPPORTED when semantics exposed | PARTIALLY SUPPORTED | NOT SUITABLE alone | PARTIALLY SUPPORTED visually | SUPPORTED for type/name heuristics | SUPPORTED |
| Tokens/credentials in text | SUPPORTED where visible in DOM | PARTIALLY SUPPORTED | PARTIALLY SUPPORTED | NOT SUITABLE alone | SUPPORTED for known patterns | SUPPORTED |
| Text inside image/canvas/video | NOT SUITABLE | NOT SUITABLE | SUPPORTED where legible | PARTIALLY SUPPORTED for text regions | NOT SUITABLE without text | SUPPORTED |
| Faces / visual identifiers | NOT SUITABLE | NOT SUITABLE | NOT SUITABLE | PARTIALLY SUPPORTED; detector/localizer required | NOT SUITABLE | SUPPORTED |
| Region/mask for pixel redaction | PARTIALLY SUPPORTED through element bounds | NOT SUITABLE | PARTIALLY SUPPORTED through OCR boxes | PARTIALLY SUPPORTED; detector/segmenter required | NOT SUITABLE | SUPPORTED |
| Rendered layout / UI state | PARTIALLY SUPPORTED | PARTIALLY SUPPORTED | PARTIALLY SUPPORTED | PARTIALLY SUPPORTED | NOT SUITABLE | SUPPORTED |
| Action target grounding | SUPPORTED for accessible DOM targets | UNKNOWN | PARTIALLY SUPPORTED | PARTIALLY SUPPORTED | NOT SUITABLE | SUPPORTED |

“SUPPORTED” identifies capability potential, not evaluated PrivateSight accuracy. Accessibility entries remain conservative because a cross-browser acquisition route has not been verified.

## Fusion and uncertainty

- **PROPOSED:** retain per-source provenance, confidence, and geometry rather than flattening all observations immediately.
- **PROPOSED:** when sources disagree about a protected region, resolve in favor of protection until the owner approves a narrower policy.
- **BENCHMARK-DEPENDENT:** source priority, screenshot resolution, OCR language support, visual detector scope, and observation frequency.
- **OWNER-REQUIRED:** protected-data taxonomy, unsupported-content UX, and whether fail-closed applies to all uncertainty or selected risk classes.

