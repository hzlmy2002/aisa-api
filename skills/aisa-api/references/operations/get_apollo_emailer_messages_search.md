# get_apollo_emailer_messages_search

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "get_apollo_emailer_messages_search",
  "successful": true,
  "description": "Search individual outreach emails already sent or scheduled from this workspace. Returns `emailer_messages` alongside `emailer_steps`, which say where in a sequence each message sits. Use it to see what actually went out. For per-message engagement — opens, clicks, replies — use `get_apollo_emailer_messages_id_activities`.",
  "provider": "apollo",
  "method": "GET",
  "path": "/apis/v1/apollo/emailer_messages/search",
  "arguments_schema": {
    "type": "object",
    "properties": {
      "emailer_message_stats[]": {
        "type": "array",
        "items": {
          "type": "string"
        },
        "description": "Filter by message stats (e.g., open, click)."
      },
      "emailer_message_reply_classes[]": {
        "type": "array",
        "items": {
          "type": "string"
        },
        "description": "Filter by reply classes."
      },
      "user_ids[]": {
        "type": "array",
        "items": {
          "type": "string"
        },
        "description": "Filter by user IDs."
      },
      "email_account_id_and_aliases": {
        "type": "string",
        "description": "Filter by email account and aliases."
      },
      "emailer_campaign_ids[]": {
        "type": "array",
        "items": {
          "type": "string"
        },
        "description": "Only include these sequence IDs."
      },
      "not_emailer_campaign_ids[]": {
        "type": "array",
        "items": {
          "type": "string"
        },
        "description": "Exclude these sequence IDs."
      },
      "page": {
        "type": "integer",
        "description": "Page number."
      },
      "per_page": {
        "type": "integer",
        "description": "Results per page."
      }
    },
    "required": []
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
