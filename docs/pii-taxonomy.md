# PII and Sensitive-Content Taxonomy

Status: Prompt 1 identified source examples and dataset labels, but no canonical PrivateSight taxonomy has been approved.

## Source-supported categories
The official problem explicitly illustrates:
- faces;
- passwords;
- PII generally.

The user requires protection, where applicable, for:
- text PII and visual PII;
- screenshots, DOM content, and accessibility content;
- credentials and tokens;
- account information;
- sensitive page content and browser state.

These categories define protection concerns, not a finalized annotation label set.

## Candidate text categories seen locally
The dataset audit found names, email, phone, address components, dates/age, usernames, IP/URL, organizations, government and document identifiers, passport, driver's license, tax and social numbers, payment cards, bank/account identifiers, medical/health identifiers, secrets, and contextual attributes. Coverage and label meaning differ substantially by source.

No dataset label may become a project label automatically.

## Representation layers
Future taxonomy work must distinguish:
- raw DOM/accessibility values and nodes;
- text and OCR character spans;
- visual boxes or masks;
- faces and non-text visual identifiers;
- credentials/secrets and structured identifiers;
- contextual sensitivity that cannot be decided from a string alone;
- semantic placeholders preserved after sanitization;
- browser action targets and state.

## Open decisions
Prompt 2 must define mandatory labels, locales/languages, context rules, hierarchy, granularity, overlap policy, annotation unit, visual/text linkage, and redaction behavior. It must also decide which types use models, deterministic rules, user declarations, or combinations.

This file does not authorize relabeling or merging any candidate dataset.

