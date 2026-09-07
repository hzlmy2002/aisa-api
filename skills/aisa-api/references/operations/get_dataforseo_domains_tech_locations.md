# get_dataforseo_domains_tech_locations

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "get_dataforseo_domains_tech_locations",
  "successful": true,
  "description": "The locations the technology endpoints accept, as `location_name` and `country_iso_code`. 217 rows, measured at 29.6 KB - larger than it looks for reference data, so fetch once and reuse rather than calling it per request. Free: upstream cost is 0. Note this list is not the same length as the content family's 235 locations; the two are separate catalogues and a name valid in one is not guaranteed in the other. The language equivalent is `get_dataforseo_domains_tech_languages`.",
  "provider": "dataforseo",
  "method": "GET",
  "path": "/apis/v1/dataforseo/domain_analytics/technologies/locations",
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
    "seo-domains"
  ]
}
```
