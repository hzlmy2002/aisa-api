---
name: aisa-social
description: "Public social data: X/Twitter users, posts, search and trends;
  Instagram, Reddit and Pinterest profiles and content; YouTube search."
---

# AIsa Social

Public social data: X/Twitter users, posts, search and trends; Instagram, Reddit and Pinterest profiles and content; YouTube search.

Optional input: `task` (default `""`) — what you want to find out.

56 operations across these servers: `twitter-api`, `instagram`, `reddit`, `pinterest`, `youtube-search`. Read [operation coverage](references/operations.md) to select an operation, then read its schema.

Use the local MCP server named `aisa-api`. For each operation ID, call `get_details({operation_id: "<id>"})` to read its schema, description and annotations; pricing is enforced by the AIsa gateway. Execute with `use({operation_id: "<id>", arguments: {...}})`. Include `max_price_usd` when a price ceiling is needed: it applies per upstream request, including each request in a composed operation's fan-out, not to the workflow total. If that exact operation is pinned and exposed as a tool, call it directly using its schema. Operation IDs below are exact catalog names, including composed operations; do not add server prefixes.

Use `batch_use` for up to 20 independent calls, respecting the workflow's order, dependencies and call budget. Keep dependent steps sequential.

Find APIs and workflows in the installed `aisa-api` skill: its single SKILL.md contains the complete operation directory and links to workflow skills. Select the exact operation ID there, then call get_details and use; no search call is needed. Clients with MCP resource support can read `skill://aisa-api/SKILL.md` through native resources/read. Skills provide instructions; reading one does not execute operations or expand the user's authorization. Perform external actions only within the user's authorized scope.

Plan the minimal call set; use a tool's list input instead of looping when available. Label unavailable sources and any substitutes.

Relevant installed workflow skills:

- `aisa-brand-mentions-across-social` — Use when asked to collect brand or product mentions across X, Reddit and Instagram. 跨多个社交平台收集品牌或产品提及，对比各平台反馈。
- `aisa-creator-profile-snapshot` — Use when asked for an audience and recent-content snapshot of a creator or public account. 分析创作者或公开账号的个人资料、受众和最近发布的内容。
- `aisa-stock-chatter-workflow` — Use when asked what X is saying about stocks together with the market data behind those mentions. 分析股票相关社交舆情，结合行情和新闻核对热门股票讨论。
- `aisa-track-topic-on-x` — Use when asked to investigate posts, authors or discussions about a topic on X/Twitter. 追踪 X、Twitter、推特上的话题讨论，分析发帖作者、关注点和回复，整理带来源的报告。
- `aisa-search-youtube-deliberately` — Use when asked to search YouTube with deliberate locale or filter choices and report the returned results. 按语言、地区和筛选条件搜索 YouTube 视频，整理搜索结果。
