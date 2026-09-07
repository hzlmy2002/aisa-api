# get_dataforseo_app_google_app_searches_fetch

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "get_dataforseo_app_google_app_searches_fetch",
  "successful": true,
  "description": "The parsed result of a Google Play search queued by `post_dataforseo_app_google_app_searches_submit`. Returns `keyword`, `se_domain`, `location_code`, `language_code`, `check_url`, `datetime`, `se_results_count`, `items_count` and `items`, each item carrying `rank_group`, `rank_absolute`, `position`, `app_id`, `title`, `url`, `icon`, `reviews_count`, `rating`, `is_free` and `price`. Measured at 21 KB for ten results. Free - the charge was on the submit. Wrapped in DataForSEO's envelope: data in `tasks[0].result`, outcome in `tasks[0].status_code` - a rejected request still returns HTTP 200. Feed an `app_id` from here into `post_dataforseo_app_google_app_info_submit`. 🔴 The `_fetch_html` twin returns the raw store page instead: measured at 1.3 MB against 21 KB for the parsed version of the same task, a 63x difference.",
  "provider": "dataforseo",
  "method": "GET",
  "path": "/apis/v1/dataforseo/app_data/google/app_searches/task_get/advanced/{id}",
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
    "seo-apps"
  ]
}
```
