# patch_apollo_opportunities_opportunity_id

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "patch_apollo_opportunities_opportunity_id",
  "successful": true,
  "description": "Update one deal by its Apollo id — amount, close date, stage or owner. Send only what changes. Moving a deal to a closed stage is what marks it won or lost, since `is_won` and `is_closed` come from the stage rather than being set directly. Writes land in the AIsa workspace, which every caller shares: the record becomes visible and editable by others, and there is no per-caller isolation.",
  "provider": "apollo",
  "method": "PATCH",
  "path": "/apis/v1/apollo/opportunities/{opportunity_id}",
  "arguments_schema": {
    "type": "object",
    "properties": {
      "opportunity_id": {
        "type": "string",
        "description": "Opportunity ID"
      },
      "owner_id": {
        "type": "string",
        "description": "Owner ID"
      },
      "name": {
        "type": "string",
        "description": "Opportunity name"
      },
      "amount": {
        "type": "number",
        "description": "Amount"
      },
      "opportunity_stage_id": {
        "type": "string",
        "description": "Stage ID"
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
      "opportunity_id"
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
