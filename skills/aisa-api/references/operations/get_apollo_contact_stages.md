# get_apollo_contact_stages

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "get_apollo_contact_stages",
  "successful": true,
  "description": "The contact stages configured in this workspace, as a `contact_stages` array of `id`, `name`, `display_name`, `display_order`, `category` and `is_meeting_set`. Takes no parameters. Call it before setting a contact's stage: `post_apollo_contacts_update_stages` expects a stage id from this list, and the set is workspace-specific.",
  "provider": "apollo",
  "method": "GET",
  "path": "/apis/v1/apollo/contact_stages",
  "arguments_schema": {
    "type": "object",
    "properties": {},
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
