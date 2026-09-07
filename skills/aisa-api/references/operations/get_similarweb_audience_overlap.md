# get_similarweb_audience_overlap

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "get_similarweb_audience_overlap",
  "successful": true,
  "description": "Audience Overlap. Response follows the SimilarWeb v5 envelope (meta + data). Note: `data` may arrive grouped as an array of arrays; billing counts rows across all groups.",
  "provider": "similarweb",
  "method": "GET",
  "path": "/apis/v1/similarweb/website/audience-overlap",
  "arguments_schema": {
    "type": "object",
    "properties": {
      "domains": {
        "type": "string",
        "description": "Two to five target domains, comma-separated (e.g. cnn.com,bbc.com)."
      },
      "start_date": {
        "type": "string",
        "description": "Start month, format YYYY-MM."
      },
      "end_date": {
        "type": "string",
        "description": "End month, format YYYY-MM."
      },
      "granularity": {
        "enum": [
          "monthly"
        ],
        "type": "string",
        "default": "monthly",
        "description": "Time granularity. Allowed: monthly. Default: monthly."
      },
      "country": {
        "enum": [
          "us",
          "ww"
        ],
        "type": "string",
        "default": "ww",
        "description": "Two-letter country code. Allowed: us, ww. Default: ww. Coverage is limited to ww and us on the current plan."
      }
    },
    "required": [
      "domains",
      "start_date",
      "end_date"
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
    "similarweb"
  ]
}
```
