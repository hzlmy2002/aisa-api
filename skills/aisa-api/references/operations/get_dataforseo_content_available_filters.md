# get_dataforseo_content_available_filters

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "get_dataforseo_content_available_filters",
  "successful": true,
  "description": "The fields that `post_dataforseo_content_search_live` will accept in its `filters` argument: `url`, `domain`, `main_domain`, `url_rank`, `spam_score`, `domain_rank`, `fetch_time`, `country`, `language`, `score`, `page_category` and `page_types`. Measured at 1.8 KB. Free: upstream cost is 0. Read this before constructing a filter rather than guessing a field name - an unknown field is rejected, not ignored.",
  "provider": "dataforseo",
  "method": "GET",
  "path": "/apis/v1/dataforseo/content_analysis/available_filters",
  "arguments_schema": {
    "type": "object",
    "properties": {},
    "required": []
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
    "seo-content"
  ]
}
```
