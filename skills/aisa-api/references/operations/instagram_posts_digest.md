# instagram_posts_digest

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "instagram_posts_digest",
  "successful": true,
  "description": "One page of a public account's timeline, projected down to what fits a context window.\n\nCalls the same upstream as `get_instagram_user_posts` and keeps, per post: code,\nfull caption text, taken_at, media_type, like/comment/play counts, owner, ONE\nimage URL and ONE video URL (the largest variant of each), video_duration, and\nthe carousel slide count. Measured: 632 KB raw becomes about 20 KB; nothing is\nsummarised and no post is dropped — every post and every caption byte survives,\nin upstream order.\n\nWhat does NOT survive: the other 9 resolution variants per image, dash manifests,\nand ~100 internal flag fields per post. If you need any of those — downloading\nevery resolution, building a player, forensic detail — call\n`get_instagram_user_posts` instead; it returns the upstream response untouched.\n\nPage with `next_max_id` from the previous response; `more_available` says whether\nanother page exists.",
  "provider": "aisa",
  "method": "POST",
  "path": "mcp://instagram_posts_digest",
  "arguments_schema": {
    "additionalProperties": false,
    "properties": {
      "handle": {
        "type": "string"
      },
      "next_max_id": {
        "anyOf": [
          {
            "type": "string"
          },
          {
            "type": "null"
          }
        ],
        "default": null
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
