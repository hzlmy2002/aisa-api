# post_dataforseo_labs_google_domain_rank_overview_live

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "post_dataforseo_labs_google_domain_rank_overview_live",
  "successful": true,
  "description": "A domain's search footprint: organic and paid keyword counts, estimated traffic and traffic value, by `location_code`. Returns `se_type`, `target`, `total_count`, `items_count` and `items`. Measured at 1.6 KB. 💰 Measured at $0.01212 upstream, essentially the flat rate billed. **This family is the one to reach for by default**: the google_ads endpoints in seo-keywords answer similar questions at $0.09 - seven times more - and return megabytes with no way to cap them, where this one takes a `limit`. Wrapped in DataForSEO's envelope: data in `tasks[0].result`, outcome in `tasks[0].status_code` - a rejected request still returns HTTP 200. For the same numbers over time use `post_dataforseo_labs_google_historical_rank_live`; for many domains at once, `post_dataforseo_labs_google_bulk_traffic_estimation_live`.",
  "provider": "dataforseo",
  "method": "POST",
  "path": "/apis/v1/dataforseo/dataforseo_labs/google/domain_rank_overview/live",
  "arguments_schema": {
    "type": "object",
    "properties": {
      "body": {
        "type": "array",
        "items": {
          "required": [
            "target"
          ],
          "type": "object",
          "properties": {
            "target": {
              "type": "string",
              "description": "domain required field the domain name of the target website the domain should be specified without https:// and www."
            },
            "location_name": {
              "type": "string",
              "description": "full name of the location optional field if you use this field, you don’t need to specify location_code you can receive the list of available locations with their location_name by making a separate request to the https://api.dataforseo.com/v3/dataforseo_labs/locations_and_languages ignore this field to get the results for all available locations example: United Kingdom"
            },
            "location_code": {
              "type": "integer",
              "description": "location code optional field if you use this field, you don’t need to specify location_name you can receive the list of available locations with their location_code by making a separate request to the https://api.dataforseo.com/v3/dataforseo_labs/locations_and_languages ignore this field to get the results for all available locations example: 2840"
            },
            "language_name": {
              "type": "string",
              "description": "full name of the language optional field if you use this field, you don’t need to specify language_code you can receive the list of available languages with their language_name by making a separate request to the https://api.dataforseo.com/v3/dataforseo_labs/locations_and_languages ignore this field to get the results for all available languages example: English"
            },
            "language_code": {
              "type": "string",
              "description": "language code optional field if you use this field, you don’t need to specify language_name you can receive the list of available languages with their language_code by making a separate request to the https://api.dataforseo.com/v3/dataforseo_labs/locations_and_languages ignore this field to get the results for all available languages example: en"
            },
            "ignore_synonyms": {
              "type": "boolean",
              "description": "ignore highly similar keywords optional field if set to true, all highly similar keywords will be excluded from the ranking and traffic calculations, the results will be based on data for main keywords from groups of synonyms default value: false"
            },
            "limit": {
              "type": "integer",
              "description": "the maximum number of returned results for domain optional field default value: 100 maximum value: 1000"
            },
            "offset": {
              "type": "integer",
              "description": "offset in the results array of returned items optional field default value: 0 if you specify the 10 value, the first ten items in the results array will be omitted and the data will be provided for the successive items"
            },
            "tag": {
              "type": "string",
              "description": "user-defined task identifier optional field the character limit is 255 you can use this parameter to identify the task and match it with the result you will find the specified tag value in the data object of the response"
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
    "seo-labs"
  ]
}
```
