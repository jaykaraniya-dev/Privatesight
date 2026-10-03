# Human Verification Record

## HV-001 — Playwright MCP TodoMVC runtime verification

- **Date:** 2026-10-04 (Asia/Calcutta project date)
- **Status:** `CONFIRMED`; manually enabled and experimentally verified
- **Browser:** Chrome
- **Dedicated profile:** Profile 8
- **Connection:** Playwright MCP extension-attached existing browser session
- **URL:** `https://demo.playwright.dev/todomvc/#/` (target supplied as `https://demo.playwright.dev/todomvc`)
- **Observed title:** `React • TodoMVC`
- **Initial visible todo items:** none
- **DOM/page observation:** the TodoMVC heading and the `What needs to be done?` textbox were observable through the Playwright accessibility snapshot
- **Screenshot:** `docs/evidence/playwright-todomvc-before.png`
- **Screenshot SHA-256:** `A8D1D7F5078DFDE1A73B136D6B0E106A4C7CC22D3D7AA65F9AF089ADD0AD41D9`
- **Safe interaction:** entered and submitted `PrivateSight Test`
- **Observed result:** the page contained `PrivateSight Test` and displayed `1 item left`

### Verification result

```text
Chrome Profile 8
Playwright MCP: PASS
TodoMVC access: PASS
DOM/page inspection: PASS
Screenshot: PASS
Safe interaction: PASS
Result verification: PASS
```

### What this establishes

This run establishes live access to an existing tab through the configured Playwright MCP path, page title and DOM/state observation, screenshot capture, a harmless interaction, and observation of the resulting state.

### Limitations

This run does not establish PrivateSight extension behavior, Chrome/Firefox parity, production browser support, cross-machine reliability, privacy containment, network-channel control, security isolation, model capability, resource use, latency, or regression-test coverage. The screenshot records the initial empty state; the post-interaction state is supported by the observed Playwright snapshot, not a second screenshot.

The temporary todo remained visible when cleanup was checked. Removal was attempted through the same Playwright connection, but the later action and follow-up inspection calls did not return. Cleanup is therefore `MANUAL-VERIFICATION-REQUIRED`; no claim is made that the item was removed. The item contains only the synthetic text `PrivateSight Test` and no private data.

## New human-gated checks

Any new check requiring profile selection, extension permission, authentication, connector approval, browser exposure, or visual judgment remains `MANUAL-VERIFICATION-REQUIRED` until the action is performed and observable evidence is recorded. Credentials, tokens, cookies, and private account sessions must never be requested or captured.
