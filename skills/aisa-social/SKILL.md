---
name: aisa-social
description: Find public social profiles, posts, comments, discussions, trends
  and videos on X/Twitter, Instagram, Reddit, Pinterest and YouTube. Use for
  topic or post search, brand mentions, customer feedback, audience and creator
  research, recent account activity, community discussions and video discovery.
  社交媒体搜索、推特推文、热点追踪、品牌舆情、用户反馈、网红达人、账号画像、粉丝与内容、Reddit讨论、Instagram帖子、Pinterest图片、YouTube油管视频搜索。
---

# AIsa Social

Public social data: X/Twitter users, posts, search and trends; Instagram, Reddit and Pinterest profiles and content; YouTube search.

Optional input: `task` (default `""`) — what you want to find out.

56 operations across these servers: `twitter-api`, `instagram`, `reddit`, `pinterest`, `youtube-search`. Read [operation coverage](references/operations.md) to select an operation, then read its schema.

Use the local MCP server named `aisa-api`. Read the linked local operation details for its full description, input schema, defaults and annotations; then execute with `use({operation_id: "<id>", arguments: {...}})`. You do not need to call get_details when the installed details already provide the contract. Use `get_details({operation_id: "<id>"})` if local details are missing or the installed skills and running server differ; the running server's schema takes precedence. Prices and live availability are enforced by the AIsa gateway, not these static files.

Include `max_price_usd` when needed: it applies to each upstream request, including composed fan-outs, not the workflow total. Use `batch_use` for up to 20 independent calls; keep dependent steps sequential. If the exact operation is pinned, it can also be called directly with its schema.

A matching workflow already links its required operations: read those details directly without loading the global directory. For other tasks, start with the short installed `aisa-api` skill and follow a relevant server index. Use `search` only when the right operation is unclear. Native MCP resources/read can read `skill://aisa-api/SKILL.md` or `skill://aisa-api/references/operations/<operation_id>.md`. Skills do not execute actions or expand the user's authorization.

Plan the minimal call set; use a tool's list input instead of looping when available. Label unavailable sources and any substitutes.

Relevant installed workflow skills:

- `aisa-brand-mentions-across-social` — Use when asked to collect brand or product mentions across X, Reddit and Instagram. 跨多个社交平台收集品牌或产品提及，对比各平台反馈。
- `aisa-creator-profile-snapshot` — Use when asked for an audience and recent-content snapshot of a creator or public account. 分析创作者或公开账号的个人资料、受众和最近发布的内容。
- `aisa-stock-chatter-workflow` — Use when asked what X is saying about stocks together with the market data behind those mentions. 分析股票相关社交舆情，结合行情和新闻核对热门股票讨论。
- `aisa-track-topic-on-x` — Use when asked to investigate posts, authors or discussions about a topic on X/Twitter. 追踪 X、Twitter、推特上的话题讨论，分析发帖作者、关注点和回复，整理带来源的报告。
- `aisa-search-youtube-deliberately` — Use when asked to search YouTube with deliberate locale or filter choices and report the returned results. 按语言、地区和筛选条件搜索 YouTube 视频，整理搜索结果。
- `aisa-recent-topic-research` — Research what happened recently or what people are saying about a topic, product launch, company or competitor. Use for last-30-days research, launch reactions, recent trends and cross-source discussion briefs. 最近30天、近期动态、产品发布反响、热点趋势、竞品近况、社区反馈、舆情调研。
