# get_twitter_user_batch_info_by_ids

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "get_twitter_user_batch_info_by_ids",
  "successful": true,
  "description": "Resolve many X users at once from their numeric user IDs, passed as a comma-separated `userIds` string. Use this when a previous call (timeline, retweeters, followers) gave you IDs and you need to turn them into full profiles in one request instead of looping. Returns an array of user objects under `users`. Note this endpoint takes numeric IDs, not @handles — to look up by handle use `get_twitter_user_info`.",
  "provider": "twitter",
  "method": "GET",
  "path": "/apis/v1/twitter/user/batch_info_by_ids",
  "arguments_schema": {
    "type": "object",
    "properties": {
      "userIds": {
        "type": "string",
        "description": "Comma-separated user IDs"
      }
    },
    "required": [
      "userIds"
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
