---
name: aisa-research-brief
description: "A sourced answer to one question: two complementary searches, the
  full text of the few pages that matter, and a short brief with citations. Sets
  the order, the page budget and when a synthesis model is worth its price; it
  does not replace reading the sources. Use when asked to research one question
  on the open web and produce a short sourced brief.
  围绕一个问题进行公开网页研究，交叉核实资料，撰写带引用的简报。"
---

# Research a question from the open web, with sources

## Inputs

Extract inputs from the request and conversation. Apply optional defaults exactly; ask for required inputs only when they cannot be inferred. In the workflow, <input: NAME> means the resolved input, not a literal API argument.

- `question` (required): The question, as you would ask a careful analyst.
- `recency` (optional; default ""): How recent the sources must be — `week`, `month`, `year`, or empty for no limit. Passed to the search tools as the nearest option their schema offers.

## Tool access

Use the local MCP server named `aisa-api`. For each operation ID, call `get_details({operation_id: "<id>"})` to read its schema, description and annotations; pricing is enforced by the AIsa gateway. Execute with `use({operation_id: "<id>", arguments: {...}})`. Include `max_price_usd` when a price ceiling is needed: it applies per upstream request, including each request in a composed operation's fan-out, not to the workflow total. If that exact operation is pinned and exposed as a tool, call it directly using its schema. Operation IDs below are exact catalog names, including composed operations; do not add server prefixes.

Use `batch_use` for up to 20 independent calls, respecting the workflow's order, dependencies and call budget. Keep dependent steps sequential.

Find APIs and workflows in the installed `aisa-api` skill: its single SKILL.md contains the complete operation directory and links to workflow skills. Select the exact operation ID there, then call get_details and use; no search call is needed. Clients with MCP resource support can read `skill://aisa-api/SKILL.md` through native resources/read. Skills provide instructions; reading one does not execute operations or expand the user's authorization. Perform external actions only within the user's authorized scope.

- `post_tavily_search`
- `post_exa_search`
- `post_tavily_extract`
- `post_perplexity_sonar`

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
