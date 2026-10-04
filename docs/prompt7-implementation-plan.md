# Prompt 7 Controlled Pilot Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use `superpowers:executing-plans` to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build and qualify a small synthetic browser corpus, aligned capture and annotation pipeline, contamination/split machinery, fixture benchmark harness, privacy canary observer, and environment fingerprint without selecting a final model, OCR engine, runtime, or architecture.

**Architecture:** Versioned source fixtures in `pilot/` drive a deterministic local page server. Focused CommonJS modules under `src/pilot/` generate manifests, capture controlled Chrome pages through Playwright 1.63, create aligned annotations, apply QA and contamination checks, assign pilot-only roles, execute internal fixture metrics, scan instrumented outbound events for synthetic canaries, and write ignored runtime artifacts under `artifacts/pilot/`.

**Tech Stack:** Node.js 24, Node built-in test runner, Playwright 1.63.0, installed Google Chrome, JSON/JSONL, HTML/CSS/JavaScript.

**Spec:** `docs/prompt6-experimental-plan.md`, focused Prompt 6 work-package documents, Prompt 5 owner decisions D-01 through D-12, and the owner-supplied Prompt 7 contract dated 2026-10-04.

## Global Constraints

- Synthetic and controlled non-personal data only; `datasets/raw/` remains untouched.
- Generated runtime artifacts live under ignored `artifacts/pilot/`.
- Phase 1 uses Chrome desktop on Windows; Firefox remains staged.
- High-risk or uncertain sensitive content fails closed.
- `PILOT_HOLDOUT` is pre-freeze qualification data and is never called official frozen evaluation.
- All metrics are labeled `PRIVATESIGHT INTERNAL METRIC` or `MEASURED PROJECT RESULT`; no official SIH formula is inferred.
- The DOM-derived text-region extractor is a `TEST INFRASTRUCTURE DEPENDENCY`, not a final OCR selection or pixel-OCR accuracy result.
- No commit, push, final model, final runtime, or final architecture selection is authorized.

## Review Focus

- A malformed or incomplete lineage record must be rejected before capture.
- Any box, mask, or OCR geometry outside screenshot bounds must fail annotation QA.
- Related family/template/generator/identity/source/task cases must not cross pilot roles.
- A prohibited synthetic canary in an observed outbound event must stop that event and produce evidence.
- Fixture-mode expected metrics must be hand-derived and reproducible across repeated runs.

---

### Task 1: Pilot definitions, manifests, and deterministic generation

**Files:**
- Create: `pilot/config/cases.v1.json`
- Create: `pilot/config/contamination-thresholds.v1.json`
- Create: `src/pilot/schema.cjs`
- Create: `src/pilot/generator.cjs`
- Test: `tests/unit/pilot-schema.test.cjs`
- Test: `tests/unit/pilot-generator.test.cjs`

**Interfaces:**
- Produces: `validateCaseDefinition(value)`, `loadCaseDefinitions(path)`, `buildCaseManifest(caseDefinition, environment)`, and deterministic HTML rendering.

- [x] Write manifest and deterministic-generation tests first.
- [x] Run them and confirm missing modules/behavior fail for the expected reason.
- [x] Implement minimal schema, definitions, and generator behavior.
- [x] Run tests and record green output.

### Task 2: Controlled server and aligned browser capture

**Files:**
- Create: `src/pilot/server.cjs`
- Create: `src/pilot/capture.cjs`
- Test: `tests/integration/pilot-capture.test.cjs`
- Test: `tests/e2e/pilot.spec.ts`

**Interfaces:**
- Consumes: Task 1 definitions and renderer.
- Produces: `startPilotServer()`, `capturePilotCases(options)`, screenshots, DOM/ARIA/text-region/task/browser metadata, and artifact hashes.

- [x] Write failing local-server and capture alignment tests.
- [x] Run them and confirm expected failure.
- [x] Implement the deterministic server and Chrome capture path with Playwright 1.63 APIs verified through Context7.
- [x] Run the focused integration test.
- [x] Run the pilot build/generation step before the browser test, then run the browser test.

### Task 3: Annotation generation and QA

**Files:**
- Create: `src/pilot/annotation.cjs`
- Create: `src/pilot/qa.cjs`
- Test: `tests/unit/pilot-annotation.test.cjs`
- Test: `tests/unit/pilot-qa.test.cjs`
- Test: `tests/integration/pilot-annotation-flow.test.cjs`

**Interfaces:**
- Consumes: aligned capture bundle.
- Produces: versioned annotations and QA records with `PASS`, `REVIEW`, `REANNOTATE`, `QUARANTINE`, or `FAIL`.

- [x] Write failing tests for required units, invalid coordinates, conflicting annotations, invalid references, and complete valid bundles.
- [x] Run and confirm expected failures.
- [x] Implement minimal annotation and QA behavior.
- [x] Run focused and integration tests.

