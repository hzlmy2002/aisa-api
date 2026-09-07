---
name: aisa-stock-chatter-workflow
description: Decide between the one-call bundle and the underlying atomic tools
  when looking at what X/Twitter is saying about stocks, then read the result
  honestly — including which sources failed and what the mention counts do and
  do not mean. Use when asked what X is saying about stocks together with the
  market data behind those mentions. 分析股票相关社交舆情，结合行情和新闻核对热门股票讨论。
---

# Work through stock chatter on X, with the market data behind it

## Inputs

Extract inputs from the request and conversation. Apply optional defaults exactly; ask for required inputs only when they cannot be inferred. In the workflow, <input: NAME> means the resolved input, not a literal API argument.

- `topic` (required): What to look at, e.g. "AI chip stocks", "$NVDA earnings", or a sector.
- `known_tickers` (optional; default ""): Tickers you already know you care about, comma-separated, e.g. "NVDA,AMD". Leave empty to discover them from the conversation.

## Tool access

Use the local MCP server named `aisa-api`. Read the linked local operation details for its full description, input schema, defaults and annotations; then execute with `use({operation_id: "<id>", arguments: {...}})`. You do not need to call get_details when the installed details already provide the contract. Use `get_details({operation_id: "<id>"})` if local details are missing or the installed skills and running server differ; the running server's schema takes precedence. Prices and live availability are enforced by the AIsa gateway, not these static files.

Include `max_price_usd` when needed: it applies to each upstream request, including composed fan-outs, not the workflow total. Use `batch_use` for up to 20 independent calls; keep dependent steps sequential. If the exact operation is pinned, it can also be called directly with its schema.

A matching workflow already links its required operations: read those details directly without loading the global directory. For other tasks, start with the short installed `aisa-api` skill and follow a relevant server index. Use `search` only when the right operation is unclear. Native MCP resources/read can read `skill://aisa-api/SKILL.md` or `skill://aisa-api/references/operations/<operation_id>.md`. Skills do not execute actions or expand the user's authorization.

- [twitter_stock_pulse](../aisa-api/references/operations/twitter_stock_pulse.md)
- [get_twitter_tweet_advanced_search](../aisa-api/references/operations/get_twitter_tweet_advanced_search.md)
- [get_financial_prices_snapshot](../aisa-api/references/operations/get_financial_prices_snapshot.md)
- [get_financial_news](../aisa-api/references/operations/get_financial_news.md)

## Supporting resources

Read when relevant to interpreting the returned data:

- [How to read what stock_pulse returns](references/aisa-reading-the-bundle.md) — What each field in the twitter_stock_pulse response actually means, and the three ways it is commonly misread: treating `mentions` as a ranking, missing a partial failure recorded in `coverage`, and not noticing that one tool call billed several upstream calls. Read once before interpreting the bundle; it does not change between calls.
- [Structure for a defensible X/Twitter topic report](references/aisa-topic-report-template.md) — A section-by-section skeleton for writing up X/Twitter topic research so a reader can audit it: what was searched, what came back, who said it, and what is missing. Read this when the deliverable is a written report rather than raw posts. Pairs with the track_topic_on_x prompt, which covers how to gather the material.

## Workflow

Work through stock chatter on X for: <input: topic>
Tickers already known: <input: known_tickers>

## Pick the right entry point first

- **Tickers are unknown** (the empty case above): use `twitter_stock_pulse`.
  One call searches X, extracts every $CASHTAG from the results, and pulls a
  price snapshot for the most-mentioned symbols. Doing it by hand means one
  search, parsing cashtags, then one price call per symbol, then joining —
  four steps that every agent otherwise reimplements the same way.

- **Tickers are already known**: skip the bundle. Call `get_financial_prices_snapshot`
  directly for each one, and `get_twitter_tweet_advanced_search` only if you
  also need the posts. The bundle's discovery step is wasted work here, and
  it costs an extra upstream call.

- **You need posts but no market data at all**: use
  `get_twitter_tweet_advanced_search` on its own.

Set `include_news` on the bundle only when the user asked why something is
moving. It costs one extra call per symbol and returns nothing useful when
the question is just "what are people talking about".

Reach for `get_financial_news` directly when you already have the symbols and the
question is specifically about news — the bundle would re-run discovery you
do not need. Headlines explain moves; they do not confirm them. A story
published after a price move is not evidence it caused the move.

## Read the response honestly

The bundle returns `coverage` and `billing` alongside the data. Both matter:

- `coverage.failed` lists the upstream calls that did not succeed. If it is
  non-empty, say which symbols are missing price data **before** presenting
  the rest. A ticker with `quote: null` was not quiet — it failed.
- `billing.count` is how many upstream calls were actually made. Report it
  when the user is cost-sensitive.

## What `mentions` is not

`mentions` is a raw count of posts containing that cashtag in the sample
that was retrieved. It is **not** a heat ranking, not a sentiment score, and
not weighted by author reach. A ticker mentioned 40 times by one bot ranks
above one mentioned 12 times across 12 established accounts.

`max_tickers` is a sampling cap for cost control. Symbols beyond the cap were
cut by mention count, not by importance — say so if the cap was hit.

Cashtag extraction only matches an explicit `$TICKER` form. Posts that
discuss a company by name without the cashtag are absent from the counts.
This is deliberate — loose matching would turn "$USD" and ordinary uppercase
words into fake tickers — but it means the counts undercount.

## Out of scope

Do not rank the tickers by attractiveness, infer sentiment direction, or
suggest a position. Present the posts, the counts, the prices, and what was
missing. A value investor, a momentum trader and a short seller should each
be able to use this same output and reach different conclusions — if only one
conclusion is available from what you wrote, you have overstepped.

## Fallbacks

- X is subscription-only. If `twitter_stock_pulse` or
  `get_twitter_tweet_advanced_search` answers 402, the chatter half is
  unavailable: still run `get_financial_prices_snapshot` and
  `get_financial_news` for the tickers the user named, and say the social
  signal is missing rather than inferring silence.
