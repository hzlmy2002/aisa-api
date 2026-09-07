# get_apollo_emailer_messages_id_activities

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "get_apollo_emailer_messages_id_activities",
  "successful": true,
  "description": "Engagement events for one sent email: opens, clicks, replies and bounces, with timestamps. Get the message id from `get_apollo_emailer_messages_search`. Use this rather than inferring engagement from the message record itself, which carries delivery state but not recipient behaviour.",
  "provider": "apollo",
  "method": "GET",
  "path": "/apis/v1/apollo/emailer_messages/{id}/activities",
  "arguments_schema": {
    "type": "object",
    "properties": {
      "id": {
        "type": "string",
        "description": "Emailer message ID."
      }
    },
    "required": [
      "id"
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
    "apollo"
  ]
}
```
