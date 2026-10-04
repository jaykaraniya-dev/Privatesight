# Runtime Experiment Plan

Date: 2026-10-04
Status: `SPECIFIED`; no runtime is selected and no performance measurement exists.

## Documentation snapshot

| Runtime/API | Current documentation consulted | Capability evidence | Experimental implication |
| --- | --- | --- | --- |
| Playwright | Context7 `/microsoft/playwright/v1.63.0` | Page screenshots, locator/state assertions, and trace/snapshot inspection are documented | Use for deterministic fixture/capture harness work; do not infer extension behavior |
| ONNX Runtime Web | Context7 `/microsoft/onnxruntime/v1.25.0` | Web package exposes execution-provider configuration; current source/docs show WASM, WebGPU, WebNN registration and WebGL as a low-priority/beta path | Verify package build, model operators, actual provider, correctness, fallback, and performance on the reference browser/device |
| Transformers.js | Context7 `/huggingface/transformers.js` current repository documentation; no version returned | Browser configuration supports `device: 'webgpu'` when available, WASM default/fallback behavior, dtype/quantization options, and remote-model controls | Pin a package/revision before experiments; benchmark each model/backend/config and control remote loading/cache |
| WebGPU | Current MDN WebGPU/Navigator.gpu documentation | Requires secure context and runtime feature/adapter/device detection; broad availability cannot be assumed | Record `navigator.gpu`, adapter/device/features/limits, driver, failures, and fallback |
| WebAssembly | Current MDN WebAssembly JavaScript API documentation | WebAssembly JavaScript API is broadly available, with feature-level variation | Treat CPU/WASM as required fallback but record threads/SIMD/build/browser support |
| Chrome visible-tab capture | Current Chrome Extensions Tabs documentation | Captures active visible tab with permissions; documented call-rate constraint | Keep capture schedule below documented limits and measure actual cost; permission behavior is a separate test |
| Firefox visible-tab capture | Current MDN WebExtensions tabs documentation | Visible active-tab capture exists with permission/version differences | Defer to Phase 2 and test separately |
| WebNN | No sufficiently authoritative Context7 result was consulted for target support | Target support remains unknown | Defer; do not include in Phase 1 comparison without a new documentation/runtime verification gate |

Documentation establishes APIs and configuration surface, not accuracy, resource use, or latency.

## Experiment factors

| Factor | Candidate levels | Controls |
| --- | --- | --- |
| Backend | CPU/WASM; integrated-GPU/WebGPU where available | Same model artifact/export, inputs, preprocessing, browser, run protocol |
| Runtime layer | Direct ONNX Runtime Web candidate; Transformers.js candidate when task/model is supported | Same task/candidate artifact where a fair mapping exists; otherwise report separate study |
| Input resolution | Versioned resolution/resize policies | Same source cases and coordinate remapping |
| Quantization/dtype | Only configurations supported by candidate/runtime | Same export lineage and evaluation cases |
| OCR configuration | engine/configuration candidates, not selected here | Same screenshot/OCR gold and downstream policy |
| Inference frequency | event-driven or declared interval policies | Same ordered dynamic tasks and browser state sequence |
| Cold/warm state | clean cache/init; warmed session | Same build, case order policy, hardware and power state |

## Required preflight

- pin package versions and model/runtime artifacts;
- record browser/OS/hardware/driver/display/power metadata;
- detect and log requested versus actual provider and silent fallback;
- validate every required model operator and output against a hand-checkable fixture;
- disable or explicitly approve remote model loading; record source revision, hashes, cache state, and transfer size;
- verify secure-context and WebGPU adapter/device availability before GPU runs;
- configure WASM threads/SIMD/workers explicitly and record cross-origin/isolation constraints where applicable;
- verify no raw case content leaves through model download, telemetry, errors, logs, or provider paths.

## Measurement order

Use blocked or randomized run order after a documented warm-up policy. Record cold and warm separately. Baseline browser idle cost precedes workload measurement. An environment change creates a new platform group; results are not pooled with unmatched devices.

## Stop conditions

Stop a configuration on correctness mismatch, unsupported operator, silent provider fallback, browser/device loss, uncontrolled model download, privacy boundary violation, missing metadata, resource-sampler failure, repeated crash, or unexplained variance that prevents comparison.

## Selection boundary

This plan may rule configurations infeasible for a declared task/platform. It cannot name a final runtime, model, OCR engine, quantization, resolution, or schedule until controlled evidence is reviewed in a later decision gate.
