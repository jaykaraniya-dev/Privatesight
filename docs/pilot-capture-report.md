# Pilot Capture Report

**Result:** PASS  
**Evidence type:** measured project result on controlled synthetic fixtures

## Automated capture

Playwright 1.63.0 launched installed Google Chrome 154.0.8037.95 in headless fixture mode. It captured all 12 locally served cases at 1280×720. Every case produced aligned screenshot, DOM HTML, structured DOM, ARIA snapshot with boxes, rendered-text region, task, and capture metadata artifacts.

The automated integration run verified that the case ID, URL, title, viewport, scroll state, browser version, screenshot dimensions, artifact locators, and hashes resolve for each case. The two independent runs had identical hashes for the six content-bearing artifact kinds in every case.

## Playwright MCP validation

The existing attached Chrome session was used against `case-auth-001` on the controlled local server. Observed:

- title: `Synthetic authentication · PrivateSight Pilot`;
- accessibility snapshot saved to ignored `artifacts/pilot/mcp-auth-snapshot.yml`;
- screenshot saved to ignored `artifacts/pilot/mcp-auth-before.png`;
- safe outbound action completed with status `Sanitized summary accepted`;
- POST `/collector` returned 202;
- captured body was `{"case_id":"case-auth-001","summary":["[REDACTED:username]","[REDACTED:password]"]}`;
- no `PS-CANARY` marker appeared in that body.

MCP locator click attempts timed out while waiting for stability. A page-context click on the same controlled button completed and the resulting UI and request were observed. This is recorded as an interaction-tool limitation, not a product result.

## OCR qualification path

`dom-rendered-text-surrogate@1.0.0` records rendered text, bounding geometry, a deterministic confidence value, and case linkage. It validates artifact alignment only. It cannot establish pixel OCR recall, recognition quality, or OCR robustness.

## Limits

The capture does not establish production extension behavior, Firefox parity, cross-device repeatability, total network containment, or model accuracy. Generated evidence remains under ignored `artifacts/pilot/` and contains only controlled synthetic values.
