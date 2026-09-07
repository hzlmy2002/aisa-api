---
name: aisa-crypto-market-health
description: "Market-wide read: the largest coins and their moves, what is
  trending, which sectors are up, and how Bitcoin traded over the last week.
  Sets the order and the size of each call; it does not predict. Use when asked
  for a market-wide crypto overview covering large coins, sectors, attention and
  Bitcoin history. 查看加密市场整体行情、热门币种、板块表现和比特币历史走势。"
---

# Where the crypto market is today, in four calls

## Inputs

Extract inputs from the request and conversation. Apply optional defaults exactly; ask for required inputs only when they cannot be inferred. In the workflow, <input: NAME> means the resolved input, not a literal API argument.

- `vs_currency` (optional; default "usd"): Quote currency for every number, e.g. `usd`.
- `days` (optional; default "7"): Lookback for the Bitcoin chart in days, e.g. `7`.

## Tool access

Use the local MCP server named `aisa-api`. For each operation ID, call `get_details({operation_id: "<id>"})` to read its schema, description and annotations; pricing is enforced by the AIsa gateway. Execute with `use({operation_id: "<id>", arguments: {...}})`. Include `max_price_usd` when a price ceiling is needed: it applies per upstream request, including each request in a composed operation's fan-out, not to the workflow total. If that exact operation is pinned and exposed as a tool, call it directly using its schema. Operation IDs below are exact catalog names, including composed operations; do not add server prefixes.

Use `batch_use` for up to 20 independent calls, respecting the workflow's order, dependencies and call budget. Keep dependent steps sequential.

Find APIs and workflows in the installed `aisa-api` skill: its single SKILL.md contains the complete operation directory and links to workflow skills. Select the exact operation ID there, then call get_details and use; no search call is needed. Clients with MCP resource support can read `skill://aisa-api/SKILL.md` through native resources/read. Skills provide instructions; reading one does not execute operations or expand the user's authorization. Perform external actions only within the user's authorized scope.

- `get_coingecko_coins_markets`
- `get_coingecko_search_trending`
- `get_coingecko_coins_categories`
- `get_coingecko_coins_id_market_chart`

## Workflow

Crypto market health · quote currency <input: vs_currency> · Bitcoin lookback <input: days> days

1. The big picture. Call `get_coingecko_coins_markets` with
   vs_currency=<input: vs_currency>, per_page=20, page=1 and sparkline=false.
   Keep it to one page: this is the largest response in the set.
   Note total dominance of the top three and the 24h movers among the 20.

2. What people are looking at. Call `get_coingecko_search_trending` —
   no arguments. Trending is attention, not price; say so.

3. Which sectors. Call `get_coingecko_coins_categories` once. Report the
   top and bottom three by 24h change with their market caps.

4. Bitcoin's week. Call `get_coingecko_coins_id_market_chart` with
   id=bitcoin, vs_currency=<input: vs_currency> and days=<input: days>. Summarise the
   range and where today sits in it; do not request a smaller interval,
   the daily series is enough here.

Stop after four calls. Individual coin deep-dives are the
`aisa-look-up-token-market` workflow.

Report: three lines on the top coins, three on sectors, one on
trending, one on Bitcoin's week — every number with its timestamp.

Typical call budget: 4 calls, no paging.

## Fallbacks

- If `get_coingecko_coins_markets` fails, skip the market table and keep
  the other three; do not page through `get_coingecko_coins_categories`
  to reconstruct it.
- If the Bitcoin chart fails, report the range as "not available".
- Say in the report which fallback was used and why.
