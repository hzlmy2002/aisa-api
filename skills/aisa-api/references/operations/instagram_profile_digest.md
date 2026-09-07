# instagram_profile_digest

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "instagram_profile_digest",
  "successful": true,
  "description": "A public profile as a flat card, projected from the same upstream as `get_instagram_profile`.\n\nKeeps: username, full_name, numeric id, biography, external_url, bio_links\n(title + url), follower/following/posts counts, verification and privacy flags,\ncategory, one profile picture URL, and the recent posts Instagram embeds in the\nprofile (shortcode, full caption, like/comment counts, taken_at, one display\nURL each). Measured: 380 KB raw becomes about 15 KB — the recent posts\nand their display URLs are most of it.\n\nCounts are flattened from their upstream wrappers: `followers` here is\n`data.user.edge_followed_by.count` there. The numeric `id` feeds\n`get_instagram_basic_profile`, which is the cheap (4.5 KB) per-id lookup for\nenriching many accounts.\n\nFor the untouched upstream response — every field, every wrapper — call\n`get_instagram_profile` instead.",
  "provider": "aisa",
  "method": "POST",
  "path": "mcp://instagram_profile_digest",
  "arguments_schema": {
    "additionalProperties": false,
    "properties": {
      "handle": {
        "type": "string"
      }
    },
    "required": [
      "handle"
    ],
    "type": "object"
  },
  "response_schema": {
    "additionalProperties": true,
    "type": "object"
  },
  "read_only": true,
  "idempotent": false,
  "side_effects": [],
  "annotations": {
    "readOnlyHint": true,
    "destructiveHint": false,
    "idempotentHint": false,
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
