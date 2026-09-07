---
name: aisa-enrich-lead-list
description: "Use when given a list of leads to enrich with contact and company
  details in bulk. 批量补全销售线索的联系人、工作邮箱和公司资料。 Related requests: 线索补全, 批量联系人,
  客户资料补全, lead enrichment. Sources: apollo."
---

# Enrich a list of leads and their companies in bulk

Turn a list of emails or names into people with titles, companies and verified contact details, plus the company facts behind them — using the bulk endpoints so one call does ten. Sets the batch size and the credit rules; it does not write anything back to Apollo.

## Inputs

Extract inputs from the request and conversation. Apply optional defaults exactly; ask for required inputs only when they cannot be inferred. In the workflow, <input: NAME> means the resolved input, not a literal API argument.

- `leads` (required): The leads, one per line: an email, or `first last @ company`. Up to a few hundred; they are sent in batches of ten.
- `reveal_phones` (optional; default "no"): `yes` to also ask for phone numbers. Leave `no`: the phone option is a top-level flag the gateway currently rejects (see step 1), so `yes` only makes the workflow say phones are unavailable.

## Tool access

Use the local MCP server named `aisa-api`. Read the linked local operation details for its full description, input schema, defaults and annotations; then execute with `use({operation_id: "<id>", arguments: {...}})`. You do not need to call get_details when the installed details already provide the contract. Use `get_details({operation_id: "<id>"})` if local details are missing or the installed skills and running server differ; the running server's schema takes precedence. Prices and live availability are enforced by the AIsa gateway, not these static files.

Include `max_price_usd` when needed: it applies to each upstream request, including composed fan-outs, not the workflow total. Use `batch_use` for up to 20 independent calls; keep dependent steps sequential. If the exact operation is pinned, it can also be called directly with its schema.

A matching workflow already links its required operations: read those details directly without loading the global directory. For other tasks, start with the short installed `aisa-api` skill and follow a relevant server index. Use `search` only when the right operation is unclear. Native MCP resources/read can read `skill://aisa-api/SKILL.md` or `skill://aisa-api/references/operations/<operation_id>.md`. Skills do not execute actions or expand the user's authorization.

- [post_apollo_people_bulk_match](../aisa-api/references/operations/post_apollo_people_bulk_match.md)
- [post_apollo_organizations_bulk_enrich](../aisa-api/references/operations/post_apollo_organizations_bulk_enrich.md)

## Workflow

Enrich these leads:
<input: leads>
Reveal phone numbers: <input: reveal_phones>

Every Apollo operation is on the Hive GTM subscription. If the first
call answers 402, stop and report it — do not retry with other tools.

1. People, ten at a time. Split the list into batches of ten and call
   `post_apollo_people_bulk_match` once per batch with `details` holding
   one entry per lead: {"email": "..."}, or {"name": "First Last",
   "organization_name": "Company"}, or first_name + last_name + domain.
   Pass `details` and NOTHING else. The top-level options
   (`reveal_personal_emails`, `reveal_phone_number`, `run_waterfall_email`,
   `run_waterfall_phone`) are rejected by the gateway today with HTTP 400
   "request does not match the endpoint contract" — the whole batch fails,
   not just the option. The same applies to the single-person
   people/match operation; never use it here. Each match returns
   `email` and `email_status` (verified / guessed / unavailable) without
   any option. If phones were requested, report that they cannot be
   requested through this route right now. One call per batch, no retries
   on partial results; carry the misses into the report.

2. Companies, deduplicated. Collect the distinct company domains from
   step 1 and call `post_apollo_organizations_bulk_enrich` with
   domains[] holding up to ten per call. Do not enrich a domain twice.

Stop after the two passes. Creating contacts or accounts from the
result is a separate, write-side workflow.

Report: a table of input lead / matched name / title / company / email
status, then the company table (domain / size / industry / HQ), then
the misses and how many credits the run used.

Typical call budget: one bulk call per ten leads plus one per ten distinct domains — never one call per lead.

## Fallbacks

- Every Apollo operation is subscription-only; a 402 on the first batch
  means every batch will 402 — stop, do not iterate. Without the plan the
  only pay-per-call route is web search (post_tavily_search on the
  web-search server) per lead, which recovers company and title but not
  verified emails; say so before spending on it.
- A partial batch (some leads unmatched) is normal: carry the misses into
  the report, do not resubmit them.
