# Research and Reference Intake

## Evidence rules
- **Fact:** directly present in an authoritative supplied source.
- **Observation:** directly visible or audible in a supplied artifact.
- **Attributed claim:** stated by a third party but not independently verified.
- **Inference:** interpretation that needs confirmation.
- **Recommendation:** proposed next step, not a requirement.

No copyrighted source has been reproduced here. The notes retain only facts and observations needed for PrivateSight.

## Source classification

| Source | Classification | Why and useful content |
| --- | --- | --- |
| User-supplied SIH26171 problem text and evaluation weights | Directly relevant; authoritative for this project | Defines the problem, prototype expectation, privacy boundary, vision requirement, server loop, browser families, and five weighted criteria. Metric formulas and thresholds are absent. |
| `A:\Downloads\SIH2026-IDEA-Presentation-Format.pptx` | Directly relevant for submission format; user-identified official template | Seven-slide source deck. Slide 7 requires at most six submitted slides including title, concise points/diagrams/pictures, retention of template prompts, deletion of the instruction slide, and PDF upload. It does not define technical scoring. |
| `A:\Downloads\SIH reference material.pdf` | Partially relevant | Unofficial presentation guide with examples for slides 2-6. Useful for later communication structure: solution clarity, technical workflow, feasibility/risk, impact, and evidence. Its “winning” advice and example claims are not SIH rules. |
| `A:\Downloads\SIH guide.pdf` | Background/reference only | One-page secondary guide with presentation and delivery advice plus promotional links. It repeats the six-slide rule but provides no authoritative citations for most claims. |
| `A:\Downloads\SIH 2025 Winning team ppt draft.pdf` | Background/reference only; provenance unverified | Six-slide GeoGuards rockfall deck visually follows the template sections. It is unrelated to PrivateSight. The filename calls it a winning-team draft, but the PDF metadata is anonymous and the artifact itself does not verify winner status. |
| YouTube URL `https://www.youtube.com/watch?v=21QXH-ubidQ` | Directly relevant competitor reference; URL page inaccessible in this intake | Direct fetch failed and search did not identify the page. The web source therefore could not supply title, channel, description, captions, or provenance. |
| `competitor-01/IEM SUPERNOVA.mp4`, transcript, and timestamped frames | Directly relevant local competitor evidence | Local video, TurboScribe transcript, and frames through 05:47 were inspectable. The local filename/content suggest correspondence to the supplied URL, but exact URL-to-file identity was not independently verified. |

## Competitor/reference matrix

| Reference | Demonstrated workflow | Direct UI/visual observations | Attributed technical claims | Privacy/security evidence status | Performance/evaluation evidence |
| --- | --- | --- | --- | --- | --- |
| IEM Supernova local video | Store a local profile, request form completion, populate a student form, display a sanitized view, send an emoji in Google Meet, mask faces/names in a captured view, and request confirmation before ending a call. | Dark extension panel shows “Privacy Shield,” backend connection, current action, sensitive-region count, a local-profile section, prompt/chat controls, and a collapsible sanitized-view preview. Form fields become populated. A separate sanitized screenshot replaces values with semantic labels. Meet frames show boxes over faces and names. | Narration/slides claim Manifest V3, DOM plus regex fusion, an optimized MobileViT via ONNX Runtime Web, WebGPU/WASM workers, semantic coordinate tokens, TLS 1.3, FastAPI, an open-weights VLM, Chrome Debugger/CDP execution, INT8 quantization, private deployment, and zero-knowledge proofs. None is verified from code, network traces, model files, or benchmarks. | Visual masking is demonstrated in saved/captured views. The footage does not show outbound payload capture, gate implementation, network requests, server logs, or bypass testing. A “raw PII sent to server: 0” UI claim is not proof. Local profile values are visible in the demo footage; their synthetic status is not established. | “Zero client lag,” low overhead, reduced payload/token cost, and prevention of failures are narration claims. No device, task protocol, measurements, accuracy, resource data, or latency distribution is shown. |

