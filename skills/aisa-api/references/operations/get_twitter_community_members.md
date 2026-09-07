# get_twitter_community_members

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "get_twitter_community_members",
  "successful": true,
  "description": "List the members of an X Community, cursor-paginated. Use this to map who participates in a topic-specific group — usually a higher-signal audience than general followers, because membership is opt-in. Returns full user objects. For the subset who moderate it, use `get_twitter_community_moderators`.",
  "provider": "twitter",
  "method": "GET",
  "path": "/apis/v1/twitter/community/members",
  "arguments_schema": {
    "type": "object",
    "properties": {
      "community_id": {
        "type": "string",
        "description": "ID of the community"
      },
      "cursor": {
        "type": "string",
        "description": "Cursor for pagination"
      }
    },
    "required": [
      "community_id"
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
