# get_instagram_user_posts

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "get_instagram_user_posts",
  "successful": true,
  "description": "Returns one page of a public account's timeline, reels and photos and carousels alike, as raw Instagram media objects under items. Page with next_max_id and stop on more_available; num_results reports the page size. Each item carries media_type, code, caption, like_count, comment_count, taken_at, image_versions2 and video_versions among roughly two hundred internal flags. Measured at 632 KB per page, the largest response in this API, and trim=true only reduces it to 523 KB. For reels alone use get_instagram_user_reels, and for one known post use get_instagram_post; both return the same raw shape, so neither is a way to get a smaller payload.",
  "provider": "instagram",
  "method": "GET",
  "path": "/apis/v1/instagram/user/posts",
  "arguments_schema": {
    "type": "object",
    "properties": {
      "handle": {
        "type": "string",
        "description": "Instagram handle"
      },
      "next_max_id": {
        "type": "string",
        "description": "Cursor to get next page of results."
      },
      "trim": {
        "type": "boolean",
        "description": "Set to true to get a trimmed response"
      }
    },
    "required": [
      "handle"
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
    "instagram"
  ]
}
```
