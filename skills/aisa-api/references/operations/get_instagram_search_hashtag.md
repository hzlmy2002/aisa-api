# get_instagram_search_hashtag

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "get_instagram_search_hashtag",
  "successful": true,
  "description": "Finds public posts carrying a hashtag through Google, returning hashtag, media_type, cursor and posts in the same normalised shape as get_instagram_reels_search: shortcode, url, caption, like_count, comment_count, video_play_count, video_view_count, owner, location and taken_at. The leading # is optional. Set media_type=reels to narrow to reels, or all for posts and reels together. Note that cursor here is the next Google results page number rather than an Instagram cursor. Measured at about 78 KB for ten posts. To search caption keywords rather than a hashtag, use get_instagram_reels_search.",
  "provider": "instagram",
  "method": "GET",
  "path": "/apis/v1/instagram/search/hashtag",
  "arguments_schema": {
    "type": "object",
    "properties": {
      "hashtag": {
        "type": "string",
        "example": "makeup",
        "description": "The hashtag to search for. Include or omit the #."
      },
      "date_posted": {
        "enum": [
          "last-hour",
          "last-day",
          "last-week",
          "last-month",
          "last-year"
        ],
        "type": "string",
        "example": "last-week",
        "description": "Only return Google-indexed posts found in this relative window."
      },
      "media_type": {
        "enum": [
          "all",
          "reels"
        ],
        "type": "string",
        "example": "all",
        "description": "Use all to search public posts and reels, or reels to only return reels. Defaults to all."
      },
      "cursor": {
        "type": "string",
        "example": "2",
        "description": "The cursor returned by the previous response. In this version, it is the next Google results page number."
      }
    },
    "required": [
      "hashtag"
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
