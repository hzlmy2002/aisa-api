# post_dataforseo_app_google_app_list_submit

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "post_dataforseo_app_google_app_list_submit",
  "successful": true,
  "description": "Queues one of Google Play's own curated collections - top free, top grossing, trending - chosen with `app_collection`, returning a task `id`. `depth` caps how far down the chart to read. Asynchronous: submit returns a task `id` in `tasks[0].id` and the fetch tool returns the result once ready. 💰 The charge lands on the submit, measured at $0.0012; fetching is free, including re-fetching. Retrieve with `get_dataforseo_app_google_app_list_fetch`. This is the chart view; for a keyword search use `post_dataforseo_app_google_app_searches_submit`.",
  "provider": "dataforseo",
  "method": "POST",
  "path": "/apis/v1/dataforseo/app_data/google/app_list/task_post",
  "arguments_schema": {
    "type": "object",
    "properties": {
      "body": {
        "type": "array",
        "items": {
          "required": [
            "app_collection"
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
            },
            {
              "anyOf": [
                {
                  "not": {
                    "required": [
                      "postback_url"
                    ]
                  }
                },
                {
                  "required": [
                    "postback_data"
                  ]
                }
              ]
            }
          ],
          "properties": {
            "app_collection": {
              "type": "string",
              "description": "app collection required field app collection on Google Play from which apps will be collected; you can specify the following values: featured, topselling_paid, topselling_free, topselling_new_free, topselling_new_paid, topgrossing, movers_shakers Note: if featured is selected, the app_category parameter cannot be used"
            },
            "location_name": {
              "type": "string",
              "description": "full name of search engine location required field if you don’t specify location_code if you use this field, you don’t need to specify location_code you can receive the list of available locations of the search engine with their location_name by making a separate request to https://api.dataforseo.com/v3/app_data/google/locations example: West Los Angeles,California,United States"
            },
            "location_code": {
              "type": "integer",
              "description": "search engine location code required field if you don’t specify location_name if you use this field, you don’t need to specify location_name you can receive the list of available locations of the search engine with their location_code by making a separate request to https://api.dataforseo.com/v3/app_data/google/locations example: 9061121"
            },
            "language_name": {
              "type": "string",
              "description": "full name of search engine language required field if language_code is not specified if you use this field, you don’t need to specify language_code you can receive the list of available languages with language_name by making a separate request to https://api.dataforseo.com/v3/app_data/google/languages example: English"
            },
            "language_code": {
              "type": "string",
              "description": "search engine language code required field if language_name is not specified if you use this field, you don’t need to specify language_name you can receive the list of available languages with their language_code by making a separate request to https://api.dataforseo.com/v3/app_data/google/languages example: en"
            },
            "priority": {
              "type": "integer",
              "description": "task priority optional field can take the following values: 1 – normal execution priority (set by default) 2 – high execution priority You will be additionally charged for the tasks with high execution priority. The cost can be calculated on the Pricing page."
            },
            "depth": {
              "type": "integer",
              "description": "parsing depth optional field number of apps to be returned in the API response; we strongly recommend setting the parsing depth in the multiples of 100, because our system processes 100 results in a row; default value: 100; maximum value: 200; Your account will be billed per each SERP containing up to 100 results; Setting depth above 100 may result in additional charges if the search engine returns more than 100 results; The cost can be calculated on the Pricing page."
            },
            "app_category": {
              "type": "string",
              "description": "application category on Google Play optional field you can filter the results by app category; example: family; you can receive the full list of available categories by making a separate request to https://api.dataforseo.com/v3/app_data/google/categories Note: app_category cannot be used if app_collection parameter is set to featured"
            },
            "age_rating": {
              "type": "string",
              "description": "filter results by age rating optional field you can use this field to filter the results by age rating; possible types of filtering: ages_up_to_5 — return apps approved for children up to 5 years old; ages_6_8 — return apps approved for children from 6 to 8 years old; ages_9_12 — return apps approved for children from 9 to 12 years old; by default, the API returns apps for all ages; Note: this filter works only in conjunction with the \"category\": \"family\" parameter"
            },
            "tag": {
              "type": "string",
              "description": "user-defined task identifier optional field the character limit is 255 you can use this parameter to identify the task and match it with the result you will find the specified tag value in the data object of the response"
            },
            "postback_url": {
              "type": "string",
              "description": "URL for sending task results optional field once the task is completed, we will send a POST request with its results compressed in the gzip format to the postback_url you specified you can use the ‘$id’ string as a $id variable and ‘$tag’ as urlencoded $tag variable. We will set the necessary values before sending the request. example: http://your-server.com/postbackscript?id=$id http://your-server.com/postbackscript?id=$id&tag=$tag Note: special characters in postback_url will be urlencoded; i.a., the # character will be encoded into %23"
            },
            "postback_data": {
              "type": "string",
              "description": "postback_url datatype required field if you specify postback_url corresponds to the datatype that will be sent to your server possible values: advanced, html"
            },
            "pingback_url": {
              "type": "string",
              "description": "notification URL of a completed task optional field when a task is completed we will notify you by GET request sent to the URL you have specified you can use the ‘$id’ string as a $id variable and ‘$tag’ as urlencoded $tag variable. We will set the necessary values before sending the request. example: http://your-server.com/pingscript?id=$id http://your-server.com/pingscript?id=$id&tag=$tag Note: special characters in pingback_url will be urlencoded; i.a., the # character will be encoded into %23"
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
    "seo-apps"
  ]
}
```
