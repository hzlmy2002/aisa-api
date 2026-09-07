# post_dataforseo_merchant_google_product_info_submit

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "post_dataforseo_merchant_google_product_info_submit",
  "successful": true,
  "description": "Queues a lookup of one specific Google Shopping product, returning a task `id`. Identify the product with `product_id` and the `gid` or `data_docid` taken from a `get_dataforseo_merchant_google_products_fetch` result. This family is asynchronous throughout: submit returns a task `id` in `tasks[0].id`, and the fetch tool returns the result once it is ready. 💰 The charge lands on the submit, measured at $0.001 to $0.0015; fetching is free, and re-fetching costs nothing. Retrieve with `get_dataforseo_merchant_google_product_info_fetch`.",
  "provider": "dataforseo",
  "method": "POST",
  "path": "/apis/v1/dataforseo/merchant/google/product_info/task_post",
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
                  "required": [
                    "product_id"
                  ]
                },
                {
                  "required": [
                    "data_docid"
                  ]
                },
                {
                  "required": [
                    "gid"
                  ]
                }
              ]
            }
          ],
          "properties": {
            "product_id": {
              "type": "string",
              "description": "unique product identifier on Google Shopping required field if data_docid or gid is not specified we recommend specifying product_id together with data_docid and gid for optimal results; you can get this value for a certain product by making a separate request to the Google Shopping Products endpoint example: 4485466949985702538 learn more about the parameter in this help center guide"
            },
            "data_docid": {
              "type": "string",
              "description": "unique identifier of the SERP data element required field if product_id or gid is not specified we recommend specifying data_docid together with product_id and gid for optimal results; you can get this value for a certain element by making a separate request to the Google Shopping Products endpoint example: 13071766526042404278"
            },
            "gid": {
              "type": "string",
              "description": "global product identifier on Google Shopping required field if product_id or data_docid is not specified we recommend specifying gid together with product_id and data_docid for optimal results; you can get this value for a certain product by making a separate request to the Google Shopping Products endpoint example: 4702526954592161872 learn more about the parameter in this help center guide"
            },
            "priority": {
              "type": "integer",
              "description": "task priority optional field can take the following values: 1 – normal execution priority (set by default) 2 – high execution priority You will be additionally charged for the tasks with high execution priority. The cost can be calculated on the Pricing page."
            },
            "location_name": {
              "type": "string",
              "description": "full name of the location required field if you don’t specify location_code or location_coordinate if you use this field, you don’t need to specify location_code or location_coordinate you can receive the list of available Google Shopping locations with their location_name by making a separate request to the https://api.dataforseo.com/v3/merchant/google/locations example: London,England,United Kingdom"
            },
            "location_code": {
              "type": "integer",
              "description": "location code required field if you don’t specify location_name or location_coordinate if you use this field, you don’t need to specify location_name or location_coordinate you can receive the list of available Google Shopping locations with their location_code by making a separate request to the https://api.dataforseo.com/v3/merchant/google/locations example: 2840"
            },
            "location_coordinate": {
              "type": "string",
              "description": "GPS coordinates of a location required field if you don’t specify location_name or location_code if you use this field, you don’t need to specify location_name or location_code location_coordinate parameter should be specified in the “latitude,longitude,radius” format the maximum number of decimal digits for “latitude” and “longitude”: 7 the minimum value for “radius”: 199.9 example: 53.476225,-2.243572,200"
            },
            "language_name": {
              "type": "string",
              "description": "full name of the language required field if you don’t specify language_code if you use this field, you don’t need to specify language_code you can receive the list of available Google Shopping languages with their language_name by making a separate request to the https://api.dataforseo.com/v3/merchant/google/languages example: English"
            },
            "language_code": {
              "type": "string",
              "description": "language code required field if you don’t specify language_name if you use this field, you don’t need to specify language_name you can receive the list of available Google Shopping languages with their language_code by making a separate request to the https://api.dataforseo.com/v3/merchant/google/languages example: en"
            },
            "se_domain": {
              "type": "string",
              "description": "search engine domain optional field we choose the relevant search engine domain automatically according to the location and language you specify however, you can set a custom search engine domain in this field example: google.co.uk, google.com.au, google.de, etc."
            },
            "tag": {
              "type": "string",
              "description": "user-defined task identifier optional field the character limit is 255 you can use this parameter to identify the task and match it with the result you will find the specified tag value in the data object of the response"
            },
            "postback_url": {
              "type": "string",
              "description": "URL for sending task results optional field once the task is completed, we will send a POST request with its results compressed in the gzip format to the postback_url you specified you can use the ‘$id’ string as a $id variable and ‘$tag’ as urlencoded $tag variable. We will set the necessary values before sending the request. example: http://your-server.com/postbackscript?id=$id http://your-server.com/postbackscript?id=$id&tag=$tag Note: special characters in postback_url will be urlencoded; i.a., the # character will be encoded into %23 learn more on our Help Center"
            },
            "postback_data": {
              "type": "string",
              "description": "postback_url datatype optional field corresponds to the datatype that will be sent to your server possible values: advanced"
            },
            "pingback_url": {
              "type": "string",
              "description": "notification URL of a completed task optional field when a task is completed we will notify you by GET request sent to the URL you have specified you can use the ‘$id’ string as a $id variable and ‘$tag’ as urlencoded $tag variable. We will set the necessary values before sending the request. example: http://your-server.com/pingscript?id=$id http://your-server.com/pingscript?id=$id&tag=$tag Note: special characters in pingback_url will be urlencoded; i.a., the # character will be encoded into %23 learn more on our Help Center"
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
    "seo-merchant"
  ]
}
```
