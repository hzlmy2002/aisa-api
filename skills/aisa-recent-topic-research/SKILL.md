---
name: aisa-recent-topic-research
description: "Research what happened recently or what people are saying about a
  topic, product launch, company or competitor. Use for last-30-days research,
  launch reactions, recent trends and cross-source discussion briefs.
  最近30天、近期动态、产品发布反响、热点趋势、竞品近况、社区反馈、舆情调研。 Related requests: last30days, recent
  trend scan, launch reactions, 近期话题研究. Sources: tavily, twitter, reddit."
---

# Research recent topic evidence across web and social sources

Build a dated, deduplicated brief on recent discussion, launch reactions or competitor developments using the supported web, X and Reddit sources.

## Inputs

Extract inputs from the request and conversation. Apply optional defaults exactly; ask for required inputs only when they cannot be inferred. In the workflow, <input: NAME> means the resolved input, not a literal API argument.

- `topic` (required): Topic, product, company or comparison to investigate.
- `window` (optional; default "last 30 days"): Requested date window; resolve relative dates using the current date.

## Tool access

Use the aisa-api MCP. Read only the linked contracts needed for the current step, then call use with operation_id and arguments. get_details is the fallback for missing or mismatched local contracts. Keep dependent steps sequential; batch_use is for independent calls. max_price_usd applies per upstream request, not to the whole workflow. Credentials come from setup. Read supporting references only at the step that links them.

- [post_tavily_search](../aisa-api/references/operations/post_tavily_search.md)
- [get_twitter_tweet_advanced_search](../aisa-api/references/operations/get_twitter_tweet_advanced_search.md)
- [get_reddit_search](../aisa-api/references/operations/get_reddit_search.md)
- [post_tavily_extract](../aisa-api/references/operations/post_tavily_extract.md)
- [get_reddit_post_comments](../aisa-api/references/operations/get_reddit_post_comments.md)

## Workflow

Topic: <input: topic>
Window: <input: window>

1. Resolve an explicit start/end date and timezone. Read [source selection](references/sources.md); choose only the sources needed for this question.
2. Search with `post_tavily_search`, `get_twitter_tweet_advanced_search` and/or `get_reddit_search`. Start with one page per selected source, not every available platform. Read each selected operation's local contract immediately before use.
3. Inspect returned snippets first. If a central claim needs full context, use `post_tavily_extract` for selected pages or `get_reddit_post_comments` for selected threads. Do not load all result bodies.
4. Read [evidence and reporting](references/evidence.md) before synthesis. Deduplicate, cluster by claim, distinguish publication dates from event dates, and cite representative evidence. Stop when the question is answered within the initial budget; state missing coverage.
