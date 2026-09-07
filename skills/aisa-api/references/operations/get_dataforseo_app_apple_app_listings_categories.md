# get_dataforseo_app_apple_app_listings_categories

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "get_dataforseo_app_apple_app_listings_categories",
  "successful": true,
  "description": "The categories `post_dataforseo_app_apple_app_listings_search_live` will accept, as `category` and `count` - 55 rows. Measured at 2.6 KB. Free: upstream cost is 0. Note the Apple and Google category vocabularies differ in both names and count; `get_dataforseo_app_google_app_listings_categories` is the other one.",
  "provider": "dataforseo",
  "method": "GET",
  "path": "/apis/v1/dataforseo/app_data/apple/app_listings/categories",
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
    "seo-apps"
  ]
}
```
