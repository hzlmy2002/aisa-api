# get_dataforseo_labs_available_filters

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "get_dataforseo_labs_available_filters",
  "successful": true,
  "description": "The filterable fields for every Labs endpoint, keyed by endpoint: `related_keywords`, `keyword_suggestions`, `ranked_keywords`, `keyword_ideas`, `serp_competitors`, `relevant_pages`, `subdomains`, `competitors_domain`, `categories_for_domain`, `keywords_for_categories` and the rest. 🔴 **Measured at 60.9 KB** - large for a reference response, though nothing beside the location catalogues elsewhere in this provider. Free: upstream cost is 0. Fetch once and keep the section you need; an unknown filter field is rejected, not ignored.",
  "provider": "dataforseo",
  "method": "GET",
  "path": "/apis/v1/dataforseo/dataforseo_labs/available_filters",
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
    "seo-labs"
  ]
}
```
