---
name: aisa-compare-event-odds
description: Look up what prediction markets currently imply about an event,
  checking Polymarket against Kalshi so a single venue's pricing is never the
  only evidence. Handles the two venues' incompatible identifiers and filters,
  and says plainly when only one side has a market. Use when asked to compare
  the market-implied odds of the same event across prediction markets.
  对比同一事件在不同预测市场上的概率、赔率和成交情况。
---

# Compare market-implied odds across Polymarket and Kalshi

## Inputs

Extract inputs from the request and conversation. Apply optional defaults exactly; ask for required inputs only when they cannot be inferred. In the workflow, <input: NAME> means the resolved input, not a literal API argument.

- `question` (required): The event in plain language, e.g. "Fed cuts rates in December" or "Bitcoin above 200k this year". Keyword-matched against both venues.
- `include_closed` (optional; default "no"): `no` to look only at markets still trading, `yes` to also surface settled ones for historical context.

## Tool access

Use the local MCP server named `aisa-api`. For each operation ID, call `get_details({operation_id: "<id>"})` to read its schema, description and annotations; pricing is enforced by the AIsa gateway. Execute with `use({operation_id: "<id>", arguments: {...}})`. Include `max_price_usd` when a price ceiling is needed: it applies per upstream request, including each request in a composed operation's fan-out, not to the workflow total. If that exact operation is pinned and exposed as a tool, call it directly using its schema. Operation IDs below are exact catalog names, including composed operations; do not add server prefixes.

Use `batch_use` for up to 20 independent calls, respecting the workflow's order, dependencies and call budget. Keep dependent steps sequential.

Find another workflow with `search_skills` using its `aisa-` name or task description, then pass the returned URI to `read_resource`. Skills provide instructions; reading one does not execute operations or expand the user's authorization. Perform external actions only within the user's authorized scope.

- `get_polymarket_markets`
- `get_polymarket_events`
- `get_kalshi_markets`
- `get_kalshi_trades`

## Supporting resources

Read when relevant to interpreting the returned data:

- [Field-by-field map between Polymarket and Kalshi](references/aisa-venue-field-map.md) — Field-by-field mapping between Polymarket and Kalshi for the concepts that do not translate cleanly: identifiers, pagination, time filters, and status. Read this before querying both venues for the same question — three of the differences (boolean vs enum status, ISO vs Unix timestamps, offset vs cursor paging) produce wrong results rather than errors.

## Workflow

Find what prediction markets currently imply about: <input: question>
Include settled markets: <input: include_closed>

Two venues cover overlapping questions with different mechanics — Polymarket
is on-chain, Kalshi is CFTC-regulated. Checking both is the point: a single
venue's price is one crowd's view, and the gap between them is itself
information.

## Call order

1. Query both venues before drawing any conclusion. They do not share
   identifiers, so match by meaning, not by ID.

   Polymarket — `get_polymarket_markets`
   - There is no free-text search parameter. Narrow with `volume_num_min`
     to skip dead markets, and with `end_date_min` when the question has a
     deadline, then match titles yourself.
   - `closed` defaults to false, i.e. active markets only. Set it to true
     only when the user asked for settled ones.
   - Use `get_polymarket_events` instead when the question is a topic
     spanning several markets ("the election") rather than one proposition.

   Kalshi — `get_kalshi_markets`
   - `search` does keyword matching, but the value **must be URL-encoded**;
     a raw space will not match. Encode before sending.
   - Narrow with status="open" for live markets, status="settled" for
     resolved ones.

2. Read the implied probability off each side, and quote the raw fields you
   read it from. Do not restate a price as a probability without saying which
   field it came from — the two venues quote differently and a silent
   conversion is unauditable.

3. Only when the question is about recent movement: `get_kalshi_trades`
   returns the executed-trade tape, which shows whether a price moved on real
   volume or on one thin fill. Skip it when the user only asked for the
   current level.

## Reporting rules

- Report both venues side by side, each with its own market title, so the
  reader can confirm the two are really about the same proposition. Near-
  identical wording often hides different resolution criteria.
- When the two disagree, say so and report both numbers. Do not average them
  and do not pick the one you find more plausible.
- When only one venue has a market, say that explicitly. One-venue coverage
  is a materially weaker signal, and silence here reads as agreement.
- Report liquidity or volume alongside every price. A price on a market with
  almost no volume is not the same kind of number as one on a deep market.

## Out of scope

Do not tell the user what will happen, whether a market is mispriced, or
where to take a position. Market-implied probability is what a crowd is
currently paying, not a forecast you are endorsing.

## Fallbacks

- The two venues are independent. If one answers 402, is down or has no
  market for the event, report the other alone and say the comparison is
  one-sided; do not fill the missing side from memory.
