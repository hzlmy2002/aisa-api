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

Use the local MCP server named `aisa-api`. For each operation ID, call `get_details({operation_id: "<id>"})` to read its schema, description and annotations; pricing is enforced by the AIsa gateway. Execute with `use({operation_id: "<id>", arguments: {...}})`. Include `max_price_usd` when a price ceiling is needed: it applies per upstream request, including each request in a composed operation's fan-out, not to the workflow total. If that exact operation is pinned and exposed as a tool, call it directly using its schema. Operation IDs below are exact catalog names, including composed operations; do not add server prefixes.

Use `batch_use` for up to 20 independent calls, respecting the workflow's order, dependencies and call budget. Keep dependent steps sequential.

Find APIs and workflows in the installed `aisa-api` skill: its single SKILL.md contains the complete operation directory and links to workflow skills. Select the exact operation ID there, then call get_details and use; no search call is needed. Clients with MCP resource support can read `skill://aisa-api/SKILL.md` through native resources/read. Skills provide instructions; reading one does not execute operations or expand the user's authorization. Perform external actions only within the user's authorized scope.

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
