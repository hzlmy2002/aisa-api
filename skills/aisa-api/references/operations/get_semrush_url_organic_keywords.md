# get_semrush_url_organic_keywords

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "get_semrush_url_organic_keywords",
  "successful": true,
  "description": "Keywords a specific URL ranks for in Google organic. Billed per returned data row at $0.09 per row (up to 20 rows; header row excluded); 4xx/5xx are not charged. Response is semicolon-delimited text.",
  "provider": "semrush",
  "method": "GET",
  "path": "/apis/v1/semrush/url-organic-keywords",
  "arguments_schema": {
    "type": "object",
    "properties": {
      "url": {
        "type": "string",
        "example": "https://ahrefs.com/blog/",
        "description": "Target URL (landing page)."
      },
      "database": {
        "type": "string",
        "example": "us",
        "description": "Regional database / country code, e.g. `us`."
      }
    },
    "required": [
      "url",
      "database"
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
    "seo-labs"
  ]
}
```
