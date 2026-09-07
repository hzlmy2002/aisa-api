# post_tavily_crawl

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "post_tavily_crawl",
  "successful": true,
  "description": "Walk a site from a root `url` and return the content of the pages it finds. Steer it with natural-language `instructions` plus regex path and domain filters, and bound it with `max_depth`, `max_breadth` and `limit`. Returns `base_url` and `results[]` with `url` and `raw_content`. Measured at about 4.5 seconds for a 3-page limit; cost and time grow with the bounds you set, so set them. Use it for broad coverage of one site — documentation, a catalogue, a competitor's blog. It answers synchronously, which `post_firecrawl_crawl` does not: that one runs as a background job and suits crawls too large to wait on. For a handful of known pages `post_tavily_extract` is far cheaper; to size a site before paying to crawl it, run `post_tavily_map` first.",
  "provider": "tavily",
  "method": "POST",
  "path": "/apis/v1/tavily/crawl",
  "arguments_schema": {
    "type": "object",
    "properties": {
      "url": {
        "type": "string",
        "description": "The root URL to begin the crawl.",
        "example": "docs.tavily.com"
      },
      "instructions": {
        "type": "string",
        "description": "Natural language instructions for the crawler."
      },
      "chunks_per_source": {
        "maximum": 5,
        "minimum": 1,
        "type": "integer",
        "description": "Maximum number of relevant chunks returned per source.",
        "default": 3
      },
      "max_depth": {
        "maximum": 5,
        "minimum": 1,
        "type": "integer",
        "description": "Max depth of the crawl.",
        "default": 1
      },
      "max_breadth": {
        "maximum": 500,
        "minimum": 1,
        "type": "integer",
        "description": "Max number of links to follow per level of the tree.",
        "default": 20
      },
      "limit": {
        "minimum": 1,
        "type": "integer",
        "description": "Total number of links the crawler will process before stopping.",
        "default": 50
      },
      "select_paths": {
        "type": "array",
        "items": {
          "type": "string"
        },
        "description": "Regex patterns to select only URLs with specific path patterns."
      },
      "select_domains": {
        "type": "array",
        "items": {
          "type": "string"
        },
        "description": "Regex patterns to select crawling to specific domains or subdomains."
      },
      "exclude_paths": {
        "type": "array",
        "items": {
          "type": "string"
        },
        "description": "Regex patterns to exclude URLs with specific path patterns."
      },
      "exclude_domains": {
        "type": "array",
        "items": {
          "type": "string"
        },
        "description": "Regex patterns to exclude specific domains or subdomains from crawling."
      },
      "allow_external": {
        "type": "boolean",
        "description": "Include external domain links in the final results list.",
        "default": true
      },
      "include_images": {
        "type": "boolean",
        "description": "Include images in the crawl results.",
        "default": false
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
      "format": {
        "enum": [
          "markdown",
          "text"
        ],
        "type": "string",
        "description": "Format of the extracted web page content.",
        "default": "markdown"
      },
      "include_favicon": {
        "type": "boolean",
        "description": "Include the favicon URL for each result.",
        "default": false
      },
      "timeout": {
        "maximum": 150,
        "minimum": 10,
        "type": "number",
        "description": "Maximum time in seconds to wait for the crawl operation.",
        "format": "float",
        "default": 150
      },
      "include_usage": {
        "type": "boolean",
        "description": "Include credit usage information in the response.",
        "default": false
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
    "web-search"
  ]
}
```
