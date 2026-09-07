# post_dataforseo_keywords_bing_audience_live

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "post_dataforseo_keywords_bing_audience_live",
  "successful": true,
  "description": "Estimates the Bing Ads audience reachable at a given `bid` and `daily_budget`, narrowed by `location_code`, `age`, industry and job function. Wrapped in DataForSEO's envelope: data in `tasks[0].result`, outcome in `tasks[0].status_code` - a rejected request still returns HTTP 200. Industry and job-function values come from `get_dataforseo_keywords_bing_audience_industries` and `get_dataforseo_keywords_bing_audience_job_functions` - both free, and both worth reading before composing a request. The submit and fetch twins of this endpoint do the same work asynchronously, at the same price, for batches too large to wait on.",
  "provider": "dataforseo",
  "method": "POST",
  "path": "/apis/v1/dataforseo/keywords_data/bing/audience_estimation/live",
  "arguments_schema": {
    "type": "object",
    "properties": {
      "body": {
        "type": "array",
        "items": {
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
            }
          ],
          "properties": {
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
              "description": "GPS coordinates of a location required field if you don’t specify location_name or location_code if you use this field, you don’t need to specify location_name or location_code location_coordinate parameter should be specified in the “latitude,longitude,radius (in km)” format the data will be provided for the country the specified coordinates belong to example: 29.6821525,-82.4098881,100"
            },
            "age": {
              "type": "array",
              "items": {
                "type": "string"
              },
              "description": "selection of age ranges for targeting possible values: eighteen_to_twenty_four, fifty_to_sixty_four, sixty_five_and_above, thirteen_to_seventeen, thirty_five_to_forty_nine, twenty_five_to_thirty_four, unknown, zero_to_twelve"
            },
            "bid": {
              "type": "number",
              "description": "desired bid setting value in USD maximum value: 1000"
            },
            "daily_budget": {
              "type": "number",
              "description": "daily campaign budget value in USD maximum value: 10000"
            },
            "gender": {
              "type": "array",
              "items": {
                "type": "string"
              },
              "description": "gender to target possible values: male, female, unknown"
            },
            "industry": {
              "type": "array",
              "items": {
                "type": "integer"
              },
              "description": "industry of LinkedIn profile targeting if you use this field, you can receive the list of available industry names with industry_id by making a separate request to the https://api.dataforseo.com/v3/keywords_data/bing/audience_estimation/industries example: 806301758"
            },
            "job_function": {
              "type": "array",
              "items": {
                "type": "integer"
              },
              "description": "job function of LinkedIn profile targeting if you use this field, you can receive the list of available job function names with job_function_id by making a separate request to the https://api.dataforseo.com/v3/keywords_data/bing/audience_estimation/job_functions example: 806300451"
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
