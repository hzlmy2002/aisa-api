# get_pinterest_search

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "get_pinterest_search",
  "successful": true,
  "description": "Searches Pinterest for pins matching a keyword and returns pins plus a cursor to page. Each pin carries id, url, title, description, grid_title, created_at, images in five sizes (170x, 236x, 474x, 736x, orig), link, domain, board (name, url, pin_count) and pinner (username). Measured at about 110 KB for 17 pins; trim=true cuts that to 28 KB and keeps six fields per pin — id, url, description, created_at, images and pinner — dropping title, link, board and domain, so only skip trim when you need those. The board.url on each result feeds get_pinterest_board; for one pin's engagement counts use get_pinterest_pin.",
  "provider": "pinterest",
  "method": "GET",
  "path": "/apis/v1/pinterest/search",
  "arguments_schema": {
    "type": "object",
    "properties": {
      "query": {
        "type": "string",
        "example": "Italian Pot Roast",
        "description": "Search query"
      },
      "cursor": {
        "type": "string",
        "example": "Y2JVSG81V2sxcmNHRlpWM1J...",
        "description": "Cursor"
      },
      "trim": {
        "type": "boolean",
        "example": "false",
        "description": "Set to true for a trimmed down version of the response"
      }
    },
    "required": [
      "query"
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
