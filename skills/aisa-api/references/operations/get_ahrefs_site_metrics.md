# get_ahrefs_site_metrics

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "get_ahrefs_site_metrics",
  "successful": true,
  "description": "Return core Site Explorer metrics for a target domain on a given date: organic and paid keyword counts, top-3 keyword count, organic traffic, and traffic value. Billed $0.18 per successful call; 4xx/5xx are not charged.",
  "provider": "ahrefs",
  "method": "GET",
  "path": "/apis/v1/ahrefs/site-explorer/metrics",
  "arguments_schema": {
    "type": "object",
    "properties": {
      "target": {
        "type": "string",
        "description": "Target domain, e.g. `ahrefs.com`."
      },
      "date": {
        "type": "string",
        "format": "date",
        "example": "2026-08-01",
        "description": "Snapshot date in `YYYY-MM-DD` format."
      }
    },
    "required": [
      "target",
      "date"
    ]
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
    "seo-labs"
  ]
}
```
