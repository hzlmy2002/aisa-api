# get_twitter_list_followers

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "get_twitter_list_followers",
  "successful": true,
  "description": "List the accounts that subscribe to an X List, 20 per page, cursor-paginated. Use this to gauge how much attention a curated list attracts and who cares about that topic. Returns full user objects under `followers`. For the accounts included in the List (not its subscribers) use `get_twitter_list_members`.",
  "provider": "twitter",
  "method": "GET",
  "path": "/apis/v1/twitter/list/followers",
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
