# post_dataforseo_on_page_duplicate_tags

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "post_dataforseo_on_page_duplicate_tags",
  "successful": true,
  "description": "Pages within a crawl sharing a title or meta description. ⚠️ **`type` accepts exactly `duplicate_title` or `duplicate_description`** - anything else, including the obvious 'title', is rejected with `status_code` 40501 inside an HTTP 200. `accumulator` narrows the result to pages carrying one specific tag value. Returns `total_pages_count`, `pages_count`, `items_count` and `items`. Measured at 850 bytes. Reads a finished crawl, so it needs the `id` from `post_dataforseo_on_page_submit` and returns `crawl_progress` plus a `crawl_status` of `max_crawl_pages`, `pages_in_queue` and `pages_crawled` - check those before trusting a small result, because a crawl still running simply has less to report. For duplicated body content instead, use `post_dataforseo_on_page_duplicate_content`. 💰 Free upstream: querying a finished crawl costs nothing, only the crawl itself does. This family is the cheapest in the provider.",
  "provider": "dataforseo",
  "method": "POST",
  "path": "/apis/v1/dataforseo/on_page/duplicate_tags",
  "arguments_schema": {
    "type": "object",
    "properties": {
      "body": {
        "type": "array",
        "items": {
          "required": [
            "id",
            "type"
          ],
          "type": "object",
          "properties": {
            "id": {
              "type": "string",
              "description": "ID of the task required field you can get this ID in the response of the Task POST endpoint example: “07131248-1535-0216-1000-17384017ad04”"
            },
            "type": {
              "enum": [
                "duplicate_title",
                "duplicate_description"
              ],
              "type": "string",
              "description": "duplicate tags type required field indicates the type of duplicate elements found on the pages. The results will depend on the type you specify possible values: duplicate_title, duplicate_description"
            },
            "accumulator": {
              "type": "string",
              "description": "tag value optional field specify a title or description here if you want to receive a list of duplicate pages that contains this tag"
            },
            "limit": {
              "type": "integer",
              "description": "the maximum number of returned pages optional field default value: 100 maximum value: 1000"
            },
            "offset": {
              "type": "integer",
              "description": "offset in the results array of returned pages optional field default value: 0 if you specify the 10 value, the first ten pages in the results array will be omitted and the data will be provided for the successive pages"
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
