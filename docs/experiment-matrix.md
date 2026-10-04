# Controlled Experiment Matrix

Date: 2026-10-04
Status: `SPECIFIED`; no experiment has run.

All experiments use versioned non-frozen training/validation cases until a later gate authorizes frozen evaluation. Change one primary variable at a time. Multi-variable studies are labeled exploratory and cannot establish causality.

| Experiment | Variable | Fixed controls | Measurements | Purpose | Required evidence | Stop condition |
| --- | --- | --- | --- | --- | --- | --- |
| E-01 Structural context | DOM only vs semantic/accessibility representation vs both | Case families, tasks, browser/platform, privacy policy, no screenshot input | state/context units, target match, payload size, latency/resource | Establish structured-context contribution | aligned DOM/semantic gold and sanitized package | sensitive raw value exported, invalid alignment, missing modality |
| E-02 Visual contribution | structural baseline vs screenshot evidence added | Same cases, candidate family/config where applicable, OCR policy, runtime | visual/context units, PII regions, redaction, cost | Measure screenshot contribution | visual annotations and matched case pairs | model/config changes with modality, unsupported image path |
| E-03 Hybrid context | visual-only vs structural-only vs combined | Same case/config/platform and task | all context/PII/utility submetrics, payload/cost | Test whether combination adds measurable value | three aligned input views and identical evaluation rules | any branch receives extra labels or different cases |
| E-04 OCR contribution | OCR disabled vs enabled/configuration A/B | Same screenshots, vision/structural inputs, runtime | OCR span quality, PII recall/precision, latency/resource | Measure OCR value and cost | OCR gold, engine/version/config hash | OCR output leaks raw sensitive text outbound or configs differ elsewhere |
| E-05 Screenshot resolution | declared resolution levels | Same source image/case, preprocessing except scale, model/runtime | grounding/redaction/PII, latency, memory, payload | Characterize accuracy/cost trade-off | transform metadata and mapped gold coordinates | coordinate transform invalid or upscaling changes content unexpectedly |
| E-06 Runtime/backend | CPU/WASM vs integrated-GPU/WebGPU when supported | Same model/artifact, inputs, quantization, browser build, workload | correctness, latency, CPU/RAM/GPU, failures/fallbacks | Compare execution paths | provider/adaptor/operator metadata | silent fallback, incompatible operators, different model artifact |
| E-07 Quantization | supported dtype/quantization configurations | Same model family/export, cases, runtime where possible | correctness/PII/redaction, size, memory, latency | Characterize compression trade-off | artifact hashes and conversion/config record | incompatible outputs, untracked preprocessing/export change |
| E-08 Inference frequency | event/interval policy | Same task sequence, candidate/runtime, page dynamics | missed changes, duplicate work, latency/resource, stale actions | Compare observation schedules | timestamped dynamic cases and state ground truth | schedule changes task content or violates capture API constraints |
| E-09 Privacy/utility | approved sanitization policy variants only | Same detections/cases/server task and outbound schema version | residual leakage, unwanted redaction, task utility, payload size | Bound privacy-quality trade-off | paired gold sensitive/utility regions and canaries | any prohibited outbound data or unapproved policy variant |
| E-10 Latency/resource | one workload parameter such as batch/frequency | Same candidate/cases/platform/network/server | full-chain/stage latency and resource measures | Identify cost drivers | synchronized traces and platform fingerprint | missing stage/resource samples or unstable environment |
| E-11 Fail-closed behavior | injected timeout/error/unsupported condition | Same case and privacy policy | gate decision, outbound trace, recovery/re-observation | Verify privacy failure handling | synthetic canaries and expected block outcome | any release on protected uncertainty/failure |
| E-12 Exploratory interaction | explicitly declared multi-variable configuration | Locked exploratory case set and full configuration capture | descriptive metrics only | Generate hypotheses for later controlled tests | full config and limitation label | result is used for selection or causal claim |

## Baseline categories

- Baseline A: structural/browser context from DOM, approved semantic/accessibility evidence, and browser metadata.
- Baseline B: screenshot/visual context with its required preprocessing and no undisclosed structural input.
- Baseline C: aligned structural plus visual context.

These categories do not select implementations or imply that one model owns every capability.

## Run registration

Before execution, register experiment ID, hypothesis, primary variable, levels, fixed controls, cases/roles, metrics, repetition/run-order policy, environment, artifact retention, stop conditions, and decision the experiment may inform. Post-hoc changes create a new experiment version.

## Interpretation

Report confidence/variance and failures with the raw measurements. A change is not “better” merely because one metric improves; privacy failures disqualify the affected configuration, and trade-offs remain multi-dimensional until the owner approves later selection criteria.
