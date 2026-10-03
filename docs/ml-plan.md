# ML Plan

Status: no model or training plan selected in Prompt 0. The supplied context requires a local ViT or equivalent computer-vision component; model-family language is not a model selection.

## Problem boundaries
The overall system may require distinct capabilities: visual-context understanding, OCR, text PII recognition, visual sensitive-region localization, redaction support, and browser action grounding. Do not assume one model is appropriate for all of them. Generic image classification alone does not localize sensitive content or establish browser interaction capability.

## Evidence required before model work
Prompt 1 must define target devices/resource and latency budgets, modality/task ground truth, mandatory classes/languages, metric formulas/thresholds, privacy boundary/threat model, and candidate dataset eligibility. Then plan baselines and candidate model families from evidence without assuming a final architecture.

Any later ML workflow must review dataset rights/provenance first; preserve train/validation/frozen final-evaluation separation; version data/configuration/model/runtime; report precision, recall, F1, per-label metrics, false positives/negatives, relevant localization/boundary quality, robustness and error analysis; and measure client resource/latency. No dataset was approved and no model was trained in Prompt 0.
