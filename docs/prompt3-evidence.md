# Prompt 3 Evidence Ledger

| Source | Claim | Category | Architecture relevance | Confidence / status | Caveat |
| --- | --- | --- | --- | --- | --- |
| SIH26171 / `docs/requirements.md` | Local visual processing, local sanitization before server context, server reasoning, and local action validation are required. | FACT | Defines non-negotiable roles and locality boundary. | CONFIRMED | Exact component topology remains open. |
| `docs/prompt2-evidence.md` | SIH weights are known; formulas, thresholds, browser/device conditions, and aggregation are absent. | FACT | Prevents numerical ranking and fixed acceptance claims. | CONFIRMED | Public mirrors are not official rubric authority. |
| [Chrome tabs API](https://developer.chrome.com/docs/extensions/reference/api/tabs) | Visible-tab capture requires permission and is rate-limited/expensive. | FACT | Capture strategy and benchmark variables. | CONFIRMED | Target Chrome version/hardware remains owner-required. |
| [MDN captureVisibleTab](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/tabs/captureVisibleTab) | Firefox capture permission behavior has version differences. | FACT | No universal capture assumption. | CONFIRMED | Actual target-version behavior needs live test. |
| [MDN scripting](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/scripting/executeScript) | Chrome/Firefox injection differs when frame permissions are incomplete. | FACT | Frame-aware observation/execution validation. | CONFIRMED | Page-type support matrix not yet set. |
| [Chrome MV3 lifecycle](https://developer.chrome.com/docs/extensions/develop/concepts/service-workers/lifecycle) and [MDN background scripts](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Background_scripts) | Chrome service worker and Firefox nonpersistent background mechanisms have lifecycle constraints. | FACT | Do not depend on durable in-memory state. | CONFIRMED | Exact persistence/storage policy unresolved. |
| [ONNX Runtime Web](https://onnxruntime.ai/docs/get-started/with-javascript/web.html) | WASM is broadly listed; WebGPU coverage/operator support is browser dependent and Firefox WebGPU is absent from current table. | FACT | Requires runtime detection/fallback evaluation. | CONFIRMED | No selected runtime/model. |
| [Transformers.js](https://huggingface.co/docs/transformers.js/guides/webgpu) | WebGPU support varies and Firefox may require a flag. | FACT | Cannot assume GPU parity. | CONFIRMED | Actual candidate model compatibility unknown. |
| Prompt 3 safe browser inventory | Only Codex in-app browser was available; no extension-attached browser profile appeared. | FACT | Playwright extension connection cannot be validated. | NOT VERIFIABLE IN CURRENT SESSION | In-app browser is not a proxy for configured extension mode. |
| Hybrid observation and gate-owned transport | Explicit component separation can improve auditability and prevent accidental direct egress. | PROPOSED | Candidate architecture C and privacy gate. | Needs threat model and tests | Not an official SIH topology. |
| Fail-closed on detector/sanitizer/gate uncertainty | Privacy invariant favors denial over raw export. | PROPOSED | Failure handling. | Needs owner UX decision | Scope and exceptions unknown. |
| Final visual model/runtime/quantization | Choice depends on task/data/device benchmarks. | OWNER-REQUIRED / BENCHMARK-DEPENDENT | Defers final selection. | Unresolved | No approved benchmark yet. |

## Subsequent evidence note

The row describing Prompt 3 browser inventory remains accurate historical evidence for that session. On 2026-10-04, Prompt 4 completed a bounded runtime verification through Chrome Profile 8. See `human-verification.md` and `prompt4-evidence.md`. The later result supersedes only the current Playwright connectivity status; it does not retroactively change the Prompt 3 observation or prove PrivateSight product behavior.

