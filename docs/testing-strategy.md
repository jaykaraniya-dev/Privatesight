# Testing Strategy

Status: repository scaffold only; no PrivateSight-specific behavior has been implemented or validated.

## Required evidence as implementation develops
1. Unit tests for isolated logic.
2. Integration tests at component boundaries.
3. Playwright Test for deterministic browser regression; build/package before treating browser tests as meaningful.
4. Playwright MCP for interactive browser investigation, inspection, and debugging.
5. ML evaluation with frozen final evaluation data, per-label metrics, false-positive/negative analysis, and reproducible experiment metadata.
6. Security/privacy tests, including evidence that raw sensitive context cannot bypass the privacy gate or reach any outbound channel.

## Current scaffold evidence
The repository has a generic Playwright config and one placeholder test that navigates to `example.com`. It does not exercise a PrivateSight extension, privacy gate, or local detection behavior. `.codex/config.toml` declares Playwright MCP extension mode, but that declaration alone proves neither service initialization nor browser verification. No browser behavior is claimed by this document.

## Artifacts and privacy
Store useful traces/screenshots/reports under `artifacts/test-results/` when future tests generate them. Ensure artifacts do not retain real private PII. Use synthetic fixtures where practical and never automate against a personal browser profile.

## Acceptance
Tie test suites to confirmed product requirements and the operational metric protocol in `evaluation-metrics.md`; do not invent thresholds. Preserve and investigate failures rather than suppressing them.
