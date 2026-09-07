# get_instagram_user_embed

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "get_instagram_user_embed",
  "successful": true,
  "description": "Returns Instagram's official profile embed widget for a handle as a single html string, ready to drop into a web page. Measured at about 206 KB, nearly all of it inlined markup and styling, so treat the result as something to store or render rather than something to read. It carries no structured profile data at all: for follower counts, biography or bio links use get_instagram_basic_profile when the numeric id is known, or get_instagram_profile when only the handle is.",
  "provider": "instagram",
  "method": "GET",
  "path": "/apis/v1/instagram/user/embed",
  "arguments_schema": {
    "type": "object",
    "properties": {
      "handle": {
        "type": "string",
        "example": "jane",
        "description": "Instagram handle"
      }
    },
    "required": [
      "handle"
    ]
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
    "instagram"
  ]
}
```
