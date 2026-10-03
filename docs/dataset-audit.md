# Dataset Audit — Prompt 4

Date: 2026-10-04
Scope: all 11 records in `datasets/dataset-registry.csv`
Safety: metadata and aggregate evidence only; `datasets/raw/` was not modified.

## Audit conclusions

| Finding | Status | Evidence type |
| --- | --- | --- |
| The registry contains 11 candidate datasets and the local raw directory contains 11 matching folders. | CONFIRMED | repository-derived |
| Every candidate is primarily text or text metadata. None supplies browser screenshots, DOM/accessibility snapshots, visual boxes/masks, or action traces. | CONFIRMED | repository-derived |
| No candidate is approved for a final PrivateSight role. | CONFIRMED | documentation-derived |
| Rights, lineage, taxonomy alignment, duplicates, and frozen-set independence must be resolved before any role assignment. | OWNER-REQUIRED | documentation-derived |
| The final training, validation, frozen-evaluation, and demo assignments depend on the missing visual/browser corpus and approved evaluation protocol. | BENCHMARK-DEPENDENT | documentation-derived |

## Source identity and local version evidence

These commit identifiers come from each local Hugging Face cache tree and identify the downloaded snapshot. They do not by themselves establish license rights or publication dates. All cards were present in the workspace on 2026-10-03.

| ID | Source URL | Local source commit |
| --- | --- | --- |
| DS-CAND-001 | `https://huggingface.co/datasets/tner/conll2003` | `b18612dee0007b1f7129731dbf2f5f2ed4039ad3` |
| DS-CAND-002 | `https://huggingface.co/datasets/Meddies/meddies-pii` | `5ef42aa17e42103b8097d05c9a85046178c54627` |
| DS-CAND-003 | `https://huggingface.co/datasets/nvidia/Nemotron-PII` | `b70ffaf5ff39e079776134c5bf4381f00a9fd1ed` |
| DS-CAND-004 | `https://huggingface.co/datasets/ai4privacy/open-pii-masking-500k-ai4privacy` | `506996d625ed970a0063432daf6007cf4a3a48e3` |
| DS-CAND-005 | `https://huggingface.co/datasets/redmadrobot-rnd/pii_benchmark` | `f77ea831274daf980cc45c61a93c226be9d978d6` |
| DS-CAND-006 | `https://huggingface.co/datasets/redmadrobot-rnd/pii_train` | `1a74b9f108bf8c4a5f06c00243ad3bc5c01d6aa5` |
| DS-CAND-007 | `https://huggingface.co/datasets/ai4privacy/pii-masking-300k` | `c8c77895a005822682b66ab547fc0422579bc1d3` |
| DS-CAND-008 | `https://huggingface.co/datasets/ai4privacy/pii-masking-400k` | `414d0a3b5798a152588a0828f1c08a5787de10f4` |
| DS-CAND-009 | registry source `https://github.com/palarnab/piiscan`; local Hugging Face recipe snapshot | `e39cfed5c5637383858fc4d47a5fcc9f25eb78d9` |
| DS-CAND-010 | `https://huggingface.co/datasets/nvidia/Privasis-Zero` | `82b66bc75d0945ba1aec255fff857e83c2ed72ca` |
| DS-CAND-011 | `https://huggingface.co/datasets/tursunait/RoBERTa-pii-synth` | `1f547aa8b3b63d8b16885c77fd28b5c7bb6fedf2` |

## Dataset suitability matrix

Abbreviations: `span` means character/token entity spans; `BIO/BILOU` means token sequence labels. “No” in visual/browser columns means no direct evidence for that capability.

