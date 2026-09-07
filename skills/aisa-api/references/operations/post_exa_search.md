# post_exa_search

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "post_exa_search",
  "successful": true,
  "description": "Search the web by meaning rather than by keyword. `query` is required; narrow with `category`, `includeDomains`, `excludeDomains`, `startPublishedDate`, `endPublishedDate`, and set `numResults`. Returns `requestId`, `resolvedSearchType`, `searchTime`, `costDollars` and `results[]` with `id`, `title` and `url`. **`id` is the URL**, and it is what `post_exa_contents` takes. Measured at 1.4 seconds — the fastest search here. Billed a flat $0.08 per successful request. ⚠️ Results carry **no page text** unless you ask: pass `contents`, or follow up with `post_exa_contents`. Choose it over `post_tavily_search` when the query is a description rather than keywords; choose Tavily when you want the text in the same call, and `post_exa_answer` when you want a written answer rather than a list.",
  "provider": "exa",
  "method": "POST",
  "path": "/apis/v1/exa/search",
  "arguments_schema": {
    "type": "object",
    "properties": {
      "query": {
        "type": "string",
        "description": "The natural-language search query.",
        "example": "latest evaluation frameworks for AI agents"
      },
      "type": {
        "enum": [
          "auto",
          "fast",
          "instant",
          "deep-lite",
          "deep",
          "deep-reasoning"
        ],
        "type": "string",
        "description": "Search mode. auto lets Exa choose; the deep modes trade latency for higher-quality retrieval.",
        "default": "auto"
      },
      "numResults": {
        "maximum": 100,
        "minimum": 1,
        "type": "integer",
        "description": "Number of results to return.",
        "default": 10
      },
      "category": {
        "enum": [
          "company",
          "research paper",
          "news",
          "personal site",
          "financial report",
          "people"
        ],
        "type": "string",
        "description": "Optional hint about the kind of pages to prioritize."
      },
      "includeDomains": {
        "type": "array",
        "items": {
          "type": "string"
        },
        "description": "Only return results from these domains."
      },
      "excludeDomains": {
        "type": "array",
        "items": {
          "type": "string"
        },
        "description": "Exclude results from these domains."
      },
      "startPublishedDate": {
        "type": "string",
        "description": "Only return results published on or after this ISO 8601 date.",
        "format": "date-time"
      },
      "endPublishedDate": {
        "type": "string",
        "description": "Only return results published on or before this ISO 8601 date.",
        "format": "date-time"
      },
      "contents": {
        "type": "object",
        "properties": {
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
          }
        },
        "description": "Content options to return alongside each result."
      },
      "outputSchema": {
        "type": "object",
        "description": "JSON Schema used to synthesize a structured output from the results."
      },
      "systemPrompt": {
        "type": "string",
        "description": "Instruction that guides how the structured output is generated."
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
