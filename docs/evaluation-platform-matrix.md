# Evaluation Platform Matrix

**Status:** `OWNER-APPROVED INITIAL MATRIX`. No production support matrix or performance result is established.

## Evidence boundary

The only live browser evidence is the bounded Chrome Profile 8 TodoMVC verification recorded in `human-verification.md`. It proves an existing Playwright-connected Chrome tab could be inspected and changed on one machine. It does not establish extension behavior, Firefox parity, privacy containment, or performance.

The repository is currently operated on Windows. The exact Windows release, browser versions, hardware, graphics driver, runtime versions, and power state for a benchmark have not been fixed.

## Owner-approved browser matrix

Phase 1: Chrome desktop on the reference Windows environment. Phase 2: Firefox desktop on the same OS class after Phase 1 acceptance evidence. Exact browser versions must be recorded for every run; no universal compatibility claim is authorized.

## Browser matrix to approve

| Browser target | Candidate scope | Capabilities that require separate verification | Current status | Owner decision |
| --- | --- | --- | --- | --- |
| Chrome | Phase 1 development, demo, and internal benchmark | Extension lifecycle, capture, permissions, content scripts, frames, DOM access, network controls, action execution, WASM/WebGPU | `APPROVED SCOPE`; bounded Playwright connection only | Record exact version/channel |
| Firefox | Phase 2 comparison after Chrome acceptance | WebExtension differences, capture, permissions, background lifecycle, frames, DOM access, network controls, action execution, WASM/WebGPU | `DEFERRED`; no live PrivateSight evidence | Record version when Phase 2 starts |
| Staged Chrome then Firefox | One browser for early corpus/benchmark work, second before compatibility claims | Repeat identical cases and report differences rather than assuming parity | `PROPOSED` option | Approve stages and claim boundary |
| Parallel Chrome and Firefox | Both browsers represented from the first frozen protocol | Requires matched capture and execution infrastructure | `PROPOSED` option | Approve matched scope and versions |

Browser chrome, privileged pages, extension pages, PDFs, cross-origin frames, canvas/video content, and ordinary web content must be listed as separate capability classes. Success in one class cannot be generalized to another.

## Owner-approved operating-system scope

| OS | Possible role | Required evidence | Status |
| --- | --- | --- | --- |
| Windows | Primary development and reference benchmark platform | Exact release/build, display scaling, power mode, browser version, driver/runtime versions | `APPROVED SCOPE` |
| Linux | Optional compatibility or reference platform | Distribution/kernel, display stack, browser/runtime versions, hardware match | `OWNER-REQUIRED` |
| macOS | Optional compatibility or reference platform | OS/device generation, browser/runtime versions, graphics path | `OWNER-REQUIRED` |

An OS not selected for the benchmark may still be explored, but its results must be reported as separate evidence.

## Owner-approved hardware classes

These are neutral benchmark candidates, not selected tiers.

| Candidate class | Why it matters | Metadata required | Status |
| --- | --- | --- | --- |
| CPU-only or accelerated path disabled | Establishes the WASM/CPU fallback cost on the reference device | CPU model and core policy, RAM, thread count, power state | `APPROVED REQUIRED FALLBACK` |
| Integrated graphics with WebGPU where available | Represents the current development PC class | GPU, driver, shared memory, WebGPU adapter/features | `APPROVED REFERENCE CLASS` |
| Discrete graphics with WebGPU where available | Measures acceleration without implying minimum hardware | GPU, driver, VRAM, adapter/features, power state | `OWNER-REQUIRED` |
| Lower-memory reference device | Tests resource constraints and failure behavior | CPU, RAM, GPU, OS, browser, background-load policy | `DEFERRED` |

The owner approved the integrated-GPU reference class and CPU/WASM fallback on the current development-PC class. Discrete-GPU and lower-memory classes are deferred. Unmatched hardware remains in separate comparison groups.

## Runtime capability matrix

| Runtime/capability | Potential role | Evidence boundary | Required verification | Status |
| --- | --- | --- | --- | --- |
| WebAssembly | CPU fallback/local execution | Existing research treats it as a broad browser path; no PrivateSight benchmark exists | Browser/version/operator coverage, threading, SIMD, memory, cold/warm behavior | `BENCHMARK-DEPENDENT` |
| WebGPU | Accelerated local execution | Availability and operator behavior vary by browser, OS, adapter, and runtime | Adapter availability, fallback behavior, operator coverage, memory, correctness | `BENCHMARK-DEPENDENT` |
| WebGL | Possible legacy graphics path | Existing runtime analysis treats support and maintenance as runtime-specific | Current runtime support, operator coverage, accuracy, resource cost | `UNKNOWN` |
| WebNN | Possible browser-native neural API | Coverage and maturity are not established for the target matrix | Browser/version/OS availability and model operator coverage | `UNKNOWN` |
| ONNX Runtime Web | Candidate inference layer | Feasibility depends on execution provider and converted model | Version, model/operator compatibility, quantization, WASM/WebGPU behavior | `BENCHMARK-DEPENDENT` |
| Transformers.js | Candidate model-loading/inference layer | Model and backend compatibility are model-specific | Version, supported task/model, backend, quantization, bundle/load cost | `BENCHMARK-DEPENDENT` |

## Required run metadata

Every benchmark result must record:

- corpus, annotation, protocol, code, model, preprocessing, and policy versions;
- browser name, exact version/channel, profile type, and extension build;
- OS version, display scale, viewport, zoom, theme, and locale;
- CPU, RAM, GPU, driver, adapter, runtime/backend, threads, and quantization;
- network conditions for measurements that cross the server boundary;
- cold/warm state, cache policy, background-load policy, power mode, and run order;
- failures, fallbacks, timeouts, unsupported operators, and excluded runs.

## Comparison rules

- Compare candidates on the same locked corpus, protocol, platform, and run conditions.
- Report unmatched platforms separately.
- Record fallback execution as a distinct result rather than combining it with accelerated runs.
- Do not infer Chrome/Firefox, GPU/CPU, or OS parity from one successful run.
- Do not publish a support claim until the required capability classes pass on the approved matrix.

## Owner decisions

The owner approved D-11 and D-12 for a Chrome/Windows reference run plus CPU/WASM fallback. The stated reference class is an Intel i5 8th-generation, 16 GB RAM, Intel UHD 630-class integrated-graphics Windows machine; the exact CPU model, OS build, driver, browser, and runtime versions must be captured before measurement. Unmatched devices remain separate groups.
