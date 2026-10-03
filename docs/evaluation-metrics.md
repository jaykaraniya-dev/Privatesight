# Evaluation Metrics

## Officially supplied criteria

| Dimension | Weight | Official wording status | Definitions still required |
| --- | ---: | --- | --- |
| Accuracy of visual context from screen | 25% | Supplied as an SIH criterion | Task unit, ground truth, accuracy formula, partial credit, aggregation. |
| Recall and precision for sensitive/PII detection | 20% | Supplied as an SIH criterion | PII taxonomy, modality, span/box/mask matching, averaging, class weighting. |
| Precision of redaction | 20% | Supplied as an SIH criterion | Correct-redaction unit, missed leakage, over-redaction, region or pixel matching. |
| Client-side resource utilization | 20% | Supplied as an SIH criterion | CPU, memory, GPU, energy, model size, sampling method, device/browser matrix. |
| Overall end-to-end task latency | 15% | Supplied as an SIH criterion | Start/end events, task set, network conditions, warm/cold runs, percentiles. |

The weights total 100%. They do not define a pass threshold or a valid combined score until each dimension has a compatible scale and aggregation rule.

## Prompt 2 evidence status

Prompt 2 found no authoritative SIH source that adds formulas, annotation rules, target devices, browser versions, aggregation, or thresholds. Public mirrors reproduce the statement but are not official judging authority. The detailed evidence matrix and bounded measurement options are recorded in [`docs/prompt2-evidence.md`](prompt2-evidence.md).

The following remain proposals rather than SIH definitions: separate screen-state and grounding measures; modality-specific PII matching; two-sided redaction and residual-leakage reporting; package, initialization, RAM, CPU, and GPU resource reporting where available; and component timings with p50/p95/p99 latency reporting.

## Project reporting requirements
These are repository quality requirements from `AGENTS.md` and the user, not additional SIH scoring criteria:
- Report precision, recall, F1, per-label results, false positives, and false negatives where applicable.
- Keep text-span, OCR, visual-region, redaction, and browser-action results separate.
- Record dataset version, split role, provenance, configuration, browser, device, and workload.
- Protect a final evaluation set from training and model-selection decisions.
- Report latency distributions and client resource measurements under reproducible conditions.
- Make no performance claim without measured evidence.

## Minimum future evidence by dimension
- **Visual context:** frozen browser tasks with screen-state ground truth and task-relevant context labels.
- **PII detection:** modality-specific gold spans, regions, or masks using a confirmed taxonomy.
- **Redaction:** paired raw/sanitized truth plus checks for both leakage and loss of useful context.
- **Resources:** repeatable profiling on agreed target devices and browsers.
- **Latency:** end-to-end timing for the same frozen tasks, including local processing, network, server reasoning, validation, and execution as applicable.

These evidence categories do not add thresholds. Prompt 2 must locate an official scoring protocol or prepare options for owner approval.

