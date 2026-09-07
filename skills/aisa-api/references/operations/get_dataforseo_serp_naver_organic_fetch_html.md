# get_dataforseo_serp_naver_organic_fetch_html

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "get_dataforseo_serp_naver_organic_fetch_html",
  "successful": true,
  "description": "Retrieves a queued Naver organic result by `id` as raw HTML. 🔴 Measured at 2.4 MB against 57 KB parsed on the Google organic pair. Free - the charge was on the submit. Wrapped in DataForSEO's envelope: data in `tasks[0].result`, outcome in `tasks[0].status_code` - a rejected request still returns HTTP 200.",
  "provider": "dataforseo",
  "method": "GET",
  "path": "/apis/v1/dataforseo/serp/naver/organic/task_get/html/{id}",
  "arguments_schema": {
    "type": "object",
    "properties": {
      "id": {
        "type": "string",
        "description": "Task identifier in UUID format"
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
    "seo-serp-other-engines"
  ]
}
```
