# Benchmark Harness Specification

Date: 2026-10-04
Status: `SPECIFIED`; the harness is not implemented and no score exists.

## Purpose

Define reproducible instrumentation for the five confirmed SIH dimensions while keeping PrivateSight internal metrics visibly separate from unknown official SIH formulas.

## Run identity

Every run receives an immutable run ID and records:

- corpus/split/frozen-release, taxonomy, annotation, contamination, metric, and policy versions;
- code commit, build ID, model/OCR/runtime artifacts and hashes, configuration, quantization, input resolution, inference schedule;
- browser/version/channel, OS/build, CPU, RAM, GPU/driver/adapter, display scale, viewport, power mode, runtime backend and flags;
- cold/warm state, cache state, network/server condition, run order, retries, timeouts, fallbacks, and deviations;
- per-stage monotonic timestamps and resource samples tied to a case/trace ID.

## A. Visual-context accuracy — 25% official dimension

Report separate internal units:

| Unit | Prediction | Ground truth | Internal result |
| --- | --- | --- | --- |
| UI/state understanding | set of state predicates/roles | annotated predicates/roles | exact and per-predicate correctness |
| Relevant-context selection | selected elements/regions/facts | task-relevant annotated set | set precision, recall, F1 |
| Target identification | target reference/region | annotated target | exact semantic match and localization match reported separately |
| Visual grounding | predicted region | gold box/mask | overlap statistic under a versioned match rule |
| Contextual interpretation | structured task facts | annotated facts and context | per-field correctness plus unsupported/unknown handling |

`PRIVATE SIGHT INTERNAL METRIC`: no single “visual-context accuracy” score is defined in Prompt 6. Submetrics are reported by page, task, modality, state, and condition until an approved aggregation exists.

## B. Sensitive/PII precision and recall — 20% official dimension

Evaluate text-source spans, OCR spans/regions, visual boxes/masks, DOM fields, semantic entities, and contextual case labels separately.

`PRIVATE SIGHT INTERNAL METRIC`:

```text
TP = prediction matched to one gold item by the versioned class and boundary/region rule
FP = unmatched prediction or prediction with disallowed class/context match
FN = unmatched gold protected item
precision = TP / (TP + FP)
recall = TP / (TP + FN)
F1 = 2 * precision * recall / (precision + recall)
```

Zero-denominator handling, nested/overlapping items, partial matches, confidence thresholds, and box/mask overlap thresholds must be fixed in the metric-protocol version before a run. Report per-class/per-modality results, macro aggregation, and micro aggregation separately; never substitute one for the other silently.

## C. Redaction precision — 20% official dimension

`PRIVATE SIGHT INTERNAL METRIC` components:

- sensitive coverage: protected gold pixels/regions or fields made non-recoverable;
- residual leakage: protected OCR/text/secret/visual evidence recoverable after sanitization;
- unwanted redaction: non-sensitive or task-relevant gold area/fields removed;
- localization quality: overlap between applied redaction and gold region/mask;
- non-sensitive preservation: retained task-relevant content after sanitization;
- sanitized-context utility: downstream task facts/outcome obtainable from the approved sanitized package.

Pixel, region, span, and field results remain separate. No official SIH redaction formula or combined privacy/utility score is asserted.

## D. Client resource utilization — 20% official dimension

Record idle-browser baseline and workload measurements for:

- process/runtime CPU time and sampled utilization where attributable;
- browser/extension/runtime working set and peak memory;
- GPU utilization and GPU memory where the platform exposes reliable counters;
- model, runtime, extension bundle, download/transfer, and cache footprint;
- initialization, preprocessing, OCR, inference, sanitization, gate, and idle costs;
- sustained and peak observations, sampling method/frequency, unavailable counters, and attribution limits.

No resource limit is an acceptance threshold until measured and approved. Integrated-GPU and CPU/WASM runs are separate groups.

## E. End-to-end latency — 15% official dimension

D-10 defines the primary internal interval:

```text
local observation/capture start
→ local detection/sanitization/privacy gate
→ outbound request
→ server response
→ local action validation
→ browser action completion/observed result
```

Stage timestamps cover capture, preprocessing, OCR, local detection, sanitization/redaction, privacy gate, serialization, network send/wait/receive, server inference, response handling, action validation, browser execution, and result observation.

`PRIVATE SIGHT INTERNAL METRIC`: report per-stage and primary-interval distributions with raw successful/failed/timeout counts. Network wait and retries are included in the primary interval and separately identified. User think-time is excluded. Browser startup, model download/install, and cold initialization are separately reported. No percentile set is fixed until the run protocol is versioned.

## Privacy-boundary instrumentation

Every outbound-capable channel under test receives a trace ID and structured observation: request/response metadata, payload schema, approved field classes, byte counts, and synthetic canary results. Raw payload capture stays in an access-controlled local evidence store. A prohibited value/pixel/field crossing any channel is a privacy failure and stop condition, never a timing outlier.

Channels include HTTP(S), fetch/XHR, WebSocket, extension/service-worker messages that lead to egress, logs, telemetry, analytics, crash/error reporting, traces, caches, clipboard/temp artifacts, model/provider requests, and automation/plugin paths in the tested scope.

## Harness architecture boundary

The harness should later provide adapters for case loading, observation, candidate execution, sanitization/gate output, action validation/execution, metrics, timing, resource sampling, outbound tracing, and artifact writing. This is an `INTERNAL ENGINEERING DECISION` for benchmark tooling, not the production architecture.

## Qualification

Before frozen use, execute repeated non-frozen fixtures with known expected results. Verify deterministic case loading, stable IDs/hashes, metric calculations against hand-checkable examples, monotonic timing, resource sampler metadata, privacy-canary detection, artifact completeness, and failure accounting. Unexplained variance or missing metadata blocks Gate B/D.
