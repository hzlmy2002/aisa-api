# get_instagram_post

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "get_instagram_post",
  "successful": true,
  "description": "Returns full metadata for one public post or reel identified by its URL, under data.xdt_shortcode_media: shortcode, is_video, video_url, video_duration, has_audio, display_url, dimensions, accessibility_caption, edge_media_to_caption for the caption text, and owner. Measured at about 197 KB. Setting download_media=true also mirrors the media to permanent storage and costs ten credits rather than one, so leave it off unless the files are needed. For the comment thread call get_instagram_post_comments with the same URL, and for the spoken words in a video call get_instagram_media_transcript.",
  "provider": "instagram",
  "method": "GET",
  "path": "/apis/v1/instagram/post",
  "arguments_schema": {
    "type": "object",
    "properties": {
      "url": {
        "type": "string",
        "description": "Instagram post or reel URL"
      },
      "region": {
        "type": "string",
        "example": "US",
        "description": "2 letter country code to set the proxy in"
      },
      "trim": {
        "type": "boolean",
        "description": "Set to true to get a trimmed response"
      },
      "download_media": {
        "type": "boolean",
        "description": "Set to true to download the video/images and get back permanent Supabase URLs. Costs 10 credits if media is found, 1 credit otherwise."
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
