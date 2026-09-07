# get_dataforseo_keywords_bing_languages

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "get_dataforseo_keywords_bing_languages",
  "successful": true,
  "description": "The languages the Bing keyword endpoints accept, as `language_name` and `language_code`. Measured at 548 bytes, the smallest reference response in this provider. Free: upstream cost is 0. Free: upstream cost is 0, and it is reference data - fetch once and keep what you need rather than calling it per request. ⚠️ Catalogues in this provider are not shared between families: the same endpoint name under a different product returns a different list, and one of them measured 46 MB. Check the list belonging to the endpoint you are actually calling.",
  "provider": "dataforseo",
  "method": "GET",
  "path": "/apis/v1/dataforseo/keywords_data/bing/languages",
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
    "seo-keywords"
  ]
}
```
