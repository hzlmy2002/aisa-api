---
name: aisa-gtm
description: "Go-to-market data in one set: people and company search (Apollo),
  creator discovery, X/Twitter, Instagram, Reddit, Pinterest and YouTube,
  Similarweb market intelligence, plus the Semrush, Ahrefs, Oxylabs and
  DataForSEO YouTube operations. Mirrors the Hive GTM Growth subscription: every
  operation here is subscription-only on the gateway, so a key without the plan
  gets 402 on all of them."
---

# AIsa GTM

Go-to-market data in one set: people and company search (Apollo), creator discovery, X/Twitter, Instagram, Reddit, Pinterest and YouTube, Similarweb market intelligence, plus the Semrush, Ahrefs, Oxylabs and DataForSEO YouTube operations. Mirrors the Hive GTM Growth subscription: every operation here is subscription-only on the gateway, so a key without the plan gets 402 on all of them.

Optional input: `task` (default `""`) — what you want to find out.

163 operations across these servers: `apollo`, `creator-discovery`, `similarweb`, `twitter-api`, `instagram`, `reddit`, `pinterest`, `youtube-search`. Read [operation coverage](references/operations.md) to select an operation, then read its schema.

Use the local MCP server named `aisa-api`. Read the linked local operation details for its full description, input schema, defaults and annotations; then execute with `use({operation_id: "<id>", arguments: {...}})`. You do not need to call get_details when the installed details already provide the contract. Use `get_details({operation_id: "<id>"})` if local details are missing or the installed skills and running server differ; the running server's schema takes precedence. Prices and live availability are enforced by the AIsa gateway, not these static files.

Include `max_price_usd` when needed: it applies to each upstream request, including composed fan-outs, not the workflow total. Use `batch_use` for up to 20 independent calls; keep dependent steps sequential. If the exact operation is pinned, it can also be called directly with its schema.

A matching workflow already links its required operations: read those details directly without loading the global directory. For other tasks, start with the short installed `aisa-api` skill and follow a relevant server index. Use `search` only when the right operation is unclear. Native MCP resources/read can read `skill://aisa-api/SKILL.md` or `skill://aisa-api/references/operations/<operation_id>.md`. Skills do not execute actions or expand the user's authorization.

Plan the minimal call set; use a tool's list input instead of looping when available. Label unavailable sources and any substitutes.

Relevant installed workflow skills:

- `aisa-enrich-lead-list` — Use when given a list of leads to enrich with contact and company details in bulk. 批量补全销售线索的联系人、工作邮箱和公司资料。
- `aisa-find-people-at-company` — Use when asked to find people in specific roles at a company and retrieve their work contact details. 按公司和职位寻找决策人、高管及其工作联系方式。
- `aisa-brand-mentions-across-social` — Use when asked to collect brand or product mentions across X, Reddit and Instagram. 跨多个社交平台收集品牌或产品提及，对比各平台反馈。
- `aisa-competitor-teardown` — Use when asked to analyze a competitor or map a market starting from a domain. 从域名分析竞争对手的网站流量、受众地域、相似网站和竞争格局。
- `aisa-creator-profile-snapshot` — Use when asked for an audience and recent-content snapshot of a creator or public account. 分析创作者或公开账号的个人资料、受众和最近发布的内容。
- `aisa-seo-keyword-opportunity` — Use when asked to assess a keyword opportunity or find easier related search terms. 研究关键词搜索量、竞争难度和相关长尾词，寻找自然搜索机会。
- `aisa-seo-site-audit` — Use when asked to audit the SEO health of a website, including authority, backlinks and page speed. 审计网站 SEO 健康情况，检查权威度、外链、关键词排名和页面速度。
- `aisa-stock-chatter-workflow` — Use when asked what X is saying about stocks together with the market data behind those mentions. 分析股票相关社交舆情，结合行情和新闻核对热门股票讨论。
- `aisa-track-topic-on-x` — Use when asked to investigate posts, authors or discussions about a topic on X/Twitter. 追踪 X、Twitter、推特上的话题讨论，分析发帖作者、关注点和回复，整理带来源的报告。
- `aisa-search-youtube-deliberately` — Use when asked to search YouTube with deliberate locale or filter choices and report the returned results. 按语言、地区和筛选条件搜索 YouTube 视频，整理搜索结果。
