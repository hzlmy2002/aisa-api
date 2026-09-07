---
name: aisa-company-fundamentals
description: "Use when asked to assemble financial statements, metrics or
  filings for a US-listed company. 研究美股公司基本面，整理财务报表、估值指标和监管披露。 Related requests:
  公司基本面, 财务报表, 美股财报, company financials. Sources: financial-datasets."
---

# Assemble the fundamentals picture for a US-listed company

Resolve a company, then pull the slices of its financial record that the question actually needs — price, statements, ratios, earnings, insiders, filings — without dragging back everything. Encodes the two things that reliably go wrong here: half these tools refuse to answer without a period argument, and several pairs look interchangeable but differ by an order of magnitude in how much they return.

## Inputs

Extract inputs from the request and conversation. Apply optional defaults exactly; ask for required inputs only when they cannot be inferred. In the workflow, <input: NAME> means the resolved input, not a literal API argument.

- `company` (required): The company as the user named it — a ticker (NVDA), a full name (NVIDIA), or a CIK. Step 1 settles which.
- `period` (optional; default "annual"): Reporting basis for anything drawn from statements: annual, quarterly, or ttm. Not optional on those tools — pick one deliberately, because annual and quarterly figures for the same company are not comparable.

## Tool access

Use the local MCP server named `aisa-api`. Read the linked local operation details for its full description, input schema, defaults and annotations; then execute with `use({operation_id: "<id>", arguments: {...}})`. You do not need to call get_details when the installed details already provide the contract. Use `get_details({operation_id: "<id>"})` if local details are missing or the installed skills and running server differ; the running server's schema takes precedence. Prices and live availability are enforced by the AIsa gateway, not these static files.

Include `max_price_usd` when needed: it applies to each upstream request, including composed fan-outs, not the workflow total. Use `batch_use` for up to 20 independent calls; keep dependent steps sequential. If the exact operation is pinned, it can also be called directly with its schema.

A matching workflow already links its required operations: read those details directly without loading the global directory. For other tasks, start with the short installed `aisa-api` skill and follow a relevant server index. Use `search` only when the right operation is unclear. Native MCP resources/read can read `skill://aisa-api/SKILL.md` or `skill://aisa-api/references/operations/<operation_id>.md`. Skills do not execute actions or expand the user's authorization.

- [get_financial_company_facts](../aisa-api/references/operations/get_financial_company_facts.md)
- [post_financial_financials_search_screener](../aisa-api/references/operations/post_financial_financials_search_screener.md)
- [get_financial_prices_snapshot](../aisa-api/references/operations/get_financial_prices_snapshot.md)
- [get_financial_prices](../aisa-api/references/operations/get_financial_prices.md)
- [get_financial_financials](../aisa-api/references/operations/get_financial_financials.md)
- [get_financial_financials_income_statements](../aisa-api/references/operations/get_financial_financials_income_statements.md)
- [get_financial_financials_balance_sheets](../aisa-api/references/operations/get_financial_financials_balance_sheets.md)
- [get_financial_financials_cash_flow_statements](../aisa-api/references/operations/get_financial_financials_cash_flow_statements.md)
- [post_financial_financials_search_line_items](../aisa-api/references/operations/post_financial_financials_search_line_items.md)
- [get_financial_financial_metrics_snapshot](../aisa-api/references/operations/get_financial_financial_metrics_snapshot.md)
- [get_financial_financial_metrics](../aisa-api/references/operations/get_financial_financial_metrics.md)
- [get_financial_earnings](../aisa-api/references/operations/get_financial_earnings.md)
- [get_financial_analyst_estimates](../aisa-api/references/operations/get_financial_analyst_estimates.md)
- [get_financial_insider_trades](../aisa-api/references/operations/get_financial_insider_trades.md)
- [get_financial_filings](../aisa-api/references/operations/get_financial_filings.md)
- [get_financial_filings_items](../aisa-api/references/operations/get_financial_filings_items.md)
- [get_financial_news](../aisa-api/references/operations/get_financial_news.md)
- [get_financial_macro_interest_rates_snapshot](../aisa-api/references/operations/get_financial_macro_interest_rates_snapshot.md)
- [get_financial_macro_interest_rates](../aisa-api/references/operations/get_financial_macro_interest_rates.md)

