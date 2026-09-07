# get_pinterest_user_boards

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "get_pinterest_user_boards",
  "successful": true,
  "description": "Lists a user's public boards by username, with a cursor to page. Each board carries id, name, url, description, pin_count, follower_count, section_count, collaborator_count, privacy, owner, created_at, cover_pin and cover_images. Measured at 59 KB for 10 boards; trim=true collapses it to 3.3 KB — the largest trim ratio in this API — keeping id, name, url, description, pin_count, follower_count, created_at and image_cover_hd_url. The handle is the bare username as it appears in a profile URL (agkelsey, not a full URL). Feed each board's url to get_pinterest_board to read its pins; to search across all of Pinterest use get_pinterest_search.",
  "provider": "pinterest",
  "method": "GET",
  "path": "/apis/v1/pinterest/user/boards",
  "arguments_schema": {
    "type": "object",
    "properties": {
      "handle": {
        "type": "string",
        "example": "broadstbullycom",
        "description": "The username of the user to get boards for. (e.g. broadstbullycom from https://www.pinterest.com/broadstbullycom/)"
      },
      "trim": {
        "type": "boolean",
        "example": "false",
        "description": "Set to true for a trimmed down version of the response"
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
    "pinterest"
  ]
}
```
