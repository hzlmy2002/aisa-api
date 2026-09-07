---
name: aisa-api
description: Discover AIsa API operations and packaged workflows when the user
  asks to use AIsa or explore its data coverage.
---

# AIsa API

Use this entry point for AIsa discovery or a task explicitly using AIsa. Select the specific workflow or category that matches the request.

The npm package supplies portable SKILL.md folders for Codex, Claude and Hermes. Tools are supplied by the local `aisa-api` MCP server.

Use the local MCP server named `aisa-api`. For each operation ID, call `get_details({operation_id: "<id>"})` to read its schema, description and annotations; pricing is enforced by the AIsa gateway. Execute with `use({operation_id: "<id>", arguments: {...}})`. Include `max_price_usd` when a price ceiling is needed: it applies per upstream request, including each request in a composed operation's fan-out, not to the workflow total. If that exact operation is pinned and exposed as a tool, call it directly using its schema. Operation IDs below are exact catalog names, including composed operations; do not add server prefixes.

Use `batch_use` for up to 20 independent calls, respecting the workflow's order, dependencies and call budget. Keep dependent steps sequential.

Find another workflow with `search_skills` using its `aisa-` name or task description, then pass the returned URI to `read_resource`. Skills provide instructions; reading one does not execute operations or expand the user's authorization. Perform external actions only within the user's authorized scope.

## Coverage

- `aisa-seo` — Search and AI-answer visibility: rankings, keywords, backlinks, site health, app and marketplace listings, local business data, and how a brand shows up in ChatGPT, Claude, Gemini and Perplexity answers. DataForSEO, Semrush and Ahrefs together.
- `aisa-finance` — Market and company data: prices, fundamentals, filings, insider trades, crypto markets, prediction markets, and a scene agent that aligns what X is saying about tickers with how they are trading.
- `aisa-social` — Public social data: X/Twitter users, posts, search and trends; Instagram, Reddit and Pinterest profiles and content; YouTube search.
- `aisa-search` — Web search, page extraction, crawling and grounded research through Tavily, Firecrawl, Exa, Perplexity, Oxylabs, txyz, and Anthropic/OpenAI grounded search.
- `aisa-sales` — People and company search, enrichment, sequences and CRM objects through Apollo, creator discovery, and Similarweb market intelligence: any domain's traffic, audience, rankings and search rivals.
- `aisa-mail` — Inboxes, threads, drafts and sending for agents through AgentMail.
- `aisa-gtm` — Go-to-market data in one set: people and company search (Apollo), creator discovery, X/Twitter, Instagram, Reddit, Pinterest and YouTube, Similarweb market intelligence, plus the Semrush, Ahrefs, Oxylabs and DataForSEO YouTube operations. Mirrors the Hive GTM Growth subscription: every operation here is subscription-only on the gateway, so a key without the plan gets 402 on all of them.

17 task workflows and 7 category skills cover 575 catalog operations. Search with the user's task description or an original workflow alias, then read the returned skill URI. Choose only the relevant skill; coverage does not imply that every task needs an API call.

## Supporting references

Read the relevant reference when interpreting its provider's data:

- [venue_field_map](references/prediction-market-data/aisa-venue-field-map.md) — Field-by-field mapping between Polymarket and Kalshi for the concepts that do not translate cleanly: identifiers, pagination, time filters, and status. Read this before querying both venues for the same question — three of the differences (boolean vs enum status, ISO vs Unix timestamps, offset vs cursor paging) produce wrong results rather than errors.
- [reading_the_bundle](references/stock-pulse/aisa-reading-the-bundle.md) — What each field in the twitter_stock_pulse response actually means, and the three ways it is commonly misread: treating `mentions` as a ranking, missing a partial failure recorded in `coverage`, and not noticing that one tool call billed several upstream calls. Read once before interpreting the bundle; it does not change between calls.
- [topic_report_template](references/twitter-api/aisa-topic-report-template.md) — A section-by-section skeleton for writing up X/Twitter topic research so a reader can audit it: what was searched, what came back, who said it, and what is missing. Read this when the deliverable is a written report rather than raw posts. Pairs with the track_topic_on_x prompt, which covers how to gather the material.

## Credentials

If credentials are missing, configure them locally through the client’s MCP environment or credential settings using the package setup instructions. Do not ask the user to paste API keys into the conversation.
