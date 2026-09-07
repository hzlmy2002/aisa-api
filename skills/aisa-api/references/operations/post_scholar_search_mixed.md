# post_scholar_search_mixed

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "post_scholar_search_mixed",
  "successful": true,
  "description": "Search the web and academic sources together, for questions that straddle both. ⚠️ Parameters go in the **query string**: `query` (required), `max_num_results`, `as_ylo`/`as_yhi`. Returns a search `id` and `results[]`; **the entry shape varies by source** — every result has `title`, `link` and `snippet`, and academic ones additionally carry `authors` and `number_of_citations`, so treat those two as optional rather than assuming they are there. Measured at about 3 seconds. Use it when you do not know in advance which kind of source will answer. When you do, `post_scholar_search_web` or `post_scholar_search_scholar` is more predictable. Keep the `id` for `post_scholar_search_explain`.",
  "provider": "scholar",
  "method": "POST",
  "path": "/apis/v1/scholar/search/mixed",
  "arguments_schema": {
    "type": "object",
    "properties": {
      "query": {
        "type": "string",
        "example": "machine learning",
        "description": "Search query for scholarly materials"
      },
      "max_num_results": {
        "maximum": 100,
        "minimum": 1,
        "type": "integer",
        "default": 10,
        "description": "Maximum number of search results to return, up to 100"
      },
      "as_ylo": {
        "maximum": 2030,
        "minimum": 1900,
        "type": [
          "integer",
          "null"
        ],
        "description": "Year of publication lower bound"
      },
      "as_yhi": {
        "maximum": 2030,
        "minimum": 1900,
        "type": [
          "integer",
          "null"
        ],
        "description": "Year of publication upper bound"
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
