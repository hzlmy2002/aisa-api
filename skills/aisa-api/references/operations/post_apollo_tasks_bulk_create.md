# post_apollo_tasks_bulk_create

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "post_apollo_tasks_bulk_create",
  "successful": true,
  "description": "Create several tasks in one call. Partial success is normal; read the response per record. Writes land in the AIsa workspace, which every caller shares: the record becomes visible and editable by others, and there is no per-caller isolation.",
  "provider": "apollo",
  "method": "POST",
  "path": "/apis/v1/apollo/tasks/bulk_create",
  "arguments_schema": {
    "type": "object",
    "properties": {
      "user_id": {
        "type": "string",
        "description": "Task owner user ID."
      },
      "contact_ids": {
        "type": "array",
        "items": {
          "type": "string"
        },
        "description": "Contact IDs."
      },
      "type": {
        "type": "string",
        "description": "Task type."
      },
      "priority": {
        "type": "string",
        "description": "Task priority (default: medium)."
      },
      "status": {
        "type": "string",
        "description": "Task status."
      },
      "due_at": {
        "type": "string",
        "description": "ISO 8601 due datetime."
      },
      "title": {
        "type": "string",
        "description": "Optional title."
      }
    },
    "required": [
      "user_id",
      "contact_ids",
      "type",
      "status",
      "due_at"
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
