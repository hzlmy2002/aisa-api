# get_twitter_user_last_tweets

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "get_twitter_user_last_tweets",
  "successful": true,
  "description": "Get a user's most recent tweets, accepting either `userName` (@handle) or `userId` — useful when you have not resolved the handle to an ID yet. Optionally include replies. Cursor-paginated. Returns tweets under `data` with `has_next_page` and `next_cursor`. Use `get_twitter_user_tweet_timeline` instead when you already have the numeric ID and want the full profile-order timeline with parent-tweet expansion.",
  "provider": "twitter",
  "method": "GET",
  "path": "/apis/v1/twitter/user/last_tweets",
  "arguments_schema": {
    "type": "object",
    "properties": {
      "userId": {
        "type": "string",
        "description": "User ID of the user"
      },
      "userName": {
        "type": "string",
        "description": "Screen name of the user"
      },
      "cursor": {
        "type": "string",
        "description": "Cursor for pagination"
      },
      "includeReplies": {
        "type": "boolean",
        "default": false,
        "description": "Include replies in the results"
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
    "twitter-api"
  ]
}
```
