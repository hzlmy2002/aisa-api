# post_dataforseo_on_page_content_parsing

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "post_dataforseo_on_page_content_parsing",
  "successful": true,
  "description": "Parses one crawled `url` into structured content, with `markdown_view` for a markdown rendering. Measured at 592 bytes. Reads a finished crawl, so it needs the `id` from `post_dataforseo_on_page_submit` and returns `crawl_progress` plus a `crawl_status` of `max_crawl_pages`, `pages_in_queue` and `pages_crawled` - check those before trusting a small result, because a crawl still running simply has less to report. The standalone twin `post_dataforseo_on_page_content_parsing_live` parses any URL without a crawl - prefer that unless the page is already part of one.",
  "provider": "dataforseo",
  "method": "POST",
  "path": "/apis/v1/dataforseo/on_page/content_parsing",
  "arguments_schema": {
    "type": "object",
    "properties": {
      "body": {
        "type": "array",
        "items": {
          "required": [
            "url",
            "id"
          ],
          "type": "object",
          "properties": {
            "url": {
              "type": "string",
              "description": "URL of the content to parse required field URL of the page to parse example: https://dataforseo.com/blog/a-versatile-alternative-to-google-trends-exploring-the-power-of-dataforseo-trends-api"
            },
            "id": {
              "type": "string",
              "description": "ID of the task required field you can get this ID in the response of the Task POST endpoint note: the enable_content_parsing parameter in the POST request must be set to true example: \"07131248-1535-0216-1000-17384017ad04\""
            },
            "markdown_view": {
              "type": "boolean",
              "description": "return page content as markdown optional field if set to true, the markdown-formatted content of the page will be returned in the page_as_markdown field of the response; default value: false"
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
