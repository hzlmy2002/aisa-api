# post_firecrawl_search

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "post_firecrawl_search",
  "successful": true,
  "description": "Search the web and get back ranked results. `query` is required; `limit` sets how many. Returns `success`, `creditsUsed`, a request `id`, and `data.web[]` with `url`, `title`, `description` and `position` — **titles and snippets only, no page text**. Measured at about 15 seconds for 2 results, the slowest of the search tools here. Billed per Firecrawl credit, roughly `ceil(limit / 10) * 2`. On the AIsa metered profile only the web source is supported; `scrapeOptions`, enterprise mode and non-web sources are rejected. Reach for something else when: you want the page text in the same call — `post_tavily_search` returns it and answers in a third of the time; you already know the URLs — `post_firecrawl_scrape`; you want relevance judged by meaning rather than keywords — `post_exa_search`.",
  "provider": "firecrawl",
  "method": "POST",
  "path": "/apis/v1/firecrawl/search",
  "arguments_schema": {
    "type": "object",
    "properties": {
      "query": {
        "maxLength": 500,
        "type": "string",
        "description": "The search query. Must be non-empty and at most 500 characters.",
        "example": "firecrawl web scraping api"
      },
      "limit": {
        "maximum": 100,
        "minimum": 1,
        "type": "integer",
        "description": "Maximum number of results to return.",
        "default": 10
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
    "web-search"
  ]
}
```
