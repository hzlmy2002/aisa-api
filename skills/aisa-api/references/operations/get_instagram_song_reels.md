# get_instagram_song_reels

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "get_instagram_song_reels",
  "successful": true,
  "description": "Returns the reels that use one audio track, as raw Instagram media objects under reels, with cursor and has_more for paging. There are two confirmed ways to obtain audio_id: the number in an instagram.com/reels/audio/<id>/ URL, and clips_metadata.original_sound_info.audio_asset_id on any reel returned by get_instagram_user_reels. Measured at about 177 KB for five reels, in the same raw shape as get_instagram_user_reels rather than the normalised shape of the search endpoints. To find reels by keyword instead of by sound, use get_instagram_reels_search.",
  "provider": "instagram",
  "method": "GET",
  "path": "/apis/v1/instagram/song/reels",
  "arguments_schema": {
    "type": "object",
    "properties": {
      "audio_id": {
        "type": "string",
        "example": "1392969992841787",
        "description": "The audio id from the Instagram audio page URL."
      },
      "cursor": {
        "type": "string",
        "example": "Gsbyq-aju4eF02y...",
        "description": "Pagination cursor returned by Instagram from the previous response."
      }
    },
    "required": [
      "audio_id"
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
