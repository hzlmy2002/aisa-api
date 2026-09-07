# get_twitter_user_info

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "get_twitter_user_info",
  "successful": true,
  "description": "Look up one X (Twitter) user's public profile by @handle (screen name). Use this when you need to know who an account is — identity, reach, or credibility — before deciding whether to trust or analyze their content. Returns display name, bio, follower/following counts, verification status, account creation date, location, and profile images. If you only have a numeric user ID, use `get_twitter_user_batch_info_by_ids` instead. If you need extended profile metadata such as country or username-change history, use `get_twitter_user_about`. If you want their posts rather than their profile, use `get_twitter_user_tweet_timeline`.",
  "provider": "twitter",
  "method": "GET",
  "path": "/apis/v1/twitter/user/info",
  "arguments_schema": {
    "type": "object",
    "properties": {
      "userName": {
        "type": "string",
        "description": "The screen name of the user"
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