| ID / dataset | Modality | PII coverage | Visual | Browser | Annotation | Localization | Redaction | OCR | Action grounding | Synthetic/real | License | Provenance | Contamination risk | Train | Validation | Frozen evaluation | Demo | Overall status | Unresolved questions |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| DS-CAND-001 CoNLL-2003 | English news text | PER/ORG/LOC/MISC; general NER | No | No | token BIO | text only | No | No | No | real Reuters text | RESTRICTED/UNCLEAR | Reuters/T-NER described | Reuters lineage and unknown near duplicates | baseline only after rights review | unsuitable | reject | text demo only | Reject primary use | Corpus agreement and redistribution rights |
| DS-CAND-002 Meddies PII | multilingual clinical/admin text | seven canonical families plus derived URL/secret labels | No | indirect text resemblance only | inline tags, spans, BIOES | text only | text substitutions | No | No | synthetic | RESTRICTED/UNCLEAR | publisher card; derived views | high overlap among configs and upstream-derived views | research candidate after review | text only after grouped split | reject independent final | text demo | Research-only candidate | Exact lineage, commercial limits, independent split construction |
| DS-CAND-003 Nemotron-PII | English structured/unstructured text | 55+ PII/PHI categories | No | form-like text only | character spans | text only | supports text masking labels | No | No | synthetic | REQUIRES_REVIEW | NVIDIA card | same-generator/template risk | candidate after taxonomy review | text only | reject independent final | text demo | Text candidate | Generator/template overlap and fit to project taxonomy |
| DS-CAND-004 Open PII Masking 500k | multilingual text | 20 observed labels | No | form/chat-like text only | spans, masks, token labels | text only | text masking | No | No | synthetic | RESTRICTED/UNCLEAR | card plus bundled conflicting terms | 2,930 duplicate texts; 2 exact overlaps with DS-008 | blocked | blocked | reject | blocked | License conflict | Which terms govern use and derivatives |
| DS-CAND-005 `pii_benchmark` | Russian text | 21 person/address/contact/document types | No | No | token BIO | text only | No region labels | No | No | hybrid | REQUIRES_REVIEW | publisher card; production-log-derived claim | shared lineage with DS-006; no exact overlap found | do not train | quarantine only | possible text sub-benchmark after review | text demo | Freeze pending review | Consent/provenance of log-derived text and benchmark independence |
| DS-CAND-006 `pii_train` | Russian text | same 21 types as DS-005 | No | No | token BIO | text only | No region labels | No | No | hybrid | REQUIRES_REVIEW | publisher card; source URL recorded locally | shared lineage with DS-005; no exact overlap found | candidate after review | not independent of DS-005 | reject overall final | text demo | Training candidate | Source/license confirmation and family-level leakage |
| DS-CAND-007 PII Masking 300k | multilingual text | 28 observed labels | No | form/chat-like text only | spans, masks, token BIO | text only | text masking | No | No | synthetic | RESTRICTED/UNCLEAR | publisher card/custom license | 23 duplicate texts; near/template overlap unknown | blocked | blocked | reject | blocked | Hold/reject | Permission for use, derivatives, and redistribution |
| DS-CAND-008 PII Masking 400k | multilingual text | 17 observed labels | No | form/chat-like text only | spans, masks, token labels | text only | text masking | No | No | synthetic | RESTRICTED/UNCLEAR | publisher card/custom license | 127 duplicate texts; 2 exact overlaps with DS-004 | blocked | blocked | reject | blocked | Hold/reject | Permission for use, derivatives, and redistribution |
| DS-CAND-009 PiiScan data | recipe/schema plus 78 sample rows | 39 canonical types in recipe tiers | No | No | JSON schema/spans/manifests | text only | No | No | No | mostly synthetic samples | RESTRICTED/UNCLEAR | recipe repo and manifests | upstream mixture; absent claimed corpus | reject as corpus | reject | reject | recipe demo only | Reference recipe only | Upstream rights and reproducibility of absent 1.63M rows |
| DS-CAND-010 Privasis-Zero | English text sanitization | profile/event attributes | No | document-like text only | spans plus sanitize/drop/keep instructions | text only | text output target where present | No | No | synthetic | RESTRICTED/UNCLEAR | NVIDIA card/license | generator/template risk; hard splits lack gold sanitized output | research-only candidate | where gold exists | reject overall visual final | text demo after review | Research-only candidate | Noncommercial constraint; hard-split scoring; generator leakage |
| DS-CAND-011 RoBERTa PII Synth | English text | nine classes including card and SSN | No | claimed masking use, no browser data | spans and BILOU | text only | No region labels | No | No | synthetic | REQUIRES_REVIEW | publisher card | same-generator/template risk | candidate after review | text only | reject independent final | text demo | Text candidate | Generation provenance, realism, and license-file completeness |

## Individual evidence notes

### DS-CAND-001 — CoNLL-2003

- **CONFIRMED:** local card identifies 20,744 English Reuters news rows with PER, ORG, LOC, and MISC BIO labels.
- **CONFIRMED:** the current upstream card describes Reuters agreements and states that the hosted project makes annotations available because of copyright restrictions.
- **CONFIRMED:** it has no PII-specific, visual, OCR, browser, redaction, credential, face, or action labels.
- **OWNER-REQUIRED:** decide whether a general NER baseline has enough value to justify rights review.

### DS-CAND-002 — Meddies PII

