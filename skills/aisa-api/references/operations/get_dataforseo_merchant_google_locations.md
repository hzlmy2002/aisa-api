# get_dataforseo_merchant_google_locations

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "get_dataforseo_merchant_google_locations",
  "successful": true,
  "description": "The locations the Google Shopping endpoints accept. 🔴 **Measured at 43 MB - the largest response found anywhere in this provider by two orders of magnitude.** Do not call this from an agent. `location_code` 2840 is the United States; look other codes up in DataForSEO's documentation. Free upstream, so no billing signal warns you before it lands.",
  "provider": "dataforseo",
  "method": "GET",
  "path": "/apis/v1/dataforseo/merchant/google/locations",
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
    "seo-merchant"
  ]
}
```
