# post_dataforseo_serp_bing_organic_live_regular

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "post_dataforseo_serp_bing_organic_live_regular",
  "successful": true,
  "description": "Returns the ranked results for a keyword on Bing, synchronously. The lighter parse: measured at 4.8 KB against 57 KB for `advanced`, carrying the ranked list without the surrounding SERP features. Returns `keyword`, `type`, `se_domain`, `location_code`, `language_code`, `check_url`, `datetime`, `spell`, `refinement_chips`, `item_types`, `items_count` and `items`. 💰 Measured at $0.002 upstream against the $0.012 billed - this family is the cheapest source of search data here, six times under the flat rate. Wrapped in DataForSEO's envelope: data in `tasks[0].result`, outcome in `tasks[0].status_code` - a rejected request still returns HTTP 200.",
  "provider": "dataforseo",
  "method": "POST",
  "path": "/apis/v1/dataforseo/serp/bing/organic/live/regular",
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
              "description": "Device type"
            },
            "os": {
              "type": "string",
              "description": "Device operating system"
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
    "seo-serp-other-engines"
  ]
}
```
