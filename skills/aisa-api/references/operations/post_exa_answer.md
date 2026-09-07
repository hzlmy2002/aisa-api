# post_exa_answer

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "post_exa_answer",
  "successful": true,
  "description": "Ask a question and get a written answer with citations. `query` is required; `text` includes the source text and `outputSchema` shapes a structured reply. Returns `requestId`, `answer` as prose, `citations[]` with `id`, `title` and `url`, and `costDollars`. Measured at 2.1 seconds with 8 citations. Billed a flat $0.08 per successful request. It sits between a search and a research run: faster and cheaper than `post_exa_agent_runs`, and more direct than reading `post_exa_search` results yourself. `post_perplexity_sonar` answers the same shape of question for $0.012 — reach for Exa when the retrieval needs to be semantic.",
  "provider": "exa",
  "method": "POST",
  "path": "/apis/v1/exa/answer",
  "arguments_schema": {
    "type": "object",
    "properties": {
      "query": {
        "type": "string",
        "description": "The question to answer.",
        "example": "Which manufacturers had the top three global EV sales in 2025?"
      },
      "text": {
        "type": "boolean",
        "description": "Include the full page text of each citation."
      },
      "type": {
        "enum": [
          "auto",
          "fast",
          "instant",
          "deep-lite",
          "deep",
          "deep-reasoning"
        ],
        "type": "string",
        "description": "Retrieval mode used to gather sources before answering."
      },
      "outputSchema": {
        "type": "object",
        "description": "JSON Schema for a structured answer output."
      }
    },
    "required": [
      "query"
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
