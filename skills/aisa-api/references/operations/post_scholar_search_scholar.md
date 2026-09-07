# post_scholar_search_scholar

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "post_scholar_search_scholar",
  "successful": true,
  "description": "Search academic literature. ⚠️ Parameters go in the **query string**, not a body: `query` (required), `max_num_results`, and `as_ylo`/`as_yhi` to bound publication years. Returns a search `id` and `results[]` with `title`, `link`, `snippet`, `authors` and `number_of_citations` — that last field is what a general web search cannot give you. Measured at under 2 seconds. Use it when the question calls for peer-reviewed sources or when citation counts matter. For current events and product pages a general engine is better: `post_tavily_search`. To cover both at once, `post_scholar_search_mixed`. Keep the `id` for `post_scholar_search_explain`.",
  "provider": "scholar",
  "method": "POST",
  "path": "/apis/v1/scholar/search/scholar",
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
