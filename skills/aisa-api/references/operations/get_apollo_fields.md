# get_apollo_fields

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "get_apollo_fields",
  "successful": true,
  "description": "Every field Apollo exposes, standard and custom, as `fields` (roughly 323 entries with `id`, `field_name`, `label`, `type`, `category`, `modality`, `description` and `example`) plus `field_groups` describing how they are organised. Takes no parameters. This is the reference for what can be filtered or written anywhere else in the API. For custom fields alone, `get_apollo_typed_custom_fields` is much smaller.",
  "provider": "apollo",
  "method": "GET",
  "path": "/apis/v1/apollo/fields",
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
