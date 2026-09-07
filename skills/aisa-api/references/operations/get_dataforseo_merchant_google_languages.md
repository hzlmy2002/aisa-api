# get_dataforseo_merchant_google_languages

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "get_dataforseo_merchant_google_languages",
  "successful": true,
  "description": "The languages the Google Shopping endpoints accept, as `language_name` and `language_code`. Measured at 6.7 KB. Free: upstream cost is 0. These are plain codes such as `en`, unlike the Amazon list's locale pairs - see `get_dataforseo_merchant_amazon_languages`, which rejects what this one accepts.",
  "provider": "dataforseo",
  "method": "GET",
  "path": "/apis/v1/dataforseo/merchant/google/languages",
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
    "seo-merchant"
  ]
}
```
