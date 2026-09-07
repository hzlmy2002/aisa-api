# get_apollo_notes

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "get_apollo_notes",
  "successful": true,
  "description": "Notes attached to workspace records. ⚠️ At least one filter is required — calling it bare returns HTTP 400 with \"At least one argument is required\". Pass one of `contact_id`, `account_id`, `opportunity_id`, `calendar_event_id`, `conversation_id`, `conversation_ids`, `contact_ids` or a `start_date`. The spec marks every one of them optional individually, which is true only in the sense that no single one is mandatory.",
  "provider": "apollo",
  "method": "GET",
  "path": "/apis/v1/apollo/notes",
  "arguments_schema": {
    "type": "object",
    "properties": {
      "contact_id": {
        "type": "string",
        "description": "Filter by a contact ID. At least one filter is required on this endpoint; calling it with none returns HTTP 400 \"At least one argument is required\"."
      },
      "account_id": {
        "type": "string",
        "description": "Filter by an account ID. At least one filter is required on this endpoint; calling it with none returns HTTP 400 \"At least one argument is required\"."
      },
      "opportunity_id": {
        "type": "string",
        "description": "Filter by an opportunity ID. At least one filter is required on this endpoint; calling it with none returns HTTP 400 \"At least one argument is required\"."
      },
      "calendar_event_id": {
        "type": "string",
        "description": "Filter by a calendar event ID. At least one filter is required on this endpoint; calling it with none returns HTTP 400 \"At least one argument is required\"."
      },
      "conversation_id": {
        "type": "string",
        "description": "Filter by a conversation ID. At least one filter is required on this endpoint; calling it with none returns HTTP 400 \"At least one argument is required\"."
      },
      "conversation_ids": {
        "type": "array",
        "items": {
          "type": "string"
        },
        "description": "Filter by conversation IDs. At least one filter is required on this endpoint; calling it with none returns HTTP 400 \"At least one argument is required\"."
      },
      "contact_ids": {
        "type": "array",
        "items": {
          "type": "string"
        },
        "description": "Filter by contact IDs. At least one filter is required on this endpoint; calling it with none returns HTTP 400 \"At least one argument is required\"."
      },
      "start_date": {
        "type": "string",
        "description": "Only include notes created on/after this date (when supported). At least one filter is required on this endpoint; calling it with none returns HTTP 400 \"At least one argument is required\"."
      },
      "page": {
        "type": "integer",
        "description": "Page number (when supported). At least one filter is required on this endpoint; calling it with none returns HTTP 400 \"At least one argument is required\"."
      },
      "per_page": {
        "type": "integer",
        "description": "Results per page (when supported). At least one filter is required on this endpoint; calling it with none returns HTTP 400 \"At least one argument is required\"."
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
