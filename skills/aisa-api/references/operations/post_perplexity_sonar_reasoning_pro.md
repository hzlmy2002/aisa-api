# post_perplexity_sonar_reasoning_pro

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "post_perplexity_sonar_reasoning_pro",
  "successful": true,
  "description": "Ask a question that has to be worked through, not just looked up, and get a step-by-step answer backed by web search. Same shape as the other Perplexity endpoints — `model` (required, `sonar-reasoning-pro`) and `messages` in; `choices[0].message.content`, `citations`, `search_results[]` and `usage` out. Measured at about 5 seconds, flat $0.012 per request. Use it for comparison, causation and analysis. When the question is simply what is the case, `post_perplexity_sonar` is faster; when you need a long report over many sources rather than an answer, `post_perplexity_sonar_deep_research`.",
  "provider": "perplexity",
  "method": "POST",
  "path": "/apis/v1/perplexity/sonar-reasoning-pro",
  "arguments_schema": {
    "type": "object",
    "properties": {
      "model": {
        "enum": [
          "sonar",
          "sonar-pro",
          "sonar-reasoning-pro",
          "sonar-deep-research"
        ],
        "type": "string",
        "description": "The Sonar model to use."
      },
      "messages": {
        "type": "array",
        "items": {
          "required": [
            "role",
            "content"
          ],
          "type": "object",
          "properties": {
            "role": {
              "enum": [
                "system",
                "user",
                "assistant"
              ],
              "type": "string",
              "description": "The role of the message author."
            },
            "content": {
              "type": "string",
              "description": "The content of the message."
            }
          }
        },
        "description": "A list of messages comprising the conversation so far."
      },
      "max_tokens": {
        "type": "integer",
        "description": "The maximum number of tokens to generate in the response."
      },
      "temperature": {
        "maximum": 2,
        "minimum": 0,
        "type": "number",
        "description": "Sampling temperature between 0 and 2. Lower values make output more focused and deterministic.",
        "default": 0.2
      },
      "top_p": {
        "maximum": 1,
        "minimum": 0,
        "type": "number",
        "description": "Nucleus sampling parameter. The model considers tokens with top_p probability mass.",
        "default": 0.9
      },
      "top_k": {
        "maximum": 2048,
        "minimum": 0,
        "type": "integer",
        "description": "The number of tokens to keep for top-k filtering.",
        "default": 0
      },
      "stream": {
        "type": "boolean",
        "description": "Whether to stream the response using server-sent events.",
        "default": false
      },
      "search_context": {
        "enum": [
          "low",
          "medium",
          "high"
        ],
        "type": "string",
        "description": "Controls how much search context to use. Affects per-request cost.",
        "default": "low"
      },
      "frequency_penalty": {
        "maximum": 2,
        "minimum": 0,
        "type": "number",
        "description": "Penalizes new tokens based on their existing frequency in the text so far. Positive values decrease the likelihood of repeating the same line verbatim.",
        "default": 1
      },
      "presence_penalty": {
        "maximum": 2,
        "minimum": -2,
        "type": "number",
        "description": "Penalizes new tokens based on whether they appear in the text so far. Positive values increase the likelihood of talking about new topics.",
        "default": 0
      },
      "return_citations": {
        "type": "boolean",
        "description": "Whether to return citations and search results in the response.",
        "default": true
      },
      "search_recency_filter": {
        "enum": [
          "month",
          "week",
          "day",
          "hour"
        ],
        "type": "string",
        "description": "Filter search results by recency."
      },
      "search_domain_filter": {
        "type": "array",
        "items": {
          "type": "string"
        },
        "description": "Limit search to specific domains."
      }
    },
    "required": [
      "model",
      "messages"
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
