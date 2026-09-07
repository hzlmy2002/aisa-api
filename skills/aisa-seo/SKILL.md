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

Use the local MCP server named `aisa-api`. Read the linked local operation details for its full description, input schema, defaults and annotations; then execute with `use({operation_id: "<id>", arguments: {...}})`. You do not need to call get_details when the installed details already provide the contract. Use `get_details({operation_id: "<id>"})` if local details are missing or the installed skills and running server differ; the running server's schema takes precedence. Prices and live availability are enforced by the AIsa gateway, not these static files.

Include `max_price_usd` when needed: it applies to each upstream request, including composed fan-outs, not the workflow total. Use `batch_use` for up to 20 independent calls; keep dependent steps sequential. If the exact operation is pinned, it can also be called directly with its schema.

A matching workflow already links its required operations: read those details directly without loading the global directory. For other tasks, start with the short installed `aisa-api` skill and follow a relevant server index. Use `search` only when the right operation is unclear. Native MCP resources/read can read `skill://aisa-api/SKILL.md` or `skill://aisa-api/references/operations/<operation_id>.md`. Skills do not execute actions or expand the user's authorization.

Plan the minimal call set; use a tool's list input instead of looping when available. Label unavailable sources and any substitutes.

Relevant installed workflow skills:

- `aisa-competitor-teardown` — Use when asked to analyze a competitor or map a market starting from a domain. 从域名分析竞争对手的网站流量、受众地域、相似网站和竞争格局。
- `aisa-seo-ai-visibility` — Use when asked how a brand appears in AI answers or which sources those answers cite. 检查品牌在 AI 回答中的可见度、提及情况和引用来源。
- `aisa-seo-keyword-opportunity` — Use when asked to assess a keyword opportunity or find easier related search terms. 研究关键词搜索量、竞争难度和相关长尾词，寻找自然搜索机会。
- `aisa-seo-site-audit` — Use when asked to audit the SEO health of a website, including authority, backlinks and page speed. 审计网站 SEO 健康情况，检查权威度、外链、关键词排名和页面速度。
