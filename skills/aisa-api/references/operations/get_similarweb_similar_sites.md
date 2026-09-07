# get_similarweb_similar_sites

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "get_similarweb_similar_sites",
  "successful": true,
  "description": "SimilarSites. Response follows the SimilarWeb v5 envelope (meta + data). Date window (upstream SimilarWeb constraint): start_date and end_date must span EXACTLY 3 consecutive months — a 1- or 2-month span is rejected with upstream error 120 ('must span exactly 3 month(s)'). That span must also be SimilarWeb's most recent supported window, which advances forward each month; an older or out-of-range span is rejected with error 101 ('Dates not in range'). In practice, request the three most recent completed months (e.g. if the latest published month is 2026-07, use start_date=2026-05 and end_date=2026-07). To read the exact currently-supported range, call SimilarWeb's /describe endpoint for this API.",
  "provider": "similarweb",
  "method": "GET",
  "path": "/apis/v1/similarweb/website/similar-sites",
  "arguments_schema": {
    "type": "object",
    "properties": {
      "domain": {
        "type": "string",
        "description": "Target domain, e.g. example.com."
      },
      "start_date": {
        "type": "string",
        "description": "Start month, format YYYY-MM. Must be exactly 2 months before end_date: the window has to span exactly 3 consecutive months within SimilarWeb's latest supported range (see the endpoint description)."
      },
      "end_date": {
        "type": "string",
        "description": "End month, format YYYY-MM. Together with start_date must span exactly 3 consecutive months, and must be the most recent supported month (the window rolls forward monthly; see the endpoint description)."
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
        "description": "Restrict to the main domain only (true/false)."
      },
      "offset": {
        "type": "integer",
        "description": "Row offset for pagination."
      },
      "traffic_source": {
        "type": "string",
        "description": "Traffic-source filter."
      }
    },
    "required": [
      "domain",
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
