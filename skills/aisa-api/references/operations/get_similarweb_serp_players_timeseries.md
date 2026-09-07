# get_similarweb_serp_players_timeseries

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "get_similarweb_serp_players_timeseries",
  "successful": true,
  "description": "SERP Players - Clicks over time. Response follows the SimilarWeb v5 envelope (meta + data).",
  "provider": "similarweb",
  "method": "GET",
  "path": "/apis/v1/similarweb/search/serp-players-timeseries",
  "arguments_schema": {
    "type": "object",
    "properties": {
      "keyword": {
        "type": "string",
        "description": "Target keyword."
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
        "description": "Time granularity. Allowed: monthly."
      },
      "limit": {
        "maximum": 20,
        "type": "integer",
        "default": 20,
        "description": "Number of rows to return; max 20, billed as 20 if exceeded."
      },
      "country": {
        "enum": [
          "us",
          "ww"
        ],
        "type": "string",
        "default": "ww",
        "description": "Two-letter country code. Allowed: us, ww. Default: ww. Coverage is limited to ww and us on the current plan."
      },
      "offset": {
        "type": "integer",
        "description": "Row offset for pagination."
      }
    },
    "required": [
      "keyword",
      "start_date",
      "end_date",
      "limit"
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
