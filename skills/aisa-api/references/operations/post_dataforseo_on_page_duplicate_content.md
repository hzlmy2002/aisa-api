# post_dataforseo_on_page_duplicate_content

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "post_dataforseo_on_page_duplicate_content",
  "successful": true,
  "description": "Pages within a crawl whose content resembles a given `url`, above a `similarity` threshold. Measured at 606 bytes. Reads a finished crawl, so it needs the `id` from `post_dataforseo_on_page_submit` and returns `crawl_progress` plus a `crawl_status` of `max_crawl_pages`, `pages_in_queue` and `pages_crawled` - check those before trusting a small result, because a crawl still running simply has less to report. For duplicated titles or meta descriptions rather than body text, use `post_dataforseo_on_page_duplicate_tags`. 💰 Free upstream: querying a finished crawl costs nothing, only the crawl itself does. This family is the cheapest in the provider.",
  "provider": "dataforseo",
  "method": "POST",
  "path": "/apis/v1/dataforseo/on_page/duplicate_content",
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
              "description": "ID of the task required field you can get this ID in the response of the Task POST endpoint example: “07131248-1535-0216-1000-17384017ad04”"
            },
            "url": {
              "type": "string",
              "description": "page URL required field specify the initial page you want to receive duplicate content for"
            },
            "similarity": {
              "type": "integer",
              "description": "content similarity score by default, the content is considered duplicate if the value is greater than or equals 6 you can specify any similarity score in the 0-to-10 range"
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
