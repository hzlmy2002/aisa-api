# get_dataforseo_keywords_gads_status

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "get_dataforseo_keywords_gads_status",
  "successful": true,
  "description": "Whether DataForSEO's Google Ads data is current: `actual_data`, `date_update`, `last_year_in_monthly_searches` and `last_month_in_monthly_searches`. Measured at 1 KB. Free: upstream cost is 0. **Worth checking before a spend decision** - it tells you how stale the `monthly_searches` arrays on every Google Ads response actually are.",
  "provider": "dataforseo",
  "method": "GET",
  "path": "/apis/v1/dataforseo/keywords_data/google_ads/status",
  "arguments_schema": {
    "type": "object",
    "properties": {},
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
    "seo-keywords"
  ]
}
```
