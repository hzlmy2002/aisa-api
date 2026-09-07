# get_twitter_tweet_replies_v2

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "get_twitter_tweet_replies_v2",
  "successful": true,
  "description": "Get replies to a tweet with control over sort order — Relevance (default), Latest, or Likes — 20 per page, cursor-paginated. Use this instead of `get_twitter_tweet_replies` whenever ordering matters: Likes surfaces the community's top responses, Latest gives a live view of an unfolding thread. Returns full tweet objects with engagement counts.",
  "provider": "twitter",
  "method": "GET",
  "path": "/apis/v1/twitter/tweet/replies/v2",
  "arguments_schema": {
    "type": "object",
    "properties": {
      "tweetId": {
        "type": "string",
        "description": "The tweet ID to get replies for. e.g. 1846987139428634858"
      },
      "cursor": {
        "type": "string",
        "description": "Cursor for paginating through results. Leave empty for the first page."
      },
      "queryType": {
        "enum": [
          "Relevance",
          "Latest",
          "Likes"
        ],
        "type": "string",
        "default": "Relevance",
        "description": "Sort order for replies. Default is Relevance."
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
