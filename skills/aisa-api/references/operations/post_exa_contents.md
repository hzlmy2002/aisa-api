# post_exa_contents

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "post_exa_contents",
  "successful": true,
  "description": "Fetch page text and metadata for URLs you already have. `ids` is required and takes the `id` values from `post_exa_search` — which are plain URLs, so any URL works. Toggle `text`, `highlights`, `summary`, `subpages` and `livecrawl`. Returns `results[]` with `id`, `title`, `url`, `author` and `text`, plus a **`statuses[]` array giving per-URL `status` and `source`** — read it, because a URL that could not be fetched is reported there rather than raising. Cached results are served instantly; a miss falls back to a live crawl. Measured at 1.2 seconds. Billed a flat $0.08 per successful request. For a whole site rather than a URL list, `post_firecrawl_crawl`.",
  "provider": "exa",
  "method": "POST",
  "path": "/apis/v1/exa/contents",
  "arguments_schema": {
    "type": "object",
    "properties": {
      "ids": {
        "type": "array",
        "items": {
          "type": "string"
        },
        "description": "The URLs (or Exa result ids) to fetch contents for.",
        "example": [
          "https://example.com/article"
        ]
      },
      "text": {
        "type": "boolean",
        "description": "Return the full page text."
      },
      "highlights": {
        "type": "boolean",
        "description": "Return highlighted relevant snippets."
      },
      "summary": {
        "type": "boolean",
        "description": "Return an AI-generated summary of the page."
      },
      "subpages": {
        "type": "integer",
        "description": "Number of linked subpages to also fetch."
      },
      "livecrawl": {
        "enum": [
          "always",
          "fallback",
          "never"
        ],
        "type": "string",
        "description": "Freshness policy: always live-crawl, fall back to live crawl on cache miss, or never live-crawl."
      }
    },
    "required": [
      "ids"
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
