# post_dataforseo_on_page_force_stop

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "post_dataforseo_on_page_force_stop",
  "successful": true,
  "description": "Stops a running crawl by `id`. Returns no results of its own. Wrapped in DataForSEO's envelope: data in `tasks[0].result`, outcome in `tasks[0].status_code` - a rejected request still returns HTTP 200. Use it when a crawl was submitted with too high a `max_crawl_pages` and is still consuming budget; what has already been crawled stays queryable through `get_dataforseo_on_page_summary` and the rest of this family.",
  "provider": "dataforseo",
  "method": "POST",
  "path": "/apis/v1/dataforseo/on_page/force_stop",
  "arguments_schema": {
    "type": "object",
    "properties": {
      "body": {
        "type": "array",
        "items": {
          "required": [
            "id"
          ],
          "type": "object",
          "properties": {
            "id": {
              "type": "string",
              "description": "ID of the task required field you can get this ID in the response of the Task POST endpoint example: “07131248-1535-0216-1000-17384017ad04” note: you can set up to 1000 id values as separate objects in the POST array"
            }
          }
        }
      }
    },
    "required": [
      "body"
    ]
  },
  "response_schema": {
    "type": "object",
    "additionalProperties": true
  },
  "read_only": false,
  "idempotent": false,
  "side_effects": [
    "writes-upstream"
  ],
  "annotations": {
    "readOnlyHint": false,
    "destructiveHint": true,
    "idempotentHint": false,
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
