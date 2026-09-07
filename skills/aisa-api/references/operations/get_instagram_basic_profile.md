# get_instagram_basic_profile

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "get_instagram_basic_profile",
  "successful": true,
  "description": "Returns a compact public profile for a numeric Instagram user id, about 4 KB against the 380 KB of get_instagram_profile. Flat, already-normalised fields: username, full_name, biography, follower_count, following_count, is_verified, is_private, category, profile_pic_url, hd_profile_pic_url_info, bio_links, external_url and pk. Prefer this endpoint whenever the id is in hand; obtain it from data.user.id in get_instagram_profile, from id in get_instagram_search_profiles, or from the owner of any post. Use get_instagram_profile only when a handle is all that is available.",
  "provider": "instagram",
  "method": "GET",
  "path": "/apis/v1/instagram/basic-profile",
  "arguments_schema": {
    "type": "object",
    "properties": {
      "userId": {
        "type": "string",
        "example": "314216",
        "description": "Instagram user id"
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
