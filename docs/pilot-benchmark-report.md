# Pilot Benchmark Report

**Gate C result:** PASS for fixture-mode harness qualification  
**Benchmark:** `privatesight-pilot-benchmark-1.0.0`  
**Label:** `PRIVATESIGHT INTERNAL METRIC`

## Harness behavior

The harness loads declared cases and versioned annotations, generates deterministic fixture predictions, computes per-case and aggregate internal visual-context, PII, redaction, resource, and full-chain/stage latency records, serializes JSON, embeds environment metadata, and reports failures.

## Fixture results

| Fixture | Cases | Successes | Failures | PII TP | FP | FN | Precision | Recall | F1 |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| perfect oracle | 12 | 12 | 0 | 12 | 0 | 0 | 1.0 | 1.0 | 1.0 |
| known errors | 12 | 11 | 1 | 4 | 12 | 8 | 0.25 | 0.333333 | 0.285714 |

The perfect row validates the oracle path. The known-errors row validates known TP, FP, FN, redaction miss, and failed-case handling. These values are test fixtures and are not model performance. The deterministic fixture full-chain latency input ranges from 14 to 25 ms with mean 19.5 ms; it validates aggregation only and is not measured product latency.

## Reproducibility

Two independent complete runs matched all screenshots and semantic artifacts, annotations, QA, contamination results, split, privacy results, run summary, and normalized benchmark results. Measured capture duration, benchmark wall time, memory snapshots, timestamps, and local ports were excluded and retained as run-specific observations. The machine report is ignored at `artifacts/pilot/reproducibility-report.json`.

## Limits

No model, OCR engine, WASM backend, WebGPU backend, server inference, or final architecture was evaluated. Official SIH formulas and thresholds remain unknown. The harness is qualified for controlled fixtures only.
