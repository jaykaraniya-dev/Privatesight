# Tooling and Knowledge Architecture

## System roles

| System | Role |
| --- | --- |
| Local repository | Engineering source of truth: code, tests, dataset inventory, experiments, reports, and reconciled documentation. |
| GitHub | Source control, branches, commits, pull requests, issues, and implementation history after a matching repository is verified. |
| Notion | Planning summaries, decisions, research summaries, milestones, and development log after the PrivateSight space is identified. |
| Google Drive | SIH/reference documents and supporting files when their identity is confirmed. |
| Figma | PrivateSight UI/UX source when a relevant design file is supplied. |
| Playwright MCP | Interactive browser inspection, interaction, and visual evidence. |
| Playwright Test | Repeatable browser and extension regression after a build exists. |
| Context7 | Current third-party framework/library documentation when needed. |
| OpenAI developer resources | Current OpenAI product/API documentation when needed. |
| Local artifact tools | Read-only extraction and visual inspection of supplied PPTX/PDF files. |

## Prompt 1 availability and use
- Local repository and attached local files were accessible.
- The supplied PPTX and three PDFs were inspected locally. They were not copied into the repository.
- The local competitor MP4, transcript, and frames were inspected. Raw profile values visible in the footage were not copied into project documentation.
- Direct web access to the supplied YouTube URL failed, and search did not identify the page. Channel metadata and URL-to-local-file identity remain unverified.
- The Prompt 0 baseline found no matching GitHub repository or Google Drive project source. Prompt 1 supplied local files, so generic Drive results were not used.
- No actual PrivateSight Notion space or Figma file was identified. No Notion synchronization or Figma work was performed.
- Context7 and OpenAI developer documentation were not needed because Prompt 1 made no implementation technology decision.
- `.codex/config.toml` declares Playwright MCP extension mode, and Prompt 0 observed an extension-status tab. A live page connection, DOM inspection, screenshot, and interaction remain unverified.
- The workspace still has no `.git` metadata; branch, dirty state, remote, and history cannot be established.

## Prompt 2 verified technical sources

- Chrome and Firefox extension documentation confirms separate permission-controlled paths for visible-tab capture, DOM/content-script access, script injection, and messaging.
- ONNX Runtime Web documentation confirms WebAssembly and browser-dependent WebGPU/WebGL/WebNN execution paths; current support tables do not establish Firefox WebGPU parity.
- Transformers.js documents WebGPU execution with browser/feature-flag caveats.
- ScreenSpot, ScreenSpot-Pro, WebArena, and BrowserGym were reviewed as benchmark references. None is accepted as a PrivateSight privacy/redaction dataset without separate rights and fit review.

## Prompt 3 live-verification status

The safe browser inventory for Prompt 3 contained only Codex's in-app browser and no extension-attached Chrome/Firefox profile. The configured Playwright MCP extension connection is therefore **not verifiable in the current session**. No live navigation, DOM inspection, screenshot acquisition, interaction, or resulting-state observation was claimed.

## Use rules
- Verify source identity before granting an external system authority.
- Keep raw candidate datasets local.
- Use Playwright MCP for exploratory browser evidence and Playwright Test for deterministic regression; configuration alone proves neither.
- Verify browser behavior with browser tooling rather than source inspection.
- Record current documentation sources at decision time; do not research technologies merely to exercise a connector.

