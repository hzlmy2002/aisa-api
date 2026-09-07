# get_dataforseo_content_languages

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "get_dataforseo_content_languages",
  "successful": true,
  "description": "The languages the content endpoints accept, as `language_name` and `language_code` - for example `Afrikaans` with `af`. 71 rows, and the code is the two-letter form, not a locale: `en`, not `en-US`. Measured at 3.9 KB. Free: upstream cost is 0. Reference data, so fetch once and reuse rather than calling it per request. The location equivalent is `get_dataforseo_content_locations`; the far larger category tree is `get_dataforseo_content_categories`.",
  "provider": "dataforseo",
  "method": "GET",
  "path": "/apis/v1/dataforseo/content_analysis/languages",
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
