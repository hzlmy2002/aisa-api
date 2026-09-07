# post_apollo_accounts_bulk_update

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "post_apollo_accounts_bulk_update",
  "successful": true,
  "description": "Update several accounts in one call, each identified by its Apollo id. Partial success is normal; check the response per record. Writes land in the AIsa workspace, which every caller shares: the record becomes visible and editable by others, and there is no per-caller isolation.",
  "provider": "apollo",
  "method": "POST",
  "path": "/apis/v1/apollo/accounts/bulk_update",
  "arguments_schema": {
    "type": "object",
    "properties": {
      "account_ids": {
        "type": "string",
        "description": "IDs of accounts to update"
      },
      "account_attributes": {
        "type": "string",
        "description": "List of account attribute update objects"
      },
      "account_attributes[].name": {
        "type": "string",
        "description": "Account name"
      },
      "account_attributes[].owner_id": {
        "type": "string",
        "description": "Owner ID"
      },
      "account_attributes[].account_stage_id": {
        "type": "string",
        "description": "Account stage ID"
      },
      "async": {
        "type": "boolean",
        "description": "Run asynchronously. Default false."
      }
    },
    "required": [
      "account_ids",
      "account_attributes"
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
