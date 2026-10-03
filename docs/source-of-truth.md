# Source of Truth and Conflict Resolution

## Hierarchy
Use this order when information conflicts:

1. Authoritative SIH problem statement and evaluation criteria supplied by the user.
2. Explicit PrivateSight requirements and constraints supplied by the user.
3. `AGENTS.md`.
4. `PROJECT.md`.
5. Reconciled project documentation under `docs/`.
6. Existing implementation.
7. Older assumptions, design notes, guides, competitor material, and marketing claims.

## Evidence labels
Every material claim must be identified as one of:
- official source;
- explicit user requirement;
- repository policy;
- direct observation;
- measured result;
- attributed third-party claim;
- inference;
- recommendation;
- unresolved question.

A proposal, example, competitor behavior, or publisher claim cannot silently become a project requirement.

## Current authoritative intake
- The SIH26171 problem statement and five evaluation weights were supplied directly by the user and are authoritative for this project.
- The user identifies `A:\Downloads\SIH2026-IDEA-Presentation-Format.pptx` as the official SIH presentation template. Its slide 7 controls submission format.
- No independently hosted full SIH rubric or problem-statement file has been verified.
- `A:\Downloads\SIH reference material.pdf`, `A:\Downloads\SIH guide.pdf`, the prior-team draft, and the competitor video are reference evidence only.
- Dataset cards and bundled licenses describe upstream claims and terms; they do not by themselves approve use.

## Ownership
- **Local repository:** code, tests, dataset inventory, experiment artifacts, reports, and engineering documentation.
- **GitHub:** source control and implementation history only after the matching repository is identified.
- **Notion:** planning summaries, decisions, milestones, and development history only after the actual PrivateSight space is identified.
- **Google Drive:** authoritative reference files only when source identity is confirmed.
- **Figma:** UI/UX design source only when a PrivateSight design is supplied.
- **Playwright MCP:** interactive browser inspection and debugging evidence.
- **Playwright Test:** deterministic browser regression evidence.
- **Context7/OpenAI developer resources:** current technical documentation when a technology decision requires it.

Do not copy raw candidate data or personal information into connected systems. Keep concise source notes and links instead of duplicating copyrighted artifacts.

## Conflict resolutions from Prompt 1
- The official SIH text makes a working client/server prototype and end-to-end task explicit; earlier Prompt 0 language that treated all workflows as unknown was updated.
- Chrome and Firefox are named browser families, while exact versions and parity remain unresolved.
- WebGPU, WebAssembly, ONNX Runtime Web, Transformers.js, DOM tags, bounding boxes, and masking styles remain examples rather than selected requirements.
- Competitor confirmation behavior and semantic tokenization remain reference ideas.
- Publisher `test` splits remain upstream splits and are not PrivateSight final evaluation by default.

## Prompt 2 evidence ownership

`docs/prompt2-evidence.md` is the canonical ledger for current browser/runtime documentation, benchmark references, metric-boundary options, evidence classifications, and Prompt 3 entry conditions. It does not promote any proposed formula, benchmark, runtime, or model into a confirmed requirement.

`docs/prompt3-evidence.md` is the canonical ledger for architecture-level claims and decision states. The focused architecture documents own their named concerns; they do not approve a topology, model, runtime, or browser support matrix.

