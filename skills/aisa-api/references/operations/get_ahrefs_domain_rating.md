# get_ahrefs_domain_rating

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "get_ahrefs_domain_rating",
  "successful": true,
  "description": "Return the Ahrefs Domain Rating (0-100 authority score) and Ahrefs Rank for a target domain on a given date. Billed $0.02 per successful call; 4xx/5xx are not charged.",
  "provider": "ahrefs",
  "method": "GET",
  "path": "/apis/v1/ahrefs/site-explorer/domain-rating",
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
