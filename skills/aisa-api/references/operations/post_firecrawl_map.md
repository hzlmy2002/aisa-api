# post_firecrawl_map

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "post_firecrawl_map",
  "successful": true,
  "description": "List the URLs reachable from a starting page, without fetching any content. `url` and `limit` are both required (limit 1 to 100000). Returns `success`, a request `id`, and `links[]` with `url` and `title` — note these are **objects with a title**, unlike `post_tavily_map` which returns bare strings. Measured at about 9 seconds. Billed 1 credit per discovered link, so `limit` is a cost control, not just a page control. Use it to size a site before paying to crawl it, then fetch only what matters with `post_firecrawl_scrape`. When you want content and structure in one pass, `post_firecrawl_crawl`.",
  "provider": "firecrawl",
  "method": "POST",
  "path": "/apis/v1/firecrawl/map",
  "arguments_schema": {
    "type": "object",
    "properties": {
      "url": {
        "type": "string",
        "description": "The HTTPS URL to map.",
        "format": "uri",
        "example": "https://docs.firecrawl.dev"
      },
      "limit": {
        "maximum": 100000,
        "minimum": 1,
        "type": "integer",
        "description": "Maximum number of links to discover. Required on the metered profile.",
        "example": 100
      }
    },
    "required": [
      "url",
      "limit"
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
    "web-search"
  ]
}
```
