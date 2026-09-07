# get_semrush_organic_results

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "get_semrush_organic_results",
  "successful": true,
  "description": "Domains and URLs currently ranking in Google organic results for a keyword. Billed per returned data row at $0.09 per row (up to 20 rows; header row excluded); 4xx/5xx are not charged. Response is semicolon-delimited text.",
  "provider": "semrush",
  "method": "GET",
  "path": "/apis/v1/semrush/keyword-organic-results",
  "arguments_schema": {
    "type": "object",
    "properties": {
      "phrase": {
        "type": "string",
        "example": "seo tools",
        "description": "Keyword phrase. URL-encode spaces as `%20` or `+`."
      },
      "database": {
        "type": "string",
        "default": "us",
        "description": "Regional database / country code. Defaults to `us`."
      }
    },
    "required": [
      "phrase"
    ]
  },
  "response_schema": {
    "type": "object",
    "additionalProperties": true,
    "x-fastmcp-wrap-result": true
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
    "seo-serp"
  ]
}
```
