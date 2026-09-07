---
name: aisa-api
description: Find and use AIsa APIs for web research, page extraction, website
  traffic and competitors, SEO and AI visibility, social posts and creators,
  company and contact enrichment, stocks, crypto, prediction markets and
  AgentMail email. Use for related data requests even when AIsa is not named,
  requests naming a supported provider, or questions about API coverage.
  联网搜索、网页抓取、竞品流量、市场调研、关键词、排名、外链、GEO、社交舆情、网红、销售线索、公司财报、股票币价、事件赔率、收发邮件。 If
  coverage is uncertain, inspect the directory or search the local API catalog.
---

# AIsa API

## Choose the smallest useful reference

For a multi-step task, start with [workflow skills](references/workflows.md). A workflow links directly to the details of its required operations. For an individual API, choose one server below and follow the relevant operation link. Do not load all server indexes or the full directory by default.

## Call an operation

Read its local details first: description, arguments_schema (including required fields, defaults and nested constraints), response_schema and annotations. Call use with the exact operation_id and an arguments object matching that schema. No get_details call is required when these files match the running server. If files are missing, outdated, or a validation error suggests a mismatch, call get_details and follow the running server's contract.

The four default MCP tools are search (discovery fallback), get_details (contract fallback), use and batch_use. Use search when the relevant server or operation remains unclear. Keep dependent steps sequential; batch_use accepts up to 20 independent calls. max_price_usd is per upstream request, including composed fan-outs, not a total workflow budget. Skills do not expand user authorization. Credentials come from local setup, never from conversation.

## Server indexes

### seo — AIsa SEO & AI Visibility

- [seo-ai-visibility](references/servers/seo-ai-visibility.md)
- [seo-apps](references/servers/seo-apps.md)
- [seo-backlinks](references/servers/seo-backlinks.md)
- [seo-business](references/servers/seo-business.md)
- [seo-content](references/servers/seo-content.md)
- [seo-domains](references/servers/seo-domains.md)
- [seo-keywords](references/servers/seo-keywords.md)
- [seo-labs](references/servers/seo-labs.md)
- [seo-merchant](references/servers/seo-merchant.md)
- [seo-onpage](references/servers/seo-onpage.md)
- [seo-serp](references/servers/seo-serp.md)
- [seo-serp-other-engines](references/servers/seo-serp-other-engines.md)

### finance — AIsa Finance

- [marketpulse](references/servers/marketpulse.md)
- [crypto-market-data](references/servers/crypto-market-data.md)
- [prediction-market-data](references/servers/prediction-market-data.md)
- [stock-pulse](references/servers/stock-pulse.md)

### social — AIsa Social

- [twitter-api](references/servers/twitter-api.md)
- [instagram](references/servers/instagram.md)
- [reddit](references/servers/reddit.md)
- [pinterest](references/servers/pinterest.md)
- [youtube-search](references/servers/youtube-search.md)

### search — AIsa Web Search & Research

- [web-search](references/servers/web-search.md)

### sales — AIsa Sales

- [apollo](references/servers/apollo.md)
- [creator-discovery](references/servers/creator-discovery.md)
- [similarweb](references/servers/similarweb.md)

### mail — AIsa Agent Mail

- [agentmail](references/servers/agentmail.md)

## Optional full index and references

- [Complete directory](references/directory.md): all 575 operations, for global browsing or local file search only.
- [Workflow index](references/workflows.md): 17 task recipes.
- use with operation_id `account` reads account balance and usage; get_details supplies its contract.

Clients without local file access may read these files using native MCP resources/read: `skill://aisa-api/SKILL.md`, `skill://aisa-api/references/servers/<server>.md`, or `skill://aisa-api/references/operations/<operation_id>.md`. Workflow skills use `skill://<skill-name>/SKILL.md`. All paths are from the installed package version; live pricing and availability come from the AIsa gateway.
