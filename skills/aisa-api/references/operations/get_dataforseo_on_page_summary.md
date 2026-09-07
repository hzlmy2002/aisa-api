# get_dataforseo_on_page_summary

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "get_dataforseo_on_page_summary",
  "successful": true,
  "description": "The state and headline metrics of one crawl, by `id`. Returns `crawl_progress`, `crawl_status`, `crawl_gateway_address`, `crawl_stop_reason`, `domain_info` and `page_metrics`. Measured at 3.1 KB. Wrapped in DataForSEO's envelope: data in `tasks[0].result`, outcome in `tasks[0].status_code` - a rejected request still returns HTTP 200. **This is also the way to know a crawl has finished** - poll it until `crawl_progress` is `finished` before reading any other endpoint here, or you will read partial results that look like real ones. 💰 Free upstream: querying a finished crawl costs nothing, only the crawl itself does. This family is the cheapest in the provider.",
  "provider": "dataforseo",
  "method": "GET",
  "path": "/apis/v1/dataforseo/on_page/summary/{id}",
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
    "seo-onpage"
  ]
}
```
