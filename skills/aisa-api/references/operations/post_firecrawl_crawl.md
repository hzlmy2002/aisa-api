# post_firecrawl_crawl

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "post_firecrawl_crawl",
  "successful": true,
  "description": "Crawl a whole site rooted at `url` and return the content of every page it keeps. `url`, `limit` and an `Idempotency-Key` are required; steer it with `includePaths`, `excludePaths`, `maxDiscoveryDepth`, `crawlEntireDomain`, `allowSubdomains`, `delay` and `maxConcurrency`. Asynchronous. Submitting returns HTTP 202 and a job envelope — `id`, `object`, `endpoint`, `status`, `createdAt`, `completedAt`, `pricing`, `output`, `error` — with `output` still null. Poll `get_firecrawl_crawl_job` until `status` is `completed`, `failed` or `cancelled`; `output` is then an array of pages, each with `markdown` and `metadata`. A 3-page crawl measured 43 KB and finished in under a minute, and `pricing.billingMode` is `metered_result`, so **cost scales with what it finds** — set `limit`. Send a fresh `Idempotency-Key` per distinct crawl; reusing one returns the earlier job instead of starting a new one. For a handful of known URLs `post_firecrawl_batch_scrape` is cheaper, and for structure alone `post_firecrawl_map` costs far less.",
  "provider": "firecrawl",
  "method": "POST",
  "path": "/apis/v1/firecrawl/crawl",
  "arguments_schema": {
    "type": "object",
    "properties": {
      "Idempotency-Key": {
        "maxLength": 191,
        "type": "string",
        "description": "Unique key (1 to 191 characters) that makes the submit idempotent. Re-submitting with the same key returns the original job."
      },
      "url": {
        "type": "string",
        "description": "The HTTPS root URL to crawl. PDF URLs are not supported.",
        "format": "uri",
        "example": "https://docs.firecrawl.dev"
      },
      "limit": {
        "maximum": 1000,
        "minimum": 1,
        "type": "integer",
        "description": "Maximum number of pages to crawl.",
        "example": 50
      },
      "includePaths": {
        "maxItems": 20,
        "type": "array",
        "items": {
          "maxLength": 256,
          "type": "string"
        },
        "description": "Only crawl URLs whose path matches one of these patterns."
      },
      "excludePaths": {
        "maxItems": 20,
        "type": "array",
        "items": {
          "maxLength": 256,
          "type": "string"
        },
        "description": "Skip URLs whose path matches one of these patterns."
      },
      "maxDiscoveryDepth": {
        "maximum": 10,
        "minimum": 0,
        "type": "integer",
        "description": "Maximum link-discovery depth from the root URL."
      },
      "sitemap": {
        "enum": [
          "skip",
          "include",
          "only"
        ],
        "type": "string",
        "description": "How the site's sitemap is used during discovery."
      },
      "ignoreQueryParameters": {
        "type": "boolean",
        "description": "Treat URLs that differ only by query string as the same page."
      },
      "crawlEntireDomain": {
        "type": "boolean",
        "description": "Crawl the whole domain rather than only the subtree under the root URL."
      },
      "allowExternalLinks": {
        "type": "boolean",
        "description": "Follow links to external domains."
      },
      "allowSubdomains": {
        "type": "boolean",
        "description": "Follow links into subdomains of the root domain."
      },
      "delay": {
        "maximum": 30,
        "minimum": 0,
        "type": "number",
        "description": "Delay in seconds between requests (0 to 30)."
      },
      "maxConcurrency": {
        "maximum": 20,
        "minimum": 1,
        "type": "integer",
        "description": "Maximum number of concurrent page fetches (1 to 20)."
      },
      "scrapeOptions": {
        "type": "object",
        "properties": {
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
        "description": "Per-page scrape options applied while crawling. On the metered profile output is always markdown."
      }
    },
    "required": [
      "Idempotency-Key",
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
