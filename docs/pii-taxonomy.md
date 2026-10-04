# PrivateSight PII and Sensitive-Data Taxonomy

Date: 2026-10-04
Status: `OWNER-APPROVED WORKING TAXONOMY`; individual thresholds, context predicates, and visual coverage remain `BENCHMARK-DEPENDENT`.

## Purpose and decision boundary

This taxonomy defines candidate detection and redaction classes for data that may appear in DOM text, accessibility-derived semantics, OCR output, screenshots, browser state, or extension-owned storage. It is broader than conventional identity PII because the PrivateSight privacy gate must also protect credentials, session material, private content, and sensitive visual regions.

The table does not authorize collection, transmission, or model training. High-risk or uncertain protected content is fail-closed by the approved policy. Context-dependent categories remain conservative and require explicit derived-data handling; the taxonomy approval does not clear any dataset or establish detector performance.

## Detection and redaction taxonomy

All listed categories are included in the owner-approved working taxonomy. In the final column, `PROPOSED` describes an unvalidated detection/redaction method, `BENCHMARK-DEPENDENT` describes a choice requiring experiments, and `OWNER-REQUIRED` means a category-specific exception or outbound treatment still needs explicit owner review. Those labels do not reopen D-02 or weaken D-03's fail-closed default.

| Group / category | Candidate detection methods | Sources | Localization needed | Candidate redaction | Main false-positive risk | Main false-negative risk | Default gate | Status |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Identity: person name | text NER; DOM labels; OCR spans; context rules | text, DOM, accessibility, OCR | exact span plus visual box when pixels leave device | replace or mask span/region | ordinary names, brands, public figures | aliases, transliteration, split names | Yes when tied to a person or account | OWNER-REQUIRED |
| Identity: email | pattern plus parser; DOM input type; OCR | text, DOM, OCR | span and OCR/element box | mask local/domain according to policy | public support addresses | obfuscation, line breaks, OCR errors | Yes | PROPOSED |
| Identity: phone | locale-aware pattern; NER; DOM tel fields; OCR | text, DOM, OCR | span and region | mask digits while preserving optional type label | order/reference numbers | locale formats, extensions, OCR confusion | Yes | PROPOSED |
| Identity: postal address | NER; address parser; DOM autocomplete; OCR | text, DOM, accessibility, OCR | multi-span and region grouping | replace full address region | public business addresses | partial addresses and multilingual formats | Yes for private address | OWNER-REQUIRED |
| Identity: government/identity number | checksum/pattern; NER; DOM field semantics; OCR | text, DOM, OCR | exact span/box | full mask or typed placeholder | invoice/reference numbers | national variation, spaces, OCR errors | Yes | PROPOSED |
| Authentication: username/account handle | DOM labels/autocomplete; NER; context rules; OCR | text, DOM, accessibility, OCR | span/element/region | mask unless explicitly safe | public handles | unlabeled account state | Yes when account-linked | OWNER-REQUIRED |
| Authentication: password | input type/autocomplete; page semantics; OCR/vision fallback | DOM, accessibility, OCR, vision | entire field/value and displayed region | remove value and cover region | masked bullets without secret value | revealed passwords, custom controls, canvas fields | Yes | PROPOSED |
| Authentication: one-time/recovery code | pattern plus surrounding semantics; OCR | text, DOM, OCR | exact span/box | full mask | ordinary short numbers | spaced digits, countdown UI, image codes | Yes | PROPOSED |
| Authentication: API key/access token | provider-agnostic entropy/prefix rules; secret scanner; OCR | text, DOM, OCR | exact span/box | full removal; no partial export by default | hashes and test fixtures | unknown formats, wrapped tokens, screenshots | Yes | PROPOSED |
| Authentication: session/cookie secret | cookie/storage provenance; key-name rules; secret scanner | extension/browser state, DOM text, OCR | complete value and any rendered region | never include in outbound package | benign preference cookies | opaque tokens or values copied into logs/URLs | Yes | PROPOSED |
| Financial: account/routing identifiers | pattern/checksum; NER; DOM semantics; OCR | text, DOM, OCR | span/box | mask except approved last digits | transaction IDs | country-specific formats | Yes | PROPOSED |
| Financial: card/payment data | Luhn/pattern; field semantics; OCR; visual document detector | text, DOM, OCR, vision | individual spans and full card region when shown | mask PAN/CVV/expiry/name; cover image region | non-card numeric strings | spaced/embossed/partially visible cards | Yes | PROPOSED |
| Financial: other identifiers/transactions | NER; context rules; DOM/OCR | text, DOM, OCR | context-dependent span/region | mask identifier and sensitive context | public prices | account-linked transaction context | Yes when account-linked | OWNER-REQUIRED |
| Sensitive personal: medical information | clinical NER; page/domain context; OCR; document-region detection | text, DOM, OCR, vision | spans plus document/region grouping | remove sensitive attributes or entire region | public health information | implicit diagnoses and image-only records | Yes for person-linked content | OWNER-REQUIRED |
| Sensitive personal: private message/notification | DOM role/app context; OCR; notification detector | DOM, accessibility, OCR, vision | message/notification region | cover body, sender, previews, metadata | public chat/community text | canvas notifications, transient overlays | Yes by default | PROPOSED |
| Sensitive personal: personal document | document detector; OCR; DOM/embed metadata | DOM, OCR, vision | document-level and field-level boxes/masks | block whole document or redact all sensitive fields | public brochures | background documents, partial scans | Yes | PROPOSED |
| Sensitive personal: signature | signature detector/segmenter; document context | vision | box or pixel mask | opaque cover | handwriting that is not a signature | small/low-contrast signatures | Yes | BENCHMARK-DEPENDENT |
| Sensitive personal: face/biometric | face/biometric detector and tracking | vision | box or mask across frames | blur or opaque mask chosen after leakage tests | portraits intended for task context | profile thumbnails, partial/occluded faces | Yes for private/identifying faces | OWNER-REQUIRED |
| Browser: logged-in account state | account/avatar/menu semantics; DOM/OCR/vision fusion | DOM, accessibility, OCR, vision | related account region and attributes | remove identifiers; preserve only approved state predicate | generic sign-in UI | avatars, account switchers, hidden state | Yes for identifiers; state export policy open | OWNER-REQUIRED |
| Browser: private URL/query/fragment | URL parser; sensitive-key rules; entropy detector | browser state, DOM, OCR | parameter/value and rendered address-bar/page text where captured | strip sensitive parameters; allowlist safe origin/path fields | benign tracking parameters | secrets in path/fragment or encoded values | Yes | OWNER-REQUIRED |
| Browser: hidden form/autofill/password-manager data | field type/autocomplete; extension and DOM provenance | DOM, extension state, accessibility | whole value/field and UI overlay | never export raw value | benign defaults | closed shadow DOM and browser-owned overlays | Yes | PROPOSED |
| Browser: storage-derived secret | provenance and key/value scanner | extension/browser storage | full record/value | exclude from observation and outbound data | nonsecret preferences | opaque secret names, debug dumps | Yes | PROPOSED |
| Browser: security prompt/extension state | DOM/OCR/vision classification; browser/extension provenance | DOM, OCR, vision, extension state | complete prompt/panel region | block or heavily sanitize | ordinary settings panels | browser-owned UI outside page DOM | Yes | OWNER-REQUIRED |
| Visual: QR/barcode | QR/barcode detector plus local decode and content classifier | vision | exact box/polygon | cover code when decoded or uncertain-sensitive | public product codes | damaged codes or sensitive payload not decoded | Yes when sensitive or undecodable under conservative policy | OWNER-REQUIRED |
| Visual: credential/document screenshot | OCR plus layout/document detector and secret rules | OCR, vision | nested text boxes plus enclosing region | cover all sensitive fields or entire image | public examples/tutorials | small embedded screenshots and thumbnails | Yes | PROPOSED |
| Visual: other sensitive region | local visual detector plus context and human policy | vision, OCR, DOM | box/mask | opaque region or block export | task-relevant non-sensitive media | unseen classes and ambiguous context | Conservative default | OWNER-REQUIRED |

## Cross-cutting rules

- `PROPOSED`: preserve source provenance for every detection: DOM node, semantic signal, OCR span, visual region, or browser-state field.
- `PROPOSED`: pixel export requires pixel-space coverage even when the detection began in DOM text.
- `PROPOSED`: secret-bearing classes use full-value removal rather than reversible blur or partial masking unless an approved contract explicitly permits a derived field.
- `OWNER-APPROVED`: public/private context is sensitivity-dependent; credentials, secrets, payment data, private notifications/documents, security-sensitive state, biometric-like content, and uncertain QR/barcodes fail closed by default. Safe derived representations require task necessity and the outbound policy.
- `BENCHMARK-DEPENDENT`: thresholds, fusion rules, OCR languages, face/signature/QR detectors, and redaction style.

## Dataset mapping status

The current 11 candidates cover subsets of text identities, contact data, documents, financial identifiers, and some secret-like strings. They do not establish browser-specific classes, visual-only categories, screenshot regions, DOM/accessibility provenance, or pixel masks. Category coverage in a text card must not be counted as visual coverage.
