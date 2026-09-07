# get_dataforseo_merchant_amazon_sellers_fetch_html

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "get_dataforseo_merchant_amazon_sellers_fetch_html",
  "successful": true,
  "description": "The raw HTML of an Amazon sellers page, from a task queued by `post_dataforseo_merchant_amazon_sellers_submit`. 🔴 Far larger than the parsed twin, on the order of the 2.6 MB against 83 KB measured on the Google pair. Free - the charge was on the submit. Wrapped in DataForSEO's envelope: data in `tasks[0].result`, outcome in `tasks[0].status_code` - a rejected request still returns HTTP 200. The parsed version is `get_dataforseo_merchant_amazon_sellers_fetch`.",
  "provider": "dataforseo",
  "method": "GET",
  "path": "/apis/v1/dataforseo/merchant/amazon/sellers/task_get/html/{id}",
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
