---
name: aisa-seo-site-audit
description: "Use when asked to audit the SEO health of a website, including
  authority, backlinks and page speed. 审计网站 SEO 健康情况，检查权威度、外链、关键词排名和页面速度。
  Related requests: SEO审计, 网站诊断, 网站体检, 外链检查, site health, SEO audit. Sources:
  semrush, ahrefs, dataforseo."
---

# Audit a site's SEO health in one pass

A defensible first-pass SEO health check of one domain: authority, organic footprint, backlink profile, top competitors and page speed. Sets the call order, when to cross-check two providers and when to stop; it does not decide what to fix first.

## Inputs

Extract inputs from the request and conversation. Apply optional defaults exactly; ask for required inputs only when they cannot be inferred. In the workflow, <input: NAME> means the resolved input, not a literal API argument.

- `domain` (required): The site to audit, as a bare host such as `example.com` — no scheme, no path. Passed to every tool as written.
- `database` (optional; default "us"): Semrush regional database code, for example `us`, `uk`, `de`. Leave empty for the default.
- `depth` (optional; default "standard"): `quick` for authority + organic + backlink summary only, `standard` to add competitors and referring domains, `deep` to also run a Lighthouse audit of the home page.

## Tool access

Use the local MCP server named `aisa-api`. Read the linked local operation details for its full description, input schema, defaults and annotations; then execute with `use({operation_id: "<id>", arguments: {...}})`. You do not need to call get_details when the installed details already provide the contract. Use `get_details({operation_id: "<id>"})` if local details are missing or the installed skills and running server differ; the running server's schema takes precedence. Prices and live availability are enforced by the AIsa gateway, not these static files.

Include `max_price_usd` when needed: it applies to each upstream request, including composed fan-outs, not the workflow total. Use `batch_use` for up to 20 independent calls; keep dependent steps sequential. If the exact operation is pinned, it can also be called directly with its schema.

A matching workflow already links its required operations: read those details directly without loading the global directory. For other tasks, start with the short installed `aisa-api` skill and follow a relevant server index. Use `search` only when the right operation is unclear. Native MCP resources/read can read `skill://aisa-api/SKILL.md` or `skill://aisa-api/references/operations/<operation_id>.md`. Skills do not execute actions or expand the user's authorization.

- [get_semrush_domain_overview](../aisa-api/references/operations/get_semrush_domain_overview.md)
- [get_ahrefs_domain_rating](../aisa-api/references/operations/get_ahrefs_domain_rating.md)
- [post_dataforseo_backlinks_summary_live](../aisa-api/references/operations/post_dataforseo_backlinks_summary_live.md)
- [get_semrush_domain_organic_keywords](../aisa-api/references/operations/get_semrush_domain_organic_keywords.md)
- [get_semrush_organic_competitors](../aisa-api/references/operations/get_semrush_organic_competitors.md)
- [post_dataforseo_backlinks_referring_domains_live](../aisa-api/references/operations/post_dataforseo_backlinks_referring_domains_live.md)
- [post_dataforseo_on_page_lighthouse_live_json](../aisa-api/references/operations/post_dataforseo_on_page_lighthouse_live_json.md)
- [post_dataforseo_labs_google_domain_rank_overview_live](../aisa-api/references/operations/post_dataforseo_labs_google_domain_rank_overview_live.md)

## Workflow

Audit the SEO health of: <input: domain>
Semrush database: <input: database>
Depth: <input: depth>

Every DataForSEO `post_*_live` tool takes `body` as a LIST with one task
object inside, e.g. body=[{"target": "<input: domain>"}]. A bare object is
rejected with status 40503 inside an HTTP 200 — read the body's own
`status_code`, not the transport status.

1. Authority and footprint. Call `get_semrush_domain_overview` with
   domain=<input: domain> and database=<input: database> for organic traffic, keyword
   count and authority score. Then `get_ahrefs_domain_rating` with
   target=<input: domain> for Ahrefs DR. If Ahrefs answers 402 (it is on the
   Hive GTM subscription), say so and continue — one authority number is
   enough for a first pass.

2. Backlink profile. Call `post_dataforseo_backlinks_summary_live` with a
   task of target=<input: domain>: referring domains, backlinks, dofollow share
   and the rank. Compare its referring-domain count with Semrush's from
   step 1; when they differ by more than 2x, report both and say which
   index each comes from rather than picking one.

Stop here if depth is `quick`.

3. What it ranks for and against whom. Call
   `get_semrush_domain_organic_keywords` with domain=<input: domain> for the
   top organic keywords, and `get_semrush_organic_competitors` with the
   same arguments for the sites competing for them.

4. Who links. Call `post_dataforseo_backlinks_referring_domains_live` with
   target=<input: domain> and a small limit (20) ordered by rank; note the top
   referring domains and any obviously spammy clusters.

Stop here if depth is `standard`.

5. Page speed. Call `post_dataforseo_on_page_lighthouse_live_json` with a
   task of url=https://<input: domain>/ and for_mobile=true. Report the four
   category scores; this call is slow (tens of seconds) and priced
   higher than the others, so run it once.

Report: authority (both numbers if you have them), organic footprint,
backlink profile with the two indexes side by side, competitors, and
page speed — then the three findings most worth acting on. Name the
provider next to every number.

Typical call budget: 3 calls at depth quick, 5 at standard, 6 at deep.

## Fallbacks

- Semrush and Ahrefs are subscription-only. If `get_semrush_domain_overview`
  answers 402, take authority and organic footprint from
  `post_dataforseo_labs_google_domain_rank_overview_live` (task: target=<input: domain>,
  location_name and language_name set) and skip step 3's two Semrush calls;
  backlinks from DataForSEO in step 2 are unaffected.
- If `get_ahrefs_domain_rating` answers 402, continue with one authority number.
- If Lighthouse times out, report page speed as "not measured" rather than
  retrying; it is the slowest and priciest call here.
- Say in the report which fallback was used and why.
