# get_similarweb_ranking

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "get_similarweb_ranking",
  "successful": true,
  "description": "Website Ranking. Response follows the SimilarWeb v5 envelope (meta + data). Date constraint: the start_date-end_date span must cover between 1 and 120 monthly buckets.",
  "provider": "similarweb",
  "method": "GET",
  "path": "/apis/v1/similarweb/website/ranking",
  "arguments_schema": {
    "type": "object",
    "properties": {
      "domain": {
        "type": "string",
        "description": "Target domain, e.g. example.com."
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
      },
      "web_source": {
        "enum": [
          "desktop",
          "mobile_web",
          "total"
        ],
        "type": "string",
        "description": "Traffic source device split. Allowed: desktop, mobile_web, total."
      },
      "main_domain_only": {
        "type": "boolean",
        "default": true,
        "description": "Restrict to the main domain only (true/false). Default: True."
      }
    },
    "required": [
      "domain",
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
