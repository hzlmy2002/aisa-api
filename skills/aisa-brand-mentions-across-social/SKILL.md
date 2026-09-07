---
name: aisa-brand-mentions-across-social
description: "One pass over the three public social sources for a brand, product
  or topic: the recent posts, where the conversation is, and what is missing.
  Sets the source order, the page budget and when to stop; it does not score
  sentiment for you. Use when asked to collect brand or product mentions across
  X, Reddit and Instagram. 跨多个社交平台收集品牌或产品提及，对比各平台反馈。"
---

# What people are saying about a brand across X, Reddit and Instagram

## Inputs

Extract inputs from the request and conversation. Apply optional defaults exactly; ask for required inputs only when they cannot be inferred. In the workflow, <input: NAME> means the resolved input, not a literal API argument.

- `brand` (required): The brand, product or topic as people write it. Used as the search phrase on every platform; add a second spelling in the query yourself if the brand has one.
- `window` (optional; default "7d"): How far back to look, e.g. `7d` or `30d`. X gets it as a search operator; Reddit and Instagram get the nearest option their schema offers.

## Tool access

Use the local MCP server named `aisa-api`. For each operation ID, call `get_details({operation_id: "<id>"})` to read its schema, description and annotations; pricing is enforced by the AIsa gateway. Execute with `use({operation_id: "<id>", arguments: {...}})`. Include `max_price_usd` when a price ceiling is needed: it applies per upstream request, including each request in a composed operation's fan-out, not to the workflow total. If that exact operation is pinned and exposed as a tool, call it directly using its schema. Operation IDs below are exact catalog names, including composed operations; do not add server prefixes.

Use `batch_use` for up to 20 independent calls, respecting the workflow's order, dependencies and call budget. Keep dependent steps sequential.

Find APIs and workflows in the installed `aisa-api` skill: its single SKILL.md contains the complete operation directory and links to workflow skills. Select the exact operation ID there, then call get_details and use; no search call is needed. Clients with MCP resource support can read `skill://aisa-api/SKILL.md` through native resources/read. Skills provide instructions; reading one does not execute operations or expand the user's authorization. Perform external actions only within the user's authorized scope.

- `get_twitter_tweet_advanced_search`
- `get_reddit_search`
- `get_instagram_search_hashtag`
- `get_reddit_post_comments`
- `post_tavily_search`

## Supporting resources

Read when relevant to interpreting the returned data:

- [How to read what stock_pulse returns](references/aisa-reading-the-bundle.md) — What each field in the twitter_stock_pulse response actually means, and the three ways it is commonly misread: treating `mentions` as a ranking, missing a partial failure recorded in `coverage`, and not noticing that one tool call billed several upstream calls. Read once before interpreting the bundle; it does not change between calls.
- [Structure for a defensible X/Twitter topic report](references/aisa-topic-report-template.md) — A section-by-section skeleton for writing up X/Twitter topic research so a reader can audit it: what was searched, what came back, who said it, and what is missing. Read this when the deliverable is a written report rather than raw posts. Pairs with the track_topic_on_x prompt, which covers how to gather the material.

## Workflow

Collect what is being said about: <input: brand>
Window: <input: window>

Budget: one page per source first, a second page only where the first
was full of relevant posts. Every call here is pay-per-call; X/Twitter
tools are on the Hive GTM subscription — if the first X call answers
402, say so, skip X, and finish with the other two.

1. X/Twitter. Call `get_twitter_tweet_advanced_search` with
   query="<input: brand> since:<input: window>" and queryType=Latest. Note volume,
   the accounts posting most, and any post with unusual engagement.

2. Reddit. Call `get_reddit_search` with query=<input: brand>, sorted by the
   newest option the schema lists and the timeframe closest to
   <input: window>. For the two most-commented threads call
   `get_reddit_post_comments` with the thread url — Reddit's substance
   is in the comments, not the titles.

3. Instagram. Call `get_instagram_search_hashtag` with hashtag=<input: brand>
   (no spaces, no #). One page; note post count and whether the top
   posts are from the brand itself or from customers.

Stop after the three sources; do not pull author profiles unless one
account dominates the conversation.

Report per platform: volume in the window, the three most representative
posts with links, who is driving it, and what is absent (no complaints,
no reviews, no mentions at all is a finding too). Name the platform next
to every count.

Typical call budget: 3–5 calls (one page per source, plus two comment threads).

## Fallbacks

- X, Reddit and Instagram are all subscription-only. When a source answers
  402, replace it with one `post_tavily_search` scoped to that platform —
  query="<input: brand> site:reddit.com" (or site:instagram.com, site:x.com),
  max_results=8 — and label the result as "web index of <platform>", which
  is thinner and older than the platform's own API.
- If all three answer 402, run the three Tavily searches and say the whole
  picture is from the web index.
- Say in the report which fallback was used and why.
