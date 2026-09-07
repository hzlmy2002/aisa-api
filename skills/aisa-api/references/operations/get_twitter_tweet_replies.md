# get_twitter_tweet_replies

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "get_twitter_tweet_replies",
  "successful": true,
  "description": "Get the direct replies to a tweet, cursor-paginated. Use this to read the discussion under a post — sentiment, corrections, or follow-up questions. Returns full tweet objects with engagement counts. Prefer `get_twitter_tweet_replies_v2` when you want to control ordering (Relevance, Latest, or Likes); this v1 endpoint returns the default order only. To follow a conversation upward to its root instead of downward, use `get_twitter_tweet_thread_context`.",
  "provider": "twitter",
  "method": "GET",
  "path": "/apis/v1/twitter/tweet/replies",
  "arguments_schema": {
    "type": "object",
    "properties": {
      "tweetId": {
        "type": "string",
        "description": "The tweet ID to get replies for."
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
