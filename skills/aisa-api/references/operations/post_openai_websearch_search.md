# post_openai_websearch_search

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "post_openai_websearch_search",
  "successful": true,
  "description": "Ask a question and get an answer that an OpenAI model wrote after searching the live web. Send a Responses request — an `input` string (or message array) — and the endpoint injects a fixed, server-pinned model and the `web_search` tool for you; the model, tool and per-request search cap are server-controlled to keep cost bounded. The reply is a standard OpenAI Responses object: `output[]` contains `web_search_call` items (each a search that ran) and a `message` item with the answer text and URL citations, and the billed search count equals the number of `web_search_call` items. Billing is pay-as-you-go at exact cost: `web_search_calls × $0.01` plus the model's own token cost (fresh input = `input_tokens − cached`), with no markup. Use this when you want a written, cited answer grounded in current web content from an OpenAI model — for the Anthropic-model equivalent see [`post_anthropic_websearch_search`](/api-reference/search/post_anthropic-websearch-search), and for raw ranked links with extracted page text use [`post_tavily_search`](/api-reference/search/post_tavily-search).",
  "provider": "openai-websearch",
  "method": "POST",
  "path": "/apis/v1/openai-websearch/search",
  "arguments_schema": {
    "type": "object",
    "properties": {
      "input": {
        "type": "string",
        "description": "Your question or instruction, same format as the OpenAI Responses API `input`. A message array is also accepted.",
        "example": "What are the three biggest AI announcements this week? Give one sentence each with sources."
      },
      "max_output_tokens": {
        "type": "integer",
        "description": "Optional cap on the number of tokens generated in the answer.",
        "example": 1024
      },
      "instructions": {
        "type": "string",
        "description": "Optional high-level instructions to steer the answer's tone or format."
      }
    },
    "required": [
      "input"
    ]
  },
  "response_schema": {
    "type": "object",
    "additionalProperties": true
  },
  "read_only": true,
  "idempotent": true,
  "side_effects": [],
  "annotations": {
    "readOnlyHint": true,
    "destructiveHint": false,
    "idempotentHint": true,
    "openWorldHint": true
  },
  "price": {
    "currency": "USD",
    "amount": null,
    "model": "unknown",
    "source": "local"
  },
  "availability": "unknown",
  "source": "local",
  "servers": [
    "web-search"
  ]
}
```
