# Browser Architecture

## Component placement

| Context | Appropriate responsibilities | Must not be assumed | Status |
| --- | --- | --- | --- |
| Page context | Untrusted rendered page input and ordinary page events. | A trusted source of commands or a complete accessibility representation. | CONFIRMED. |
| Content script | Permission-scoped DOM observation, local overlays, narrow execution requests. | Access to all extension APIs, unrestricted frames, or safe page messages. | CONFIRMED capability; interface PROPOSED. |
| Background/service worker | Permission coordination, local message routing, gate invocation, server-call ownership. | Permanent process lifetime or browser-identical lifecycle. | PROPOSED. |
| Local inference layer | Local model/rule execution on approved inputs. | Universal WebGPU, model/operator compatibility, or no memory pressure. | PROPOSED. |
| Server communication layer | Send only gate-approved sanitized packages. | Raw context or arbitrary content-script message forwarding. | CONFIRMED boundary objective; mechanism PROPOSED. |
| Action executor | Execute only local-validator-approved actions. | Coordinate-only action safety or server authority. | PROPOSED. |

## Chrome / Firefox capability matrix

| Capability | Chrome | Firefox | Permission / constraint | Evidence | Status |
| --- | --- | --- | --- | --- | --- |
| Visible-tab capture | `tabs.captureVisibleTab`; Chrome documents `activeTab` or `<all_urls>` and max two calls/sec. | `browser.tabs.captureVisibleTab`; `activeTab` works from Firefox 126; older versions required `<all_urls>`. | Sensitive/restricted-page and file-URL behavior differs. | [Chrome](https://developer.chrome.com/docs/extensions/reference/api/tabs), [MDN](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/tabs/captureVisibleTab) | CONFIRMED API fact; target-version support OWNER-REQUIRED. |
| Runtime script injection | `scripting` API in MV3; `scripting` plus host access or `activeTab`. | `scripting.executeScript` in MV3 from Firefox 101. | Firefox can return partial-frame results with missing host access; Chrome rejects whole injection when any target lacks permission. | [Chrome](https://developer.chrome.com/docs/extensions/reference/api/scripting), [MDN](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/scripting/executeScript) | CONFIRMED. |
| Content scripts | Isolated world; messaging to extension. | Content scripts have limited extension APIs; host permissions required. | Restricted pages and page-to-extension message validation apply. | [Chrome](https://developer.chrome.com/docs/extensions/develop/concepts/content-scripts), [MDN](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Content_scripts) | CONFIRMED. |
| Background coordinator | MV3 extension service worker with lifecycle limits. | MV3 non-persistent background scripts/page; lifecycle differs from Chrome service worker. | No design may assume persistent in-memory state. | [Chrome](https://developer.chrome.com/docs/extensions/develop/concepts/service-workers/lifecycle), [MDN](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Background_scripts) | CONFIRMED. |
| `activeTab` least-privilege access | Temporary access after user action. | Temporary access after user action. | Scope ends with navigation; frames and restricted URLs need testing. | [Chrome](https://developer.chrome.com/docs/extensions/develop/concepts/declare-permissions), [MDN](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json/permissions) | CONFIRMED. |
| Page accessibility-tree extraction | No verified generic page AX-tree WebExtension API in project evidence. | No verified generic page AX-tree WebExtension API in project evidence. | DOM ARIA attributes are not a browser accessibility-tree export. | Prompt 2 evidence review | UNKNOWN. |
| Cross-origin frames | Injection/access depends on host permissions and frame targets. | Same principle, but partial-result behavior differs. | Must test same-origin, cross-origin, sandboxed, and restricted frames separately. | [MDN](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/scripting/executeScript) | CONFIRMED constraint; support matrix OWNER-REQUIRED. |
| WebAssembly local inference | ONNX Runtime Web documents support. | ONNX Runtime Web documents support. | Model/operator/resource fit still unknown. | [ORT support table](https://onnxruntime.ai/docs/get-started/with-javascript/web.html) | CONFIRMED runtime capability. |
| WebGPU local inference | Current ORT table supports Chromium variants subject to versions. | Current ORT table does not list Firefox WebGPU support. | Browser/driver/version must be detected and benchmarked. | [ORT support table](https://onnxruntime.ai/docs/get-started/with-javascript/web.html) | CONFIRMED limitation. |

## Permission and message-boundary implications

- **CONFIRMED:** content scripts and extension contexts communicate through messages; host permissions and `activeTab` influence what can be observed or injected.
- **PROPOSED:** treat every incoming page/content-script message as untrusted typed data and permit only a narrow, local schema.
- **PROPOSED:** keep network-capable server communication in one extension-owned coordinator after privacy-gate approval.
- **OWNER-REQUIRED:** initial permissions, optional host permissions, incognito policy, supported page categories, and browser parity target.

## Playwright MCP verification

**Result: NOT VERIFIABLE IN CURRENT SESSION.**

The repository declares `npx @playwright/mcp@latest --extension`, which is configuration evidence only. The current safe browser inventory showed only the Codex in-app browser and no extension-attached Chrome/Firefox browser profile. No navigation, DOM read, screenshot, interaction, or state change was performed through Playwright MCP. The in-app browser is not a substitute for testing the configured extension connection.

To obtain a live result, owner/operator must provide a dedicated clean Chrome/Edge profile with the Playwright MCP extension connected, then rerun the harmless TodoMVC sequence defined in `tools/playwright-mcp/SETUP.md`.

