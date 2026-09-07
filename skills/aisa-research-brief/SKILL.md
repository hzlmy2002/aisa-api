---
name: aisa-research-brief
description: "Use when asked to research one question on the open web and
  produce a short sourced brief. 围绕一个问题进行公开网页研究，交叉核实资料，撰写带引用的简报。 Related
  requests: 网络研究, 资料搜索, 研究简报, 网页调研, web research. Sources: tavily, exa,
  perplexity."
---

# Research a question from the open web, with sources

A sourced answer to one question: two complementary searches, the full text of the few pages that matter, and a short brief with citations. Sets the order, the page budget and when a synthesis model is worth its price; it does not replace reading the sources.

## Inputs

Extract inputs from the request and conversation. Apply optional defaults exactly; ask for required inputs only when they cannot be inferred. In the workflow, <input: NAME> means the resolved input, not a literal API argument.

- `question` (required): The question, as you would ask a careful analyst.
- `recency` (optional; default ""): How recent the sources must be — `week`, `month`, `year`, or empty for no limit. Passed to the search tools as the nearest option their schema offers.

## Tool access

Use the local MCP server named `aisa-api`. Read the linked local operation details for its full description, input schema, defaults and annotations; then execute with `use({operation_id: "<id>", arguments: {...}})`. You do not need to call get_details when the installed details already provide the contract. Use `get_details({operation_id: "<id>"})` if local details are missing or the installed skills and running server differ; the running server's schema takes precedence. Prices and live availability are enforced by the AIsa gateway, not these static files.

Include `max_price_usd` when needed: it applies to each upstream request, including composed fan-outs, not the workflow total. Use `batch_use` for up to 20 independent calls; keep dependent steps sequential. If the exact operation is pinned, it can also be called directly with its schema.

A matching workflow already links its required operations: read those details directly without loading the global directory. For other tasks, start with the short installed `aisa-api` skill and follow a relevant server index. Use `search` only when the right operation is unclear. Native MCP resources/read can read `skill://aisa-api/SKILL.md` or `skill://aisa-api/references/operations/<operation_id>.md`. Skills do not execute actions or expand the user's authorization.

- [post_tavily_search](../aisa-api/references/operations/post_tavily_search.md)
- [post_exa_search](../aisa-api/references/operations/post_exa_search.md)
- [post_tavily_extract](../aisa-api/references/operations/post_tavily_extract.md)
- [post_perplexity_sonar](../aisa-api/references/operations/post_perplexity_sonar.md)

## Workflow

Research: <input: question>
Recency: <input: recency>

1. Keyword search. Call `post_tavily_search` with query=<input: question>,
   max_results=8 and the time_range closest to the recency above. Tavily
   answers with snippets already; read them before deciding what to
   open.

2. Semantic search. Call `post_exa_search` with query=<input: question> and
   numResults=8. Exa finds pages that do not contain the query words;
   the overlap with step 1 is a confidence signal, the difference is
   where the new material is.

3. Read the few that matter. Pick at most four URLs across both result
   sets — primary sources over summaries — and call
   `post_tavily_extract` once with all of them in urls. Do not extract
   more than four pages; the answer rarely improves and the cost and
   context grow linearly.

4. Only if the sources disagree or the question is genuinely open:
   call `post_perplexity_sonar` once with the question as the single
   user message. It is a live model call, priced above the searches;
   treat its answer as one more source with its own citations, not as
   the verdict.

Report: the answer in three to six sentences, then the sources as a
numbered list with one line each on what it contributed, and a final
line on what the sources did not settle. Every claim carries a source
number.

Typical call budget: 3–4 calls (two searches, one extract batch, Perplexity only on disagreement).

## Fallbacks

- If `post_tavily_search` fails, rely on `post_exa_search` alone (and the
  reverse); one good search is enough for a brief, say which one ran.
- If `post_tavily_extract` fails on a URL, use that result's search snippet
  and mark the source as "snippet only".
- If `post_perplexity_sonar` answers 402 or fails, skip step 4; it was
  optional.
- Say in the report which fallback was used and why.
