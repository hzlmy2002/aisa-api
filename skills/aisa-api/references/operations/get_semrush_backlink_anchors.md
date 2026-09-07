# get_semrush_backlink_anchors

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "get_semrush_backlink_anchors",
  "successful": true,
  "description": "Anchor-text distribution of backlinks to a target. Billed per returned data row at $0.36 per row (up to 20 rows; header row excluded); 4xx/5xx are not charged. Response is semicolon-delimited text.",
  "provider": "semrush",
  "method": "GET",
  "path": "/apis/v1/semrush/backlink-anchors",
  "arguments_schema": {
    "type": "object",
    "properties": {
      "target": {
        "type": "string",
        "example": "ahrefs.com",
        "description": "Target domain or URL."
      },
      "target_type": {
        "type": "string",
        "example": "root_domain",
        "description": "One of `root_domain`, `domain`, or `url`."
      }
    },
    "required": [
      "target",
      "target_type"
    ]
  },
  "response_schema": {
    "type": "object",
    "additionalProperties": true,
    "x-fastmcp-wrap-result": true
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
    "seo-backlinks"
  ]
}
```
