# get_dataforseo_domains_whois_available_filters

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "get_dataforseo_domains_whois_available_filters",
  "successful": true,
  "description": "The filterable fields for `post_dataforseo_domains_whois_overview_live`, under an `overview` key: `domain`, `created_datetime`, `changed_datetime`, `expiration_datetime`, `updated_datetime`, `first_seen`, `epp_status_codes`, `tld`, `registered` and `registrar`, alongside the nested metrics fields. Measured at 1.9 KB. Free: upstream cost is 0. Worth reading first here more than anywhere else in this family, because the endpoint it filters is the expensive one. The technology equivalent is `get_dataforseo_domains_tech_available_filters`.",
  "provider": "dataforseo",
  "method": "GET",
  "path": "/apis/v1/dataforseo/domain_analytics/whois/available_filters",
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
