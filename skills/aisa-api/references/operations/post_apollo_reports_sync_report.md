# post_apollo_reports_sync_report

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "post_apollo_reports_sync_report",
  "successful": true,
  "description": "Run an analytics report and get its rows back. Despite being a POST this reads rather than writes; the method reflects that the query goes in the body. Reports cover the shared workspace, so figures include other callers' activity.",
  "provider": "apollo",
  "method": "POST",
  "path": "/apis/v1/apollo/reports/sync_report",
  "arguments_schema": {
    "type": "object",
    "properties": {
      "metrics": {
        "type": "array",
        "items": {
          "type": "string"
        },
        "description": "Metrics to compute."
      },
      "group_by": {
        "type": "array",
        "items": {
          "type": "string"
        },
        "description": "Dimensions to group by."
      },
      "pivot_group_by": {
        "type": "array",
        "items": {
          "type": "string"
        },
        "description": "Optional pivot dimensions."
      },
      "sorts": {
        "type": "array",
        "items": {
          "type": "string"
        },
        "description": "Sort specs."
      },
      "filters": {
        "type": "string",
        "description": "Filter specs."
      },
      "date_range": {
        "type": "object",
        "description": "Date range filter (when supported)."
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
