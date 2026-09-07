# post_dataforseo_labs_google_categories_for_domain_live

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "post_dataforseo_labs_google_categories_for_domain_live",
  "successful": true,
  "description": "The topics a `target` site ranks in, as Google's own category codes with the site's footprint in each. 💰 Measured at $0.01212 upstream, essentially the flat rate billed. **This family is the one to reach for by default**: the google_ads endpoints in seo-keywords answer similar questions at $0.09 - seven times more - and return megabytes with no way to cap them, where this one takes a `limit`. Wrapped in DataForSEO's envelope: data in `tasks[0].result`, outcome in `tasks[0].status_code` - a rejected request still returns HTTP 200. The reverse direction - keywords for a category you name - is `post_dataforseo_labs_google_keywords_for_categories_live`.",
  "provider": "dataforseo",
  "method": "POST",
  "path": "/apis/v1/dataforseo/dataforseo_labs/google/categories_for_domain/live",
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
          "allOf": [
            {
              "anyOf": [
                {
                  "required": [
                    "location_name"
                  ]
                },
                {
                  "required": [
                    "location_code"
                  ]
                }
              ]
            },
            {
              "anyOf": [
                {
                  "required": [
                    "language_name"
                  ]
                },
                {
                  "required": [
                    "language_code"
                  ]
                }
              ]
            }
          ],
          "properties": {
            "target": {
              "type": "string",
              "description": "domain or subdomain required field the domain or subdomain name of the target website the domain or subdomain should be specified without https:// and www."
            },
            "location_name": {
              "type": "string",
              "description": "full name of the location required field if you don’t specify location_code Note: it is required to specify either location_name or location_code you can receive the list of available locations with their location_name by making a separate request to the https://api.dataforseo.com/v3/dataforseo_labs/locations_and_languages example: United Kingdom"
            },
            "location_code": {
              "type": "integer",
              "description": "location code required field if you don’t specify location_name Note: it is required to specify either location_name or location_code you can receive the list of available locations with their location_code by making a separate request to the https://api.dataforseo.com/v3/dataforseo_labs/locations_and_languages example: 2840"
            },
            "language_name": {
              "type": "string",
              "description": "full name of the language required field if you don’t specify language_code Note: it is required to specify either language_name or language_code you can receive the list of available languages with their language_name by making a separate request to the https://api.dataforseo.com/v3/dataforseo_labs/locations_and_languages example: English"
            },
            "language_code": {
              "type": "string",
              "description": "language code required field if you don’t specify language_name Note: it is required to specify either language_name or language_code you can receive the list of available languages with their language_code by making a separate request to the https://api.dataforseo.com/v3/dataforseo_labs/locations_and_languages example: en"
            },
            "include_subcategories": {
              "type": "boolean",
              "description": "indicates if the subcategories will be included in the search optional field if set to false, the subcategories will be ignored default value: false learn more about the parameter in this help center article"
            },
            "include_clickstream_data": {
              "type": "boolean",
              "description": "include or exclude data from clickstream-based metrics in the result optional field if the parameter is set to true, you will receive clickstream_etv, clickstream_gender_distribution, and clickstream_age_distribution fields with clickstream data in the response default value: false with this parameter enabled, you will be charged double the price for the request learn more about how clickstream-based metrics are calculated in this help center article"
            },
            "historical_serp_mode": {
              "type": "string",
              "description": "data collection mode optional field you can use this field to filter the results; possible types of filtering: live — return metrics for SERPs in which the specified target currently has ranking results; lost — return metrics for SERPs in which the specified target had previously had ranking results, but didn’t have them during the last check; all — return metrics for both types of SERPs. default value: live"
            },
            "item_types": {
              "type": "array",
              "items": {
                "type": "string"
              },
              "description": "display results by item type optional field indicates the type of search results included in the response Note: if the item_types array contains item types that are different from the organic object, the results will be ordered by the first item type in the array; you will not be able to sort and filter results by the types of search results not included in the response; possible values: [\"organic\", \"paid\", \"featured_snippet\", \"local_pack\"] default value: [\"organic\", \"paid\"]"
            },
            "filters": {
              "type": "array",
              "items": {},
              "description": "array of results filtering parameters optional field you can add several filters at once (8 filters maximum) you should set a logical operator and, or between the conditions the following operators are supported: regex, not_regex, , , >, >=, =, , in, not_in example: [\"metrics.organic.pos_1,\">\",0] [[[\"metrics.organic.count\",\">=\",100],\"and\",[\"metrics.organic.pos_1\",\">\",0]], \"or\", [\"metrics.organic.etv\",\"in\",[10,100]]] for more information about filters, please refer to Dataforseo Labs – Filters or this help center guide"
            },
            "order_by": {
              "type": "array",
              "items": {
                "type": "string"
              },
              "description": "results sorting rules optional field you can use the same values as in the filters array to sort the results possible sorting types: asc – results will be sorted in the ascending order desc – results will be sorted in the descending order you should use a comma to specify a sorting type example: [\"metrics.paid.etv,asc\"] Note: you can set no more than three sorting rules in a single request you should use a comma to separate several sorting rules example: [\"metrics.organic.etv,desc\",\"metrics.paid.count,asc\"] default rule: [\"metrics.organic.count,desc\"] Note: if the item_types array contains item types that are different from the organic object, the results will be ordered by the first item type in the array"
            },
            "limit": {
              "type": "integer",
              "description": "the maximum number of returned categories optional field default value: 100 maximum value: 1000"
            },
            "offset": {
              "type": "integer",
              "description": "offset in the results array of returned categories optional field default value: 0 if you specify the 10 value, the first ten categories in the results array will be omitted and the data will be provided for the successive categories"
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
