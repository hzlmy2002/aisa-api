# get_twitter_user_search

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "get_twitter_user_search",
  "successful": true,
  "description": "Search X user accounts by keyword and get back matching profiles. Use this when you know roughly who you are looking for — a company name, a topic, a partial handle — but not the exact @handle. Cursor-paginated; returns full user objects under `users`. This searches accounts, not posts; to search tweet content use `get_twitter_tweet_advanced_search`.",
  "provider": "twitter",
  "method": "GET",
  "path": "/apis/v1/twitter/user/search",
  "arguments_schema": {
    "type": "object",
    "properties": {
      "query": {
        "type": "string",
        "description": "The keyword to search."
      },
      "cursor": {
        "type": "string",
        "description": "The cursor to paginate through the results. First page is empty."
      }
    },
    "required": [
      "query"
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
