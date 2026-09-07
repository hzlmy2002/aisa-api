# get_dataforseo_keywords_trends_locations

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "get_dataforseo_keywords_trends_locations",
  "successful": true,
  "description": "The locations the Trends endpoints accept, as `location_code`, `location_name`, `location_code_parent`, `country_iso_code`, `location_type`, plus `geo_name` and `geo_id` - the last two are Google's own geo identifiers and appear on no other location list in this provider. Measured at 36.8 KB. Free: upstream cost is 0.",
  "provider": "dataforseo",
  "method": "GET",
  "path": "/apis/v1/dataforseo/keywords_data/dataforseo_trends/locations",
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
