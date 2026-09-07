# get_dataforseo_on_page_lighthouse_audits

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "get_dataforseo_on_page_lighthouse_audits",
  "successful": true,
  "description": "The audit identifiers a Lighthouse run can be narrowed to, under an `audits` key. Measured at 5.3 KB. Free: upstream cost is 0. **Read this before running an audit, not after** - passing `audits` to `post_dataforseo_on_page_lighthouse_live_json` is the difference between a 245 KB report and a targeted one.",
  "provider": "dataforseo",
  "method": "GET",
  "path": "/apis/v1/dataforseo/on_page/lighthouse/audits",
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
    "seo-onpage"
  ]
}
```
