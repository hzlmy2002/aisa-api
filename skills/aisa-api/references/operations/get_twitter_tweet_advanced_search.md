# get_twitter_tweet_advanced_search

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "get_twitter_tweet_advanced_search",
  "successful": true,
  "description": "Search X posts by keyword or query with X's advanced search operators, sorted by Latest (default) or Top. This is the primary entry point for X content research when you do not yet have tweet IDs or handles. Supports operators in the query string such as `from:`, `to:`, `since:`, `until:`, `min_faves:`, and `-filter:replies`. Cursor-paginated; returns tweets with `has_next_page` and `next_cursor`. To search accounts rather than posts use `get_twitter_user_search`. To read one account's own posts use `get_twitter_user_tweet_timeline`.",
  "provider": "twitter",
  "method": "GET",
  "path": "/apis/v1/twitter/tweet/advanced_search",
  "arguments_schema": {
    "type": "object",
    "properties": {
      "query": {
        "type": "string",
        "description": "The query to search for."
      },
      "queryType": {
        "enum": [
          "Latest",
          "Top"
        ],
        "type": "string",
        "default": "Latest",
        "description": "The query type to search for."
      },
      "cursor": {
        "type": "string",
        "description": "The cursor to paginate through the results. First page is empty."
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
    "twitter-api",
    "stock-pulse"
  ]
}
```
