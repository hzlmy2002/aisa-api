---
name: aisa-finance
description: Retrieve financial and market data for company research, stock
  screening and comparisons, quotes and price history, valuation, financial
  statements, earnings, analyst estimates, insider trades, filings and news;
  crypto prices, trends and liquidity; prediction-market events and odds; and
  stock discussion on X. Covers Financial Datasets, CoinGecko, Polymarket and
  Kalshi. 股票行情、美股财报、公司基本面、估值、内部交易、监管披露、投资研究、币价、加密市场、预测市场、事件概率、股票舆情。
---

# AIsa Finance

Market and company data: prices, fundamentals, filings, insider trades, crypto markets, prediction markets, and a scene agent that aligns what X is saying about tickers with how they are trading.

Optional input: `task` (default `""`) — what you want to find out.

49 operations across these servers: `marketpulse`, `crypto-market-data`, `prediction-market-data`, `stock-pulse`. Read [operation coverage](references/operations.md) to select an operation, then read its schema.

Use the local MCP server named `aisa-api`. Read the linked local operation details for its full description, input schema, defaults and annotations; then execute with `use({operation_id: "<id>", arguments: {...}})`. You do not need to call get_details when the installed details already provide the contract. Use `get_details({operation_id: "<id>"})` if local details are missing or the installed skills and running server differ; the running server's schema takes precedence. Prices and live availability are enforced by the AIsa gateway, not these static files.

Include `max_price_usd` when needed: it applies to each upstream request, including composed fan-outs, not the workflow total. Use `batch_use` for up to 20 independent calls; keep dependent steps sequential. If the exact operation is pinned, it can also be called directly with its schema.

A matching workflow already links its required operations: read those details directly without loading the global directory. For other tasks, start with the short installed `aisa-api` skill and follow a relevant server index. Use `search` only when the right operation is unclear. Native MCP resources/read can read `skill://aisa-api/SKILL.md` or `skill://aisa-api/references/operations/<operation_id>.md`. Skills do not execute actions or expand the user's authorization.

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
- `aisa-recent-topic-research` — Research what happened recently or what people are saying about a topic, product launch, company or competitor. Use for last-30-days research, launch reactions, recent trends and cross-source discussion briefs. 最近30天、近期动态、产品发布反响、热点趋势、竞品近况、社区反馈、舆情调研。
