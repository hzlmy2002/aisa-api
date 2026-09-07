# get_twitter_trends

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "get_twitter_trends",
  "successful": true,
  "description": "Get the trending topics for a location, identified by its Yahoo WOEID (Where On Earth ID), with an optional `count` (default 30). Use this for a real-time read on what a specific market is talking about right now — useful for timing content or spotting emerging stories. Returns trend names and volumes under `trends`. Once you pick a trend, search its posts with `get_twitter_tweet_advanced_search`.",
  "provider": "twitter",
  "method": "GET",
  "path": "/apis/v1/twitter/trends",
  "arguments_schema": {
    "type": "object",
    "properties": {
      "woeid": {
        "type": "integer",
        "format": "int64",
        "description": "The WOEID of the location. Example: 2418046."
      },
      "count": {
        "minimum": 30,
        "type": "integer",
        "format": "int64",
        "default": 30,
        "description": "The number of trends to return. Default is 30."
      }
    },
    "required": [
      "woeid"
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
