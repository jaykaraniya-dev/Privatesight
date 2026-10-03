# Extension Tests

This folder is reserved for tests against a built PrivateSight browser extension. No extension implementation or extension-specific tests exist yet. The current Playwright smoke test is not an extension test.

Potential future categories, subject to confirmed product scope, include popup/options, content/background behavior, permission handling, local detection/redaction UX, lifecycle, cross-page behavior, and Chrome/Firefox regressions. Include tests that demonstrate raw sensitive context cannot leave through any outbound path. Use a dedicated controlled browser profile, not a personal profile. See `docs/testing-strategy.md`.
