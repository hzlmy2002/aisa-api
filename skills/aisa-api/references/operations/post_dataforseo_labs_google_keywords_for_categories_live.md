# post_dataforseo_labs_google_keywords_for_categories_live

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "post_dataforseo_labs_google_keywords_for_categories_live",
  "successful": true,
  "description": "Every keyword Labs holds for a given category code - the reverse of `post_dataforseo_labs_google_categories_for_domain_live`. Pages with `limit`, `offset` and `offset_token`; use the token past the first pages. 💰 Measured at $0.01212 upstream, essentially the flat rate billed. **This family is the one to reach for by default**: the google_ads endpoints in seo-keywords answer similar questions at $0.09 - seven times more - and return megabytes with no way to cap them, where this one takes a `limit`. Wrapped in DataForSEO's envelope: data in `tasks[0].result`, outcome in `tasks[0].status_code` - a rejected request still returns HTTP 200. ⚠️ A broad category holds a great many keywords; set `limit` deliberately rather than relying on a default.",
  "provider": "dataforseo",
  "method": "POST",
  "path": "/apis/v1/dataforseo/dataforseo_labs/google/keywords_for_categories/live",
  "arguments_schema": {
    "type": "object",
    "properties": {
      "body": {
        "type": "array",
        "items": {
          "type": "object",
          "anyOf": [
            {
              "required": [
                "category_codes"
              ],
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
              ]
            },
            {
              "required": [
                "offset_token"
              ]
            }
          ],
          "properties": {
            "category_codes": {
              "type": "array",
              "items": {
                "type": "integer"
              },
              "description": "product and service categories required field The maximum number of categories you can specify: 20 you can download the full list of possible categories"
            },
            "location_name": {
              "type": "string",
              "description": "full name of the location required field if you don’t specify location_code Note: it is required to specify either location_name or location_code you can receive the list of available locations with their location_name by making a separate request to the https://api.dataforseo.com/v3/dataforseo_labs/locations_and_languages example: United Kingdom"
            },
            "location_code": {
              "type": "integer",
              "description": "unique location identifier required field if you don’t specify location_name Note: it is required to specify either location_name or location_code you can receive the list of available locations with their location_code by making a separate request to the https://api.dataforseo.com/v3/dataforseo_labs/locations_and_languages example: 2840"
            },
            "language_name": {
              "type": "string",
              "description": "full name of the language required field if you don’t specify language_code Note: it is required to specify either language_name or language_code you can receive the list of available languages with their language_name by making a separate request to the https://api.dataforseo.com/v3/dataforseo_labs/locations_and_languages example: English"
            },
            "language_code": {
              "type": "string",
              "description": "unique language identifier required field if you don’t specify language_name Note: it is required to specify either language_name or language_code you can receive the list of available languages with their language_code by making a separate request to the https://api.dataforseo.com/v3/dataforseo_labs/locations_and_languages example: en"
            },
            "category_intersection": {
              "type": "boolean",
              "description": "category intersections optional field if set to true, you will get keywords featured in all specified categories; if set to false, you will keywords that are specified in any of the specified categories; default value: true"
            },
            "include_serp_info": {
              "type": "boolean",
              "description": "include data from SERP for each keyword optional field if set to true, we will return a serp_info array containing SERP data (number of search results, relevant URL, and SERP features) for every keyword in the response default value: false"
            },
            "include_clickstream_data": {
              "type": "boolean",
              "description": "include or exclude data from clickstream-based metrics in the result optional field if the parameter is set to true, you will receive clickstream_keyword_info, keyword_info_normalized_with_clickstream, and keyword_info_normalized_with_bing fields in the response default value: false with this parameter enabled, you will be charged double the price for the request learn more about how clickstream-based metrics are calculated in this help center article"
            },
            "ignore_synonyms": {
              "type": "boolean",
              "description": "ignore highly similar keywords optional field if set to true only core keywords will be returned, all highly similar keywords will be excluded; default value: false"
            },
            "limit": {
              "type": "integer",
              "description": "the maximum number of keywords in the results array optional field default value: 100 maximum value: 1000"
            },
            "offset": {
              "type": "integer",
              "description": "offset in the results array of returned keywords optional field default value: 0 if you specify the 10 value, the first ten keywords in the results array will be omitted and the data will be provided for the successive keywords Note: we recommend using this parameter only when retrieving up to 10,000 results for retrieving over 10,000 results, use the offset_token instead."
            },
            "offset_token": {
              "type": "string",
              "description": "offset token for subsequent requests optional field provided in the identical filed of the response to each request; use this parameter to avoid timeouts while trying to obtain over 10,000 results in a single request; by specifying the unique offset_token value from the response array, you will get the subsequent results of the initial task; offset_token values are unique for each subsequent task Note: if the offset_token is specified in the request, all other parameters except limit will not be taken into account when processing a task. learn more about this parameter on our Help Center"
            },
            "filters": {
              "type": "array",
              "items": {},
              "description": "array of results filtering parameters optional field you can add several filters at once (8 filters maximum) you should set a logical operator and, or between the conditions the following operators are supported: regex, not_regex, , , >, >=, =, , in, not_in, match, not_match, ilike, not_ilike, like, not_like you can use the % operator with like and not_like,as well as ilike, not_ilike to match any string of zero or more characters example: [\"keyword_info.search_volume\",\">\",0] [[\"keyword_info.search_volume\",\"in\",[0,1000]], \"and\", [\"keyword_info.competition_level\",\"=\",\"LOW\"]] [[\"keyword_info.search_volume\",\">\",100], \"and\", [[\"keyword_info.cpc\",\" for more information about filters, please refer to Dataforseo Labs – Filters or this help center guide"
            },
            "order_by": {
              "type": "array",
              "items": {
                "type": "string"
              },
              "description": "results sorting rules optional field you can use the same values as in the filters array to sort the results possible sorting types: asc – results will be sorted in the ascending order desc – results will be sorted in the descending order you should use a comma to set up a sorting type example: [\"keyword_info.competition,desc\"] default rule: [\"keyword_info.search_volume,desc\"] note that you can set no more than three sorting rules in a single request you should use a comma to separate several sorting rules example: [\"keyword_info.search_volume,desc\",\"keyword_info.competition,asc\"]"
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
