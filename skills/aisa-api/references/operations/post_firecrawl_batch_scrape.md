# post_firecrawl_batch_scrape

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "post_firecrawl_batch_scrape",
  "successful": true,
  "description": "Scrape many URLs as one background job. `urls` and an `Idempotency-Key` are required; `maxConcurrency`, `onlyMainContent`, `includeTags`, `excludeTags`, `maxAge`, `minAge` and `timeout` tune it. Asynchronous. Submitting returns HTTP 202 and a job envelope — `id`, `object`, `endpoint`, `status`, `createdAt`, `completedAt`, `pricing`, `output`, `error` — with `output` still null. Poll `get_firecrawl_batch_scrape_job` until terminal; `output` is then an array of documents with `markdown` and `metadata`. Use it when you have a list of URLs and do not need them immediately. When you do need them immediately, `post_tavily_extract` returns a small batch synchronously in about a second; for a single page `post_firecrawl_scrape`. Send a fresh `Idempotency-Key` per distinct batch.",
  "provider": "firecrawl",
  "method": "POST",
  "path": "/apis/v1/firecrawl/batch-scrape",
  "arguments_schema": {
    "type": "object",
    "properties": {
      "Idempotency-Key": {
        "maxLength": 191,
        "type": "string",
        "description": "Unique key (1 to 191 characters) that makes the submit idempotent. Re-submitting with the same key returns the original job."
      },
      "urls": {
        "maxItems": 1000,
        "minItems": 1,
        "type": "array",
        "items": {
          "type": "string",
          "format": "uri"
        },
        "description": "1 to 1000 unique HTTPS URLs to scrape. PDF URLs are not supported.",
        "example": [
          "https://docs.firecrawl.dev",
          "https://docs.firecrawl.dev/introduction"
        ]
      },
      "maxConcurrency": {
        "maximum": 20,
        "minimum": 1,
        "type": "integer",
        "description": "Maximum number of concurrent scrapes (1 to 20)."
      },
      "onlyMainContent": {
        "type": "boolean",
        "description": "Return only the main content of each page.",
        "default": true
      },
      "includeTags": {
        "maxItems": 50,
        "type": "array",
        "items": {
          "maxLength": 128,
          "type": "string"
        },
        "description": "HTML tags/selectors to keep."
      },
      "excludeTags": {
        "maxItems": 50,
        "type": "array",
        "items": {
          "maxLength": 128,
          "type": "string"
        },
        "description": "HTML tags/selectors to drop."
      },
      "maxAge": {
        "maximum": 31536000000,
        "minimum": 0,
        "type": "integer",
        "description": "Maximum acceptable cache age in milliseconds."
      },
      "minAge": {
        "maximum": 31536000000,
        "minimum": 0,
        "type": "integer",
        "description": "Minimum cache age in milliseconds before a page is refetched."
      },
      "timeout": {
        "maximum": 300000,
        "minimum": 1000,
        "type": "integer",
        "description": "Per-page timeout in milliseconds."
      }
    },
    "required": [
      "Idempotency-Key",
      "urls"
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
