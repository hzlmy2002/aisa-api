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

Use the local MCP server named `aisa-api`. For each operation ID, call `get_details({operation_id: "<id>"})` to read its schema, description and annotations; pricing is enforced by the AIsa gateway. Execute with `use({operation_id: "<id>", arguments: {...}})`. Include `max_price_usd` when a price ceiling is needed: it applies per upstream request, including each request in a composed operation's fan-out, not to the workflow total. If that exact operation is pinned and exposed as a tool, call it directly using its schema. Operation IDs below are exact catalog names, including composed operations; do not add server prefixes.

Use `batch_use` for up to 20 independent calls, respecting the workflow's order, dependencies and call budget. Keep dependent steps sequential.

Find another workflow with `search_skills` using its `aisa-` name or task description, then pass the returned URI to `read_resource`. Skills provide instructions; reading one does not execute operations or expand the user's authorization. Perform external actions only within the user's authorized scope.

Plan the minimal call set; use a tool's list input instead of looping when available. Label unavailable sources and any substitutes.

Relevant workflow names for search_skills:

- `aisa-enrich-lead-list` — Use when given a list of leads to enrich with contact and company details in bulk. 批量补全销售线索的联系人、工作邮箱和公司资料。
- `aisa-find-people-at-company` — Use when asked to find people in specific roles at a company and retrieve their work contact details. 按公司和职位寻找决策人、高管及其工作联系方式。
- `aisa-competitor-teardown` — Use when asked to analyze a competitor or map a market starting from a domain. 从域名分析竞争对手的网站流量、受众地域、相似网站和竞争格局。
