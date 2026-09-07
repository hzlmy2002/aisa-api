# get_twitter_spaces_detail

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "get_twitter_spaces_detail",
  "successful": true,
  "description": "Get details of an X Space (live audio room) by its space ID — title, state, host, participants, and scheduling. Use this to check whether a Space is scheduled, live, or ended, and who is hosting, before deciding to reference or attend it. Returns the object under `data`.",
  "provider": "twitter",
  "method": "GET",
  "path": "/apis/v1/twitter/spaces/detail",
  "arguments_schema": {
    "type": "object",
    "properties": {
      "space_id": {
        "type": "string",
        "description": "The ID of the space."
      }
    },
    "required": [
      "space_id"
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
