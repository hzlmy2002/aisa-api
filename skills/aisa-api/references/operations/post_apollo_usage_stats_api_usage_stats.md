# post_apollo_usage_stats_api_usage_stats

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "post_apollo_usage_stats_api_usage_stats",
  "successful": true,
  "description": "Current API usage and rate-limit state for the Apollo key in use: consumption per window and how much headroom is left. Despite being a POST this reads rather than writes. ⚠️ The limits are the AIsa account's, shared across all callers — one caller exhausting a window affects everyone. Check it when calls start failing on rate limits rather than on their arguments.",
  "provider": "apollo",
  "method": "POST",
  "path": "/apis/v1/apollo/usage_stats/api_usage_stats",
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
    "apollo"
  ]
}
```
