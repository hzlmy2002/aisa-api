# post_tavily_map

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "post_tavily_map",
  "successful": true,
  "description": "List a site's URLs from a root `url` without fetching any page content. Steer it with natural-language `instructions` and regex `select_paths` / `exclude_paths` / `select_domains` filters. Returns `base_url` and `results` — **a flat array of URL strings, not objects** — with `response_time` and `request_id`. Fast and cheap: measured at about 1.5 seconds. Use it to size a site before committing to a crawl, then fetch only the parts that matter with `post_tavily_extract`. When you want the content rather than the shape, `post_tavily_crawl` does both in one call.",
  "provider": "tavily",
  "method": "POST",
  "path": "/apis/v1/tavily/map",
  "arguments_schema": {
    "type": "object",
    "properties": {
      "url": {
        "type": "string",
        "description": "The root URL to begin the mapping.",
        "example": "docs.tavily.com"
      },
      "instructions": {
        "type": "string",
        "description": "Natural language instructions for the crawler."
      },
      "max_depth": {
        "maximum": 5,
        "minimum": 1,
        "type": "integer",
        "description": "Max depth of the mapping.",
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
        "description": "Regex patterns to exclude specific domains or subdomains from mapping."
      },
      "allow_external": {
        "type": "boolean",
        "description": "Include external domain links in the final results list.",
        "default": true
      },
      "timeout": {
        "maximum": 150,
        "minimum": 10,
        "type": "number",
        "description": "Maximum time in seconds to wait for the map operation.",
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
