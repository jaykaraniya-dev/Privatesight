# PrivateSight Agent Rules

## Mission
Build PrivateSight as a privacy-focused, testable, reproducible software/ML project.

## Mandatory context
Before changing anything:
1. Read `AGENTS.md`.
2. Read `PROJECT.md` if present.
3. Read relevant `docs/` files.
4. Inspect the existing implementation.
5. Search for existing utilities/components before adding new ones.

## Source of truth
- Code and engineering artifacts: repository.
- Project planning/knowledge sync: Notion when connected.
- Reference materials: `references/` and connected Drive sources.
- UI designs: Figma when supplied.

## Development
- One logical change at a time.
- Avoid unrelated refactors.
- Do not silently change architecture.
- Document significant decisions.
- Prefer current official documentation for changing libraries/APIs.

## Testing
- Unit tests for isolated logic.
- Integration tests for component boundaries.
- Playwright Test for deterministic browser regression.
- Playwright MCP for browser interaction, inspection, and debugging.
- Build before declaring browser tests meaningful.
- Never ignore failing tests.

## ML
- Separate train/validation/test.
- Keep final evaluation data untouched by training/model-selection decisions.
- Report precision, recall, F1 and per-label metrics.
- Analyze false positives and false negatives.
- Version datasets and experiment configurations.
- Never commit private raw PII.

## Security/privacy
- Never commit secrets.
- Never upload real personal data to an external service unless explicitly authorized and appropriate.
- Prefer synthetic data for development.
- Minimize collection and retention.
- Record security/privacy decisions.

## Documentation
When behavior or architecture changes, update relevant docs and the development log.

## Completion
A task is complete only after acceptance criteria, relevant tests, and documentation gates pass.
