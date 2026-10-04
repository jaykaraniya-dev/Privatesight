# Testing Strategy

Status: Prompt 7 qualification infrastructure is implemented and tested; production PrivateSight behavior is not implemented.

## Required evidence as implementation develops
1. Unit tests for isolated logic.
2. Integration tests at component boundaries.
3. Playwright Test for deterministic browser regression; build/package before treating browser tests as meaningful.
4. Playwright MCP for interactive browser investigation, inspection, and debugging.
5. ML evaluation with frozen final evaluation data, per-label metrics, false-positive/negative analysis, and reproducible experiment metadata.
6. Security/privacy tests, including evidence that raw sensitive context cannot bypass the privacy gate or reach any outbound channel.

## Current qualification evidence

Node unit tests cover manifests, generation, annotation schema, coordinates, QA, contamination, split guards, metrics, canaries, environment, and reproducibility normalization. Integration tests cover generation/capture, annotation/QA, benchmark fixtures, outbound canary observation, CLI behavior, and the full run. Playwright Test covers a generated Chrome case. Playwright MCP independently inspected one controlled auth case and its sanitized HTTP payload.

These tests exercise test infrastructure and synthetic fixtures. They do not exercise a production extension, trained detector, pixel OCR, server model, or final privacy gate.

## Artifacts and privacy
Store Prompt 7 runtime evidence under ignored `artifacts/pilot/` and framework traces under ignored test-result locations. Fixtures use synthetic markers only. Never automate against a personal browser profile.

## Acceptance
Tie test suites to confirmed product requirements and the operational metric protocol in `evaluation-metrics.md`; do not invent thresholds. Preserve and investigate failures rather than suppressing them.
