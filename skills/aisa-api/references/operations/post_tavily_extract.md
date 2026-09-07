# post_tavily_extract

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "post_tavily_extract",
  "successful": true,
  "description": "Fetch clean, parsed content for URLs you already have — from a search result, a sitemap, or a user. `urls` is required and takes several at once. Returns `results[]` with `url`, `title`, `raw_content` and `images`, plus a `failed_results[]` array — **read that one**, because a page that could not be fetched is reported there rather than raising an error. Choose `format` (markdown or text) and `extract_depth`. Measured at about 1 second for one page. Use this instead of `post_tavily_search` whenever you can already name the pages; searching for pages you can name costs more and may not return them. For a long list that can wait, `post_firecrawl_batch_scrape` runs it as a background job. To discover the URLs of a whole site first, use `post_tavily_map`.",
  "provider": "tavily",
  "method": "POST",
  "path": "/apis/v1/tavily/extract",
  "arguments_schema": {
    "type": "object",
    "properties": {
      "urls": {
        "description": "The URL or URLs to extract content from. A single URL string and an array of URL strings are both accepted.",
        "example": [
          "https://en.wikipedia.org/wiki/Artificial_intelligence"
        ],
        "anyOf": [
          {
            "type": "string"
          },
          {
            "type": "array",
            "items": {
              "type": "string"
            }
          }
        ]
      },
      "query": {
        "type": "string",
        "description": "User intent for reranking extracted content chunks."
      },
      "chunks_per_source": {
        "maximum": 5,
        "minimum": 1,
        "type": "integer",
        "description": "Maximum number of relevant chunks returned per source. Available only when query is provided.",
        "default": 3
      },
      "extract_depth": {
        "enum": [
          "basic",
          "advanced"
        ],
        "type": "string",
        "description": "Depth of the extraction process.",
        "default": "basic"
      },
      "include_images": {
        "type": "boolean",
        "description": "Include a list of images extracted from the URLs.",
        "default": false
      },
      "include_favicon": {
        "type": "boolean",
        "description": "Include the favicon URL for each result.",
        "default": false
      },
      "format": {
        "enum": [
          "markdown",
          "text"
        ],
        "type": "string",
        "description": "Format of the extracted web page content.",
        "default": "markdown"
      },
      "timeout": {
        "maximum": 60,
        "minimum": 1,
        "type": "number",
        "description": "Maximum time in seconds to wait for URL extraction. If omitted, default timeouts depend on extract_depth: 10 seconds for basic and 30 seconds for advanced.",
        "format": "float"
      },
      "include_usage": {
        "type": "boolean",
        "description": "Include credit usage information in the response.",
        "default": false
      }
    },
    "required": [
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
