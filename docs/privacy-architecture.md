# Privacy and Outbound-Data Architecture

## Trust boundary

The requirement that sensitive context be sanitized before network transmission is **CONFIRMED**. A dedicated fail-closed gate, exact allowlist, and enforcement placement are **PROPOSED** pending owner threat-model approval.

## Candidate gate contract

**PROPOSED:** only one local component may construct server-bound requests. It accepts a candidate sanitized package, validates its schema and provenance, rejects forbidden fields and unresolved detections, and emits either an approved package or a deny result. No detector, content script, UI page, logger, or model wrapper should independently call the server.

## Outbound-path inventory

| Channel | Can carry sensitive data? | Required control | Validation method | Status |
| --- | --- | --- | --- | --- |
| HTTP/HTTPS, `fetch`, XHR | Yes | Route server calls through gate-owned allowlist. | Instrument request bodies; synthetic canary tests. | PROPOSED. |
| WebSocket / streaming | Yes | Prohibit or gate frame payloads until separately approved. | Capture frames and assert canary absence. | PROPOSED. |
| Content-script / extension messaging | Yes | Typed minimal messages; reject arbitrary page payloads. | Contract and hostile-page tests. | PROPOSED. |
| Service-worker coordination | Yes | No raw forwarding beyond local process boundary. | Message trace and canary tests. | PROPOSED. |
| Browser/extension storage, IndexedDB, caches | Yes | Minimize retention; encrypt/delete policy only after owner decision. | Storage inspection using synthetic fixtures. | OWNER-REQUIRED retention policy. |
| Logs, debug output, crash reporting, telemetry | Yes | Default deny raw fields; scrub and disable unapproved sinks. | Log/trace canary scan. | PROPOSED. |
| Clipboard, temporary files, screenshots, traces | Yes | Do not create/export raw artifacts unless explicitly approved. | Artifact inventory and canary scan. | PROPOSED. |
| Automation, plugin, or tool channels | Yes | Treat as outbound endpoints subject to the same gate. | End-to-end channel inventory. | PROPOSED. |
| Server payloads and retention | Yes | Server receives only allowed schema and follows approved retention policy. | Server request/retention audit. | OWNER-REQUIRED. |

## Protected versus candidate-exportable data

| Data class | Must remain local | Potentially exportable only after sanitization | Status |
| --- | --- | --- | --- |
| Raw screenshots, pixels, video frames | Yes where sensitive content may exist. | Redacted/derived visual representation. | CONFIRMED local protection; representation PROPOSED. |
| Raw DOM/accessibility/OCR text | Yes where it contains sensitive values. | Semantic placeholders, roles, sanitized labels. | CONFIRMED local protection; schema OWNER-REQUIRED. |
| Credentials, tokens, secrets, account details | Yes. | No raw form; whether any categorical placeholder is useful is OWNER-REQUIRED. | CONFIRMED. |
| Faces/visual identifiers | Yes. | Redacted region or nonidentifying placeholder. | CONFIRMED objective; method PROPOSED. |
| Coordinates/layout | Unknown re-identification risk. | Only under approved schema and leakage test. | OWNER-REQUIRED. |

## Failure behavior

- **PROPOSED:** sanitizer failure, detector failure, unknown page type, timeouts, malformed package, or untrusted message must prevent server export.
- **OWNER-REQUIRED:** user notification, retry, local-only alternative, and whether any low-risk exception exists.
- **CONFIRMED:** server responses never authorize bypassing local validation.

