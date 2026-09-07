# post_scholar_search_web

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "post_scholar_search_web",
  "successful": true,
  "description": "Search the open web and get back a lean result list. ⚠️ Despite being a POST, parameters go in the **query string** — `query` (required), `max_num_results` (default 10, max 100), and `as_ylo`/`as_yhi` for a year range. A JSON body is not accepted. Returns a search `id` and `results[]` carrying only `title`, `link` and `snippet`. Measured at about 4 seconds for a roughly 600-byte response. Its virtue is how little it returns, which suits an agent that only needs to know what exists. It gives you no page text — if you need the content, `post_tavily_search` returns it in the same call. Keep the `id`: it is what `post_scholar_search_explain` needs.",
  "provider": "scholar",
  "method": "POST",
  "path": "/apis/v1/scholar/search/web",
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
