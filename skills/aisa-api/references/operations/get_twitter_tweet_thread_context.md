# get_twitter_tweet_thread_context

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "get_twitter_tweet_thread_context",
  "successful": true,
  "description": "Reconstruct the conversation around a tweet. Accepts either a reply or an original tweet and returns the surrounding thread, cursor-paginated. Use this when a tweet lacks context on its own and you need the parent chain to interpret it correctly. Returns tweets under `tweets` with `has_next_page` and `next_cursor`. For only the replies below a post use `get_twitter_tweet_replies_v2`.",
  "provider": "twitter",
  "method": "GET",
  "path": "/apis/v1/twitter/tweet/thread_context",
  "arguments_schema": {
    "type": "object",
    "properties": {
      "tweetId": {
        "type": "string",
        "description": "The tweet ID to get. Can be a reply tweet or an original tweet."
      },
      "cursor": {
        "type": "string",
        "description": "The cursor to paginate through the results. First page is empty."
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
