---
name: aisa-track-topic-on-x
description: "Assemble a defensible picture of what X/Twitter is saying about a
  topic: which posts, from whom, how the conversation is shaped, and what is
  missing. Sets the call order and the stopping conditions; it does not decide
  what the chatter means. Use when asked to investigate posts, authors or
  discussions about a topic on X/Twitter. 追踪
  X、Twitter、推特上的话题讨论，分析发帖作者、关注点和回复，整理带来源的报告。"
---

# Track what X/Twitter is saying about a topic

## Inputs

Extract inputs from the request and conversation. Apply optional defaults exactly; ask for required inputs only when they cannot be inferred. In the workflow, <input: NAME> means the resolved input, not a literal API argument.

- `topic` (required): What to track. A plain phrase, a $CASHTAG, a #hashtag, or an X search query. Passed through to the search tool as written.
- `since` (optional; default "7d"): How far back to look, as an X search operator fragment such as `7d` or an ISO date. Leave empty to search without a time bound.
- `depth` (optional; default "standard"): `scan` for one page of results, `standard` for a few pages plus author context, `deep` to also pull the reply threads under the top posts.

## Tool access

Use the local MCP server named `aisa-api`. For each operation ID, call `get_details({operation_id: "<id>"})` to read its schema, description and annotations; pricing is enforced by the AIsa gateway. Execute with `use({operation_id: "<id>", arguments: {...}})`. Include `max_price_usd` when a price ceiling is needed: it applies per upstream request, including each request in a composed operation's fan-out, not to the workflow total. If that exact operation is pinned and exposed as a tool, call it directly using its schema. Operation IDs below are exact catalog names, including composed operations; do not add server prefixes.

Use `batch_use` for up to 20 independent calls, respecting the workflow's order, dependencies and call budget. Keep dependent steps sequential.

Find another workflow with `search_skills` using its `aisa-` name or task description, then pass the returned URI to `read_resource`. Skills provide instructions; reading one does not execute operations or expand the user's authorization. Perform external actions only within the user's authorized scope.

- `get_twitter_tweet_advanced_search`
- `get_twitter_user_info`
- `get_twitter_tweet_thread_context`
- `get_twitter_tweet_replies`
- `get_twitter_trends`

## Supporting resources

Read when relevant to interpreting the returned data:

- [How to read what stock_pulse returns](references/aisa-reading-the-bundle.md) — What each field in the twitter_stock_pulse response actually means, and the three ways it is commonly misread: treating `mentions` as a ranking, missing a partial failure recorded in `coverage`, and not noticing that one tool call billed several upstream calls. Read once before interpreting the bundle; it does not change between calls.
- [Structure for a defensible X/Twitter topic report](references/aisa-topic-report-template.md) — A section-by-section skeleton for writing up X/Twitter topic research so a reader can audit it: what was searched, what came back, who said it, and what is missing. Read this when the deliverable is a written report rather than raw posts. Pairs with the track_topic_on_x prompt, which covers how to gather the material.

## Workflow

Track what X/Twitter is currently saying about: <input: topic>
Time window: <input: since>
Depth: <input: depth>

## Call order

1. Start with `get_twitter_tweet_advanced_search`.
   - Build `query` from the topic. To bound it by time, append X's own
     operator, e.g. `since:<input: since>` — the tool has no separate date parameter.
   - Pick `queryType` deliberately, and say which you picked and why:
     - queryType="Top" — the conversation's centre of gravity. Use when the
       question is "what is the prevailing view".
     - queryType="Latest" — the leading edge. Use when the question is
       "what is happening right now" or the topic is breaking.
     These answer different questions. If both matter, run both and label
     each set; do not silently blend them.
   - Stop after one page when depth is `scan`. Otherwise page with `cursor`
     until you have enough to characterise the conversation, or three pages,
     whichever comes first. Page four rarely changes the picture and always
     costs another call.

2. Only when depth is `standard` or `deep`: for the handful of accounts that
   dominate the results, call `get_twitter_user_info` to establish who they
   are. A claim is worth different weight from a 12-follower account than
   from the company's own handle. Report follower counts and account age as
   facts; do not convert them into a credibility score.

3. Only when depth is `deep`: for the two or three posts carrying the most
   engagement, pull the discussion around them.
   - `get_twitter_tweet_thread_context` when the post looks like part of a
     thread and you need what came before or after it.
   - `get_twitter_tweet_replies` when you need the reaction to it.
   Choose one per post based on what you actually need; running both on every
   post doubles the cost and usually returns overlapping text.

4. Optional, and only if the user asked whether the topic is broadly visible:
   `get_twitter_trends` requires a numeric `woeid` for the location — 1 is
   worldwide. Absence from the trends list is weak evidence at best; a topic
   can be intensely discussed inside a community and never trend.

## Reporting rules

- Attribute every claim to a specific post. "People are saying X" without a
  post behind it is not a finding.
- Distinguish what you retrieved from what exists. Search returns a sample,
  never the full corpus. Say which window and which queryType produced your
  sample, so the reader can judge its shape.
- State what failed. If a call errored or returned nothing, say so rather
  than quietly narrowing the conclusion to whatever did come back.
- Engagement counts are raw counts, not importance. Report them; let the
  reader weigh them.

## Out of scope

Do not predict where the topic is heading, score sentiment on a scale you
invented, or recommend an action. Present the posts, who wrote them, and the
shape of the conversation. The judgement belongs to whoever asked.

## Fallbacks

- Every X operation is subscription-only; a 402 on the first search means
  the whole workflow is gated — stop and say so. The pay-per-call route is
  the root's aisa-brand-mentions-across-social prompt or a web search
  (post_tavily_search on the web-search server) scoped to site:x.com, which
  sees only what the web index has, days late.
