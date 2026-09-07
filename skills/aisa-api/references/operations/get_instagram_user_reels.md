# get_instagram_user_reels

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "get_instagram_user_reels",
  "successful": true,
  "description": "Returns one page of a public account's reels as raw Instagram media objects under items[].media, with paging_info.max_id for the following page. Each reel carries code, caption, like_count, comment_count, video_versions, image_versions2 and clips_metadata, whose original_sound_info.audio_asset_id is exactly the id that get_instagram_song_reels expects. Pass user_id rather than handle for a faster response. Measured at 594 KB per page. Use get_instagram_user_posts for the whole timeline including photos and carousels.",
  "provider": "instagram",
  "method": "GET",
  "path": "/apis/v1/instagram/user/reels",
  "arguments_schema": {
    "type": "object",
    "properties": {
      "user_id": {
        "type": "string",
        "example": "2700692569",
        "description": "Instagram user id. Use this for faster response times."
      },
      "handle": {
        "type": "string",
        "example": "jane",
        "description": "Instagram handle. Use user_id for faster response times."
      },
      "max_id": {
        "type": "string",
        "example": "QVFCVzNnS2lI...==",
        "description": "Max id to get more reels. Get 'max_id' from previous response."
      },
      "trim": {
        "type": "boolean",
        "example": "false",
        "description": "Set to true for a trimmed down version of the response"
      }
    },
    "required": []
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
