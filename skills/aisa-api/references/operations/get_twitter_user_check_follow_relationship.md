# get_twitter_user_check_follow_relationship

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "get_twitter_user_check_follow_relationship",
  "successful": true,
  "description": "Check whether one X user follows another, in both directions, by @handle. Use this for a single targeted lookup instead of paging through `get_twitter_user_followers` or `get_twitter_user_followings` — it answers 'does A follow B, and does B follow A' in one request. Returns the relationship flags under `data`.",
  "provider": "twitter",
  "method": "GET",
  "path": "/apis/v1/twitter/user/check_follow_relationship",
  "arguments_schema": {
    "type": "object",
    "properties": {
      "source_user_name": {
        "type": "string",
        "description": "Screen name of the source user."
      },
      "target_user_name": {
        "type": "string",
        "description": "Screen name of the target user."
      }
    },
    "required": [
      "source_user_name",
      "target_user_name"
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
    "twitter-api"
  ]
}
```
