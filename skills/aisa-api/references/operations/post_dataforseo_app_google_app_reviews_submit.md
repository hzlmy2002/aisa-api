# post_dataforseo_app_google_app_reviews_submit

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "post_dataforseo_app_google_app_reviews_submit",
  "successful": true,
  "description": "Queues the reviews of one Google Play app by `app_id`, returning a task `id`. `depth` sets how many to collect. Asynchronous: submit returns a task `id` in `tasks[0].id` and the fetch tool returns the result once ready. 💰 The charge lands on the submit, measured at $0.0012; fetching is free, including re-fetching. Retrieve with `get_dataforseo_app_google_app_reviews_fetch`.",
  "provider": "dataforseo",
  "method": "POST",
  "path": "/apis/v1/dataforseo/app_data/google/app_reviews/task_post",
  "arguments_schema": {
    "type": "object",
    "properties": {
      "body": {
        "type": "array",
        "items": {
          "required": [
            "app_id"
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
            "app_id": {
              "type": "string",
              "description": "id of the app required field ID of the mobile application on Google Play; you can find the ID in the URL of every app listed on Google Play; example: https://play.google.com/store/apps/details?id=org.telegram.messenger"
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
              "description": "full name of search engine language required field if you don’t specify language_code if you use this field, you don’t need to specify language_code you can receive the list of available languages with language_name by making a separate request to https://api.dataforseo.com/v3/app_data/google/languages example: English"
            },
            "language_code": {
              "type": "string",
              "description": "search engine language code required field if you don’t specify language_name if you use this field, you don’t need to specify language_name you can receive the list of available languages with their language_code by making a separate request to https://api.dataforseo.com/v3/app_data/google/languages example: en"
            },
            "priority": {
              "type": "integer",
              "description": "task priority optional field can take the following values: 1 – normal execution priority (set by default) 2 – high execution priority You will be additionally charged for the tasks with high execution priority. The cost can be calculated on the Pricing page."
            },
            "depth": {
              "type": "integer",
              "description": "parsing depth optional field number of reviews to be returned in the API response; we strongly recommend setting the parsing depth in the multiples of 150, because our system processes 150 reviews in a row; default value: 150; maximum value: 100000; Your account will be billed per each SERP containing up to 150 results; Setting depth above 150 may result in additional charges if the search engine returns more than 150 results; The cost can be calculated on the Pricing page."
            },
            "rating": {
              "type": "integer",
              "description": "filter reviews by rating optional field you can use this field to filter the results; possible types of filtering: 5 — return reviews with five-star rating only; 4 — return reviews with four-star rating only; 3 — return reviews with three-star rating only; 2 — return reviews with two-star rating only; 1 — return reviews with one-star rating only; by default, the API returns all reviews regardless of the number of stars"
            },
            "sort_by": {
              "type": "string",
              "description": "results sorting parameters optional field you can use this field to sort the results; possible types of sorting: newest — sort by the most recent reviews; most_relevant — sort by the most relevant reviews; default rule: most_relevant"
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
