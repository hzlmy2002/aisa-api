# get_instagram_profile

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "get_instagram_profile",
  "successful": true,
  "description": "Returns the full public profile for an Instagram handle, forwarded from Instagram's own web API. Counts sit under data.user.edge_followed_by.count and data.user.edge_follow.count, alongside biography, bio_links, external_url, full_name, is_verified, is_private, highlight_reel_count, the numeric id, and the twelve most recent posts under data.user.edge_owner_to_timeline_media.edges. Measured at about 380 KB; trim=true saves under one percent, so do not rely on it to shrink the payload. When the numeric id is already known, get_instagram_basic_profile returns the same headline numbers in about 4 KB.",
  "provider": "instagram",
  "method": "GET",
  "path": "/apis/v1/instagram/profile",
  "arguments_schema": {
    "type": "object",
    "properties": {
      "handle": {
        "type": "string",
        "example": "jane",
        "description": "Instagram handle"
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
