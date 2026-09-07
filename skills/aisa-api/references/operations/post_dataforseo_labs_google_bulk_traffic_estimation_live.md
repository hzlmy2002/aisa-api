# post_dataforseo_labs_google_bulk_traffic_estimation_live

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "post_dataforseo_labs_google_bulk_traffic_estimation_live",
  "successful": true,
  "description": "Estimated organic traffic for many domains in one call. 💰 Measured at $0.01212 upstream, essentially the flat rate billed - the google_ads endpoints in seo-keywords answer similar questions at $0.09. This one takes no limit parameter, but it is priced per call rather than per item, so send the whole list at once. Wrapped in DataForSEO's envelope: data in `tasks[0].result`, outcome in `tasks[0].status_code` - a rejected request still returns HTTP 200. Price is per call, so this is how to rank a competitor list cheaply before spending per-domain calls on the interesting ones. The historical version is `post_dataforseo_labs_google_historical_bulk_traffic_live`.",
  "provider": "dataforseo",
  "method": "POST",
  "path": "/apis/v1/dataforseo/dataforseo_labs/google/bulk_traffic_estimation/live",
  "arguments_schema": {
    "type": "object",
    "properties": {
      "body": {
        "type": "array",
        "items": {
          "required": [
            "targets"
          ],
          "type": "object",
          "properties": {
            "targets": {
              "type": "array",
              "items": {
                "type": "string"
              },
              "description": "target domains, subdomains, and webpages required field you can specify domains, subdomains, and webpages in this field; domains and subdomains should be specified without https:// and www.; pages should be specified with absolute URL, including https:// and www.; you can set up to 1000 domains, subdomains or webpages"
            },
            "location_name": {
              "type": "string",
              "description": "full name of the location if you use this field, you don’t have to specify location_code you can receive the list of available locations with their location_name by making a separate request to the https://api.dataforseo.com/v3/dataforseo_labs/locations_and_languages ignore this field to get the results for all available locations example: United Kingdom"
            },
            "location_code": {
              "type": "integer",
              "description": "location code if you use this field, you don’t have to specify location_name you can receive the list of available locations with their location_code by making a separate request to the https://api.dataforseo.com/v3/dataforseo_labs/locations_and_languages ignore this field to get the results for all available locations example: 2840"
            },
            "language_name": {
              "type": "string",
              "description": "full name of the language if you use this field, you don’t need to specify language_code you can receive the list of available languages with their language_name by making a separate request to the https://api.dataforseo.com/v3/dataforseo_labs/locations_and_languages ignore this field to get the results for all available languages example: English"
            },
            "language_code": {
              "type": "string",
              "description": "language code if you use this field, you don’t need to specify language_name you can receive the list of available languages with their language_code by making a separate request to the https://api.dataforseo.com/v3/dataforseo_labs/locations_and_languages ignore this field to get the results for all available languages example: en"
            },
            "item_types": {
              "type": "array",
              "items": {
                "type": "string"
              },
              "description": "display results by item type optional field indicates the type of search results included in the response Note: if the item_types array contains item types that are different from organic, the results will be ordered by the first item type in the array possible values: [\"organic\", \"paid\", \"featured_snippet\", \"local_pack\"] default value: [\"organic\", \"paid\"]"
            },
            "ignore_synonyms": {
              "type": "boolean",
              "description": "ignore highly similar keywords optional field if set to true, only core keywords will be returned, all highly similar keywords will be excluded; default value: false"
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
