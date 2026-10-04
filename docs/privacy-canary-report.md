# Privacy Canary Report

**Gate D result:** PASS for instrumented pilot channels  
**Schema:** `pilot-outbound-summary-1.0.0`

## Canary set

Unique synthetic markers cover names, emails, accounts, credentials, private messages, documents, access tokens, private URLs, uncertain QR-like data, and other protected fixture values. None corresponds to a real secret or person.

## Automated result

- 13 non-control observed events contained no prohibited marker.
- One controlled raw-canary negative event was detected, marked `BLOCKED`, and set `stop_test: true`.
- The pilot status is PASS because every real pilot outbound event was safe and the deliberately leaking negative control was blocked.

## MCP corroboration

The captured auth-case POST body contained only the case ID and `[REDACTED:username]` / `[REDACTED:password]`. Its SHA-256 was `5a0b9d5f4d3c222df20487938cf975d23c439b3670e03c02055f7a41e179b28e`; no `PS-CANARY` marker was present.

## Scope

This demonstrates that the scanner exposes deliberately leaked fixture markers at the instrumented boundary and that the current controlled HTTP payloads are sanitized. It does not prove total network containment or production privacy-gate security.

Sources: [`src/pilot/canary.cjs`](../src/pilot/canary.cjs), [`src/pilot/outbound-observer.cjs`](../src/pilot/outbound-observer.cjs), and ignored `artifacts/pilot/current/privacy-canary.json`.
