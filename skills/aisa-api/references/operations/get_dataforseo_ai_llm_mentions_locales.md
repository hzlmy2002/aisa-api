# get_dataforseo_ai_llm_mentions_locales

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "get_dataforseo_ai_llm_mentions_locales",
  "successful": true,
  "description": "The locations and languages the mentions endpoints accept, as `location_code`, `location_name` and `available_languages` - languages are nested per location rather than listed separately. Measured at 58.6 KB. Free: upstream cost is 0. Reference data, so fetch once and reuse.",
  "provider": "dataforseo",
  "method": "GET",
  "path": "/apis/v1/dataforseo/ai_optimization/llm_mentions/locations_and_languages",
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
