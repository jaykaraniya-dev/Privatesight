# Pilot Corpus Lineage

**Status:** complete for the 12-case qualification corpus  
**Schema:** `pilot-case-manifest-1.0.0`

## Required lineage

Every case records `case_id`, `case_family_id`, `task_id`, `generator_id`, `generator_version`, `template_id`, `template_version`, `identity_fixture_id`, `capture_session_id`, browser and OS identity, `runtime_context_id`, `creation_timestamp`, optional `parent_case_id`, `source_family_id`, fixed seed, rights basis, and pilot role. Filenames are artifact locators rather than lineage authority.

## Implemented lineage families

| Lineage dimension | Implemented value or behavior |
| --- | --- |
| Generator | `privatesight-pilot-generator@1.0.0` |
| Source family | `source-local-synthetic` |
| Capture session | `capture-pilot-v1` |
| Runtime context | `pilot-node-playwright` |
| Identity fixtures | explicit synthetic fixture IDs or explicit `identity-none-*` controls |
| Templates | one versioned template ID per scenario family |
| Parent relation | `case-contact-002` derives from `case-contact-001` |
| Rights basis | project-authored synthetic fixture under D-01/D-05 |

## Integrity and recovery

The fixed definition and seed reconstruct page content. Capture manifests record the observed Chrome/Windows version, viewport, scroll state, and per-artifact SHA-256. Two independent qualification runs produced matching hashes for screenshots, DOM HTML, DOM JSON, accessibility snapshots, rendered-text regions, and task records for all 12 cases. Run duration, timestamp, memory snapshot, and ephemeral local port are explicitly non-deterministic fields.

## Role rule

The split guard treats family, template, identity fixture, and task as hard grouping dimensions. The related contact variants therefore remain in `PILOT_TRAIN`. A cross-role hard-group conflict makes assignment fail.

## Source locations

- Definitions: [`pilot/config/cases.v1.json`](../pilot/config/cases.v1.json)
- Validation: [`src/pilot/schema.cjs`](../src/pilot/schema.cjs)
- Generation: [`src/pilot/generator.cjs`](../src/pilot/generator.cjs)
- Capture binding: [`src/pilot/capture.cjs`](../src/pilot/capture.cjs)
- Runtime manifests: ignored `artifacts/pilot/current/manifests.jsonl`
