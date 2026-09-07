---
name: aisa-sales
description: "People and company search, enrichment, sequences and CRM objects
  through Apollo, creator discovery, and Similarweb market intelligence: any
  domain's traffic, audience, rankings and search rivals."
---

# AIsa Sales

People and company search, enrichment, sequences and CRM objects through Apollo, creator discovery, and Similarweb market intelligence: any domain's traffic, audience, rankings and search rivals.

Optional input: `task` (default `""`) — what you want to find out.

79 operations across these servers: `apollo`, `creator-discovery`, `similarweb`. Read [operation coverage](references/operations.md) to select an operation, then read its schema.

Use the local MCP server named `aisa-api`. Read the linked local operation details for its full description, input schema, defaults and annotations; then execute with `use({operation_id: "<id>", arguments: {...}})`. You do not need to call get_details when the installed details already provide the contract. Use `get_details({operation_id: "<id>"})` if local details are missing or the installed skills and running server differ; the running server's schema takes precedence. Prices and live availability are enforced by the AIsa gateway, not these static files.

Include `max_price_usd` when needed: it applies to each upstream request, including composed fan-outs, not the workflow total. Use `batch_use` for up to 20 independent calls; keep dependent steps sequential. If the exact operation is pinned, it can also be called directly with its schema.

A matching workflow already links its required operations: read those details directly without loading the global directory. For other tasks, start with the short installed `aisa-api` skill and follow a relevant server index. Use `search` only when the right operation is unclear. Native MCP resources/read can read `skill://aisa-api/SKILL.md` or `skill://aisa-api/references/operations/<operation_id>.md`. Skills do not execute actions or expand the user's authorization.

Plan the minimal call set; use a tool's list input instead of looping when available. Label unavailable sources and any substitutes.

Relevant installed workflow skills:

- `aisa-enrich-lead-list` — Use when given a list of leads to enrich with contact and company details in bulk. 批量补全销售线索的联系人、工作邮箱和公司资料。
- `aisa-find-people-at-company` — Use when asked to find people in specific roles at a company and retrieve their work contact details. 按公司和职位寻找决策人、高管及其工作联系方式。
- `aisa-competitor-teardown` — Use when asked to analyze a competitor or map a market starting from a domain. 从域名分析竞争对手的网站流量、受众地域、相似网站和竞争格局。
