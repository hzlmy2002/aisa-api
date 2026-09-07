# post_apollo_fields

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "post_apollo_fields",
  "successful": true,
  "description": "Create a custom field. ⚠️ This changes the workspace's schema rather than its data: the field appears on every record of that modality, for every caller, and removing it later is not something this API offers. Check `get_apollo_typed_custom_fields` first — the field you want may already exist. Writes land in the AIsa workspace, which every caller shares: the record becomes visible and editable by others, and there is no per-caller isolation.",
  "provider": "apollo",
  "method": "POST",
  "path": "/apis/v1/apollo/fields",
  "arguments_schema": {
    "type": "object",
    "properties": {
      "label": {
        "type": "string",
        "description": "Field label."
      },
      "modality": {
        "type": "string",
        "description": "Entity modality (e.g., contact)."
      },
      "type": {
        "type": "string",
        "description": "Field type (e.g., textarea)."
      },
      "meta": {
        "type": "object",
        "description": "Additional field config."
      }
    },
    "required": []
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
