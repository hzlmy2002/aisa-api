# post_apollo_emailer_campaigns_search

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "post_apollo_emailer_campaigns_search",
  "successful": true,
  "description": "Search email sequences in this workspace. Returns `emailer_campaigns` with `pagination` and `breadcrumbs`. Use it to find a sequence id before adding contacts to it or changing its state. ⚠️ Sequences here are shared: activating or archiving one affects every AIsa caller, and a live sequence sends real email from the workspace's connected accounts.",
  "provider": "apollo",
  "method": "POST",
  "path": "/apis/v1/apollo/emailer_campaigns/search",
  "arguments_schema": {
    "type": "object",
    "properties": {
      "q_name": {
        "type": "string",
        "description": "Keywords to match sequence names."
      },
      "page": {
        "type": "integer",
        "description": "Page number."
      },
      "per_page": {
        "type": "integer",
        "description": "Results per page."
      }
    },
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
