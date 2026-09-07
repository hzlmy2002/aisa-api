# patch_apollo_accounts_account_id

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "patch_apollo_accounts_account_id",
  "successful": true,
  "description": "Update one account by its Apollo id. Send only the fields you intend to change; anything you omit keeps its current value. Stage fields expect an id from `get_apollo_account_stages`. Writes land in the AIsa workspace, which every caller shares: the record becomes visible and editable by others, and there is no per-caller isolation.",
  "provider": "apollo",
  "method": "PATCH",
  "path": "/apis/v1/apollo/accounts/{account_id}",
  "arguments_schema": {
    "type": "object",
    "properties": {
      "account_id": {
        "type": "string",
        "description": "Account ID"
      },
      "name": {
        "type": "string",
        "description": "Account name"
      },
      "domain": {
        "type": "string",
        "description": "Account domain"
      },
      "owner_id": {
        "type": "string",
        "description": "Owner ID"
      },
      "account_stage_id": {
        "type": "string",
        "description": "Account stage ID"
      },
      "raw_address": {
        "type": "string",
        "description": "Raw address"
      },
      "phone": {
        "type": "string",
        "description": "Phone number"
      },
      "typed_custom_fields": {
        "type": "object",
        "description": "Typed custom fields object"
      }
    },
    "required": [
      "account_id"
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
