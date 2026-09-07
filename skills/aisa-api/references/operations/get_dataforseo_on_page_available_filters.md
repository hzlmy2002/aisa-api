# get_dataforseo_on_page_available_filters

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "get_dataforseo_on_page_available_filters",
  "successful": true,
  "description": "The filterable fields for each endpoint in this family, keyed by endpoint: `resources`, `pages`, `non_indexable`, `links`, `pages_by_resource`, `redirect_chains`, `keyword_density` and `uncrawlable_resources`. Fields are dotted paths such as `meta.title` and `meta.description`. Measured at 10.5 KB, the largest reference response here. Free: upstream cost is 0. Read it before building a `filters` argument - an unknown field is rejected, not ignored.",
  "provider": "dataforseo",
  "method": "GET",
  "path": "/apis/v1/dataforseo/on_page/available_filters",
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
    "seo-onpage"
  ]
}
```
