---
name: aisa-seo-ai-visibility
description: "Measure a brand or domain's presence in ChatGPT, Gemini and
  Perplexity answers: how often it is mentioned, on which prompts, which sources
  the models cite instead, and what the models say today when asked directly.
  Sets the call order and the budget; it does not write the positioning. Use
  when asked how a brand appears in AI answers or which sources those answers
  cite. 检查品牌在 AI 回答中的可见度、提及情况和引用来源。"
---

# How a brand shows up in AI answers

## Inputs

Extract inputs from the request and conversation. Apply optional defaults exactly; ask for required inputs only when they cannot be inferred. In the workflow, <input: NAME> means the resolved input, not a literal API argument.

- `target` (required): The brand's domain, as a bare host such as `example.com`. Used for mention metrics; also used as the brand name in the direct prompts unless `brand` is given.
- `brand` (optional; default ""): The brand name as people say it, if different from the domain.
- `question` (optional; default ""): One question a customer would ask an assistant, e.g. "best tools for X". Leave empty to skip the direct-ask step.

## Tool access

Use the local MCP server named `aisa-api`. For each operation ID, call `get_details({operation_id: "<id>"})` to read its schema, description and annotations; pricing is enforced by the AIsa gateway. Execute with `use({operation_id: "<id>", arguments: {...}})`. Include `max_price_usd` when a price ceiling is needed: it applies per upstream request, including each request in a composed operation's fan-out, not to the workflow total. If that exact operation is pinned and exposed as a tool, call it directly using its schema. Operation IDs below are exact catalog names, including composed operations; do not add server prefixes.

Use `batch_use` for up to 20 independent calls, respecting the workflow's order, dependencies and call budget. Keep dependent steps sequential.

Find another workflow with `search_skills` using its `aisa-` name or task description, then pass the returned URI to `read_resource`. Skills provide instructions; reading one does not execute operations or expand the user's authorization. Perform external actions only within the user's authorized scope.

- `post_dataforseo_ai_llm_mentions_aggregated_metrics_live`
- `post_dataforseo_ai_llm_mentions_search_live`
- `post_dataforseo_ai_llm_mentions_top_domains_live`
- `post_dataforseo_ai_chat_gpt_llm_responses_live`
- `post_dataforseo_ai_gemini_llm_responses_live`
- `post_dataforseo_ai_perplexity_llm_responses_live`

## Workflow

Measure AI-answer visibility for: <input: target>
Brand name: <input: brand>
Direct question to ask the models: <input: question>

DataForSEO `post_*_live` tools take `body` as a LIST with one task
object; read the body's own `status_code` (20000 is success).

1. How often. Call `post_dataforseo_ai_llm_mentions_aggregated_metrics_live`
   with a task of target=<input: target>: mention counts and share across the
   platforms the index covers. Do not pass `platform` unless you have a
   value the schema lists; the default covers all.

2. Where. Call `post_dataforseo_ai_llm_mentions_search_live` with
   target=<input: target> for the prompts and answers in which the brand
   appears; keep the ten most recent and note the intent of each prompt.

3. Instead of whom. Call `post_dataforseo_ai_llm_mentions_top_domains_live`
   with target=<input: target>: the domains the models cite most in the same
   answer space. These are the sources to be on.

4. What they say today — only if a question was given. Ask the same
   question to three models, one call each, with user_prompt=<input: question>
   and web_search=true where the schema has it:
   `post_dataforseo_ai_chat_gpt_llm_responses_live`,
   `post_dataforseo_ai_gemini_llm_responses_live`,
   `post_dataforseo_ai_perplexity_llm_responses_live`.
   Each of these is a live model call and costs more than steps 1–3; one
   call per model, no retries, no follow-up prompts. Record whether the
   brand is named, in what position, and which sources are cited.

Report: mention share and trend, the prompt types where the brand
appears, the competing sources, and — if step 4 ran — a three-row table
of model / brand named? / sources cited. Name the platform next to every
number.

Typical call budget: 3 calls; 6 when a direct question is given (one per model, no retries).

## Fallbacks

- If the mentions index answers 402 or returns nothing for the target, go
  straight to step 4 (it needs `question`); say that mention metrics are
  unavailable rather than inferring zero visibility.
- If one model call fails, report the other two; do not retry a live model.
- Say in the report which fallback was used and why.
