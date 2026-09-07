# get_dataforseo_serp_yahoo_locations

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "get_dataforseo_serp_yahoo_locations",
  "successful": true,
  "description": "The locations the Yahoo SERP endpoints accept, as `location_code`, `location_name`, `location_code_parent`, `country_iso_code` and `location_type`. 🔴 **Measured at 42 MB on the YouTube list, and the Google-side catalogues elsewhere in this provider run 40-46 MB** - every city and region on earth. Do not call this from an agent: `location_code` 2840 is the United States, and other codes belong in DataForSEO's documentation. Free upstream, so nothing bills and nothing warns before it lands.",
  "provider": "dataforseo",
  "method": "GET",
  "path": "/apis/v1/dataforseo/serp/yahoo/locations",
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
    "seo-serp-other-engines"
  ]
}
```
