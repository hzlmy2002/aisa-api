---
name: aisa-search-youtube-deliberately
description: "Use when asked to search YouTube with deliberate locale or filter
  choices and report the returned results. 按语言、地区和筛选条件搜索 YouTube 视频，整理搜索结果。
  Related requests: YouTube搜索, 视频搜索, 油管搜索, youtube search. Sources: youtube."
---

# Search YouTube without silently getting the wrong slice

Run a YouTube search where the locale and the filter token are chosen on purpose rather than left to chance, and report the result set in a way the reader can audit. Covers the two parameters that quietly change what comes back.

## Inputs

Extract inputs from the request and conversation. Apply optional defaults exactly; ask for required inputs only when they cannot be inferred. In the workflow, <input: NAME> means the resolved input, not a literal API argument.

- `query` (required): What to search for. YouTube's own search syntax, not a natural-language question — it is matched, not understood.
- `audience` (optional; default ""): Whose YouTube you want to see, e.g. "us", "jp", "global". Decides the country and interface language. Leave empty to search unlocalised and say so in the output.

## Tool access

Use the local MCP server named `aisa-api`. Read the linked local operation details for its full description, input schema, defaults and annotations; then execute with `use({operation_id: "<id>", arguments: {...}})`. You do not need to call get_details when the installed details already provide the contract. Use `get_details({operation_id: "<id>"})` if local details are missing or the installed skills and running server differ; the running server's schema takes precedence. Prices and live availability are enforced by the AIsa gateway, not these static files.

Include `max_price_usd` when needed: it applies to each upstream request, including composed fan-outs, not the workflow total. Use `batch_use` for up to 20 independent calls; keep dependent steps sequential. If the exact operation is pinned, it can also be called directly with its schema.

A matching workflow already links its required operations: read those details directly without loading the global directory. For other tasks, start with the short installed `aisa-api` skill and follow a relevant server index. Use `search` only when the right operation is unclear. Native MCP resources/read can read `skill://aisa-api/SKILL.md` or `skill://aisa-api/references/operations/<operation_id>.md`. Skills do not execute actions or expand the user's authorization.

- [get_youtube_search](../aisa-api/references/operations/get_youtube_search.md)

## Workflow

Search YouTube for: <input: query>
Intended audience: <input: audience>

Use `get_youtube_search`. It is the only tool here, so the work is entirely
in choosing its parameters well.

## Parameters that need a decision

`engine` has exactly one legal value and is required. Set engine="youtube".

`q` is matched, not interpreted. A natural-language question performs worse
than the keywords a person would actually type. Rewrite before searching, and
report the query you actually sent — not the user's original phrasing.

`gl` (country) and `hl` (interface language) materially change the result
set. The same query run for `us` and for `jp` returns different videos in a
different order; this is YouTube behaving normally, not an error.
- When the audience above names a market, set both, and state them in the
  output.
- When it is empty, search without them and say the results are unlocalised.
  Do not guess a country from the query language — a query in English does
  not mean the user wants US results.

`sp` is an opaque YouTube filter token that encodes things like upload date,
duration, and result type. **Do not invent one.** These tokens are not
guessable, and an invalid token is typically ignored rather than rejected —
so a fabricated value produces results that look fine but were never
filtered. Pass `sp` only when:
- it came back from a previous response as a pagination token, or
- the user supplied it.

If the user wants a filter you have no token for, say the filter could not be
applied and search without it. That is a smaller error than silently
returning unfiltered results while claiming they were filtered.

## Reading the response

Results mix videos, channels and playlists. Separate them before presenting;
a playlist is not evidence that a video exists, and a channel hit is not
coverage of the topic.

Report the number of results you actually received. YouTube search returns a
page, not a census — "no results" means this query, this locale, this page.

## Out of scope

View counts and upload dates are facts; "most popular", "best explanation"
and "authoritative" are judgements. Report the former, leave the latter to
whoever asked. Do not infer that a topic is unimportant because YouTube
coverage is thin — plenty of subjects live entirely outside video.

## Fallbacks

- `get_youtube_search` is subscription-only. On 402, the pay-per-call route
  is a web search (post_tavily_search on the web-search server) with the
  query and site:youtube.com — titles and channels come back, view counts
  and dates do not; say so.
