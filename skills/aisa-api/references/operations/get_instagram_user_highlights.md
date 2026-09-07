# get_instagram_user_highlights

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "get_instagram_user_highlights",
  "successful": true,
  "description": "Lists the story highlight albums on a public profile. Returns highlights, each with the numeric id, title, cover_media.thumbnail_src, cover_media_cropped_thumbnail and owner. Small and quick at about 6 KB, which makes it a cheap way to see whether an account keeps highlights at all. This is the only source of a highlight id, and get_instagram_user_highlight_detail requires the bare numeric id exactly as returned here. Pass user_id rather than handle for a faster response.",
  "provider": "instagram",
  "method": "GET",
  "path": "/apis/v1/instagram/user/highlights",
  "arguments_schema": {
    "type": "object",
    "properties": {
      "user_id": {
        "type": "string",
        "example": "2700692569",
        "description": "Instagram user id. Use for faster response times."
      },
      "handle": {
        "type": "string",
        "example": "jane",
        "description": "Instagram handle. Use user_id for faster response times."
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
