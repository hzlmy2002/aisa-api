# get_dataforseo_domains_tech_languages

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "get_dataforseo_domains_tech_languages",
  "successful": true,
  "description": "The languages the technology endpoints accept, as `language_name` and `language_code`. 127 rows, measured at 6.8 KB. Free: upstream cost is 0. Reference data - fetch once and reuse. Note this is not the same catalogue as the content family's 71 languages, so a code valid there is not guaranteed here. The location equivalent is `get_dataforseo_domains_tech_locations`.",
  "provider": "dataforseo",
  "method": "GET",
  "path": "/apis/v1/dataforseo/domain_analytics/technologies/languages",
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
