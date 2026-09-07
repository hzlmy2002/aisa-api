# get_dataforseo_backlinks_index

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "get_dataforseo_backlinks_index",
  "successful": true,
  "description": "How much of the web DataForSEO's backlink crawler has indexed: `total_backlinks`, `total_pages` and an `index_history` array of `date`, `total_backlinks` and `total_pages`. Measured at 1.4 KB. **Free - upstream cost is 0, the only endpoint in this family that is.** Wrapped in DataForSEO's envelope: data in `tasks[0].result`, upstream charge in `tasks[0].cost`, outcome in `tasks[0].status_code` - a rejected request still returns HTTP 200. It says nothing about any particular site; it is the denominator behind every other number here, useful for judging whether a coverage gap is the site's or the crawler's.",
  "provider": "dataforseo",
  "method": "GET",
  "path": "/apis/v1/dataforseo/backlinks/index",
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
    "seo-backlinks"
  ]
}
```
