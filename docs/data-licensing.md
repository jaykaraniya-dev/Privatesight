# Dataset Licensing and Provenance Audit

Date: 2026-10-04
Scope: evidence review, not legal advice or use approval.

## Classification rule

- `CLEAR`: authoritative rights evidence is internally consistent for the intended project use.
- `REQUIRES_REVIEW`: a recognizable license is stated, but provenance, intended use, attribution, or redistribution still needs project-owner/legal review.
- `RESTRICTED/UNCLEAR`: noncommercial/custom/restricted terms, conflicting evidence, or upstream mixtures block ordinary adoption.
- `UNKNOWN`: no reliable rights evidence was found.

No candidate is classified `CLEAR` at this gate because intended use, redistribution plan, and source lineage have not been approved.

| Dataset | License status | Evidence | Commercial / derivative / redistribution implications | Provenance status | Repository handling |
| --- | --- | --- | --- | --- | --- |
| DS-001 CoNLL-2003 | RESTRICTED/UNCLEAR | local/current card says `other`; Reuters agreements govern source text | Research access agreements; redistribution of full Reuters text is not established | Reuters corpus via T-NER is documented | Metadata/reference only unless rights are approved |
| DS-002 Meddies PII | RESTRICTED/UNCLEAR | CC-BY-NC-4.0 metadata | Noncommercial; attribution; derivative/redistribution compatibility with derived views needs review | publisher card names synthetic and derived views | Do not redistribute raw copy; metadata only |
| DS-003 Nemotron-PII | REQUIRES_REVIEW | local/current card says CC-BY-4.0 | Attribution required; intended project and redistribution workflow still need approval | NVIDIA synthetic-generation description | Metadata may be committed; raw remains excluded |
| DS-004 Open PII Masking 500k | RESTRICTED/UNCLEAR | CC-BY naming conflicts with README/Llama conditions; empty local dataset license file | Current card says separate terms may constrain commercial use, modification, and redistribution | publisher generation claim; governing terms unresolved | Block use and redistribution |
| DS-005 `pii_benchmark` | REQUIRES_REVIEW | local/current card says MIT; no separate local license file | MIT metadata alone does not resolve rights in production-log-derived source material | mixed pseudonymized logs/synthetic/hard negatives claimed | Quarantine; metadata only until source review |
| DS-006 `pii_train` | REQUIRES_REVIEW | local/current card says MIT; no separate local license file | Same source-material concern as DS-005 | shared RedMadRobot lineage documented | Do not redistribute raw copy pending review |
| DS-007 PII Masking 300k | RESTRICTED/UNCLEAR | bundled custom Ai4Privacy terms | Academic/noncommercial use and written permission for redistribution/derivatives are stated locally | publisher synthetic claim | Block use/redistribution pending permission |
| DS-008 PII Masking 400k | RESTRICTED/UNCLEAR | bundled custom Ai4Privacy terms/current page points to full terms | Academic use encouraged; commercial licensing contact and other restrictions apply | publisher synthetic claim | Block use/redistribution pending permission |
| DS-009 PiiScan data | RESTRICTED/UNCLEAR | recipe/sample CC-BY metadata with mixed upstream sources | Rebuilt corpus rights inherit multiple upstream restrictions; absent local corpus cannot be approved | manifests record upstream mixture | Keep recipe metadata; do not represent manifest rows as owned data |
| DS-010 Privasis-Zero | RESTRICTED/UNCLEAR | bundled/current NVIDIA license | Noncommercial research/evaluation restriction; derivatives/redistribution require review | NVIDIA synthetic pipeline/card | Research-only hold; raw excluded |
| DS-011 RoBERTa PII Synth | REQUIRES_REVIEW | local/current card says MIT; no separate local license file | Attribution/customary notice; generation provenance and bundled data rights still need review | publisher synthetic claim | Metadata may be committed; raw remains excluded |

## Required approval evidence

`OWNER-REQUIRED` before use:

1. intended use: research prototype, competition demonstration, publication, redistribution, or commercial use;
2. authoritative license text/version and attribution obligations;
3. rights in source material and generated outputs, not only model-card metadata;
4. permission to create and distribute derivatives, annotations, screenshots, or trained artifacts;
5. compatibility when datasets or derived views share upstream sources;
6. whether only metadata and retrieval scripts may enter GitHub.

## External verification snapshot

As of 2026-10-04, current official publisher pages corroborated CC-BY-4.0 metadata for Nemotron-PII, MIT metadata for the RedMadRobot train/benchmark pair and RoBERTa PII Synth, the NVIDIA license for Privasis-Zero, Reuters restrictions for CoNLL-2003, and custom/additional conditions for the Ai4Privacy releases. Online pages can change; the repository must record the exact license text used at approval time.

