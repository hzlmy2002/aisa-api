# get_apollo_organizations_enrich

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "get_apollo_organizations_enrich",
  "successful": true,
  "description": "Enrich one company by domain. `domain` is the only parameter and it must be the bare domain (apple.com), not a full URL. Returns an `organization` object with `id`, `name`, `website_url`, `linkedin_url`, `twitter_url`, `facebook_url`, `angellist_url`, `phone`, `founded_year`, `alexa_ranking`, `publicly_traded_symbol`, `publicly_traded_exchange` and `languages`. Use it as the entry point when all you have is a domain. For several domains at once use `post_apollo_organizations_bulk_enrich`; for the full record including funding and technology detail use `get_apollo_organizations_id`, which needs the Apollo organization id this call returns.",
  "provider": "apollo",
  "method": "GET",
  "path": "/apis/v1/apollo/organizations/enrich",
  "arguments_schema": {
    "type": "object",
    "properties": {
      "domain": {
        "type": "string",
        "description": "The domain of the company that you want to enrich. Do not include www., the @ symbol, or similar. Example: apollo.io or microsoft.com"
      }
    },
    "required": [
      "domain"
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
