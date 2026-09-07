# get_apollo_typed_custom_fields

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "get_apollo_typed_custom_fields",
  "successful": true,
  "description": "The custom fields defined in this workspace, as a `typed_custom_fields` array of `id`, `name`, `system_name`, `type`, `modality`, `picklist_options` and CRM mapping state. Takes no parameters. Call it before writing a custom field: the field key and, for picklists, the allowed values are workspace-specific, and a wrong value is rejected rather than coerced.",
  "provider": "apollo",
  "method": "GET",
  "path": "/apis/v1/apollo/typed_custom_fields",
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
