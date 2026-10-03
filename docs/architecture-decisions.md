# Architecture Decision Boundaries

## Confirmed

- Local visual processing, local sanitization before server-bound context, a hard privacy boundary, server reasoning, and local action validation are required roles.
- Chrome and Firefox must be considered, but no parity/version promise exists.
- The final visual system must do more than generic image classification if it is expected to support region redaction, OCR, or action grounding.
- No SIH formulas or thresholds may be invented.

## Proposed

- Separate content scripts, local inference, sanitization, privacy gate, server transport, and action validation into explicit responsibilities.
- Keep server communication owned by one gate-controlled extension component.
- Preserve source provenance and confidence through hybrid observation.
- Fail closed for sanitizer/gate failure, unresolved detection, malformed packages, and stale actions.
- Use synthetic privacy canaries to test every outbound path.

## Owner-required before implementation

- Browser families, versions, OS/hardware targets, and support parity.
- Metric definitions, aggregation, latency boundary, and acceptance owner.
- Protected-data taxonomy, treatment of coordinates/placeholders, server retention/logging, and outbound schema.
- Failure UX, fail-closed scope, action risk classes, confirmation policy, and allowed page types.
- Dataset rights, synthetic-data policy, contamination controls, and final evaluation corpus.

## Benchmark-dependent

- Final model, OCR engine, detector/segmenter, one-model versus hybrid design, quantization, capture resolution/frequency, WebGPU versus WASM, fusion ordering, redaction rendering, and action grounding approach.

## Prompt 4 input

Prompt 4 may turn approved owner decisions into an implementation plan. It must not treat any proposed choice in this document as selected.

