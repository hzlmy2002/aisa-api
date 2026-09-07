# post_dataforseo_serp_google_organic_live

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "post_dataforseo_serp_google_organic_live",
  "successful": true,
  "description": "Returns the ranked results for a keyword on Google, synchronously. Returns `keyword`, `type`, `se_domain`, `location_code`, `language_code`, `check_url`, `datetime`, `spell`, `refinement_chips`, `item_types`, `items_count` and `items`. Measured at 57 KB for a ten-result Google query. ⚠️ Three result depths exist for the same query and differ by two orders of magnitude: `regular` measured 4.8 KB, `advanced` 57 KB, and `html` **2.4 MB**. `advanced` is the default choice; take `regular` when only the ranked list matters and `html` only to check what the parser dropped. 💰 Measured at $0.002 upstream against the $0.012 billed - this family is the cheapest source of search data here, six times under the flat rate. Wrapped in DataForSEO's envelope: data in `tasks[0].result`, outcome in `tasks[0].status_code` - a rejected request still returns HTTP 200.",
  "provider": "dataforseo",
  "method": "POST",
  "path": "/apis/v1/dataforseo/serp/google/organic/live/advanced",
  "arguments_schema": {
    "type": "object",
    "properties": {
      "body": {
        "type": "array",
        "items": {
          "required": [
            "keyword"
          ],
          "type": "object",
          "properties": {
            "keyword": {
              "type": "string",
              "description": "Keyword to search for"
            },
            "location_name": {
              "type": "string",
              "description": "Full name of search engine location"
            },
            "location_code": {
              "type": "integer",
              "description": "Search engine location code"
            },
            "location_coordinate": {
              "type": "string",
              "description": "GPS coordinates of a location"
            },
            "language_name": {
              "type": "string",
              "description": "Full name of search engine language"
            },
            "language_code": {
              "type": "string",
              "description": "Search engine language code"
            },
            "device": {
              "type": "string",
              "description": "Device type: desktop or mobile"
            },
            "os": {
              "type": "string",
              "description": "Device operating system"
            },
            "depth": {
              "type": "integer",
              "description": "Parsing depth, default 100, max 700"
            },
            "max_crawl_pages": {
              "type": "integer",
              "description": "Page crawl limit, max 100"
            },
            "calculate_rectangles": {
              "type": "boolean",
              "description": "Calculate pixel rankings for SERP elements"
            },
            "tag": {
              "type": "string",
              "description": "User-defined task identifier"
            }
          }
        }
      }
    },
    "required": [
      "body"
    ]
  },
  "response_schema": {
    "type": "object",
    "additionalProperties": true
  },
  "read_only": false,
  "idempotent": false,
  "side_effects": [
    "writes-upstream"
  ],
  "annotations": {
    "readOnlyHint": false,
    "destructiveHint": true,
    "idempotentHint": false,
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
    "seo-serp"
  ]
}
```
