# Experimental Readiness Acceptance Gates

Date: 2026-10-04
Status: `SPECIFIED`; no gate has passed through execution evidence.

## Gate record

Every gate result records scope/version, evidence reviewed, `PASS` or `FAIL`, failure reason, corrective action, responsible role, stop condition, reviewer, timestamp, and artifact hashes. A document saying a gate exists is not evidence that it passed.

## Gate A — Corpus readiness

Pass requires:

- source rights/provenance and intended operations cleared;
- synthetic/controlled non-personal status verified;
- persistent case/artifact IDs and complete lineage;
- required screenshot, DOM, semantic/accessibility, OCR, task, outcome, and metadata artifacts present or explicitly unavailable;
- required annotation layers complete under locked versions;
- annotation QA outcome `ACCEPT`;
- contamination methods/version applied and every flag resolved;
- family grouping available for later role assignment.

Failure stops the affected cases before role assignment. Corrective action is source clearance, regeneration, recapture, reannotation, quarantine, or rejection.

## Gate B — Evaluation readiness

Pass requires:

- role manifests created after contamination grouping;
- frozen-build procedure, custodian/backup, hidden labels, access controls, access log, immutable version, and hashes ready;
- benchmark metric and failure-accounting protocol versioned;
- harness qualified on non-frozen hand-checkable fixtures;
- complete measurement/artifact logging;
- exact browser, OS, hardware, driver, runtime, display, cache, power, and network/server metadata captured;
- reproducibility result and known variance recorded.

Failure blocks frozen scoring and comparison claims. Corrective action is protocol repair, instrumentation repair, platform stabilization, or a new release version.

## Gate C — Privacy readiness

Pass requires:

- owner-approved fail-closed behavior encoded as test expectations;
- prohibited outbound-data schema and approved derived fields versioned;
- synthetic canaries seeded in pixels, DOM/semantic content, OCR, browser state, logs, errors, and payload fields within scope;
- outbound-channel tracing capable of exposing bypass;
- sanitizer/gate failure, timeout, unsupported content, and uncertainty cases present;
- qualification evidence shows prohibited content blocked and sanitized-only packages emitted for permitted cases.

Any prohibited release is an automatic failure and blocks all outbound/server experiments for the affected path until root cause, fix, and clean requalification evidence exist.

## Gate D — Experimental readiness

Pass requires:

- reproducible non-frozen benchmark cases and manifests;
- Baselines A/B/C definitions and experiment registrations complete;
- one primary variable and fixed controls declared per controlled experiment;
- metric outputs validated against hand-checkable cases;
- timing/resource/outbound instrumentation synchronized by trace ID;
- requested versus actual runtime provider and fallback recorded;
- run artifacts, failures, deviations, and environment metadata complete;
- stop conditions are executable by the operator/harness.

Failure blocks candidate comparison. Corrective action is to fix the case, metric, instrumentation, environment, or experiment design and issue a new version/run.

## Gate sequence

Gate A precedes role assignment. Gate B is required before frozen evaluation. Gate C is required before any experiment that sends a package across the privacy boundary. Gate D is required before candidate model/runtime comparison. Development-only local diagnostics may occur on synthetic demo fixtures but cannot be reported as benchmark evidence.

## Numerical thresholds

No corpus-size, annotation-agreement, performance, resource, latency, or contamination threshold is established by these gates. Any later numeric value must be labeled `INTERNAL ENGINEERING TARGET`, supported by pilot evidence, approved, and versioned; it remains separate from official SIH rules.
