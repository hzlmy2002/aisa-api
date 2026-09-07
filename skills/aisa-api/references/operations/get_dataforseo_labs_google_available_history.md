# get_dataforseo_labs_google_available_history

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "get_dataforseo_labs_google_available_history",
  "successful": true,
  "description": "The dates for which historical Labs data exists, as a `date` list. Measured at 2.0 KB. Free: upstream cost is 0. **Read it before calling any historical endpoint** - `post_dataforseo_labs_google_historical_rank_live` and its siblings return nothing rather than an error for a date outside this range.",
  "provider": "dataforseo",
  "method": "GET",
  "path": "/apis/v1/dataforseo/dataforseo_labs/google/available_history",
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
