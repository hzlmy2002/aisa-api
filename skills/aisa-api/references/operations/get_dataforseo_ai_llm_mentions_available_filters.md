# get_dataforseo_ai_llm_mentions_available_filters

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "get_dataforseo_ai_llm_mentions_available_filters",
  "successful": true,
  "description": "The filterable fields for each mentions endpoint, keyed by endpoint: `search`, `search_mentions`, `target_metrics`, `multi_target_metrics`, `top_mentioned_domains`, `top_mentioned_pages`, `top_mentioned_brands`, `top_mentioned_brand_categories` and the `_lite` variants. Measured at 4.9 KB. Free: upstream cost is 0. Read it before building a `filters` argument - the mentions endpoints cost $0.101 each, so a rejected call is an expensive way to learn a field name.",
  "provider": "dataforseo",
  "method": "GET",
  "path": "/apis/v1/dataforseo/ai_optimization/llm_mentions/available_filters",
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
    "seo-ai-visibility"
  ]
}
```
