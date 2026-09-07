# post_dataforseo_keywords_trends_explore_live

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "post_dataforseo_keywords_trends_explore_live",
  "successful": true,
  "description": "Interest over time for up to five `keywords`, the Google Trends curve. Returns `keywords`, `type`, `location_code`, `language_code`, `datetime`, `items_count` and `items`. `type` selects web, news, images, youtube or shopping, and `date_from`/`date_to` set the window. Measured at 21.7 KB and **$0.0012 upstream - by far the best margin in this family**, two orders of magnitude cheaper than the Google Ads endpoints beside it. Wrapped in DataForSEO's envelope: data in `tasks[0].result`, outcome in `tasks[0].status_code` - a rejected request still returns HTTP 200. Trends gives relative interest, not absolute volume; for counts use `post_dataforseo_keywords_gads_search_volume_live`.",
  "provider": "dataforseo",
  "method": "POST",
  "path": "/apis/v1/dataforseo/keywords_data/dataforseo_trends/explore/live",
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
          "properties": {
            "keywords": {
              "type": "array",
              "items": {
                "type": "string"
              },
              "description": "keywords required field the maximum number of keywords you can specify: 5 learn more about rules and limitations of keyword and keywords fields in DataForSEO APIs in this Help Center article"
            },
            "location_name": {
              "type": "string",
              "description": "full name of search engine location optional field if you don’t use this field, you will recieve global results if you use this field, you don’t need to specify location_code you can receive the list of available locations of the search engine with their location_name by making a separate request to https://api.dataforseo.com/v3/keywords_data/dataforseo_trends/locations note that the data will be provided for the country the specified location_name belongs to; example: United Kingdom"
            },
            "location_code": {
              "type": "integer",
              "description": "search engine location code optional field if you don’t use this field, you will recieve global results if you use this field, you don’t need to specify location_name you can receive the list of available locations of the search engines with their location_code by making a separate request to https://api.dataforseo.com/v3/keywords_data/dataforseo_trends/locations note that the data will be provided for the country the specified location_code belongs to; example: 2840"
            },
            "type": {
              "type": "string",
              "description": "dataforseo trends type optional field if you don’t specify this field, the web type will be used by default possible values: web, news, ecommerce"
            },
            "date_from": {
              "type": "string",
              "description": "starting date of the time range optional field if you don’t specify this field, the current day and month of the preceding year will be used by default minimal value for the web type: 2004-01-01 minimal value for other types: 2008-01-01 date format: \"yyyy-mm-dd\" example: \"2019-01-15\""
            },
            "date_to": {
              "type": "string",
              "description": "ending date of the time range optional field if you don’t specify this field, the today’s date will be used by default date format: \"yyyy-mm-dd\" example: \"2019-01-15\""
            },
            "time_range": {
              "type": "string",
              "description": "preset time ranges optional field if you specify date_from or date_to parameters, this field will be ignored when setting a task possible values for all type parameters: past_4_hours, past_day, past_7_days, past_30_days, past_90_days, past_12_months, past_5_years"
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
