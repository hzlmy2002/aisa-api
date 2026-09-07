# get_twitter_list_members

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "get_twitter_list_members",
  "successful": true,
  "description": "List the accounts included in an X List, 20 per page, cursor-paginated. Use this to extract a ready-made, human-curated cohort — someone else has already done the filtering. Returns full user objects under `members`. To read what those accounts are posting as one feed, use `get_twitter_list_tweets_timeline`. For the List's subscribers use `get_twitter_list_followers`.",
  "provider": "twitter",
  "method": "GET",
  "path": "/apis/v1/twitter/list/members",
  "arguments_schema": {
    "type": "object",
    "properties": {
      "list_id": {
        "type": "string",
        "description": "ID of the list"
      },
      "cursor": {
        "type": "string",
        "description": "Cursor of the page"
      }
    },
    "required": [
      "list_id"
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
