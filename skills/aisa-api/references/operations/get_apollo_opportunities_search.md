# get_apollo_opportunities_search

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "get_apollo_opportunities_search",
  "successful": true,
  "description": "Search deals in this workspace. Filter by owner, stage, amount and close date; page with `page` and `per_page`. Returns `opportunities` with `id`, `name`, `amount`, `closed_date`, `stage_name`, `opportunity_stage_id`, `account_id`, `owner_id`, `is_closed`, `is_won` and `description`. ⚠️ Shared workspace: results include deals other AIsa callers created.",
  "provider": "apollo",
  "method": "GET",
  "path": "/apis/v1/apollo/opportunities/search",
  "arguments_schema": {
    "type": "object",
    "properties": {
      "sort_by_field": {
        "type": "string",
        "description": "Sort field"
      },
      "page": {
        "type": "integer",
        "description": "Page number"
      },
      "per_page": {
        "type": "integer",
        "description": "Items per page"
      }
    },
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
