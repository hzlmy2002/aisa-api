# post_firecrawl_scrape

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "post_firecrawl_scrape",
  "successful": true,
  "description": "Fetch one URL and get its main content back as markdown. `url` and `proxy` are both required — `proxy` must be `basic` on the metered profile — and `formats` selects the output. Returns `success` and `data` with `markdown` plus a large `metadata` object carrying the page's og: and twitter: tags, `statusCode`, `sourceURL` and `language`. Measured at about 10 seconds for one page. ⚠️ The URL must be HTTPS and must not point at a PDF; both are rejected rather than best-effort. Use it when you have the URL and want the text. For several URLs at once `post_firecrawl_batch_scrape` runs them as one background job, and `post_tavily_extract` does a small batch synchronously. To find URLs first, `post_firecrawl_map`.",
  "provider": "firecrawl",
  "method": "POST",
  "path": "/apis/v1/firecrawl/scrape",
  "arguments_schema": {
    "type": "object",
    "properties": {
      "url": {
        "type": "string",
        "description": "The HTTPS URL to scrape. PDF URLs are not supported on the metered profile.",
        "format": "uri",
        "example": "https://docs.firecrawl.dev"
      },
      "proxy": {
        "enum": [
          "basic"
        ],
        "type": "string",
        "description": "Proxy tier. Must be explicitly set to \"basic\" on the metered profile.",
        "example": "basic"
      },
      "formats": {
        "type": "array",
        "items": {
          "enum": [
            "markdown"
          ],
          "type": "string"
        },
        "description": "Optional output formats. When present it must be exactly [\"markdown\"].",
        "example": [
          "markdown"
        ]
      }
    },
    "required": [
      "url",
      "proxy"
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
