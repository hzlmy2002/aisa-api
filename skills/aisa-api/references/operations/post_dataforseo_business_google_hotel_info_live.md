# post_dataforseo_business_google_hotel_info_live

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "post_dataforseo_business_google_hotel_info_live",
  "successful": true,
  "description": "One hotel's Google listing: rooms, amenities, prices and the booking options Google shows. Wrapped in DataForSEO's envelope: data in `tasks[0].result`, outcome in `tasks[0].status_code` - a rejected request still returns HTTP 200. The raw form is `post_dataforseo_business_google_hotel_info_live_html`, and the queued form `post_dataforseo_business_google_hotel_info_submit`. To find the hotel first use `post_dataforseo_business_google_hotel_searches_live`.",
  "provider": "dataforseo",
  "method": "POST",
  "path": "/apis/v1/dataforseo/business_data/google/hotel_info/live/advanced",
  "arguments_schema": {
    "type": "object",
    "properties": {
      "body": {
        "type": "array",
        "items": {
          "required": [
            "hotel_identifier"
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
            "hotel_identifier": {
              "type": "string",
              "description": "*unique hotel identifier* **required field** unique identifier of a hotel entity in Google search; you can obtain the value by making a request to Advanced [Google SERP API](https://docs.dataforseo.com/v3/serp/google/organic/overview.md) (enclosed in the `hotels` element of the response), or the [Hotel Searches endpoint](https://docs.dataforseo.com/v3/business_data/google/hotel_searches/task_post.md) of Business Data API example: `ChYIq6SB--i6p6cpGgovbS8wN2s5ODZfEAE`"
            },
            "location_name": {
              "type": "string",
              "description": "*full name of search engine location* **required field if you don’t specify `location_code` or `location_coordinate`** **if you use this field, you don’t need to specify `location_code` or `location_coordinate`** you can receive the list of available locations with `location_name` by making a separate request to `https://api.dataforseo.com/v3/business_data/google/locations` example: `London,England,United Kingdom`"
            },
            "location_code": {
              "type": "integer",
              "description": "*search engine location code* **required field if you don’t specify `location_name` or `location_coordinate`** **if you use this field, you don’t need to specify `location_name` or `location_coordinate`** you can receive the list of available locations with `location_code` by making a separate request to the `https://api.dataforseo.com/v3/business_data/google/locations` example: `2840`"
            },
            "location_coordinate": {
              "type": "string",
              "description": "*GPS coordinates of a location* **required field if you don’t specify `location_name` or `location_code`** **if you use this field, you don’t need to specify `location_name` or `location_code`** `location_coordinate` parameter should be specified in the *“latitude, longitude”* format the maximum number of decimal digits for *“latitude”* and *“longitude”*: 7 **Note**: if the coordinates are used to set a location, the search will occur in the nearest settlement; example: `53.476225,-2.243572`"
            },
            "language_name": {
              "type": "string",
              "description": "*full name of search engine language* **required field if you don’t specify `language_code`** **if you use this field, you don’t need to specify `language_code`** you can receive the list of available languages with `language_name` by making a separate request to `https://api.dataforseo.com/v3/business_data/google/languages` example: `English`"
            },
            "language_code": {
              "type": "string",
              "description": "*search engine language code* **required field if you don’t specify `language_name`** **if you use this field, you don’t need to specify `language_name`** you can receive the list of available languages with their `language_code` by making a separate request to `https://api.dataforseo.com/v3/business_data/google/languages` example: `en`"
            },
            "check_in": {
              "type": "string",
              "description": "*check-in date* optional field if you don’t specify this field, tomorrow’s date will be used by default; the value must not be earlier than today’s date date format: `\"yyyy-mm-dd\"` example: `\"2019-01-15\"`"
            },
            "check_out": {
              "type": "string",
              "description": "*check-out date* optional field if you don’t specify this field, our system will apply the date of two days from now by default; **Note:** the value cannot be less than or equal to `check_in`; the range between `check_in` and `check_out` values cannot exceed 30 days date format: `\"yyyy-mm-dd\"` example: `\"2019-01-15\"`"
            },
            "currency": {
              "type": "string",
              "description": "*currency* optional field example: `\"USD\"`"
            },
            "adults": {
              "type": "integer",
              "description": "*number of adults* optional field if you don’t specify this field, two adults will be used by default example: `1`"
            },
            "children": {
              "type": "array",
              "items": {
                "type": "integer"
              },
              "description": "*number and age of children* optional field if you don’t specify this field, no children will be included in the search; set the following value if you want to include one 14-years-old child: `[14]` set the following value if you want to include one 13-years-old child and one 8-years-old child: `[13,8]`"
            },
            "load_prices_by_dates": {
              "type": "boolean",
              "description": "*load hotel stay prices by dates* optional field if you specify this parameter with `true`, the response will include the `prices_by_dates` array with hotel stay prices divided by dates if you use this parameter, you will be charged **double the base price for a request**"
            },
            "prices_start_date": {
              "type": "string",
              "description": "*start date to load prices by dates* optional field to use this parameter, you must specify `load_prices_by_dates` with `true` if this parameter is not specified, the start date is set to `check_in` date date format: `yyyy-mm-dd` example: `2025-05-20`"
            },
            "prices_end_date": {
              "type": "string",
              "description": "*end date to load prices by dates* optional field to use this parameter, you must specify `load_prices_by_dates` with `true` if this parameter is not specified, you will get prices by date for the month date format: `yyyy-mm-dd` example: `2025-05-21`"
            },
            "prices_date_range": {
              "type": "string",
              "description": "*predefined period for retrieving daily price data* optional field to use this parameter, you must specify `load_prices_by_dates` with `true` if the `prices_start_date `is not specified, the start date is set to `check_in` date possible values: `month`, `three_months`, `six_months`, `year` default value: `month`"
            },
            "tag": {
              "type": "string",
              "description": "*user-defined task identifier* optional field *the character limit is 255* you can use this parameter to identify the task and match it with the result you will find the specified `tag` value in the `data` object of the response"
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
    "seo-business"
  ]
}
```
