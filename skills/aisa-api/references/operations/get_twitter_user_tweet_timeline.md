# get_twitter_user_tweet_timeline

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "get_twitter_user_tweet_timeline",
  "successful": true,
  "description": "Retrieve a user's own tweets by numeric `userId`, newest first, matching the order shown on their profile in the X app. Up to 20 tweets per page; pass the returned cursor for more. Optionally include replies and the parent tweet of each reply. Use this to read what an account publishes over time. Time-range filtering is NOT supported here — if you need tweets within a specific time window, use `get_twitter_user_mentions` (which accepts `sinceTime`/`untilTime`) or `get_twitter_tweet_advanced_search` with date operators in the query. If you only have a @handle, `get_twitter_user_last_tweets` accepts either handle or ID.",
  "provider": "twitter",
  "method": "GET",
  "path": "/apis/v1/twitter/user/tweet_timeline",
  "arguments_schema": {
    "type": "object",
    "properties": {
      "userId": {
        "type": "string",
        "description": "User ID of the user whose timeline to retrieve."
      },
      "includeReplies": {
        "type": "boolean",
        "default": false,
        "description": "Whether to include replies in the results. Defaults to false."
      },
      "includeParentTweet": {
        "type": "boolean",
        "default": false,
        "description": "Whether to include the parent tweet when a tweet is a reply. Defaults to false."
      },
      "cursor": {
        "type": "string",
        "description": "Cursor for paginating through results. Leave empty for the first page."
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
