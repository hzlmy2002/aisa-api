# get_twitter_community_tweets_all

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "get_twitter_community_tweets_all",
  "successful": true,
  "description": "Search posts across all X Communities by keyword, sorted by Latest (default) or Top, cursor-paginated. Use this to find topic-specific discussion happening inside communities rather than on the public timeline — signal density is usually higher and noise lower. Returns full tweet objects. Once you identify a community worth following, use `get_twitter_community_tweets` to read it directly, or `get_twitter_community_info` for its metadata. For public-timeline search use `get_twitter_tweet_advanced_search`.",
  "provider": "twitter",
  "method": "GET",
  "path": "/apis/v1/twitter/community/get_tweets_from_all_community",
  "arguments_schema": {
    "type": "object",
    "properties": {
      "query": {
        "type": "string",
        "description": "Search query (e.g., keyword)"
      },
      "queryType": {
        "enum": [
          "Latest",
          "Top"
        ],
        "type": "string",
        "default": "Latest",
        "description": "Query type (Latest or Top)"
      },
      "cursor": {
        "type": "string",
        "description": "Cursor for pagination"
      }
    },
    "required": [
      "query",
      "queryType"
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
