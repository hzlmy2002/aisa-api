---
name: aisa-seo-site-audit
description: "A defensible first-pass SEO health check of one domain: authority,
  organic footprint, backlink profile, top competitors and page speed. Sets the
  call order, when to cross-check two providers and when to stop; it does not
  decide what to fix first. Use when asked to audit the SEO health of a website,
  including authority, backlinks and page speed. 审计网站 SEO
  健康情况，检查权威度、外链、关键词排名和页面速度。"
---

# Audit a site's SEO health in one pass

## Inputs

Extract inputs from the request and conversation. Apply optional defaults exactly; ask for required inputs only when they cannot be inferred. In the workflow, <input: NAME> means the resolved input, not a literal API argument.

- `domain` (required): The site to audit, as a bare host such as `example.com` — no scheme, no path. Passed to every tool as written.
- `database` (optional; default "us"): Semrush regional database code, for example `us`, `uk`, `de`. Leave empty for the default.
- `depth` (optional; default "standard"): `quick` for authority + organic + backlink summary only, `standard` to add competitors and referring domains, `deep` to also run a Lighthouse audit of the home page.

## Tool access

Use the local MCP server named `aisa-api`. For each operation ID, call `get_details({operation_id: "<id>"})` to read its schema, description and annotations; pricing is enforced by the AIsa gateway. Execute with `use({operation_id: "<id>", arguments: {...}})`. Include `max_price_usd` when a price ceiling is needed: it applies per upstream request, including each request in a composed operation's fan-out, not to the workflow total. If that exact operation is pinned and exposed as a tool, call it directly using its schema. Operation IDs below are exact catalog names, including composed operations; do not add server prefixes.

Use `batch_use` for up to 20 independent calls, respecting the workflow's order, dependencies and call budget. Keep dependent steps sequential.

Find APIs and workflows in the installed `aisa-api` skill: its single SKILL.md contains the complete operation directory and links to workflow skills. Select the exact operation ID there, then call get_details and use; no search call is needed. Clients with MCP resource support can read `skill://aisa-api/SKILL.md` through native resources/read. Skills provide instructions; reading one does not execute operations or expand the user's authorization. Perform external actions only within the user's authorized scope.

- `get_semrush_domain_overview`
- `get_ahrefs_domain_rating`
- `post_dataforseo_backlinks_summary_live`
- `get_semrush_domain_organic_keywords`
- `get_semrush_organic_competitors`
- `post_dataforseo_backlinks_referring_domains_live`
- `post_dataforseo_on_page_lighthouse_live_json`
- `post_dataforseo_labs_google_domain_rank_overview_live`

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
