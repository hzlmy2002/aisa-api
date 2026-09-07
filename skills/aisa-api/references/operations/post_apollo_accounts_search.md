# post_apollo_accounts_search

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "post_apollo_accounts_search",
  "successful": true,
  "description": "Search accounts — the companies saved in this Apollo workspace, as opposed to Apollo's global database. Filter by name, owner, stage and custom fields; page with `page` and `per_page`. Returns `accounts` and `pagination`, plus `breadcrumbs` echoing the filters applied. ⚠️ This workspace is shared by every AIsa caller, so results include records other callers created. To search Apollo's global company database instead, use `post_apollo_mixed_companies_search`.",
  "provider": "apollo",
  "method": "POST",
  "path": "/apis/v1/apollo/accounts/search",
  "arguments_schema": {
    "type": "object",
    "properties": {
      "q_organization_name": {
        "type": "string",
        "description": "Organization name query"
      },
      "account_stage_ids": {
        "type": "string",
        "description": "Filter by account stage IDs"
      },
      "account_label_ids": {
        "type": "string",
        "description": "Filter by account label IDs"
      },
      "sort_by_field": {
        "type": "string",
        "description": "Sort field (e.g. account_last_activity_date, account_created_at, account_updated_at)"
      },
      "sort_ascending": {
        "type": "boolean",
        "description": "Sort ascending"
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
