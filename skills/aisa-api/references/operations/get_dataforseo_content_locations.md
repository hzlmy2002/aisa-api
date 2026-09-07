# get_dataforseo_content_locations

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "get_dataforseo_content_locations",
  "successful": true,
  "description": "The locations the content endpoints accept, as `location_name` and `country_iso_code` - for example `Afghanistan` with `AF`. The 235 rows are countries, not cities or regions, and the `country_iso_code` is returned for recognition only: the content endpoints match on the full `location_name` string. Measured at 13 KB. Free: upstream cost is 0. Reference data, so fetch once and reuse rather than calling it per request. The language equivalent is `get_dataforseo_content_languages`; the far larger category tree is `get_dataforseo_content_categories`.",
  "provider": "dataforseo",
  "method": "GET",
  "path": "/apis/v1/dataforseo/content_analysis/locations",
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
