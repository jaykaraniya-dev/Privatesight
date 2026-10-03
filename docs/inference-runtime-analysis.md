# Local Inference Runtime Analysis

No runtime is selected. This analysis describes viable families and their documented limits.

| Runtime / path | Browser coverage | CPU/WASM | GPU path | Model format | Quantization | Operational complexity | Limitations | Status |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| ONNX Runtime Web — WASM | Current ORT table lists Chrome/Edge, Safari, and Firefox. | Yes. | None required. | ONNX. | Model-dependent; must be tested. | Moderate packaging/operator review. | CPU resource and latency may limit visual workloads. | CONFIRMED capability. |
| ONNX Runtime Web — WebGPU | Current ORT table lists Chromium paths with version conditions. | Fallback required. | WebGPU. | ONNX with supported operators. | Model-dependent; must be tested. | Driver/browser/operator detection. | Current table does not list Firefox WebGPU; only subset of accelerated operators supported. | CONFIRMED limitation. |
| ONNX Runtime Web — WebGL | Listed broadly by ORT. | No. | WebGL. | ONNX. | Model-dependent. | Moderate. | ORT documents WebGL as maintenance mode. | CONFIRMED capability; PROPOSED fallback use. |
| ONNX Runtime Web — WebNN | Narrower documented support and browser flags. | Possible CPU device path. | Platform-dependent. | ONNX. | Model-dependent. | High detection/fallback burden. | Not established as cross-browser target. | CONFIRMED availability caveat. |
| Transformers.js | Browser JavaScript library backed by supported execution paths. | Available through runtime path. | Documents WebGPU option. | Supported converted models. | Supported options depend on model/runtime; verify per candidate. | Higher model/repository and conversion compatibility review. | Firefox/WebGPU caveats; not proof that a needed detector is deployable. | CONFIRMED capability; candidate use PROPOSED. |
| Browser-native DOM/canvas APIs | Browser-dependent but baseline web APIs. | N/A. | N/A. | N/A. | N/A. | Low for observation/redaction rendering. | Do not solve visual PII localization alone. | CONFIRMED supporting capability. |

Sources: [ONNX Runtime Web](https://onnxruntime.ai/docs/tutorials/web/), [ORT browser support](https://onnxruntime.ai/docs/get-started/with-javascript/web.html), [Transformers.js WebGPU](https://huggingface.co/docs/transformers.js/guides/webgpu).

## Visual system candidate set

| Family | Useful capabilities | Insufficient alone for | Deployment/benchmark dependency | Status |
| --- | --- | --- | --- | --- |
| Compact ViT / mobile transformer | Feature extraction and possible screenshot understanding. | Guaranteed localization, OCR, masks, or action grounding. | Need task-specific localization/redaction evaluation and browser fit. | BENCHMARK-DEPENDENT. |
| MobileNet-family backbone | Efficient visual features/classification. | Region localization/masks without a detection head. | Need exported model/operator/resource evidence. | BENCHMARK-DEPENDENT. |
| Lightweight object detector | Box localization for known visual entities. | Full text PII, exact masks, broad screen semantics. | Needs target taxonomy and box data. | BENCHMARK-DEPENDENT. |
| Segmentation model | Pixel-level mask candidate. | Semantic PII recognition or browser understanding by itself. | Needs mask data and browser-memory evidence. | BENCHMARK-DEPENDENT. |
| OCR + lightweight vision | Text-in-pixels plus visual regions. | DOM semantics, robust faces, full action grounding alone. | Needs language/zoom/font and residual-leakage benchmarks. | BENCHMARK-DEPENDENT. |
| DOM + OCR + vision | Broader coverage through specialization. | Simplicity, low cost, or safe fusion by default. | Needs ablation and leakage/resource benchmarks. | BENCHMARK-DEPENDENT. |

## Selection criteria

The final visual system must be compared on: screen-state utility, local PII recall/precision by modality, redaction coverage and residual leakage, model/package size, peak memory, cold/warm latency, browser support, operator availability, and degradation/fallback behavior. No named model may be selected until an approved benchmark and device/browser matrix exist.

