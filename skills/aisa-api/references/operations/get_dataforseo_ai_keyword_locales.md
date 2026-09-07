# get_dataforseo_ai_keyword_locales

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "get_dataforseo_ai_keyword_locales",
  "successful": true,
  "description": "The locations and languages the AI keyword endpoint accepts, as `location_code`, `location_name` and `available_languages` nested per location. Measured at 13.1 KB. Free: upstream cost is 0. Reference data - fetch once and reuse. Free: upstream cost is 0, and it is reference data - fetch once and keep what you need rather than calling it per request. ⚠️ Catalogues in this provider are not shared between families: the same endpoint name under a different product returns a different list, and one of them measured 46 MB. Check the list belonging to the endpoint you are actually calling.",
  "provider": "dataforseo",
  "method": "GET",
  "path": "/apis/v1/dataforseo/ai_optimization/ai_keyword_data/locations_and_languages",
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
