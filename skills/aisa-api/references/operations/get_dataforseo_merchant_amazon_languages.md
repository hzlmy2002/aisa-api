# get_dataforseo_merchant_amazon_languages

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "get_dataforseo_merchant_amazon_languages",
  "successful": true,
  "description": "The 27 languages the Amazon endpoints accept, as `language_name` and `language_code`. Measured at 2.1 KB. Free: upstream cost is 0. **Read this before submitting an Amazon task.** These are locale pairs - `en_US` with `English (United States)`, `ar_SA` with `Arabic (Saudi Arabia)` - and the bare `en` that Google accepts is rejected here. The Google equivalent is `get_dataforseo_merchant_google_languages`.",
  "provider": "dataforseo",
  "method": "GET",
  "path": "/apis/v1/dataforseo/merchant/amazon/languages",
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
