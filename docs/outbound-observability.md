# Outbound Observability

**Status:** qualified for bounded controlled channels

| Channel | Instrumented | Pilot result | Limitation |
| --- | --- | --- | --- |
| HTTP collector payload | yes | 12 sanitized requests passed | local controlled collector only |
| server payload negative control | yes | synthetic leak blocked | fixture injection, not a live external server |
| browser console | yes | observed events passed | console listener in the controlled Playwright context |
| Playwright MCP network request | yes, one auth case | sanitized body observed, HTTP 202 | one controlled case/session |
| WebSocket | no | unobserved | no current pilot WebSocket path |
| telemetry | no | unobserved | no current telemetry integration |
| error/crash reporting | no | unobserved | no current reporter integration |
| service-worker/extension messaging | no | unobserved | extension pipeline is not implemented |
| browser cache, IndexedDB, clipboard, temp files | no | unobserved | outside the current outbound hook |

The controlled server retains request bodies only in process memory for the qualification run. Result artifacts retain hashes and canary IDs, not raw canary values. Any future outbound channel must be added to the observation contract before a broader privacy claim.

The privacy stop condition is immediate for a non-control event containing a prohibited marker. The current runner throws when the summary is not PASS.
