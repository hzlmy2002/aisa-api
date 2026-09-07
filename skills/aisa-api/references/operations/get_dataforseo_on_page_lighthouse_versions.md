# get_dataforseo_on_page_lighthouse_versions

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "get_dataforseo_on_page_lighthouse_versions",
  "successful": true,
  "description": "The Lighthouse versions available, as `availible_versions` with `version` and `default` - note upstream's spelling of that key. Measured at 1.4 KB. Free: upstream cost is 0. Pass one to `version` on the audit endpoints when a run has to be reproducible; otherwise the default moves as Lighthouse releases.",
  "provider": "dataforseo",
  "method": "GET",
  "path": "/apis/v1/dataforseo/on_page/lighthouse/versions",
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
