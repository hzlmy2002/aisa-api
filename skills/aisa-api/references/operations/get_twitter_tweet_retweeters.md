# get_twitter_tweet_retweeters

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "get_twitter_tweet_retweeters",
  "successful": true,
  "description": "List the accounts that retweeted a given tweet, cursor-paginated. Use this to map who amplified a message and how influential they are. Returns user objects (handle, name, bio, follower count, verification) — not tweets. For retweets that added commentary use `get_twitter_tweet_quotes`.",
  "provider": "twitter",
  "method": "GET",
  "path": "/apis/v1/twitter/tweet/retweeters",
  "arguments_schema": {
    "type": "object",
    "properties": {
      "tweetId": {
        "type": "string",
        "description": "The tweet ID to get retweeters for."
      },
      "cursor": {
        "type": "string",
        "description": "Cursor for pagination."
      }
    },
    "required": [
      "tweetId"
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
