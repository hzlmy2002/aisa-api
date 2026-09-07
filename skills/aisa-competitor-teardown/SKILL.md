---
name: aisa-competitor-teardown
description: "From one domain to a market map: how big its traffic is, which
  sites compete for the same audience, where that audience lives, who the
  search-side rivals are (often a different list — say so), and how the top
  competitors measure on the same yardstick. Sets the call order, the budget and
  the data-vintage rules; the judgement stays with the reader. Use when asked to
  analyze a competitor or map a market starting from a domain.
  从域名分析竞争对手的网站流量、受众地域、相似网站和竞争格局。"
---

# Tear down a competitor or market from one domain

## Inputs

Extract inputs from the request and conversation. Apply optional defaults exactly; ask for required inputs only when they cannot be inferred. In the workflow, <input: NAME> means the resolved input, not a literal API argument.

- `domain` (required): The domain to tear down, as a bare host such as `example.com`.
- `country` (optional; default "ww"): Country focus. Similarweb product surfaces accept `us` or `ww` (worldwide); leave `ww` unless the market is US-only.

## Tool access

Use the local MCP server named `aisa-api`. Read the linked local operation details for its full description, input schema, defaults and annotations; then execute with `use({operation_id: "<id>", arguments: {...}})`. You do not need to call get_details when the installed details already provide the contract. Use `get_details({operation_id: "<id>"})` if local details are missing or the installed skills and running server differ; the running server's schema takes precedence. Prices and live availability are enforced by the AIsa gateway, not these static files.

Include `max_price_usd` when needed: it applies to each upstream request, including composed fan-outs, not the workflow total. Use `batch_use` for up to 20 independent calls; keep dependent steps sequential. If the exact operation is pinned, it can also be called directly with its schema.

A matching workflow already links its required operations: read those details directly without loading the global directory. For other tasks, start with the short installed `aisa-api` skill and follow a relevant server index. Use `search` only when the right operation is unclear. Native MCP resources/read can read `skill://aisa-api/SKILL.md` or `skill://aisa-api/references/operations/<operation_id>.md`. Skills do not execute actions or expand the user's authorization.

- [get_similarweb_website_traffic_snapshot](../aisa-api/references/operations/get_similarweb_website_traffic_snapshot.md)
- [get_similarweb_similar_sites](../aisa-api/references/operations/get_similarweb_similar_sites.md)
- [get_similarweb_website_top_geographies](../aisa-api/references/operations/get_similarweb_website_top_geographies.md)
- [get_semrush_organic_competitors](../aisa-api/references/operations/get_semrush_organic_competitors.md)
- [post_dataforseo_labs_google_bulk_traffic_estimation_live](../aisa-api/references/operations/post_dataforseo_labs_google_bulk_traffic_estimation_live.md)
- [get_similarweb_technologies](../aisa-api/references/operations/get_similarweb_technologies.md)

## Workflow

Tear down: <input: domain>
Country focus: <input: country>

Typical call budget: 5–8 calls. Plan the set before you start; the
per-competitor loop in step 5 is where budgets die, so cap it at the
top 2–3.

Data vintage: Similarweb reports complete months only — a month becomes
queryable after it closes. Say which months every number covers; do not
present last month's traffic as "current". Social and SERP data are
live; label them "as of today".

1. Size it. `get_similarweb_website_traffic_snapshot` with
   domain=<input: domain>, country=<input: country>: visits, engagement, rank for the
   latest complete month.

2. The competitive set. `get_similarweb_similar_sites` with
   domain=<input: domain> — note its date window must span exactly three
   complete months. Keep the top 5–8 by affinity.

3. Where the audience lives. `get_similarweb_website_top_geographies`
   with domain=<input: domain>.

4. Search rivals vs traffic rivals. `get_semrush_organic_competitors`
   with domain=<input: domain>. The two lists often differ — a site can share
   your keywords without sharing your audience. Report both lists and
   point out the overlap and the differences; do not merge them.

5. Measure the top competitors. For the top 2–3 from step 2, repeat
   `get_similarweb_website_traffic_snapshot` — same yardstick, same
   months, or the comparison is meaningless.

6. Optional depth, one call each at most: `get_similarweb_technologies`
   for the stack behind a rival.

## Fallbacks

- Similarweb and Semrush are subscription-only (Hive GTM Growth). On the
  first 402, the pay-per-call route is
  `post_dataforseo_labs_google_bulk_traffic_estimation_live` (one task,
  targets=[<input: domain> and the rivals you know]) for comparable traffic
  estimates — label them "clickstream estimate", a different measurement
  from Similarweb's panel, and never mix the two in one column.
- If a needed source is unavailable, say so and label any substitute;
  never pass one source off as another silently.
- If step 2 returns nothing for a small domain, say the panel has no
  coverage rather than inventing rivals; the Labs estimation route
  above still works.

Report: market map (who, how big, where), search-vs-traffic rival
comparison, and one "so what" line per competitor. Name the provider
and the months next to every number.
