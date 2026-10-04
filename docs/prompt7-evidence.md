# Prompt 7 Evidence Ledger

**Date:** 2026-10-04  
**Scope:** controlled pilot corpus, benchmark harness, and bounded privacy qualification

## Evidence ledger

| Claim | Classification | Evidence | Limitation / next action |
| --- | --- | --- | --- |
| Twelve rights-controlled synthetic cases cover eleven qualitative families | `MEASURED PROJECT RESULT` | `pilot/config/cases.v1.json`; run summary | pilot diversity only |
| All cases have complete machine-readable lineage | `MEASURED PROJECT RESULT` | manifests; schema tests | future corpus needs independent audit |
| Screenshot/DOM/ARIA/rendered-text/task artifacts align | `MEASURED PROJECT RESULT` | capture tests; 12 manifests | rendered-text surrogate is not pixel OCR |
| Annotation QA passed 12/12 | `MEASURED PROJECT RESULT` | QA JSONL; tests | no independent human annotation review |
| Similarity utility flagged the deliberate related pair and did not flag the independent control | `MEASURED PROJECT RESULT` | contamination report | thresholds need broader calibration |
| Pilot split preserves hard lineage groups | `MEASURED PROJECT RESULT` | split report; split test | holdout is pre-freeze only |
| Perfect and known-error fixtures validate the metric paths | `MEASURED PROJECT RESULT` | benchmark JSON; unit/integration tests | no model result and no official SIH score |
| Two complete runs match after declared run-time exclusions | `MEASURED PROJECT RESULT` | reproducibility report | one machine/browser class |
| Bounded canary observer blocks a deliberate leak | `MEASURED PROJECT RESULT` | privacy report; outbound tests | uninstrumented channels remain unknown |
| MCP inspected a controlled page and a sanitized POST | `MEASURED PROJECT RESULT` | MCP snapshot, screenshot, request-body artifacts | one attached Chrome session; locator click stability issue |
| Reference environment is fingerprinted | `MEASURED PROJECT RESULT` | environment JSON | dirty working tree; no Firefox or device matrix |
| Raw dataset baseline remains 11 folders, 394 files, 14,154,310,444 bytes | `CONFIRMED` after final integrity check | local filesystem count | raw content was not inspected or changed |

## Current technical documentation

Context7 was used for official Playwright documentation at library ID `/microsoft/playwright/v1.63.0`. Consulted behavior covered Chromium launch with branded Chrome channel, screenshots, request observation, locator bounding boxes, page metadata, and `Locator.ariaSnapshot` with AI/box options. Documentation supports API use only; it is not performance evidence.

## Tool and plugin use

| Tool / plugin | Status | Purpose | Evidence |
| --- | --- | --- | --- |
| Superpowers | USED | plan, TDD, systematic debugging, execution, completion verification | skill workflows and Prompt 7 plan |
| Context7 | USED | current Playwright 1.63 API behavior | library resolution and documentation queries |
| Playwright MCP | USED | inspect controlled auth case, screenshot, accessibility, safe interaction, request body | ignored MCP artifacts and capture report |
| OpenAI Devs | NOT REQUIRED | no OpenAI API/SDK dependency | package and implementation audit |
| Drive | NOT REQUIRED | repository sources were sufficient | scope decision |
| Notion | NOT REQUIRED | prohibited by prompt default | scope decision |
| Figma | NOT REQUIRED | UI design outside gate | scope decision |

## Gate assessment

| Gate | Status | Basis |
| --- | --- | --- |
| A — pilot corpus | PASS | controlled cases, manifests, lineage, aligned artifacts |
| B — annotation | PASS | required units, automated QA, invalid-fixture rejection |
| C — benchmark | PASS | fixture metrics, serialization, environment, repeat comparison |
| D — privacy | PASS, bounded | canary detection and instrumented-channel tests; limitations explicit |

## Remaining blockers before candidate model/runtime experiments

There is no blocker to beginning bounded candidate experiments against these non-frozen pilot fixtures. Results cannot support final selection or production/privacy claims until pixel OCR and candidate outputs are integrated, broader contamination thresholds are calibrated, all candidate outbound channels are instrumented, and a separately governed frozen evaluation set exists.

No final model, OCR engine, runtime, architecture, Firefox support claim, or official SIH formula is selected by Prompt 7.
