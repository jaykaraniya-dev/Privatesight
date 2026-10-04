# Reference Environment

**Evidence:** observed during Prompt 7 qualification  
**Artifact schema:** `pilot-environment-1.0.0`

| Field | Observed value |
| --- | --- |
| CPU | Intel Core i5-8500 @ 3.00 GHz, 6 logical processors, x64 |
| RAM | 16,966,168,576 bytes |
| GPU | Intel UHD Graphics 630 |
| GPU driver | 31.0.101.2114 |
| Display scale | 96 DPI, scale factor 1 |
| Power scheme | Balanced |
| OS | Windows 11 Pro, release/build `10.0.26200`, x64 |
| Browser | Google Chrome `154.0.8037.95` |
| Node.js | `v24.21.0` |
| Playwright | `1.63.0` |
| Benchmark | `privatesight-pilot-benchmark-1.0.0` |
| Git commit at capture | `b4de8da708282bca646e5b8deb197892ca32a6b4` with working tree changes |
| Execution backend | `PLAYWRIGHT_CHROME_FIXTURE` |
| Model | `NONE_FIXTURE_MODE` |
| OCR path | `dom-rendered-text-surrogate@1.0.0` |
| WASM/WebGPU | not used |

The fingerprint is embedded in each benchmark result and saved as ignored `artifacts/pilot/current/environment.json`. The working tree was intentionally dirty because Prompt 5–7 documentation and implementation were under review. This is a qualification environment record rather than a clean-release benchmark identity.
