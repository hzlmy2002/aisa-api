# post_dataforseo_serp_google_ai_mode_live_html

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "post_dataforseo_serp_google_ai_mode_live_html",
  "successful": true,
  "description": "Returns Google's AI Mode answer for a query, with the sources it cites on Google, synchronously. Raw page source rather than parsed results. 🔴 **Measured at 2.4 MB for a ten-result Google query, against 57 KB parsed** - take it only to check what the parser dropped. 💰 Measured at $0.002 upstream against the $0.012 billed - this family is the cheapest source of search data here, six times under the flat rate. Wrapped in DataForSEO's envelope: data in `tasks[0].result`, outcome in `tasks[0].status_code` - a rejected request still returns HTTP 200.",
  "provider": "dataforseo",
  "method": "POST",
  "path": "/apis/v1/dataforseo/serp/google/ai_mode/live/html",
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
              "description": "Keyword; you can specify up to 700 characters"
            },
            "location_name": {
              "type": "string",
              "description": "Full name of search engine location; required if location_code or location_coordinate is not specified"
            },
            "location_code": {
              "type": "integer",
              "description": "Search engine location code; required if location_name or location_coordinate is not specified"
            },
            "location_coordinate": {
              "type": "string",
              "description": "GPS coordinates of a location; required if location_name or location_code is not specified"
            },
            "language_name": {
              "type": "string",
              "description": "Full name of search engine language; required if language_code is not specified"
            },
            "language_code": {
              "type": "string",
              "description": "Search engine language code; required if language_name is not specified"
            },
            "device": {
              "type": "string",
              "description": "Device type: desktop or mobile"
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
