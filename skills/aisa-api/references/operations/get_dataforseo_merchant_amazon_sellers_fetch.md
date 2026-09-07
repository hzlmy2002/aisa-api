# get_dataforseo_merchant_amazon_sellers_fetch

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "get_dataforseo_merchant_amazon_sellers_fetch",
  "successful": true,
  "description": "The sellers offering one Amazon product and what each charges, from a task queued by `post_dataforseo_merchant_amazon_sellers_submit`. Free - the charge was on the submit. Wrapped in DataForSEO's envelope: data in `tasks[0].result`, outcome in `tasks[0].status_code` - a rejected request still returns HTTP 200. This answers who else is in the buy box; the product itself is `get_dataforseo_merchant_amazon_asin_fetch`. 🔴 The `_fetch_html` twin returns the raw page source instead: measured at 2.6 MB against 82 KB for the parsed version of the same task, a 32x difference. Reach for it only when the parsed result is missing something you can point at.",
  "provider": "dataforseo",
  "method": "GET",
  "path": "/apis/v1/dataforseo/merchant/amazon/sellers/task_get/advanced/{id}",
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
