# Problem Definition

## Authoritative problem
**Problem ID:** SIH26171  
**Title:** On-device Visual Perception for Light-weight Browser Agents

PrivateSight must enable browser-agent assistance without sending raw sensitive screen context to a server. A lightweight local vision component must read the user's screen and contribute to local decisions. When server reasoning is required, the client must first detect and sanitize sensitive information. The server receives only anonymized, unidentifiable context and returns processed data or a browser action for local execution.

This definition comes from the official SIH problem text supplied by the user. The repository contains no independent official problem-statement file.

## Required outcome
The required prototype has a browser client and a server. The client observes browser state, performs local visual processing, detects and redacts sensitive information before network access, and executes validated actions. The server interprets sanitized context with an LLM/VLM and returns a response or actionable command. The prototype must demonstrate one end-to-end task.

## Intended users and personas

| Persona | Evidence status | Need |
| --- | --- | --- |
| Browser user handling potentially sensitive pages | Inferred directly from the official problem background | Receive browser assistance without exposing raw sensitive context to a server. |
| SIH evaluator or demo operator | Confirmed delivery stakeholder from the SIH submission context | Observe a working client/server prototype and evaluate the five weighted dimensions. |
| Accessibility user | Reference-only persona shown in competitor narration | Private assistance for navigation or form workflows; not yet a confirmed PrivateSight requirement. |
| Enterprise or regulated-sector user | Reference-only persona shown in competitor narration | Privacy-controlled automation; not yet a confirmed target segment. |

Specific age groups, industries, locales, accessibility needs, and organizational buyers remain open.

## Primary user journey
1. The user asks the browser agent to assist with a task.
2. The client observes the relevant screen and browser context locally.
3. Local components detect sensitive text and visual regions.
4. The client sanitizes or redacts that context locally.
5. A hard privacy gate rejects raw sensitive context and allows only sanitized context to cross the network boundary.
6. A server-side LLM/VLM interprets the sanitized representation when needed.
7. The server returns processed data or a structured browser action.
8. The client validates the result or action and executes allowed behavior in the browser.

Form interaction, click, and scroll are named examples. Exact workflows, action schema, confirmation rules, and recovery behavior remain unresolved.

## Functional scope
- Local screen-state evaluation using a ViT or equivalent computer-vision model.
- Dynamic sensitive-data detection and local sanitization before network transmission.
- Visual redaction capable of supporting examples such as faces, passwords, and PII.
- Transmission of anonymized visual context to a centralized LLM/VLM.
- Structured response or action return, local validation, and browser execution.
- Chrome and Firefox consideration for the client-side extension/JavaScript component.

DOM tags, accessibility data, OCR, regex, bounding boxes, masks, and semantic obfuscation are possible techniques. The official text does not require one specific combination.

## Non-functional scope
- Privacy by default and local processing where practical.
- Low client CPU, memory, GPU, and energy use, with exact measures still open.
- Low end-to-end task latency, with timing boundaries and thresholds still open.
- Accurate visual understanding, sensitive-data detection, and redaction.
- Reproducible evaluation and maintainable browser engineering.

## Constraints and dependencies
- Client resources are expected to be lower than server resources.
- Modern browser capabilities such as WebGPU and WebAssembly are available examples, not guaranteed minimum dependencies.
- The server model may be an offline-deployable open-source/open-weights model; a cloud-hosted version is permitted during SIH according to the supplied proposed solution.
- Network and provider retention terms, supported browser versions, operating systems, device classes, and offline behavior are not defined.

## Success and acceptance
Source-supported success requires a working client/server prototype that demonstrates local visual processing, local sensitive-data sanitization, sanitized-context transmission, server reasoning, and a completed browser task. Evaluation must cover the five official weighted dimensions.

Acceptance thresholds, formulas, sample sizes, task suite, target devices, and aggregation rules are unresolved. The project cannot claim SIH acceptance or performance from the weights alone.

## Out of scope for Prompt 1
Product implementation, final architecture selection, final model selection, training, dataset merging or relabeling, raw-data modification, production deployment, and invented metric thresholds.

