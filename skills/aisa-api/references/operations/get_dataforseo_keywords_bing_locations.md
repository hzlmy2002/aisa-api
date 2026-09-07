# get_dataforseo_keywords_bing_locations

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "get_dataforseo_keywords_bing_locations",
  "successful": true,
  "description": "The locations the Bing keyword endpoints accept, as `location_code`, `location_name`, `location_code_parent`, `country_iso_code` and `location_type`. 🔴 **Measured at 6.1 MB.** Smaller than the Google-side catalogues in this provider, which run past 40 MB, but still far too large for a tool result. `location_code` 2840 is the United States; look other codes up in DataForSEO's documentation rather than fetching this.",
  "provider": "dataforseo",
  "method": "GET",
  "path": "/apis/v1/dataforseo/keywords_data/bing/locations",
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
