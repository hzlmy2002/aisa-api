# post_dataforseo_keywords_bing_kw_for_site_live

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "post_dataforseo_keywords_bing_kw_for_site_live",
  "successful": true,
  "description": "The Bing keywords a whole site ranks or bids for, from a `target` domain. Measured at $0.09 upstream against $0.012 billed. Wrapped in DataForSEO's envelope: data in `tasks[0].result`, outcome in `tasks[0].status_code` - a rejected request still returns HTTP 200. ⚠️ The Google equivalent measured 7.2 MB for one site with no way to cap it; assume the same shape here. The Google twin is `post_dataforseo_keywords_gads_kw_for_site_live`. The submit and fetch twins of this endpoint do the same work asynchronously, at the same price, for batches too large to wait on.",
  "provider": "dataforseo",
  "method": "POST",
  "path": "/apis/v1/dataforseo/keywords_data/bing/keywords_for_site/live",
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
            "target": {
              "type": "string",
              "description": "domain or URL required field the domain name or URL of the target website"
            },
            "location_name": {
              "type": "string",
              "description": "full name of search engine location required field if you don’t specify location_code or location_coordinate if you use this field, you don’t need to specify location_code or location_coordinate you can receive the list of available locations of the search engine with their location_name by making a separate request to https://api.dataforseo.com/v3/keywords_data/bing/locations example: London,England,United Kingdom"
            },
            "location_code": {
              "type": "integer",
              "description": "search engine location code required field if you don’t specify location_name or location_coordinate if you use this field, you don’t need to specify location_name or location_coordinate you can receive the list of available locations of the search engines with their location_code by making a separate request to https://api.dataforseo.com/v3/keywords_data/bing/locations example: 2840"
            },
            "location_coordinate": {
              "type": "string",
              "description": "GPS coordinates of a location required field if you don’t specify location_name or location_code if you use this field, you don’t need to specify location_name or location_code location_coordinate parameter should be specified in the “latitude,longitude” format the data will be provided for the country the specified coordinates belong to example: 52.6178549,-155.352142"
            },
            "language_name": {
              "type": "string",
              "description": "full name of search engine language required field if you don’t specify language_code if you use this field, you don’t need to specify language_code supported languages: English, French, German"
            },
            "language_code": {
              "type": "string",
              "description": "search engine language code required field if you don’t specify language_name if you use this field, you don’t need to specify language_name supported languages: en, fr, de"
            },
            "keywords_negative": {
              "type": "array",
              "items": {
                "type": "string"
              },
              "description": "keywords negative array optional field These keywords will be ignored in the results array; You can specify a maximum of 200 terms that you want to exclude from the results; the specified keywords will be converted to lowercase format"
            },
            "device": {
              "type": "string",
              "description": "device type optional field specify this field if you want to get the data for a particular device typepossible values: all, mobile, desktop, tablet default value: all"
            },
            "date_from": {
              "type": "string",
              "description": "starting date of the time range optional field minimal value: 24 months from today’s date; if you don’t specify this field, data will be provided for the last 12 months date format: \"yyyy-mm-dd\" example: \"2020-01-01\" Note: we do not recommend using a custom time range for the past year’s dates"
            },
            "date_to": {
              "type": "string",
              "description": "ending date of the time range optional field if you don’t specify this field, data will be provided for the last 12 months; minimum value: two years back from today’s date; maximum value: one month from today’s date; note: we do not recommend using a custom time range for the past year’s dates; date format: \"yyyy-mm-dd\" example: \"2020-03-15\" Note: we do not recommend using a custom time range for the past year’s dates"
            },
            "sort_by": {
              "type": "string",
              "description": "results sorting parameters optional field Use these parameters to sort the results by search_volume, cpc, competition or relevance in the descending order default value: relevance"
            },
            "search_partners": {
              "type": "boolean",
              "description": "Bing search partners type optional field if you specify true, the results will be delivered for owned, operated, and syndicated networks across Bing, Yahoo, AOL and partner sites that host Bing, AOL, and Yahoo search. default value: false – results are returned for Bing, AOL, and Yahoo search networks"
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
