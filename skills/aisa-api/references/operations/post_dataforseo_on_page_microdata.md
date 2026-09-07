# post_dataforseo_on_page_microdata

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "post_dataforseo_on_page_microdata",
  "successful": true,
  "description": "Validates the structured data on one crawled `url`. Measured at 493 bytes. Reads a finished crawl, so it needs the `id` from `post_dataforseo_on_page_submit` and returns `crawl_progress` plus a `crawl_status` of `max_crawl_pages`, `pages_in_queue` and `pages_crawled` - check those before trusting a small result, because a crawl still running simply has less to report. ⚠️ The page must have been part of the crawl: asking for a URL that was not returns `status_code` 40406, `Requested page was not submitted for crawling`, inside an HTTP 200. Widen `max_crawl_pages` or set `start_url` on the submit call if the page you want is missing. 💰 Free upstream: querying a finished crawl costs nothing, only the crawl itself does. This family is the cheapest in the provider.",
  "provider": "dataforseo",
  "method": "POST",
  "path": "/apis/v1/dataforseo/on_page/microdata",
  "arguments_schema": {
    "type": "object",
    "properties": {
      "body": {
        "type": "array",
        "items": {
          "required": [
            "id",
            "url"
          ],
          "type": "object",
          "properties": {
            "id": {
              "type": "string",
              "description": "ID of the task required field you can get this ID in the response of the Task POST endpoint example: \"07131248-1535-0216-1000-17384017ad04\""
            },
            "url": {
              "type": "string",
              "description": "resource URL required field you can get this URL in the response of the Pages endpoint example: https://dataforseo.com/apis"
            },
            "tag": {
              "type": "string",
              "description": "user-defined task identifier optional field the character limit is 255 you can use this parameter to identify the task and match it with the result you will find the specified tag value in the data object of the response"
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
