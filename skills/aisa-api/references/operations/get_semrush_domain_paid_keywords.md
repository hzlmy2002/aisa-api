# get_semrush_domain_paid_keywords

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "get_semrush_domain_paid_keywords",
  "successful": true,
  "description": "Keywords a domain bids on in Google Ads (position, volume, CPC, URL). Billed per returned data row at $0.18 per row (up to 20 rows; header row excluded); 4xx/5xx are not charged. Response is semicolon-delimited text.",
  "provider": "semrush",
  "method": "GET",
  "path": "/apis/v1/semrush/domain-paid-keywords",
  "arguments_schema": {
    "type": "object",
    "properties": {
      "domain": {
        "type": "string",
        "example": "ahrefs.com",
        "description": "Target domain, e.g. `ahrefs.com`."
      },
      "database": {
        "type": "string",
        "example": "us",
        "description": "Regional database / country code, e.g. `us`."
      }
    },
    "required": [
      "domain",
      "database"
    ]
  },
  "response_schema": {
    "type": "object",
    "additionalProperties": true,
    "x-fastmcp-wrap-result": true
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
