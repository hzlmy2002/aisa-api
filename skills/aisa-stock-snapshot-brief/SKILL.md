---
name: aisa-stock-snapshot-brief
description: Price, valuation, latest earnings, what analysts expect, who inside
  is buying or selling, and the news behind it — six calls, one page. Sets the
  order and where to stop; it does not give investment advice. Use when asked
  for a concise current company brief covering price, valuation, earnings,
  insiders and news. 汇总单只股票的最新股价、估值、财报预期、内部交易和新闻。
---

# A one-page brief on a listed company, today

## Inputs

Extract inputs from the request and conversation. Apply optional defaults exactly; ask for required inputs only when they cannot be inferred. In the workflow, <input: NAME> means the resolved input, not a literal API argument.

- `ticker` (required): The ticker symbol, e.g. `AAPL`.

## Tool access

Use the local MCP server named `aisa-api`. For each operation ID, call `get_details({operation_id: "<id>"})` to read its schema, description and annotations; pricing is enforced by the AIsa gateway. Execute with `use({operation_id: "<id>", arguments: {...}})`. Include `max_price_usd` when a price ceiling is needed: it applies per upstream request, including each request in a composed operation's fan-out, not to the workflow total. If that exact operation is pinned and exposed as a tool, call it directly using its schema. Operation IDs below are exact catalog names, including composed operations; do not add server prefixes.

Use `batch_use` for up to 20 independent calls, respecting the workflow's order, dependencies and call budget. Keep dependent steps sequential.

Find APIs and workflows in the installed `aisa-api` skill: its single SKILL.md contains the complete operation directory and links to workflow skills. Select the exact operation ID there, then call get_details and use; no search call is needed. Clients with MCP resource support can read `skill://aisa-api/SKILL.md` through native resources/read. Skills provide instructions; reading one does not execute operations or expand the user's authorization. Perform external actions only within the user's authorized scope.

- `get_financial_prices_snapshot`
- `get_financial_financial_metrics_snapshot`
- `get_financial_earnings`
- `get_financial_analyst_estimates`
- `get_financial_insider_trades`
- `get_financial_news`

## Supporting resources

Read when relevant to interpreting the returned data:

- [How to read what stock_pulse returns](references/aisa-reading-the-bundle.md) — What each field in the twitter_stock_pulse response actually means, and the three ways it is commonly misread: treating `mentions` as a ranking, missing a partial failure recorded in `coverage`, and not noticing that one tool call billed several upstream calls. Read once before interpreting the bundle; it does not change between calls.

## Workflow

One-page brief on: <input: ticker>

All six tools take ticker=<input: ticker>; run them in this order and stop —
full statements, filings and price history are separate tasks.

1. `get_financial_prices_snapshot` — last price, day change, volume.
2. `get_financial_financial_metrics_snapshot` — market cap, P/E, margins,
   debt; the valuation line of the brief.
3. `get_financial_earnings` — the most recent quarters: beat or miss,
   and by how much.
4. `get_financial_analyst_estimates` with a small limit — consensus for
   the next periods; compare with step 3's actuals.
5. `get_financial_insider_trades` with a small limit — the last insider
   buys and sells; note whether officers are net buyers or sellers.
6. `get_financial_news` with a small limit — the headlines that explain
   any move you saw in step 1.

Report in this order: price and move · valuation · last earnings vs
estimate · what analysts expect next · insider activity · the news that
matters. One line each, numbers with their date. Do not extrapolate
beyond what the six calls returned.

Typical call budget: 6 calls, ideally one batch_use.

## Fallbacks

- Each of the six is independent: a failure leaves that line as "not
  available" and the other five stand. Do not retry.
- If `get_financial_news` returns nothing, say so; do not substitute web
  search unless asked — the brief is about the filings-grade sources.
