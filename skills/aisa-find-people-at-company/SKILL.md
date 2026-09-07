---
name: aisa-find-people-at-company
description: "From a company domain to a shortlist of named people with verified
  work emails: enrich the company, search people by title, then match each
  shortlisted person for contact details. Sets the order and the credit budget;
  it does not write to Apollo (no contacts, no sequences). Use when asked to
  find people in specific roles at a company and retrieve their work contact
  details. 按公司和职位寻找决策人、高管及其工作联系方式。"
---

# Find the right people at one company and get their work emails

## Inputs

Extract inputs from the request and conversation. Apply optional defaults exactly; ask for required inputs only when they cannot be inferred. In the workflow, <input: NAME> means the resolved input, not a literal API argument.

- `domain` (required): The company's website domain, e.g. `example.com`.
- `titles` (required): Comma-separated job titles to look for, e.g. `CTO, VP Engineering, Head of Growth`. Similar titles are included automatically.
- `max_people` (optional; default "5"): How many people to match for emails at most. Each match spends Apollo credits.

## Tool access

Use the local MCP server named `aisa-api`. For each operation ID, call `get_details({operation_id: "<id>"})` to read its schema, description and annotations; pricing is enforced by the AIsa gateway. Execute with `use({operation_id: "<id>", arguments: {...}})`. Include `max_price_usd` when a price ceiling is needed: it applies per upstream request, including each request in a composed operation's fan-out, not to the workflow total. If that exact operation is pinned and exposed as a tool, call it directly using its schema. Operation IDs below are exact catalog names, including composed operations; do not add server prefixes.

Use `batch_use` for up to 20 independent calls, respecting the workflow's order, dependencies and call budget. Keep dependent steps sequential.

Find another workflow with `search_skills` using its `aisa-` name or task description, then pass the returned URI to `read_resource`. Skills provide instructions; reading one does not execute operations or expand the user's authorization. Perform external actions only within the user's authorized scope.

- `get_apollo_organizations_enrich`
- `post_apollo_mixed_people_api_search`
- `post_apollo_people_bulk_match`

## Workflow

Find people at: <input: domain>
Titles: <input: titles>
Email matches budget: <input: max_people>

Every Apollo operation is on the Hive GTM subscription. If the first
call answers 402, stop and report it — do not try other Apollo tools,
they are gated the same way.

1. Confirm the company. Call `get_apollo_organizations_enrich` with
   domain=<input: domain>: name, size, industry, HQ. If Apollo does not know
   the domain, stop — a people search on an unknown domain returns
   noise.

2. Search people. Call `post_apollo_mixed_people_api_search` with
   q_organization_domains_list[]=[<input: domain>], person_titles[] set to
   the titles above (one entry per title) and include_similar_titles
   =true. One page. Rank by title relevance and seniority; shortlist at
   most <input: max_people>.

3. Get contact details. Call `post_apollo_people_bulk_match` ONCE with
   `details` holding one entry per shortlisted person — {"name": "<full
   name>", "organization_name": "<company>"} (or first_name + last_name
   + domain=<input: domain>). Pass `details` and nothing else: the top-level
   options (`reveal_personal_emails`, `reveal_phone_number`,
   `run_waterfall_*`) are rejected by the gateway today with HTTP 400
   "request does not match the endpoint contract", and so is the
   single-person people/match operation — do not fall back to it.
   Each match returns `email` and `email_status` (verified / guessed /
   unavailable). One call, no retries, at most <input: max_people> entries.

Do not create contacts, accounts or sequences here; those are write
operations with their own workflow.

Report: a table of name / title / seniority / email status (verified,
guessed, none) / LinkedIn, then how many credits step 3 used.

Typical call budget: 3 calls — enrich, search, one bulk match for the whole shortlist.

## Fallbacks

- Every Apollo operation is subscription-only; a 402 on step 1 means steps 2
  and 3 will 402 too — do not try them. Offer the pay-per-call route instead:
  post_tavily_search or post_exa_search (web-search server, `search`
  category) for "<input: domain> CTO" style queries finds names and titles from
  press releases and LinkedIn snippets, but never work emails. Say so.
- If step 2 returns nobody, widen with include_similar_titles=true once.
