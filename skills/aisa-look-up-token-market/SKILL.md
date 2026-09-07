---
name: aisa-look-up-token-market
description: "Resolve an ambiguous ticker, name or contract address into a
  single CoinGecko asset, then pull its current numbers and — only if asked —
  history and venue liquidity. Handles the two traps that make CoinGecko answers
  wrong rather than merely incomplete: ticker symbols are not unique, and half
  the endpoints want a CoinGecko id while the other half want a chain plus a
  contract address. Use when asked to identify a coin or token and retrieve its
  price, market history or venue liquidity. 通过币名或合约地址识别代币，查询价格、历史走势和交易所流动性。"
---

# Look up a coin or token's market picture on CoinGecko

## Inputs

Extract inputs from the request and conversation. Apply optional defaults exactly; ask for required inputs only when they cannot be inferred. In the workflow, <input: NAME> means the resolved input, not a literal API argument.

- `asset` (required): What the user named: a ticker (BTC), a full name (Bitcoin), a CoinGecko id (bitcoin), or an on-chain contract address (0x...). Do not assume which one it is — step 1 decides.
- `lookback_days` (optional; default "0"): How far back to pull history, in days. Use 0 when the user only asked about the present, and skip the history step entirely.

## Tool access

Use the local MCP server named `aisa-api`. For each operation ID, call `get_details({operation_id: "<id>"})` to read its schema, description and annotations; pricing is enforced by the AIsa gateway. Execute with `use({operation_id: "<id>", arguments: {...}})`. Include `max_price_usd` when a price ceiling is needed: it applies per upstream request, including each request in a composed operation's fan-out, not to the workflow total. If that exact operation is pinned and exposed as a tool, call it directly using its schema. Operation IDs below are exact catalog names, including composed operations; do not add server prefixes.

Use `batch_use` for up to 20 independent calls, respecting the workflow's order, dependencies and call budget. Keep dependent steps sequential.

Find another workflow with `search_skills` using its `aisa-` name or task description, then pass the returned URI to `read_resource`. Skills provide instructions; reading one does not execute operations or expand the user's authorization. Perform external actions only within the user's authorized scope.

- `get_coingecko_coins_list`
- `get_coingecko_token_data`
- `get_coingecko_simple_token_price_id`
- `get_coingecko_simple_price`
- `get_coingecko_coins_markets`
- `get_coingecko_coins_id`
- `get_coingecko_coins_id_market_chart`
- `get_coingecko_coins_id_market_chart_range`
- `get_coingecko_coins_id_ohlc`
- `get_coingecko_coins_id_tickers`
- `get_coingecko_search_trending`

## Workflow

Build the market picture for: <input: asset>
History window in days: <input: lookback_days>

## 1. Settle identity before fetching any number

Every wrong CoinGecko answer starts here. A ticker symbol is not unique —
dozens of coins share popular ones, and picking the wrong row produces a
confident, completely wrong price. Decide which of the three cases applies:

- **It is a contract address** (starts with 0x, or the user named a chain):
  call `get_coingecko_token_data` with the asset platform as the id and the
  address as the contract address. This both identifies the token and returns
  its full profile, so you usually need nothing else in this step. When only
  the price matters, `get_coingecko_simple_token_price_id` is much lighter.

- **It is already a CoinGecko id** (lowercase, hyphenated, e.g. bitcoin):
  use it directly.

- **It is a ticker or a human name**: resolve it. `get_coingecko_coins_list`
  is the authoritative map, but it returns roughly 18,000 entries and takes
  several seconds — treat it as a one-time lookup you cache, never a per-query
  call. If more than one entry matches the symbol, do not guess: pull the
  candidates through `get_coingecko_coins_markets` and let market cap rank
  disambiguate, then say in the answer which one you picked and why.

If the user gave nothing specific and is asking what is moving, start from
`get_coingecko_search_trending` instead — but note it ranks by CoinGecko
search activity, which is attention, not price movement.

## 2. Current numbers

Pick the lightest tool that answers the question actually asked:

- Price only, ids already known → `get_coingecko_simple_price`.
- Price plus rank, supply, 24h range and all-time highs, or several coins
  side by side → `get_coingecko_coins_markets`.
- One coin in depth: description, links, categories, per-chain contract
  addresses → `get_coingecko_coins_id`. Leave its optional sections off
  unless you need them; the full payload is large.

## 3. History — only when <input: lookback_days> is above zero

- A trailing window ending now → `get_coingecko_coins_id_market_chart`.
  Granularity is chosen from the day count; force it with `interval='hourly'`
  when you need intraday resolution.
- A fixed window with a known start and end → use
  `get_coingecko_coins_id_market_chart_range`. Its from and to are Unix
  timestamps in **seconds**, while the timestamps inside every response are
  in **milliseconds**. Mixing the two returns an empty or wildly shifted
  series rather than an error, so convert deliberately and state the window
  you actually queried.
- Candles for technical reading → `get_coingecko_coins_id_ohlc`. Its rows are
  positional with no field names: timestamp, open, high, low, close. There is
  no volume in this response.

## 4. Liquidity — only when the user asked where it trades or how deep it is

`get_coingecko_coins_id_tickers` returns the per-venue pairs with volume,
spread and, when depth is requested, the cost to move the book. Report the
anomaly and stale flags whenever they are set: a price on a stale or flagged
ticker is not comparable to a live one.

## Reporting rules

- Name the exact asset you resolved to — id, symbol and full name — before
  any number. If the input was ambiguous, say what else it could have been.
- Quote the field each number came from. Market cap from a ranked table and
  market cap from a coin profile are different fields and can disagree.
- Give every timestamp in a stated timezone, and say whether it came back in
  seconds or milliseconds.
- When a value is missing or an endpoint returned nothing, say so. Do not
  fill the gap from memory — prices from training data are always stale.

## Out of scope

Do not say whether the asset is cheap, expensive, undervalued, or worth
holding. Do not rank assets by attractiveness, produce a score, or suggest an
entry or exit. Return the numbers and where they came from; the caller's agent
decides what they mean.

## Fallbacks

- If `get_coingecko_coins_markets` fails for the id, `get_coingecko_simple_price`
  with include_market_cap and include_24hr_change gives the headline numbers.
- If the market chart fails, `get_coingecko_coins_id_ohlc` for the same
  window is the same story in candles.
- If the token cannot be found by contract address, say so; do not guess an
  id from the symbol. Say which fallback was used and why.
