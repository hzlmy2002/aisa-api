# get_apollo_contacts_contact_id

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "get_apollo_contacts_contact_id",
  "successful": true,
  "description": "One saved contact by its Apollo id, with the full field set including custom fields, owner and stage. Find the id with `post_apollo_contacts_search`. Reads the shared workspace, not Apollo's global database.",
  "provider": "apollo",
  "method": "GET",
  "path": "/apis/v1/apollo/contacts/{contact_id}",
  "arguments_schema": {
    "type": "object",
    "properties": {
      "contact_id": {
        "type": "string",
        "description": "Contact ID"
      }
    },
    "required": [
      "contact_id"
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
