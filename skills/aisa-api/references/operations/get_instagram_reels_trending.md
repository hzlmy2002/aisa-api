# get_instagram_reels_trending

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "get_instagram_reels_trending",
  "successful": true,
  "description": "Returns the reels Instagram publishes on its public instagram.com/reels page, in a normalised shape: reels, each with shortcode, url, caption, like_count, comment_count, video_url, image_url, media_type, taken_at and the owning user. Instagram serves a small batch at a time and successive batches overlap, so call repeatedly and de-duplicate on shortcode. Measured at 30 reels and about 411 KB, where play_count and ig_play_count came back null on every item, unlike get_instagram_reels_search which populates them. Takes no parameters and cannot be filtered; to search by topic use get_instagram_reels_search.",
  "provider": "instagram",
  "method": "GET",
  "path": "/apis/v1/instagram/reels/trending",
  "arguments_schema": {
    "type": "object",
    "properties": {},
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
