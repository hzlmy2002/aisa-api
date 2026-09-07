# get_dataforseo_domains_tech_list

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "get_dataforseo_domains_tech_list",
  "successful": true,
  "description": "The full technology taxonomy as a tree: `groups`, each with `id`, `title` and `categories`, and each category with its technologies. These are the values `groups`, `categories` and `technologies` accept on the search endpoints. 🔴 **Measured at 130 KB, and it takes no limit or filter parameter** - by far the largest response here and a serious bite out of an agent's context. Fetch it once and keep the branch you need. Free: upstream cost is 0.",
  "provider": "dataforseo",
  "method": "GET",
  "path": "/apis/v1/dataforseo/domain_analytics/technologies/technologies",
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
