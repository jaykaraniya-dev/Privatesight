# Action Validation Boundary

## Conceptual pipeline

`server reasoning -> structured action -> schema validation -> local policy validation -> freshness/target validation -> browser execution`

The server-response and local-validation roles are **CONFIRMED**. The schema, policy, and confirmation design are **PROPOSED**.

## Minimum candidate action fields

| Field | Purpose | Status |
| --- | --- | --- |
| `action_type` | Bounded operation category such as click, type, scroll, or return-data. | PROPOSED. |
| `target_reference` | Local-safe reference to a current observed target. | PROPOSED. |
| `target_description` | Human/audit-readable expected target semantics. | PROPOSED. |
| `expected_page_state` | Preconditions to detect stale/misgrounded actions. | PROPOSED. |
| `constraints` | Limits such as allowed origin, frame, value class, or maximum scroll. | PROPOSED. |
| `confidence` | Server-reported uncertainty; never a substitute for local checks. | PROPOSED. |
| `authorization_metadata` | User/policy decision reference for consequential actions. | OWNER-REQUIRED. |

## Local validation rules

| Condition | Local response | Status |
| --- | --- | --- |
| Unknown action type, invalid schema, extra unapproved fields | Reject. | PROPOSED. |
| Target missing, stale page state, frame mismatch, or ambiguous grounding | Reject and re-observe. | PROPOSED. |
| Action requests raw sensitive value or unapproved export | Reject. | CONFIRMED privacy implication; mechanism PROPOSED. |
| Consequential or irreversible action | Require owner-approved policy and possibly user confirmation. | OWNER-REQUIRED. |
| Server timeout/malformed response | Do not execute. | PROPOSED. |

## Policy questions requiring owner decision

Action risk classes, allowed action types, text-entry policy, navigation/download/upload rules, confirmation rules, automation on authenticated pages, cross-origin-frame policy, and recovery UX are OWNER-REQUIRED.

