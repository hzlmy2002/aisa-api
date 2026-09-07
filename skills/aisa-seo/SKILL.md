---
name: aisa-seo
description: "Search and AI-answer visibility: rankings, keywords, backlinks,
  site health, app and marketplace listings, local business data, and how a
  brand shows up in ChatGPT, Claude, Gemini and Perplexity answers. DataForSEO,
  Semrush and Ahrefs together."
---

# AIsa SEO & AI Visibility

Search and AI-answer visibility: rankings, keywords, backlinks, site health, app and marketplace listings, local business data, and how a brand shows up in ChatGPT, Claude, Gemini and Perplexity answers. DataForSEO, Semrush and Ahrefs together.

Optional input: `task` (default `""`) — what you want to find out.

316 operations across these servers: `seo-ai-visibility`, `seo-apps`, `seo-backlinks`, `seo-business`, `seo-content`, `seo-domains`, `seo-keywords`, `seo-labs`, `seo-merchant`, `seo-onpage`, `seo-serp`, `seo-serp-other-engines`. Read [operation coverage](references/operations.md) to select an operation, then read its schema.

Use the local MCP server named `aisa-api`. For each operation ID, call `get_details({operation_id: "<id>"})` to read its schema, description and annotations; pricing is enforced by the AIsa gateway. Execute with `use({operation_id: "<id>", arguments: {...}})`. Include `max_price_usd` when a price ceiling is needed: it applies per upstream request, including each request in a composed operation's fan-out, not to the workflow total. If that exact operation is pinned and exposed as a tool, call it directly using its schema. Operation IDs below are exact catalog names, including composed operations; do not add server prefixes.

Use `batch_use` for up to 20 independent calls, respecting the workflow's order, dependencies and call budget. Keep dependent steps sequential.

Find APIs and workflows in the installed `aisa-api` skill: its single SKILL.md contains the complete operation directory and links to workflow skills. Select the exact operation ID there, then call get_details and use; no search call is needed. Clients with MCP resource support can read `skill://aisa-api/SKILL.md` through native resources/read. Skills provide instructions; reading one does not execute operations or expand the user's authorization. Perform external actions only within the user's authorized scope.

Plan the minimal call set; use a tool's list input instead of looping when available. Label unavailable sources and any substitutes.

Relevant installed workflow skills:

- `aisa-competitor-teardown` — Use when asked to analyze a competitor or map a market starting from a domain. 从域名分析竞争对手的网站流量、受众地域、相似网站和竞争格局。
- `aisa-seo-ai-visibility` — Use when asked how a brand appears in AI answers or which sources those answers cite. 检查品牌在 AI 回答中的可见度、提及情况和引用来源。
- `aisa-seo-keyword-opportunity` — Use when asked to assess a keyword opportunity or find easier related search terms. 研究关键词搜索量、竞争难度和相关长尾词，寻找自然搜索机会。
- `aisa-seo-site-audit` — Use when asked to audit the SEO health of a website, including authority, backlinks and page speed. 审计网站 SEO 健康情况，检查权威度、外链、关键词排名和页面速度。
