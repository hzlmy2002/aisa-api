# get_pinterest_board

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "get_pinterest_board",
  "successful": true,
  "description": "Returns one page of pins from a board URL, with a cursor to page. Board pins carry a third field subset, different from both search results and pin detail: node_id, link, domain, rich_summary, seo_url, board and auto_alt_text among them. Measured at 104 KB for 16 pins; trim=true cuts it to 28 KB, keeping per pin id, title, description, link, domain, board, pinner, alt_text, rich_summary and reaction_counts. Board URLs come from board.url on search results — relative, like /agkelsey/the-apartment/, so prefix https://www.pinterest.com — or from get_pinterest_user_boards. For a user's board list rather than one board's pins, use get_pinterest_user_boards.",
  "provider": "pinterest",
  "method": "GET",
  "path": "/apis/v1/pinterest/board",
  "arguments_schema": {
    "type": "object",
    "properties": {
      "url": {
        "type": "string",
        "example": "https://www.pinterest.com/lizmrodgers/moms-night/",
        "description": "The URL of the board to get"
      },
      "cursor": {
        "type": "string",
        "example": "Y2JURlEwTWsxNlp6Vk9SR2MwV....",
        "description": "The cursor to get the next page of results"
      },
      "trim": {
        "type": "boolean",
        "example": "false",
        "description": "Set to true for a trimmed down version of the response"
      }
    },
    "required": [
      "url"
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
