# get_dataforseo_domains_tech_available_filters

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "get_dataforseo_domains_tech_available_filters",
  "successful": true,
  "description": "The filterable fields for each technology endpoint, keyed by endpoint: `domains_by_technology`, `aggregation_technologies`, `technologies_summary` and `domains_by_html_terms`. The first three share `domain_rank`, `last_visited`, `country_iso_code`, `language_code` and `content_language_code`; `domains_by_html_terms` adds `domain`. Measured at 2.1 KB. Free: upstream cost is 0. Read it before building a `filters` argument - an unknown field is rejected, not ignored. The whois equivalent is `get_dataforseo_domains_whois_available_filters`.",
  "provider": "dataforseo",
  "method": "GET",
  "path": "/apis/v1/dataforseo/domain_analytics/technologies/available_filters",
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
