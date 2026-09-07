# post_dataforseo_business_google_gmb_updates_submit

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "post_dataforseo_business_google_gmb_updates_submit",
  "successful": true,
  "description": "Queues the posts a business has published to its Google Business Profile, returning a task `id`. Asynchronous: submit returns a task `id` in `tasks[0].id`, fetch returns the result once ready, and the charge lands on the submit - fetching is free, including re-fetching. Wrapped in DataForSEO's envelope: data in `tasks[0].result`, outcome in `tasks[0].status_code` - a rejected request still returns HTTP 200. There is no live variant - updates always queue. The profile itself is `post_dataforseo_business_google_gmb_info_live`.",
  "provider": "dataforseo",
  "method": "POST",
  "path": "/apis/v1/dataforseo/business_data/google/my_business_updates/task_post",
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
            "keyword": {
              "type": "string",
              "description": "*keyword* **required field** the keyword you specify should indicate the name of the local establishment you can specify **up to 700 characters** in the `keyword` filed **all %## will be decoded (plus character ‘+’ will be decoded to a space character)** if you need to use the “%” character for your `keyword`, please specify it as “%25”;this field can also be used to pass `cid` (unique, google-defined id of the business entity) or `place_id` (identifier of the business entity in Google Maps) parameters example: `cid:194604053573767737` `place_id:GhIJQWDl0CIeQUARxks3icF8U8A`learn more about the `cid` and `place_id` identifiers in [this help center article](https://dataforseo.com/help-center/what-is-cid-place-id-feature-id)"
            },
            "priority": {
              "type": "integer",
              "description": "*task priority* optional field can take the following values: 1 – normal execution priority (set by default) 2 – high execution priority You will be additionally charged for the tasks with high execution priority. The cost can be calculated on the [Pricing](https://dataforseo.com/pricing/business-data/business-data-api \"Pricing\") page."
            },
            "location_name": {
              "type": "string",
              "description": "*full name of search engine location* **required field if you don’t specify** `location_code` or `location_coordinate` **if you use this field, you don’t need to specify `location_code` or `location_coordinate`** you can receive the list of available locations with `location_name` by making a separate request to the `https://api.dataforseo.com/v3/business_data/google/locations` example: `London,England,United Kingdom`"
            },
            "location_code": {
              "type": "integer",
              "description": "*search engine location code* **required field if you don’t specify** `location_name` or `location_coordinate` **if you use this field, you don’t need to specify `location_name` or `location_coordinate`** you can receive the list of available locations with `location_code` by making a separate request to the `https://api.dataforseo.com/v3/business_data/google/locations` example: `2840`"
            },
            "location_coordinate": {
              "type": "string",
              "description": "*GPS coordinates of a location* **required field if you don’t specify** `location_name` or `location_code` **if you use this field, you don’t need to specify `location_name` or `location_code`** `location_coordinate` parameter should be specified in the *“latitude,longitude,radius”* format the maximum number of decimal digits for *“latitude”* and *“longitude”*: 7 the minimum value for *“radius”*: 199.9 example: `53.476225,-2.243572,200`"
            },
            "language_name": {
              "type": "string",
              "description": "*full name of search engine language* **required field if you don’t specify** `language_code` **if you use this field, you don’t need to specify `language_code`** you can receive the list of available languages with `language_name` by making a separate request to the `https://api.dataforseo.com/v3/business_data/google/languages` example: `English`"
            },
            "language_code": {
              "type": "string",
              "description": "*search engine language code* **required field if you don’t specify** `language_name` **if you use this field, you don’t need to specify `language_name`** you can receive the list of available languages with their `language_code` by making a separate request to the `https://api.dataforseo.com/v3/business_data/google/languages` example: `en`"
            },
            "depth": {
              "type": "integer",
              "description": "*parsing depth* optional field number of updates in SERP we strongly recommend setting the parsing depth in the multiples of ten, because our systems processes ten updates in a row **please note that Google returns 4490 updates maximum** default value: `10`"
            },
            "tag": {
              "type": "string",
              "description": "*user-defined task identifier* optional field *the character limit is 255* you can use this parameter to identify the task and match it with the result you will find the specified `tag` value in the `data` object of the response"
            },
            "postback_url": {
              "type": "string",
              "description": "*return URL for sending task results* optional field once the task is completed, we will send a POST request with its results compressed in the `gzip` format to the `postback_url` you specified you can use the ‘$id’ string as a `$id` variable and ‘$tag’ as urlencoded `$tag` variable. We will set the necessary values before sending the request. example: `http://your-server.com/postbackscript?id=$id` `http://your-server.com/postbackscript?id=$id&tag=$tag` **Note:** special characters in `postback_url` will be urlencoded; i.a., the `#` character will be encoded into `%23`learn more on our [Help Center](https://dataforseo.com/help-center/pingbacks-postbacks-with-dataforseo-api)"
            },
            "pingback_url": {
              "type": "string",
              "description": "*notification URL of a completed task* optional field when a task is completed we will notify you by GET request sent to the URL you have specified you can use the ‘$id’ string as a `$id` variable and ‘$tag’ as urlencoded `$tag` variable. We will set the necessary values before sending the request. example: `http://your-server.com/pingscript?id=$id` `http://your-server.com/pingscript?id=$id&tag=$tag` **Note:** special characters in `pingback_url` will be urlencoded; i.a., the `#` character will be encoded into `%23`learn more on our [Help Center](https://dataforseo.com/help-center/pingbacks-postbacks-with-dataforseo-api)"
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
