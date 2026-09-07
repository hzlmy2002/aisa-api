# post_oxylabs_ai_search

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "post_oxylabs_ai_search",
  "successful": true,
  "description": "Synchronous passthrough to the upstream Oxylabs Realtime endpoint (POST /v1/queries). Pick an AI answer engine with `source` and send the parameters that source expects; the request body is passed through unchanged. The response returns the AI-generated answer text and the cited source URLs, letting you track how a brand or product is surfaced and cited across AI answers. Billed at a flat $0.001 per successful result; 400/429/5xx/6xx and upstream 4xx responses are not billed. AI sources (chatgpt, gemini, perplexity) take ~40–60s and Google-type sources ~4–8s, so use a client timeout of at least 90s.",
  "provider": "oxylabs",
  "method": "POST",
  "path": "/apis/v1/oxylabs/ai-search",
  "arguments_schema": {
    "type": "object",
    "properties": {
      "source": {
        "enum": [
          "chatgpt",
          "gemini",
          "perplexity",
          "google_search",
          "google_ai_mode"
        ],
        "type": "string",
        "description": "The AI answer engine to query. `google_search` returns Google AI Overviews. Each source expects a specific subset of the parameters below.",
        "example": "google_search"
      },
      "prompt": {
        "type": "string",
        "description": "The natural-language prompt. Used by `chatgpt` (max 4000 chars), `gemini` (max 8000 chars), and `perplexity`. Use `query` instead for the Google-type sources.",
        "example": "best noise cancelling headphones 2026"
      },
      "query": {
        "type": "string",
        "description": "The search query. Used by `google_search` and `google_ai_mode`. Use `prompt` instead for chatgpt/gemini/perplexity.",
        "example": "best noise cancelling headphones 2026"
      },
      "search": {
        "type": "boolean",
        "description": "For `chatgpt`, set to true to have ChatGPT browse the web before answering.",
        "example": true
      },
      "render": {
        "enum": [
          "html"
        ],
        "type": "string",
        "description": "For `google_search` and `google_ai_mode`, set to \"html\" to render the page before parsing.",
        "example": "html"
      },
      "parse": {
        "type": "boolean",
        "description": "Return structured, parsed results instead of raw output. Recommended for every source.",
        "example": true
      },
      "geo_location": {
        "type": "string",
        "description": "Country-level geo-location for the query, e.g. \"United States\".",
        "example": "United States"
      }
    },
    "required": [
      "source"
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
