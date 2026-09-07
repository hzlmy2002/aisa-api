# post_apollo_opportunities

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "post_apollo_opportunities",
  "successful": true,
  "description": "Create a deal. Stage ids come from `get_apollo_opportunity_stages`, and the account it belongs to comes from `post_apollo_accounts_search`. Writes land in the AIsa workspace, which every caller shares: the record becomes visible and editable by others, and there is no per-caller isolation. Deals feed the workspace's forecast, so a test record distorts numbers other people read.",
  "provider": "apollo",
  "method": "POST",
  "path": "/apis/v1/apollo/opportunities",
  "arguments_schema": {
    "type": "object",
    "properties": {
      "name": {
        "type": "string",
        "description": "Deal name"
      },
      "owner_id": {
        "type": "string",
        "description": "Owner ID"
      },
      "account_id": {
        "type": "string",
        "description": "Account ID"
      },
      "amount": {
        "type": "number",
        "description": "Deal amount"
      },
      "opportunity_stage_id": {
        "type": "string",
        "description": "Deal stage ID"
      },
      "closed_date": {
        "type": "string",
        "description": "Closed date (date string)"
      },
      "typed_custom_fields": {
        "type": "object",
        "description": "Typed custom fields object"
      }
    },
    "required": [
      "name"
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
