# Dataset Strategy and Prompt 1 Intake

## Gate status
All 11 folders under `datasets/raw/` remain candidates. Prompt 1 opened only local metadata, cards, licenses, schemas, row headers, and aggregate counts. No raw file was changed, merged, relabeled, trained on, or uploaded.

No candidate is approved as final evaluation data. The collection does not provide screenshots, browser video frames with annotations, DOM/accessibility captures, OCR ground truth, visual boxes or masks, or browser-action traces. It is therefore insufficient evidence for the visual-context, visual PII, redaction-region, browser-state, and action-grounding requirements.

## Candidate assessment

| ID | Candidate | Verified local facts | Suitability decision |
| --- | --- | --- | --- |
| DS-CAND-001 | CoNLL-2003 | English Reuters news NER; 20,744 rows across train/validation/test; PER, ORG, LOC, MISC; copyright/access restrictions described in the card. | Reject for primary PII/redaction and final evaluation. Retain only as a possible general NER baseline after rights review. |
| DS-CAND-002 | Meddies PII | Synthetic multilingual clinical/administrative text; 17 named languages; card uses CC-BY-NC-4.0; many language, mixed, evaluation, instruction, and derived BIOES views. | Research-only text candidate after license and lineage review. Derived views overlap, so it is unsuitable as independent final evaluation. No visual evidence. |
| DS-CAND-003 | Nemotron-PII | 100,000 synthetic English text records; 55+ PII/PHI span classes; 50k train/50k test; CC-BY-4.0 card. | Candidate for text detection training/validation after taxonomy review. Same-generator synthetic test is not an independent final evaluation set. |
| DS-CAND-004 | Open PII Masking 500k | 580,227 local JSONL rows; eight languages; 20 labels; train/validation; synthetic. Card metadata says CC-BY-4.0 while the README imposes Llama Community terms and the dataset-specific `license` file is empty. | Blocked by conflicting/incomplete license evidence. Not final evaluation. |
| DS-CAND-005 | Russian PII benchmark | 2,841 local Russian sentences and 5,614 spans; 21 BIO entity types; production-log-derived text with identifiers replaced plus synthetic documents and hard negatives; MIT stated in card. | Freeze as a possible text-only held-out evaluation candidate pending provenance, privacy, and license confirmation. It cannot evaluate visual/browser behavior. |
| DS-CAND-006 | Russian PII train | 17,137 local Russian sentences and 39,687 spans; same 21-type BIO schema; mixed pseudonymized logs, synthetic documents, and hard negatives; MIT stated in card. | Candidate for Russian text training only. Keep separate from DS-CAND-005; local exact-text overlap was zero, but shared source lineage still requires leakage analysis. |
| DS-CAND-007 | PII Masking 300k | 225,405 local JSONL rows despite the folder name; six languages; 28 labels observed locally; synthetic; train/validation; 23 exact duplicate-text rows. Custom Ai4Privacy license limits use to approved academic/non-commercial purposes and restricts redistribution and derivatives. | Blocked until written-use and redistribution terms are approved. Not final evaluation. |
| DS-CAND-008 | PII Masking 400k | 406,896 local JSONL rows; six languages; 17 labels; synthetic; train/validation; 127 exact duplicate-text rows. Same restrictive Ai4Privacy license family. | Blocked until license approval. Not final evaluation. |
| DS-CAND-009 | PiiScan data | Repository publishes a recipe and 78 synthetic sample rows, not the claimed rebuilt corpus. A manifest claims 1,631,582 derived rows, but those rows are absent locally and depend on mixed upstream licenses. | Reject as a dataset artifact; retain as a provenance/taxonomy recipe reference only. Manifest claims are not local data evidence. |
| DS-CAND-010 | Privasis-Zero | English synthetic text sanitization corpus; card claims 1.3M records; train plus vanilla/hard validation/test; NVIDIA non-commercial research/evaluation license. Hard splits have no reference sanitized output because the source pipeline failed on those records. | Research-only text sanitization candidate. Hard splits cannot support supervised redaction scoring as supplied. No final visual/browser evaluation. |
| DS-CAND-011 | RoBERTa PII Synth | 120,000 fully synthetic English examples; 96k/12k/12k train/validation/test; character spans and token BILOU labels for nine classes; MIT card. | Candidate for text training/validation after quality review. Same-generator synthetic test is not final evaluation. |

## Local overlap and quality checks
- DS-CAND-005 and DS-CAND-006 have zero exact-text overlap locally, consistent with the card's disjoint-row claim. Shared production/synthetic source families still require template and semantic leakage checks.
- DS-CAND-007 has 23 duplicate text rows, DS-CAND-008 has 127, and DS-CAND-004 has 2,930.
- Exact text overlap between the three inspected Ai4Privacy releases was zero for 300k/400k, zero for 300k/500k, and two rows for 400k/500k. This does not rule out template or near-duplicate leakage.
- Meddies explicitly contains mixed and derived views sourced from other configs and external datasets; its named train/eval/test configs are not independent corpora.
- PiiScan's local folder contains only the recipe, schemas, manifests, and 78 demonstration rows. Its large split counts are build claims, not locally present records.
- Privasis hard evaluation records lack gold sanitized outputs according to its card.
- Several publisher cards make quality or privacy claims that were not independently reproduced. They remain attributed claims.

## Modality gap
The current collection may support research on text NER, text-span PII detection, and text sanitization. It does not establish:
- screenshot or video understanding;
- face or visual-identifier localization;
- OCR under browser rendering conditions;
- region or pixel redaction precision;
- DOM/accessibility-to-pixel alignment;
- browser-state understanding or action grounding;
- Chrome/Firefox behavior;
- privacy-gate network enforcement.

Prompt 2 must find permitted visual/browser evidence or define a synthetic browser-data creation and annotation plan for approval.

## Split and contamination controls
- Keep raw folders immutable.
- Assign no training, validation, or final-evaluation role until source identity, license, taxonomy, and lineage are approved.
- Freeze any chosen final evaluation cases before model or architecture selection.
- Check exact, near-duplicate, template, identity, source, and generator leakage across every selected split and modality.
- Treat publisher `test` labels as source splits, not automatically as PrivateSight final evaluation.
- Preserve modality-specific ground truth and never collapse text spans, OCR spans, DOM nodes, visual boxes/masks, and action targets into one unlabeled format.

## License and privacy gate
Cards and bundled licenses are local evidence, not legal approval. CC-BY-NC, NVIDIA non-commercial, custom Ai4Privacy, Reuters, and conflicting Llama/CC-BY claims require explicit review before use. Synthetic status reduces direct-person risk but does not prove accuracy, absence of memorized data, or permission for redistribution.

The full registry is `datasets/dataset-registry.csv`. Unknown fields remain marked unknown.

