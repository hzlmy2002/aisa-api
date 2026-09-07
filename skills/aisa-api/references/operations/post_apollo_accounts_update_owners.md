# post_apollo_accounts_update_owners

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "post_apollo_accounts_update_owners",
  "successful": true,
  "description": "Reassign the owner of several accounts at once. Owner ids come from `get_apollo_users_search`. Writes land in the AIsa workspace, which every caller shares: the record becomes visible and editable by others, and there is no per-caller isolation. Reassignment is visible to whoever owned them before.",
  "provider": "apollo",
  "method": "POST",
  "path": "/apis/v1/apollo/accounts/update_owners",
  "arguments_schema": {
    "type": "object",
    "properties": {
      "account_ids[]": {
        "type": "string",
        "description": "Account IDs"
      },
      "owner_id": {
        "type": "string",
        "description": "New owner ID"
      }
    },
    "required": [
      "account_ids[]",
      "owner_id"
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
