# get_twitter_user_followers

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "get_twitter_user_followers",
  "successful": true,
  "description": "List the accounts that follow a given X user, identified by @handle, newest follower first. Returns up to 200 per page by default with `has_next_page` and `next_cursor`; each entry is a full user object (handle, name, bio, follower count, verification). Use this for audience analysis, mapping a competitor's follower base, or finding influential followers. For the reverse direction (who this user follows) use `get_twitter_user_followings`. For only the verified subset use `get_twitter_user_verified_followers` — note that one takes a numeric `user_id`, not a handle.",
  "provider": "twitter",
  "method": "GET",
  "path": "/apis/v1/twitter/user/followers",
  "arguments_schema": {
    "type": "object",
    "properties": {
      "userName": {
        "type": "string",
        "description": "Screen name of the user"
      },
      "cursor": {
        "type": "string",
        "description": "Cursor for pagination"
      },
      "pageSize": {
        "maximum": 200,
        "minimum": 20,
        "type": "integer",
        "default": 200,
        "description": "Number of followers per page"
      }
    },
    "required": [
      "userName"
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
