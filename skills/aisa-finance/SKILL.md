---
name: aisa-finance
description: "Market and company data: prices, fundamentals, filings, insider
  trades, crypto markets, prediction markets, and a scene agent that aligns what
  X is saying about tickers with how they are trading."
---

# AIsa Finance

Market and company data: prices, fundamentals, filings, insider trades, crypto markets, prediction markets, and a scene agent that aligns what X is saying about tickers with how they are trading.

Optional input: `task` (default `""`) — what you want to find out.

49 operations across these servers: `marketpulse`, `crypto-market-data`, `prediction-market-data`, `stock-pulse`. Read [operation coverage](references/operations.md) to select an operation, then read its schema.

Use the local MCP server named `aisa-api`. For each operation ID, call `get_details({operation_id: "<id>"})` to read its schema, description and annotations; pricing is enforced by the AIsa gateway. Execute with `use({operation_id: "<id>", arguments: {...}})`. Include `max_price_usd` when a price ceiling is needed: it applies per upstream request, including each request in a composed operation's fan-out, not to the workflow total. If that exact operation is pinned and exposed as a tool, call it directly using its schema. Operation IDs below are exact catalog names, including composed operations; do not add server prefixes.

Use `batch_use` for up to 20 independent calls, respecting the workflow's order, dependencies and call budget. Keep dependent steps sequential.

Find APIs and workflows in the installed `aisa-api` skill: its single SKILL.md contains the complete operation directory and links to workflow skills. Select the exact operation ID there, then call get_details and use; no search call is needed. Clients with MCP resource support can read `skill://aisa-api/SKILL.md` through native resources/read. Skills provide instructions; reading one does not execute operations or expand the user's authorization. Perform external actions only within the user's authorized scope.

Plan the minimal call set; use a tool's list input instead of looping when available. Label unavailable sources and any substitutes.

Relevant installed workflow skills:

- `aisa-crypto-market-health` — Use when asked for a market-wide crypto overview covering large coins, sectors, attention and Bitcoin history. 查看加密市场整体行情、热门币种、板块表现和比特币历史走势。
- `aisa-look-up-token-market` — Use when asked to identify a coin or token and retrieve its price, market history or venue liquidity. 通过币名或合约地址识别代币，查询价格、历史走势和交易所流动性。
- `aisa-company-fundamentals` — Use when asked to assemble financial statements, metrics or filings for a US-listed company. 研究美股公司基本面，整理财务报表、估值指标和监管披露。
- `aisa-stock-snapshot-brief` — Use when asked for a concise current company brief covering price, valuation, earnings, insiders and news. 汇总单只股票的最新股价、估值、财报预期、内部交易和新闻。
- `aisa-compare-event-odds` — Use when asked to compare the market-implied odds of the same event across prediction markets. 对比同一事件在不同预测市场上的概率、赔率和成交情况。
- `aisa-brand-mentions-across-social` — Use when asked to collect brand or product mentions across X, Reddit and Instagram. 跨多个社交平台收集品牌或产品提及，对比各平台反馈。
- `aisa-stock-chatter-workflow` — Use when asked what X is saying about stocks together with the market data behind those mentions. 分析股票相关社交舆情，结合行情和新闻核对热门股票讨论。
- `aisa-track-topic-on-x` — Use when asked to investigate posts, authors or discussions about a topic on X/Twitter. 追踪 X、Twitter、推特上的话题讨论，分析发帖作者、关注点和回复，整理带来源的报告。
