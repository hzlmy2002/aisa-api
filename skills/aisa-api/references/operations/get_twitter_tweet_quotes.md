# get_twitter_tweet_quotes

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "get_twitter_tweet_quotes",
  "successful": true,
  "description": "Get quote tweets of a given tweet — posts that embedded it with added commentary — cursor-paginated. Use this to see how a post is being reframed or argued about, which is often more revealing than plain replies. Returns full tweet objects with engagement counts. For direct replies use `get_twitter_tweet_replies_v2`; for accounts that amplified it without comment use `get_twitter_tweet_retweeters`.",
  "provider": "twitter",
  "method": "GET",
  "path": "/apis/v1/twitter/tweet/quotes",
  "arguments_schema": {
    "type": "object",
    "properties": {
      "tweetId": {
        "type": "string",
        "description": "The tweet ID to get quotes for."
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
