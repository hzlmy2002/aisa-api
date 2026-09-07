---
name: aisa-search
description: Web search, page extraction, crawling and grounded research through
  Tavily, Firecrawl, Exa, Perplexity, Oxylabs, txyz, and Anthropic/OpenAI
  grounded search.
---

# AIsa Web Search & Research

Web search, page extraction, crawling and grounded research through Tavily, Firecrawl, Exa, Perplexity, Oxylabs, txyz, and Anthropic/OpenAI grounded search.

Optional input: `task` (default `""`) — what you want to find out.

27 operations across these servers: `web-search`. Read [operation coverage](references/operations.md) to select an operation, then read its schema.

Use the local MCP server named `aisa-api`. For each operation ID, call `get_details({operation_id: "<id>"})` to read its schema, description and annotations; pricing is enforced by the AIsa gateway. Execute with `use({operation_id: "<id>", arguments: {...}})`. Include `max_price_usd` when a price ceiling is needed: it applies per upstream request, including each request in a composed operation's fan-out, not to the workflow total. If that exact operation is pinned and exposed as a tool, call it directly using its schema. Operation IDs below are exact catalog names, including composed operations; do not add server prefixes.

Use `batch_use` for up to 20 independent calls, respecting the workflow's order, dependencies and call budget. Keep dependent steps sequential.

Find APIs and workflows in the installed `aisa-api` skill: its single SKILL.md contains the complete operation directory and links to workflow skills. Select the exact operation ID there, then call get_details and use; no search call is needed. Clients with MCP resource support can read `skill://aisa-api/SKILL.md` through native resources/read. Skills provide instructions; reading one does not execute operations or expand the user's authorization. Perform external actions only within the user's authorized scope.

Plan the minimal call set; use a tool's list input instead of looping when available. Label unavailable sources and any substitutes.

Relevant installed workflow skills:

- `aisa-brand-mentions-across-social` — Use when asked to collect brand or product mentions across X, Reddit and Instagram. 跨多个社交平台收集品牌或产品提及，对比各平台反馈。
- `aisa-creator-profile-snapshot` — Use when asked for an audience and recent-content snapshot of a creator or public account. 分析创作者或公开账号的个人资料、受众和最近发布的内容。
- `aisa-research-brief` — Use when asked to research one question on the open web and produce a short sourced brief. 围绕一个问题进行公开网页研究，交叉核实资料，撰写带引用的简报。
