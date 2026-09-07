# get_twitter_user_verified_followers

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "get_twitter_user_verified_followers",
  "successful": true,
  "description": "List only the verified accounts following a given X user, in reverse chronological order. Use this to gauge the quality rather than the size of an audience — verified followers are a better credibility signal than raw follower count. Cursor-paginated. Takes a numeric `user_id`, not a @handle; resolve the handle first with `get_twitter_user_info`. For the complete follower list use `get_twitter_user_followers`.",
  "provider": "twitter",
  "method": "GET",
  "path": "/apis/v1/twitter/user/verifiedFollowers",
  "arguments_schema": {
    "type": "object",
    "properties": {
      "user_id": {
        "type": "string",
        "description": "User ID of the user."
      },
      "cursor": {
        "type": "string",
        "description": "The cursor to paginate through the results. First page is empty."
      }
    },
    "required": [
      "user_id"
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
