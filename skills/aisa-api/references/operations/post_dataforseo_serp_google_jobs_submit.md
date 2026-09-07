# post_dataforseo_serp_google_jobs_submit

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "post_dataforseo_serp_google_jobs_submit",
  "successful": true,
  "description": "Queues the job listings Google surfaces for a query on Google, returning a task `id` in `tasks[0].id`. The charge lands here; fetching is free, including re-fetching. 💰 Measured at $0.002 upstream against the $0.012 billed - this family is the cheapest source of search data here, six times under the flat rate. Wrapped in DataForSEO's envelope: data in `tasks[0].result`, outcome in `tasks[0].status_code` - a rejected request still returns HTTP 200. The live twin answers immediately and is simpler for a single query; queue when the batch would outlast a tool call.",
  "provider": "dataforseo",
  "method": "POST",
  "path": "/apis/v1/dataforseo/serp/google/jobs/task_post",
  "arguments_schema": {
    "type": "object",
    "properties": {
      "body": {
        "type": "array",
        "items": {
          "required": [
            "keyword"
          ],
          "type": "object",
          "properties": {
            "keyword": {
              "type": "string",
              "description": "Keyword to search for"
            },
            "location_code": {
              "type": "integer",
              "description": "Search engine location code"
            },
            "location_name": {
              "type": "string",
              "description": "Full name of search engine location"
            },
            "location_coordinate": {
              "type": "string",
              "description": "GPS coordinates of a location"
            },
            "language_code": {
              "type": "string",
              "description": "Search engine language code"
            },
            "language_name": {
              "type": "string",
              "description": "Full name of search engine language"
            },
            "priority": {
              "type": "integer",
              "description": "Task priority"
            },
            "postback_url": {
              "type": "string",
              "description": "URL for sending task results"
            },
            "pingback_url": {
              "type": "string",
              "description": "Notification URL of a completed task"
            },
            "postback_data": {
              "type": "string",
              "description": "Postback datatype; possible values include advanced and html"
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
    "seo-serp"
  ]
}
```
