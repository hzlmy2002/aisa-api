# post_anthropic_websearch_search

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "post_anthropic_websearch_search",
  "successful": true,
  "description": "Ask a question and get an answer that Claude wrote after searching the live web. Send a normal Messages request — a `messages` array plus `max_tokens` — and the endpoint injects a fixed, server-pinned model and the `web_search` tool for you; you cannot override the model or add tools, which keeps cost bounded. Claude decides when to search (up to `max_uses` searches, default 5), reads the results, and answers with inline citations. The response is a standard Anthropic Messages object: `content[]` contains `server_tool_use` (the queries issued), `web_search_tool_result` (the sources found) and `text` blocks (the answer with `citations`), and `usage.server_tool_use.web_search_requests` reports how many searches were billed. Billing is pay-as-you-go at exact cost: `web_search_requests × $0.01` plus the model's own token cost, with no markup; a failed search (HTTP 200 `web_search_tool_result_error`) is not billed. Use this when you want a written, cited answer grounded in current web content — for open-web research that returns ranked links and page text in one call use [`post_tavily_search`](/api-reference/search/post_tavily-search) instead, and for the OpenAI-model equivalent see [`post_openai_websearch_search`](/api-reference/search/post_openai-websearch-search).",
  "provider": "anthropic-websearch",
  "method": "POST",
  "path": "/apis/v1/anthropic-websearch/search",
  "arguments_schema": {
    "type": "object",
    "properties": {
      "messages": {
        "type": "array",
        "items": {
          "type": "object",
          "properties": {
            "role": {
              "enum": [
                "user",
                "assistant"
              ],
              "type": "string"
            },
            "content": {
              "type": "string",
              "description": "Message text. Structured content blocks are also accepted."
            }
          }
        },
        "description": "Conversation messages, same format as the Anthropic Messages API. The user turn holds your question.",
        "example": [
          {
            "role": "user",
            "content": "What are the three biggest AI announcements this week? Give one sentence each with sources."
          }
        ]
      },
      "max_tokens": {
        "type": "integer",
        "description": "Maximum number of tokens to generate in the answer. Required by the upstream Messages API.",
        "default": 1024,
        "example": 1024
      },
      "system": {
        "type": "string",
        "description": "Optional system prompt to steer the answer's tone or format."
      }
    },
    "required": [
      "messages",
      "max_tokens"
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