## Useful competitor timestamps

| Timestamp | Direct observation | Evidence limitation |
| --- | --- | --- |
| 00:09 | Proposed-solution slide for on-device visual perception. | Slide claim only. |
| 01:12 | Technical-approach slide with local/client and server flow. | Architecture cannot be verified from the video. |
| 02:30 | Feasibility/viability slide. | Contains qualitative claims without measurements. |
| 03:12 | Impact/benefits slide. | Market and impact claims are unverified. |
| 04:21 | Extension local-profile form is visible. | Values appear personal-like; synthetic status is unknown. |
| 04:37 | User asks the extension to fill the form. | Does not expose the action protocol. |
| 04:42 | Student registration form is populated. | No deterministic replay or correctness check is shown. |
| 04:51 | Extension displays a sanitized-view preview and semantic-token message. | The displayed preview is not proof of the transmitted payload. |
| 04:58 | Sanitized screenshot shows masked values with labels while preserving page layout. | No region-ground-truth or redaction metric is shown. |
| 05:19 | Google Meet workflow and extension status show 12 sensitive regions hidden. | Count and detector behavior are not independently validated. |
| 05:29-05:33 | Captured Meet view visibly masks faces and name regions. | Precision, recall, tracking stability, and browser conditions are unknown. |
| 05:47 | Live Meet view shows the unmasked local source. | Expected local visibility may be intentional; outbound handling is not shown. |

## Transferable findings for PrivateSight
- The form and Meet workflows are useful candidates for later benchmark scenarios, subject to owner approval and synthetic fixtures.
- Preserving layout while replacing sensitive values may help server reasoning, but utility and residual-identification risk must be measured.
- A region count or “privacy active” badge is useful feedback, but it cannot serve as security evidence.
- Confirmation before consequential actions is a useful reference behavior; PrivateSight has not adopted an action-risk policy.
- Competitor architecture labels should become research hypotheses only after code, model, network, and benchmark evidence is available.

## Reference gaps
- No authoritative full SIH rubric, metric formulas, thresholds, or judging protocol was supplied.
- No source code or reproducible benchmark accompanies the competitor video.
- No PrivateSight Figma file, Notion space, Drive project folder, or GitHub repository has been identified.
- No permitted visual/browser PII dataset or frozen browser benchmark is available.

## Prompt 4 dataset-source verification

Current publisher pages were used only to corroborate source identity and card-level metadata; they do not approve legal use or validate quality claims. The local `pii_train` folder maps to `redmadrobot-rnd/pii_train`, and `Privasis-Zero` maps to `nvidia/Privasis-Zero`. Ai4Privacy pages continue to point to custom/additional terms. Exact local source commits and candidate-specific limits are recorded in `dataset-audit.md`, `data-licensing.md`, and `prompt4-evidence.md`.

## Prompt 2 evidence research

The Prompt 2 evidence ledger is in [`prompt2-evidence.md`](prompt2-evidence.md). It records current primary documentation for Chrome/Firefox capture and scripting, permissions and extension messaging, ONNX Runtime Web and Transformers.js execution paths, and browser-agent benchmark resources.

Key findings:

- Chrome and Firefox provide visible-tab capture, but capture requires extension permissions and has browser-specific restrictions and rate/cost considerations.
- DOM observation, content-script access, screenshot capture, and action execution are separate capabilities with different permissions and frame restrictions.
- ONNX Runtime Web documents a broad WebAssembly path and browser-dependent accelerated paths. Current documentation does not support assuming WebGPU parity in Firefox.
- ScreenSpot/ScreenSpot-Pro provide GUI grounding precedents; WebArena and BrowserGym provide browser-task precedents. None is a complete PII/redaction/privacy-gate benchmark for PrivateSight.
- Public SIH26171 repositories are competitor references only. Their claims are not performance or security evidence without reproducible inspection.

