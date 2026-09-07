# post_apollo_accounts

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "post_apollo_accounts",
  "successful": true,
  "description": "Create an account — a company saved into this workspace. Duplicate domains are rejected, so search with `post_apollo_accounts_search` before creating. Requires a master API key. Writes land in the AIsa workspace, which every caller shares: the record becomes visible and editable by others, and there is no per-caller isolation. To enrich a company without saving it, use `get_apollo_organizations_enrich`.",
  "provider": "apollo",
  "method": "POST",
  "path": "/apis/v1/apollo/accounts",
  "arguments_schema": {
    "type": "object",
    "properties": {
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
      }
    },
    "required": [
      "name",
      "domain"
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