## Supporting resources

Read when relevant to interpreting the returned data:

- [How to read what stock_pulse returns](references/aisa-reading-the-bundle.md) — What each field in the twitter_stock_pulse response actually means, and the three ways it is commonly misread: treating `mentions` as a ranking, missing a partial failure recorded in `coverage`, and not noticing that one tool call billed several upstream calls. Read once before interpreting the bundle; it does not change between calls.

## Workflow

Assemble the fundamentals picture for: <input: company>
Reporting basis: <input: period>

## 1. Settle the company first

`get_financial_company_facts` takes either a ticker or a cik and returns
`name`, `cik`, `sector`, `industry` and `exchange`. Call it before anything
else when the user gave a company name rather than a ticker, or when you will
need the `cik` for filings. It also tells you how the company is actually
classified, which matters before you compare it to anything.

If the user described criteria instead of naming a company — large caps in a
sector, companies under some multiple — start from
`post_financial_financials_search_screener` instead. It is the only tool here
that works without a ticker; everything else takes one as input.

## 2. Pull only the slices the question needs

**Price.** `get_financial_prices_snapshot` for the current number and the
day's move. `get_financial_prices` for bars over a window — it requires all of
ticker, interval (`interval='day'` and up), start and end date; there is no
trailing-window shortcut, so compute the dates yourself.

**Statements.** `get_financial_financials` returns all three at once. Reach
for `get_financial_financials_income_statements`,
`get_financial_financials_balance_sheets` or
`get_financial_financials_cash_flow_statements` when only one is in play —
each is roughly a third of the payload. When the question spans several
companies but only a few line items, `post_financial_financials_search_line_items`
is far narrower than pulling full statements per company; its item names are
the same field names the statement tools return.

**Ratios.** `get_financial_financial_metrics_snapshot` is one row of current
values. `get_financial_financial_metrics` is the same set across periods —
use it whenever the question is whether a number is unusual for this company,
because a multiple means nothing without its own history next to it.

**Earnings.** `get_financial_earnings` is what was reported, with the estimate
and surprise beside it. `get_financial_analyst_estimates` is the forward
consensus for periods that have not happened. Do not present one as the other.

**Insiders and filings.** `get_financial_insider_trades` for Form 4 activity.
`get_financial_filings` lists which filings exist; `get_financial_filings_items`
returns the actual text inside one and is by far the heaviest call here — a
10-K comes back as about 19 items of full prose, so name the item you want
(`filing_type='10-K'` plus a specific item) instead of pulling the document.

**Context.** `get_financial_news` gives recent headlines only — title, source,
date, link, no article body. For the rate backdrop,
`get_financial_macro_interest_rates_snapshot` with no arguments returns all
ten central banks at once and is also how you learn the valid codes;
`get_financial_macro_interest_rates` takes one bank over time and its code
must be uppercase — `bank='FED'` works, lowercase answers 404 "No data found",
which looks like missing data rather than a bad argument.

## Reporting rules

- State the reporting basis next to every figure drawn from statements.
  A quarterly revenue number sitting beside an annual one is a mistake the
  reader cannot see.
- Quote the field name each number came from. Market cap appears in both the
  metrics snapshot and the metrics series and they can disagree by date.
- Give `report_period` or `filing_date` alongside fundamentals. These are
  filings, not live data, and can be months old.
- Say plainly when something came back empty. Do not fill a gap from memory —
  financial figures recalled from training data are stale by construction.

## Out of scope

Do not say whether the company is cheap, expensive, well run, or worth
holding. Do not rank companies, score them, or read a direction into insider
activity. Return the figures, their periods and their sources; the caller's
agent decides what they mean.

## Fallbacks

- If `get_financial_prices_snapshot` fails, `get_financial_prices` with a
  one-week window gives the last close.
- If `get_financial_financials` fails, the three statement calls
  (`get_financial_financials_income_statements`,
  `get_financial_financials_balance_sheets`,
  `get_financial_financials_cash_flow_statements`) are the same data in
  parts.
- A failed optional call (news, insiders, macro) is reported as missing,
  not retried. Say which fallback was used and why.
