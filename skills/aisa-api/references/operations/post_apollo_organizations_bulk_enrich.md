# post_apollo_organizations_bulk_enrich

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "post_apollo_organizations_bulk_enrich",
  "successful": true,
  "description": "Enrich up to 10 companies in one call. Body takes `domains`, an array of bare domains. Returns the enriched organizations alongside `status`, `total_requested_domains`, `unique_domains`, `unique_records` and `unique_enriched_records` — compare the requested and enriched counts rather than assuming every domain resolved. For one domain `get_apollo_organizations_enrich` is a plain GET.",
  "provider": "apollo",
  "method": "POST",
  "path": "/apis/v1/apollo/organizations/bulk_enrich",
  "arguments_schema": {
    "type": "object",
    "properties": {
      "domains[]": {
        "type": "array",
        "items": {
          "type": "string"
        },
        "description": "The domain of each company that you want to enrich. Do not include www., the @ symbol, or similar. Example: apollo.io and microsoft.com"
      }
    },
    "required": [
      "domains[]"
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
    "apollo"
  ]
}
```
