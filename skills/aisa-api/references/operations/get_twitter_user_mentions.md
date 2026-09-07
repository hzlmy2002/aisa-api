# get_twitter_user_mentions

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "get_twitter_user_mentions",
  "successful": true,
  "description": "Get tweets that mention a given @handle, 20 per page. This is the only user-scoped X endpoint that supports a time window: pass `sinceTime` and/or `untilTime` as Unix timestamps in seconds to bound the range. Use this for monitoring — brand mentions, inbound replies, reputation tracking, or 'what happened to this account in the last 24 hours'. Returns tweets with `has_next_page` and `next_cursor`. For the account's own posts rather than mentions of it, use `get_twitter_user_tweet_timeline`.",
  "provider": "twitter",
  "method": "GET",
  "path": "/apis/v1/twitter/user/mentions",
  "arguments_schema": {
    "type": "object",
    "properties": {
      "userName": {
        "type": "string",
        "description": "The user screen name to get mentions for."
      },
      "sinceTime": {
        "type": "integer",
        "format": "int64",
        "description": "On or after a specified unix timestamp in seconds."
      },
      "untilTime": {
        "type": "integer",
        "format": "int64",
        "description": "Before a specified unix timestamp in seconds."
      },
      "cursor": {
        "type": "string",
        "description": "The cursor to paginate through the results. First page is empty."
      }
    },
    "required": [
      "userName"
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
