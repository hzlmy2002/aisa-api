# get_dataforseo_content_categories

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "get_dataforseo_content_categories",
  "successful": true,
  "description": "The Google product and service category tree used by `post_dataforseo_content_category_trends_live`. Each row carries `category_code`, `category_name` and `category_code_parent`, which is what makes it a tree. 🔴 **Measured at 290 KB and 3,182 rows, and this endpoint takes no limit or filter parameter** - it is the largest response in the content family by two orders of magnitude and will consume a large part of an agent's context. Fetch it once and keep the code you need rather than calling it per request. Free: upstream cost is 0.",
  "provider": "dataforseo",
  "method": "GET",
  "path": "/apis/v1/dataforseo/content_analysis/categories",
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
    "seo-content"
  ]
}
```
