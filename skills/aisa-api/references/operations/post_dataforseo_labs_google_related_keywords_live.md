# post_dataforseo_labs_google_related_keywords_live

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "post_dataforseo_labs_google_related_keywords_live",
  "successful": true,
  "description": "Walks Google's own 'searches related to' graph outward from a keyword, depth by depth. Pages with `limit`, `offset` and `offset_token`; use the token past the first pages. 💰 Measured at $0.01212 upstream, essentially the flat rate billed. **This family is the one to reach for by default**: the google_ads endpoints in seo-keywords answer similar questions at $0.09 - seven times more - and return megabytes with no way to cap them, where this one takes a `limit`. Wrapped in DataForSEO's envelope: data in `tasks[0].result`, outcome in `tasks[0].status_code` - a rejected request still returns HTTP 200. Different from both idea endpoints: this follows what Google itself links together, rather than a semantic model or a substring match.",
  "provider": "dataforseo",
  "method": "POST",
  "path": "/apis/v1/dataforseo/dataforseo_labs/google/related_keywords/live",
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
            "keyword": {
              "type": "string",
              "description": "keyword required field UTF-8 encoding the keywords will be converted to lowercase format learn more about rules and limitations of keyword and keywords fields in DataForSEO APIs in this Help Center article"
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
              "description": "full name of the language required field if you don’t specify language_code Note: it is required to specify either language_name or language_code you can receive the list of available locations with their language_name by making a separate request to the https://api.dataforseo.com/v3/dataforseo_labs/locations_and_languages example: English"
            },
            "language_code": {
              "type": "string",
              "description": "language code required field if you don’t specify language_name Note: it is required to specify either language_name or language_code you can receive the list of available locations with their language_code by making a separate request to the https://api.dataforseo.com/v3/dataforseo_labs/locations_and_languages example: en"
            },
            "depth": {
              "type": "integer",
              "description": "keyword search depth optional field default value: 1 number of the returned results depends on the value you set in this field you can specify a level from 0 to 4 estimated number of keywords for each level (maximum): 0 – the keyword set in the keyword field 1 – 8 keywords 2 – 72 keywords 3 – 584 keywords 4 – 4680 keywords"
            },
            "include_seed_keyword": {
              "type": "boolean",
              "description": "include data for the seed keyword optional field if set to true, data for the seed keyword specified in the keyword field will be provided in the seed_keyword_data array of the response default value: false"
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
            "replace_with_core_keyword": {
              "type": "boolean",
              "description": "return data for core keyword optional field if true, serp_info and related_keywords will be returned for the main keyword in the group that the specified keyword belongs to; if false, serp_info and related_keywords will be returned for the specified keyword (if available); refer to this help center article for more details; default value: false"
            },
            "filters": {
              "type": "array",
              "items": {},
              "description": "array of results filtering parameters optional field you can add several filters at once (8 filters maximum) you should set a logical operator and, or between the conditions the following operators are supported: regex, not_regex, , , >, >=, =, , in, not_in, match, not_match, ilike, not_ilike, like,not_like you can use the % operator with like and not_like, as well as ilike and not_ilike to match any string of zero or more characters example: [\"keyword_data.keyword_info.search_volume\",\">\",0] [[\"keyword_info.search_volume\",\"in\",[0,1000]], \"and\", [\"keyword_data.keyword_info.competition_level\",\"=\",\"LOW\"]] [[\"keyword_data.keyword_info.search_volume\",\">\",100], \"and\", [[\"keyword_data.keyword_info.cpc\",\" for more information about filters, please refer to Dataforseo Labs – Filters or this help center guide"
            },
            "order_by": {
              "type": "array",
              "items": {
                "type": "string"
              },
              "description": "results sorting rules optional field you can use the same values as in the filters array to sort the results possible sorting types: asc – results will be sorted in the ascending order desc – results will be sorted in the descending order you should use a comma to set up a sorting type example: [\"keyword_data.keyword_info.competition,desc\"] default rule: [\"keyword_data.keyword_info.search_volume,desc\"] note that you can set no more than three sorting rules in a single request you should use a comma to separate several sorting rules example: [\"keyword_data.keyword_info.search_volume,desc\",\"keyword_data.keyword_info.cpc,desc\"]"
            },
            "limit": {
              "type": "integer",
              "description": "the maximum number of returned keywords optional field default value: 100 maximum value: 1000"
            },
            "offset": {
              "type": "integer",
              "description": "offset in the results array of returned keywords optional field default value: 0 if you specify the 10 value, the first ten keywords in the results array will be omitted and the data will be provided for the successive keywords"
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
