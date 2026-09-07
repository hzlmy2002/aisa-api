# post_apollo_tasks_search

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "post_apollo_tasks_search",
  "successful": true,
  "description": "Search tasks in this workspace. Returns `tasks` with `pagination`, `breadcrumbs`, `faceting` and `pipeline_total`. ⚠️ Shared workspace: results include tasks other AIsa callers created.",
  "provider": "apollo",
  "method": "POST",
  "path": "/apis/v1/apollo/tasks/search",
  "arguments_schema": {
    "type": "object",
    "properties": {
      "sort_by_field": {
        "type": "string",
        "description": "Sort field."
      },
      "open_factor_names[]": {
        "type": "array",
        "items": {
          "type": "string"
        },
        "description": "Optional open factors."
      },
      "page": {
        "type": "integer",
        "description": "Page number."
      },
      "per_page": {
        "type": "integer",
        "description": "Results per page."
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
