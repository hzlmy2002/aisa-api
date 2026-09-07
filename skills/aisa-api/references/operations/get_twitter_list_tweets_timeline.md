# get_twitter_list_tweets_timeline

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "get_twitter_list_tweets_timeline",
  "successful": true,
  "description": "Get the tweet timeline of an X List by `listId`, up to 20 per page, cursor-paginated. Use this to monitor a hand-curated set of accounts as a single feed — Lists are the cheapest way to track a fixed cohort (competitors, analysts, a beat) without polling each account. Returns tweets with `has_next_page` and `next_cursor`. To see who is in the List use `get_twitter_list_members`.",
  "provider": "twitter",
  "method": "GET",
  "path": "/apis/v1/twitter/list/tweets_timeline",
  "arguments_schema": {
    "type": "object",
    "properties": {
      "listId": {
        "type": "string",
        "description": "The list ID to get tweets from. e.g. 1846987139428634858"
      },
      "cursor": {
        "type": "string",
        "description": "Cursor for paginating through results. Leave empty for the first page."
      }
    },
    "required": [
      "listId"
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
