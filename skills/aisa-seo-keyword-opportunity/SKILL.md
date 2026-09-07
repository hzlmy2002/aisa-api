---
name: aisa-seo-keyword-opportunity
description: "Decide whether a keyword is worth going after: volume and
  difficulty, the related terms that are easier, and what is actually on page
  one now. Sets the call order and the stopping rules; it does not write the
  content. Use when asked to assess a keyword opportunity or find easier related
  search terms. 研究关键词搜索量、竞争难度和相关长尾词，寻找自然搜索机会。"
---

# Size a keyword and find the openings around it

## Inputs

Extract inputs from the request and conversation. Apply optional defaults exactly; ask for required inputs only when they cannot be inferred. In the workflow, <input: NAME> means the resolved input, not a literal API argument.

- `keyword` (required): The seed keyword or phrase, as a user would type it.
- `location` (optional; default "United States"): Country for volume and SERP data, as DataForSEO spells it, e.g. `United States`, `United Kingdom`, `Germany`.
- `database` (optional; default "us"): Semrush regional database code matching the location, e.g. `us`.

## Tool access

Use the local MCP server named `aisa-api`. Read the linked local operation details for its full description, input schema, defaults and annotations; then execute with `use({operation_id: "<id>", arguments: {...}})`. You do not need to call get_details when the installed details already provide the contract. Use `get_details({operation_id: "<id>"})` if local details are missing or the installed skills and running server differ; the running server's schema takes precedence. Prices and live availability are enforced by the AIsa gateway, not these static files.

Include `max_price_usd` when needed: it applies to each upstream request, including composed fan-outs, not the workflow total. Use `batch_use` for up to 20 independent calls; keep dependent steps sequential. If the exact operation is pinned, it can also be called directly with its schema.

A matching workflow already links its required operations: read those details directly without loading the global directory. For other tasks, start with the short installed `aisa-api` skill and follow a relevant server index. Use `search` only when the right operation is unclear. Native MCP resources/read can read `skill://aisa-api/SKILL.md` or `skill://aisa-api/references/operations/<operation_id>.md`. Skills do not execute actions or expand the user's authorization.

- [get_semrush_keyword_overview](../aisa-api/references/operations/get_semrush_keyword_overview.md)
- [get_semrush_keyword_difficulty](../aisa-api/references/operations/get_semrush_keyword_difficulty.md)
- [post_dataforseo_labs_google_keyword_ideas_live](../aisa-api/references/operations/post_dataforseo_labs_google_keyword_ideas_live.md)
- [post_dataforseo_serp_google_organic_live](../aisa-api/references/operations/post_dataforseo_serp_google_organic_live.md)

## Workflow

Size the opportunity around: <input: keyword>
Location: <input: location> · Semrush database: <input: database>

DataForSEO `post_*_live` tools take `body` as a LIST with one task
object; read the body's own `status_code` (20000 is success).

1. Is it worth it. Call `get_semrush_keyword_overview` with
   phrase=<input: keyword> and database=<input: database> for volume, CPC and
   intent, then `get_semrush_keyword_difficulty` with the same
   arguments. Volume under a few hundred with difficulty above 70 is
   usually not worth a new page — say so and still finish step 2, the
   openings are often next door.

2. The openings. Call `post_dataforseo_labs_google_keyword_ideas_live`
   with a task of keywords=[<input: keyword>], location_name=<input: location>,
   language_name=English and limit=30. Shortlist the ideas whose volume
   is meaningful and whose difficulty is below the seed's; keep the
   question-shaped ones separately, they map to different content.

3. What page one looks like. Call `post_dataforseo_serp_google_organic_live`
   with a task of keyword=<input: keyword>, location_name=<input: location>,
   language_name=English and depth=10. Note the domain types (brands,
   publishers, forums, marketplaces), whether there are AI overviews or
   featured snippets, and how many results are older than two years.

Stop after step 3; do not fetch the SERP for every idea — pick at most
two shortlisted ideas and repeat step 3 for them only if the seed's
page one looks unbeatable.

Report: a go / no-go on the seed with the numbers, a shortlist of up to
ten easier terms with volume and difficulty, and what kind of page wins
today. Name the provider next to every number.

Typical call budget: 4 calls; at most 6 if you re-check two shortlisted ideas.

## Fallbacks

- Semrush is subscription-only. If `get_semrush_keyword_overview` answers 402,
  skip `get_semrush_keyword_difficulty` too and take the seed's volume and
  difficulty from `post_dataforseo_labs_google_keyword_ideas_live` — include
  the seed itself in `keywords` so it comes back with the ideas.
- If the SERP call fails, say page one was not inspected; do not guess the
  domain types.
- Say in the report which fallback was used and why.
