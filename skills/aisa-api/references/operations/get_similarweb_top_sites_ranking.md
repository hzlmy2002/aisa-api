# get_similarweb_top_sites_ranking

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "get_similarweb_top_sites_ranking",
  "successful": true,
  "description": "Top Sites Ranking. Response follows the SimilarWeb v5 envelope (meta + data).",
  "provider": "similarweb",
  "method": "GET",
  "path": "/apis/v1/similarweb/website/top-sites-ranking",
  "arguments_schema": {
    "type": "object",
    "properties": {
      "category": {
        "type": "string",
        "description": "Industry category, e.g. Finance."
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
      "category",
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
