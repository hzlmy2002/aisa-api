# get_pinterest_pin

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "get_pinterest_pin",
  "successful": true,
  "description": "Fetches one pin by URL, of the form pinterest.com/pin/<id>. The response is a different shape from search results: camelCase fields including entityId, description, category, totalReactionCount, aggregatedPinData, richMetadata, pinner, originPinner and genAiTopics. Measured at 12.5 KB, the smallest full response in this API; trim=true reduces it to 1.6 KB, keeping entityId, description, createdAt, pinner, originPinner, nativeCreator, shareCount, repinCount and totalReactionCount while dropping richMetadata and category. To find pins by keyword use get_pinterest_search; to page through the board a pin sits on use get_pinterest_board. Only standard numeric pin URLs resolve: of 12 search results fed straight back, the 3 whose URL ended in a shortcode (dwA0UYrl style) all answered 404 and one numeric id did too, so check for a numeric trailing id before calling and expect occasional 404s on deleted pins.",
  "provider": "pinterest",
  "method": "GET",
  "path": "/apis/v1/pinterest/pin",
  "arguments_schema": {
    "type": "object",
    "properties": {
      "url": {
        "type": "string",
        "example": "https://www.pinterest.com/pin/1124351863225567517/",
        "description": "Pinterest pin URL"
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