- **CONFIRMED:** local card describes synthetic clinical/administrative text in 17 named languages, with inline, span, and BIOES-derived views under CC-BY-NC-4.0 metadata.
- **CONFIRMED:** configs include derived and mixed views, so source-provided splits cannot be assumed independent.
- **UNKNOWN:** exact record-level lineage across all configs and whether all upstream components are compatible with the stated dataset-level license.
- **OWNER-REQUIRED:** noncommercial use and attribution/redistribution terms require approval before adoption.

### DS-CAND-003 — Nemotron-PII

- **CONFIRMED:** current upstream and local cards identify a synthetic English text dataset with 100,000 rows, character spans, 55+ categories, and CC-BY-4.0 metadata.
- **CONFIRMED:** document descriptions do not supply rendered documents, OCR coordinates, visual regions, or browser state.
- **BENCHMARK-DEPENDENT:** usefulness for PrivateSight text detection depends on taxonomy mapping and out-of-generator evaluation.

### DS-CAND-004 — Open PII Masking 500k

- **CONFIRMED:** 580,227 rows were counted locally; 2,930 have duplicate text.
- **CONFIRMED:** card metadata and README/license material conflict: CC-BY naming appears alongside Llama-derived conditions; the local dataset-specific `license` file is empty.
- **CONFIRMED:** current upstream page also directs users to separate license terms and says commercial use, redistribution, or modification may require written permission.
- **OWNER-REQUIRED:** the dataset remains blocked pending authoritative rights resolution.

### DS-CAND-005 — `pii_benchmark`

- **CONFIRMED:** 2,841 Russian rows and 5,614 spans with 21 BIO types; card states MIT and describes pseudonymized production logs, synthetic documents, and hard negatives.
- **CONFIRMED:** zero exact-text overlap with DS-CAND-006 was previously measured locally.
- **UNKNOWN:** identity/source-family overlap, consent basis, and whether production-derived material can be redistributed.
- **PROPOSED:** quarantine it as a possible frozen text sub-benchmark until review completes.

### DS-CAND-006 — `pii_train`

- **CONFIRMED:** 17,137 Russian rows and 39,687 spans with the same schema and lineage family as DS-CAND-005; upstream card currently identifies `redmadrobot-rnd/pii_train` and MIT metadata.
- **CONFIRMED:** zero exact-text overlap does not prove source or template independence.
- **OWNER-REQUIRED:** provenance/privacy review must precede training use.

### DS-CAND-007 — PII Masking 300k

- **CONFIRMED:** 225,405 local rows, six languages, 28 observed labels, and 23 duplicate-text rows.
- **CONFIRMED:** the bundled custom terms restrict use and redistribution; name/card counts do not equal the local count.
- **OWNER-REQUIRED:** written-use and derivative-work permission must be resolved before use.

### DS-CAND-008 — PII Masking 400k

- **CONFIRMED:** 406,896 local rows, six languages, 17 observed labels, and 127 duplicate-text rows.
- **CONFIRMED:** two exact texts overlap DS-CAND-004; current upstream page points to custom terms and commercial licensing contact.
- **OWNER-REQUIRED:** licensing and near/template duplication review must precede use.

### DS-CAND-009 — PiiScan data

- **CONFIRMED:** the local folder contains schemas, manifests, and 78 demonstration rows; the manifest's 1,631,582-row corpus is absent.
- **CONFIRMED:** upstream sources named by the recipe have mixed, gated, noncommercial, controlled, or unknown terms.
- **CONFIRMED:** it is a provenance/taxonomy recipe, not a locally available training corpus.

### DS-CAND-010 — Privasis-Zero

- **CONFIRMED:** local and current upstream cards describe about 1.3M synthetic English text records under an NVIDIA license; local size is about 7.2 GiB.
- **CONFIRMED:** hard validation/test records lack usable gold sanitized outputs according to the local card, so they cannot directly score supervised sanitization quality.
- **OWNER-REQUIRED:** noncommercial constraints and permitted derivative/redistribution behavior require review.

### DS-CAND-011 — RoBERTa PII Synth

- **CONFIRMED:** local files total 120,000 synthetic English samples in 96k/12k/12k splits, with spans and BILOU labels for nine categories.
- **CONFIRMED:** current upstream metadata says MIT; no separate local license file was found.
- **BENCHMARK-DEPENDENT:** realism, offset quality, same-generator leakage, and value for browser-rendered text require experiments outside Prompt 4.

## Approval boundary

`PROPOSED`: preserve all 11 as candidates or references, but assign no training/evaluation role until rights, lineage, taxonomy mapping, and split independence are reviewed. Source labels such as `test` do not make a dataset PrivateSight frozen evaluation data.

