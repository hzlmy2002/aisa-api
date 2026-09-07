# post_dataforseo_labs_google_historical_rank_live

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "post_dataforseo_labs_google_historical_rank_live",
  "successful": true,
  "description": "A domain's rank overview as it stood at each point in the available history. 💰 Measured at $0.01212 upstream, essentially the flat rate billed - the google_ads endpoints in seo-keywords answer similar questions at $0.09. This one takes no limit parameter, but it is priced per call rather than per item, so send the whole list at once. Wrapped in DataForSEO's envelope: data in `tasks[0].result`, outcome in `tasks[0].status_code` - a rejected request still returns HTTP 200. Check `get_dataforseo_labs_google_available_history` first - it names the dates that exist, and asking for a date outside them returns nothing rather than an error. The current snapshot is `post_dataforseo_labs_google_domain_rank_overview_live`.",
  "provider": "dataforseo",
  "method": "POST",
  "path": "/apis/v1/dataforseo/dataforseo_labs/google/historical_rank_overview/live",
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
              "description": "domain required field the domain name of the target website the domain should be specified without https:// and www."
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
            "date_from": {
              "type": "string",
              "description": "starting date of the time range optional field if you don’t specify this field, the data will be provided for the previous 6 months minimal possible value: 2020-10-01 date format: \"yyyy-mm-dd\""
            },
            "date_to": {
              "type": "string",
              "description": "ending date of the time range optional field if you don’t specify this field, the today’s date will be used by default date format: \"yyyy-mm-dd\" example: \"2021-04-01\""
            },
            "correlate": {
              "type": "boolean",
              "description": "correlate data with previously obtained datasets optional field default value: true if you use this parameter, our system will correlate data you obtain now with previously obtained datasets this parameter is intended to mitigate any inconsistencies that may result from changes to our database we recommend always setting correlate to true"
            },
            "ignore_synonyms": {
              "type": "boolean",
              "description": "ignore highly similar keywords optional field if set to true, only data based on core keywords will be returned, data for all highly similar keywords will be excluded; default value: false"
            },
            "include_clickstream_data": {
              "type": "boolean",
              "description": "include or exclude data from clickstream-based metrics in the result optional field if the parameter is set to true, you will receive clickstream_etv, clickstream_gender_distribution, and clickstream_age_distribution fields with clickstream data in the response; default value: false; Note: historical clickstream data is available from 2024/05 (May, 2024); with this parameter enabled, you will be charged double the price for the request; learn more about how clickstream-based metrics are calculated in this help center article"
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
