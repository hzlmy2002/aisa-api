# post_dataforseo_keywords_bing_kw_performance_live

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "post_dataforseo_keywords_bing_kw_performance_live",
  "successful": true,
  "description": "How a list of `keywords` performs in Bing Ads for a given `device` and `match` type. ⚠️ **`language_name` is required and its absence is reported as `Invalid Field: 'language_name'` inside an HTTP 200** - the message means missing as well as wrong. Wrapped in DataForSEO's envelope: data in `tasks[0].result`, outcome in `tasks[0].status_code` - a rejected request still returns HTTP 200. Valid pairs come from `get_dataforseo_keywords_bing_kw_performance_locales`. The submit and fetch twins of this endpoint do the same work asynchronously, at the same price, for batches too large to wait on.",
  "provider": "dataforseo",
  "method": "POST",
  "path": "/apis/v1/dataforseo/keywords_data/bing/keyword_performance/live",
  "arguments_schema": {
    "type": "object",
    "properties": {
      "body": {
        "type": "array",
        "items": {
          "required": [
            "keywords"
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
                },
                {
                  "required": [
                    "location_coordinate"
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
            "keywords": {
              "type": "array",
              "items": {
                "type": "string"
              },
              "description": "keywords required field The maximum number of keywords you can specify: 1000 The maximum number of characters for each keyword: 80 The maximum number of words for each keyword phrase: 10 the specified keywords will be converted to lowercase, data will be provided in a separate array learn more about rules and limitations of keyword and keywords fields in DataForSEO APIs in this Help Center article"
            },
            "device": {
              "type": "string",
              "description": "device type optional field specify this field if you want to get the data for a particular device typepossible values: desktop, mobile, tablet, all default value: all"
            },
            "match": {
              "type": "string",
              "description": "keywords match type optional field can take the following values: aggregate returns data across all match types; broad returns data for all user queries containing the specified keyword with varying word order; phrase returns data for all user queries containing the specified keyword with identical word order; exact returns data for user query that matches the specified keyword;Note: the aggregate match type is applied by default"
            },
            "location_name": {
              "type": "string",
              "description": "full name of search engine location required field if you don’t specify location_code or location_coordinate if you use this field, you don’t need to specify location_code or location_coordinate you can receive the list of available locations and languages by making a separate request to https://api.dataforseo.com/v3/keywords_data/bing/keyword_performance/locations_and_languages example: \"United States\""
            },
            "location_code": {
              "type": "integer",
              "description": "search engine location code required field if you don’t specify location_name or location_coordinate if you use this field, you don’t need to specify location_name or location_coordinate you can receive the list of available locations and languages by making a separate request to https://api.dataforseo.com/v3/keywords_data/bing/keyword_performance/locations_and_languages example: 2840"
            },
            "location_coordinate": {
              "type": "string",
              "description": "GPS coordinates of a location required field if you don’t specify location_name or location_code if you use this field, you don’t need to specify location_name or location_code location_coordinate parameter should be specified in the “latitude,longitude” format the data will be provided for the country the specified coordinates belong to example: 52.6178549,-155.352142"
            },
            "language_name": {
              "type": "string",
              "description": "full name of search engine language required field if you don’t specify language_code if you use this field, you don’t need to specify language_code you can receive the list of available locations and languages by making a separate request to https://api.dataforseo.com/v3/keywords_data/bing/keyword_performance/locations_and_languages example: English"
            },
            "language_code": {
              "type": "string",
              "description": "search engine language code required field if you don’t specify language_name you can receive the list of available locations and languages by making a separate request to https://api.dataforseo.com/v3/keywords_data/bing/keyword_performance/locations_and_languages example: \"en\""
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
    "seo-keywords"
  ]
}
```
