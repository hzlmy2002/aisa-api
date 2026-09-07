# get_instagram_media_transcript

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "get_instagram_media_transcript",
  "successful": true,
  "description": "Transcribes the speech in a public Instagram video or reel and returns transcripts, each with id, shortcode and the transcribed text. The target must be a video under two minutes long: a photo post returns 400 bad_request, so when the URL's type is unknown check is_video with get_instagram_post first. Measured at 13 seconds, the slowest call in this API, for about 1 KB back. For the caption the author wrote rather than the words spoken in the video, read edge_media_to_caption from get_instagram_post.",
  "provider": "instagram",
  "method": "GET",
  "path": "/apis/v1/instagram/media/transcript",
  "arguments_schema": {
    "type": "object",
    "properties": {
      "url": {
        "type": "string",
        "description": "Instagram post or reel URL"
      }
    },
    "required": [
      "url"
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
