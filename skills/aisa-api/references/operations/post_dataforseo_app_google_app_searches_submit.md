# post_dataforseo_app_google_app_searches_submit

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "post_dataforseo_app_google_app_searches_submit",
  "successful": true,
  "description": "Queues a Google Play search for a `keyword`, returning a task `id`. `location_code`, `language_code` and `depth` shape it. Asynchronous: submit returns a task `id` in `tasks[0].id` and the fetch tool returns the result once ready. 💰 The charge lands on the submit, measured at $0.0012; fetching is free, including re-fetching. `location_code` 2840 is the United States. ⚠️ Do not fetch the Google location list to look one up - `get_dataforseo_app_google_locations` measured 46 MB. Retrieve with `get_dataforseo_app_google_app_searches_fetch`.",
  "provider": "dataforseo",
  "method": "POST",
  "path": "/apis/v1/dataforseo/app_data/google/app_searches/task_post",
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
            "keyword": {
              "type": "string",
              "description": "keyword required field you can specify up to 700 characters in the keyword field; all %## will be decoded (plus character ‘+’ will be decoded to a space character); if you need to use the “%” character for your keyword, please specify it as “%25”; if you need to use the “+” character for your keyword, please specify it as “%2B” learn more about rules and limitations of keyword and keywords fields in DataForSEO APIs in this Help Center article"
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
              "description": "full name of search engine language optional field if you use this field, you don’t need to specify language_code you can receive the list of available languages with language_name by making a separate request to https://api.dataforseo.com/v3/app_data/google/languages example: English"
            },
            "language_code": {
              "type": "string",
              "description": "search engine language code optional field if you use this field, you don’t need to specify language_name you can receive the list of available languages with their language_code by making a separate request to https://api.dataforseo.com/v3/app_data/google/languages example: en"
            },
            "priority": {
              "type": "integer",
              "description": "task priority optional field can take the following values: 1 – normal execution priority (set by default) 2 – high execution priority You will be additionally charged for the tasks with high execution priority. The cost can be calculated on the Pricing page."
            },
            "depth": {
              "type": "integer",
              "description": "parsing depth optional field number of results to be returned to be returned from the Google Play SERP; we strongly recommend setting the parsing depth in the multiples of 30, because our system processes 30 results in a row; default value: 30; maximum value: 200; Your account will be billed per each SERP containing up to 30 results; Setting depth above 30 may result in additional charges if the search engine returns more than 30 results; The cost can be calculated on the Pricing page."
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
