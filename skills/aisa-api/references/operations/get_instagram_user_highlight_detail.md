# get_instagram_user_highlight_detail

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "get_instagram_user_highlight_detail",
  "successful": true,
  "description": "Returns the stories inside one highlight album: reel_type, latest_reel_media, the owning user, and items, each a raw Instagram story media object. Pass the bare numeric id from get_instagram_user_highlights. The response echoes that id back in the prefixed form highlight:<id>, and feeding the prefixed form to this endpoint returns 404 with a message blaming deletion or a private account, which points at the wrong cause; send the bare number. Measured at 630 KB for an album of 38 stories, so size scales with the album.",
  "provider": "instagram",
  "method": "GET",
  "path": "/apis/v1/instagram/user/highlight/detail",
  "arguments_schema": {
    "type": "object",
    "properties": {
      "id": {
        "type": "string",
        "example": "18029499352961095",
        "description": "Highlight ID. Use `/instagram/user/highlights` to discover current highlight IDs for a public account."
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
