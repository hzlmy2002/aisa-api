# get_dataforseo_merchant_google_products_fetch

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "get_dataforseo_merchant_google_products_fetch",
  "successful": true,
  "description": "The parsed result of a Google Shopping search queued by `post_dataforseo_merchant_google_products_submit`. Returns `keyword`, `se_domain`, `location_code`, `language_code`, `check_url`, `datetime`, `spell`, `item_types`, `items_count` and `items`, each item carrying `rank_group`, `rank_absolute`, `position`, `xpath`, `title` and nested `items`. Measured at 83 KB for a ten-result search. Free - the charge was on the submit. Wrapped in DataForSEO's envelope: data in `tasks[0].result`, outcome in `tasks[0].status_code` - a rejected request still returns HTTP 200. 🔴 The `_fetch_html` twin returns the raw page source instead: measured at 2.6 MB against 82 KB for the parsed version of the same task, a 32x difference. Reach for it only when the parsed result is missing something you can point at.",
  "provider": "dataforseo",
  "method": "GET",
  "path": "/apis/v1/dataforseo/merchant/google/products/task_get/advanced/{id}",
  "arguments_schema": {
    "type": "object",
    "properties": {
      "id": {
        "type": "string",
        "description": "DataForSEO task ID."
      }
    },
    "required": [
      "id"
    ]
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
