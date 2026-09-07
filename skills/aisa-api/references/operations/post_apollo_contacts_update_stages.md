# post_apollo_contacts_update_stages

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "post_apollo_contacts_update_stages",
  "successful": true,
  "description": "Move several contacts to a different stage at once. The stage id must come from `get_apollo_contact_stages` — stages are workspace-specific rather than a fixed enum, and an unknown id is rejected. Writes land in the AIsa workspace, which every caller shares: the record becomes visible and editable by others, and there is no per-caller isolation. Stage changes can trigger workspace automations.",
  "provider": "apollo",
  "method": "POST",
  "path": "/apis/v1/apollo/contacts/update_stages",
  "arguments_schema": {
    "type": "object",
    "properties": {
      "contact_ids[]": {
        "type": "string",
        "description": "Contact IDs"
      },
      "contact_stage_id": {
        "type": "string",
        "description": "New contact stage ID"
      }
    },
    "required": [
      "contact_ids[]",
      "contact_stage_id"
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
