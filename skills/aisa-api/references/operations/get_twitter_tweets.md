# get_twitter_tweets

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "get_twitter_tweets",
  "successful": true,
  "description": "Fetch the full content of specific tweets when you already know their numeric tweet IDs (accepts multiple IDs in one call). Use this to expand IDs surfaced by search, timelines, or replies into complete objects. Returns text, author, source client, language, creation time, and engagement counts (likes, retweets, replies, quotes, bookmarks, views). If you do not have IDs yet, start with `get_twitter_tweet_advanced_search`.",
  "provider": "twitter",
  "method": "GET",
  "path": "/apis/v1/twitter/tweets",
  "arguments_schema": {
    "type": "object",
    "properties": {
      "tweet_ids": {
        "type": "array",
        "items": {
          "type": "string"
        },
        "description": "Comma-separated list of tweet IDs."
      }
    },
    "required": [
      "tweet_ids"
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