### Task 4: Contamination calibration and pilot split

**Files:**
- Create: `src/pilot/contamination.cjs`
- Create: `src/pilot/split.cjs`
- Test: `tests/unit/pilot-contamination.test.cjs`
- Test: `tests/unit/pilot-split.test.cjs`

**Interfaces:**
- Consumes: QA-approved case bundles, versioned thresholds, and lineage.
- Produces: pair/group contamination reports and `PILOT_TRAIN`, `PILOT_VALIDATION`, or `PILOT_HOLDOUT` assignments.

- [x] Write failing tests using deliberately similar and deliberately different fixtures.
- [x] Verify failures.
- [x] Implement configurable exact/normalized/near text, byte-histogram image, layout, and lineage checks.
- [x] Implement deterministic family-level role assignment and cross-role guard.
- [x] Run tests and record pilot calibration observations without universal claims.

### Task 5: Fixture benchmark harness

**Files:**
- Create: `src/pilot/metrics.cjs`
- Create: `src/pilot/benchmark.cjs`
- Test: `tests/unit/pilot-metrics.test.cjs`
- Test: `tests/integration/pilot-benchmark.test.cjs`

**Interfaces:**
- Consumes: declared case set, annotations, fixture predictions, split manifest, and environment metadata.
- Produces: per-case and aggregate internal visual-context, PII, redaction, resource, and latency results.

- [x] Write failing tests with hand-derived TP/FP/FN, redaction misses, successes/failures, and latency segments.
- [x] Verify failures.
- [x] Implement metric functions and deterministic fixture modes.
- [x] Run focused and integration tests twice and compare normalized result payloads.

### Task 6: Privacy canaries and outbound observation

**Files:**
- Create: `src/pilot/canary.cjs`
- Create: `src/pilot/outbound-observer.cjs`
- Test: `tests/unit/pilot-canary.test.cjs`
- Test: `tests/integration/pilot-outbound.test.cjs`

**Interfaces:**
- Consumes: canary registry and observed HTTP/console/server-payload events.
- Produces: pass/fail event records, evidence hashes, observed and unobserved channel lists.

- [x] Write failing tests proving safe payloads pass and raw canaries stop the relevant event.
- [x] Verify failures.
- [x] Implement scanning and observed-channel instrumentation.
- [x] Run focused and integration tests, preserving the expected negative-fixture evidence separately from the safe pilot result.

### Task 7: Environment fingerprint and end-to-end runner

**Files:**
- Create: `src/pilot/environment.cjs`
- Create: `scripts/pilot-cli.cjs`
- Test: `tests/unit/pilot-environment.test.cjs`
- Test: `tests/integration/pilot-run.test.cjs`
- Modify: `package.json`

**Interfaces:**
- Consumes: Tasks 1–6.
- Produces: one versioned `artifacts/pilot/` qualification run and environment record.

- [x] Write failing tests for required metadata and orchestration failure propagation.
- [x] Verify failures.
- [x] Implement environment probing with explicit unavailable reasons and the end-to-end CLI.
- [x] Run the full Node test suite and the controlled Playwright test.
- [x] Run the pilot twice and compare deterministic artifacts while excluding declared run-time fields.

### Task 8: Playwright MCP validation, reports, and repository gates

**Files:**
- Create: the 12 remaining Prompt 7 reports and `docs/prompt7-evidence.md`
- Update: `PROJECT.md`, `README_FIRST.md`, relevant roadmap/risk/decision/testing/evaluation/tooling/audit documents

**Interfaces:**
- Consumes: measured artifacts and fresh verification output.
- Produces: the Prompt 7 evidence package and gate decision.

- [x] Start the controlled local server and use Playwright MCP on a generated case.
- [x] Capture the page title, accessibility snapshot, screenshot, safe interaction/result, and network observation without personal data.
- [x] Generate all human-readable reports directly from observed artifacts.
- [x] Run complete tests, repeated benchmark comparison, raw-data integrity check, secret/session-state audit, Markdown-link validation, `git diff --check`, and changed-file review.
- [x] Apply `superpowers:verification-before-completion` before any PASS claim.

## Execution ledger

- `Ruling:` Prompt 6 plus the owner-supplied Prompt 7 contract constitute the approved architectural specification and inline execution choice. Cost if wrong: an additional design-review pause would be required.
- `Ruling:` use a DOM-derived rendered-text region artifact as an OCR alignment surrogate because no OCR engine is selected or installed. It cannot support OCR-accuracy claims and is labeled accordingly.
- `Ruling:` use ignored `artifacts/pilot/` for generated screenshots and run outputs; commit only source fixtures, code, tests, and concise reports.

## Plan status

The plan was approved by the owner-supplied execution request and executed inline with TDD. Every checked item has corresponding failing-then-passing or measured qualification evidence in the test output and `docs/prompt7-evidence.md`.
