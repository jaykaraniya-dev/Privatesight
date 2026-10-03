# Playwright MCP Setup for Codex on Windows

The repository declares `npx @playwright/mcp@latest --extension` in `.codex/config.toml`. On 2026-10-04, the configured path was runtime verified through dedicated Chrome Profile 8 against TodoMVC, including existing-tab access, DOM/page inspection, screenshot capture, one harmless interaction, and resulting-state observation. See `docs/human-verification.md`. This does not verify PrivateSight product behavior or serve as deterministic regression coverage. Recheck current official Playwright MCP instructions before changing installation/configuration commands; package tags using `latest` are mutable and are not a reproducible version pin.

## What you install

There are two separate things:

1. Playwright MCP server — gives Codex browser-control tools.
2. Playwright Test (`@playwright/test`) — the repository's automated testing framework.

The official Playwright MCP is maintained by Microsoft in the `microsoft/playwright-mcp` GitHub repository.

## Prerequisites

Install Node.js 20+ (use the current supported Node LTS when possible).

Verify:
`node --version`
`npm --version`
`npx --version`

## A. Playwright MCP — normal mode

Codex CLI can register it with:
`codex mcp add playwright npx "@playwright/mcp@latest"`

Or configure Codex:
```toml
[mcp_servers.playwright]
command = "npx"
args = ["@playwright/mcp@latest"]
```

The first browser use downloads the required browser automatically.

## B. Playwright MCP — extension mode

For testing an existing browser profile with an installed browser extension:

```toml
[mcp_servers.playwright]
command = "npx"
args = ["@playwright/mcp@latest", "--extension"]
```

Install the official Playwright browser extension in the Chrome or Edge profile you intend to automate.

For PrivateSight, use a dedicated test profile rather than a personal browser profile.

You can pin the profile with:
`--profile-dir-name=Profile 1`

Example:
```toml
[mcp_servers.playwright]
command = "npx"
args = ["@playwright/mcp@latest", "--extension", "--profile-dir-name=Profile 1"]
```

## C. Playwright Test inside the repository

From the repository root:
`npm install -D @playwright/test@latest`
`npx playwright install`

Create/run tests with:
`npx playwright test`

Optional UI mode:
`npx playwright test --ui`

## Important distinction

GitHub is not where Playwright Test is "connected".

- GitHub integration = repository/version-control capability.
- Microsoft Playwright MCP GitHub repository = the source code/distribution reference for the MCP server.
- `@playwright/test` = npm package installed in this repository.
- Playwright MCP = MCP server used by Codex.

## Verification

Ask Codex:
"Use Playwright MCP to navigate to https://demo.playwright.dev/todomvc and report the page title."

Then:
"Run the repository Playwright Test suite and report pass/fail with artifacts."
