# get_dataforseo_labs_status

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "get_dataforseo_labs_status",
  "successful": true,
  "description": "How current Labs' data is, per marketplace: `google`, `bing` and `amazon`. Measured at 496 bytes, the smallest response in this family. Free: upstream cost is 0. Worth a call before a decision that rests on freshness - every other number in this family is only as current as this says.",
  "provider": "dataforseo",
  "method": "GET",
  "path": "/apis/v1/dataforseo/dataforseo_labs/status",
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
    "seo-labs"
  ]
}
```
