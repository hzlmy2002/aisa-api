# put_apollo_phone_calls_id

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "put_apollo_phone_calls_id",
  "successful": true,
  "description": "Update a logged call by its id — outcome, notes, duration. Send only what changes. Writes land in the AIsa workspace, which every caller shares: the record becomes visible and editable by others, and there is no per-caller isolation.",
  "provider": "apollo",
  "method": "PUT",
  "path": "/apis/v1/apollo/phone_calls/{id}",
  "arguments_schema": {
    "type": "object",
    "properties": {
      "id": {
        "type": "string",
        "description": "Call record ID."
      },
      "logged": {
        "type": "boolean",
        "description": "Whether to create an individual record."
      },
      "user_id[]": {
        "type": "array",
        "items": {
          "type": "string"
        },
        "description": "Caller user IDs."
      },
      "contact_id": {
        "type": "string",
        "description": "Contact ID."
      },
      "account_id": {
        "type": "string",
        "description": "Account ID."
      },
      "to_number": {
        "type": "string",
        "description": "Dialed phone number."
      },
      "from_number": {
        "type": "string",
        "description": "Caller phone number."
      },
      "status": {
        "type": "string",
        "description": "Call status."
      },
      "start_time": {
        "type": "string",
        "description": "ISO 8601 start time."
      },
      "end_time": {
        "type": "string",
        "description": "ISO 8601 end time."
      },
      "duration": {
        "type": "integer",
        "description": "Duration in seconds."
      },
      "phone_call_purpose_id": {
        "type": "string",
        "description": "Purpose ID."
      },
      "phone_call_outcome_id": {
        "type": "string",
        "description": "Outcome ID."
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
  "read_only": false,
  "idempotent": false,
  "side_effects": [
    "writes-upstream"
  ],
  "annotations": {
    "readOnlyHint": false,
    "destructiveHint": true,
    "idempotentHint": false,
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
