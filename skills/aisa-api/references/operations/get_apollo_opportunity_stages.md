# get_apollo_opportunity_stages

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "get_apollo_opportunity_stages",
  "successful": true,
  "description": "The deal stages configured in this workspace, as an `opportunity_stages` array of `id`, `name`, `display_order`, `probability`, `is_won`, `is_closed`, `forecast_category_cd` and `type`. Takes no parameters. Call it before creating or moving a deal: stage fields expect an id from this list, and `probability` is what turns a stage into a forecast number.",
  "provider": "apollo",
  "method": "GET",
  "path": "/apis/v1/apollo/opportunity_stages",
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
