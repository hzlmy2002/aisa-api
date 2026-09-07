# get_apollo_accounts_id

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "get_apollo_accounts_id",
  "successful": true,
  "description": "One saved account by its Apollo id, with its full field set including custom fields and owner. Find the id with `post_apollo_accounts_search`. This reads the shared AIsa workspace, not Apollo's global database — for a company you have not saved, use `get_apollo_organizations_enrich`.",
  "provider": "apollo",
  "method": "GET",
  "path": "/apis/v1/apollo/accounts/{id}",
  "arguments_schema": {
    "type": "object",
    "properties": {
      "id": {
        "type": "string",
        "description": "Account ID"
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
