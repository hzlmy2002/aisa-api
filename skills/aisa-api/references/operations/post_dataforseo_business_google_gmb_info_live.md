# post_dataforseo_business_google_gmb_info_live

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "post_dataforseo_business_google_gmb_info_live",
  "successful": true,
  "description": "One Google Business Profile: name, address, phone, hours, rating, category and the attributes Google shows on the panel. Wrapped in DataForSEO's envelope: data in `tasks[0].result`, outcome in `tasks[0].status_code` - a rejected request still returns HTTP 200. The queued twin is `post_dataforseo_business_google_gmb_info_submit`. For what the owner has posted recently use `post_dataforseo_business_google_gmb_updates_submit`, and for customer opinion `post_dataforseo_business_google_reviews_submit`.",
  "provider": "dataforseo",
  "method": "POST",
  "path": "/apis/v1/dataforseo/business_data/google/my_business_info/live",
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
              "description": "*keyword* **required field** the keyword you specify should indicate the name of the local establishment you can specify **up to 700 characters** in the `keyword` filed **all %## will be decoded (plus character ‘+’ will be decoded to a space character)** if you need to use the “%” character for your `keyword`, please specify it as “%25”; this field can also be used to pass the following parameters: `cid` – a unique, google-defined id of the business entity; `place_id` – an identifier of the business entity in Google Maps; `spp` – a unique identifier of local services featured in the `local_pack` element of Google SERP example: `cid:194604053573767737` `place_id:GhIJQWDl0CIeQUARxks3icF8U8A` `spp:CgsvZy8xdGN4cWRraBoUChIJPZDrEzLsZIgRoNrpodC5P30` learn more about the `cid` and `place_id` identifiers in [this help center article](https://dataforseo.com/help-center/what-is-cid-place-id-feature-id) learn more about rules and limitations of `keyword` and `keywords` fields in DataForSEO APIs in this [Help Center article](https://dataforseo.com/help-center/rules-and-limitations-of-keyword-and-keywords-fields-in-dataforseo-apis)"
            },
            "location_name": {
              "type": "string",
              "description": "*full name of search engine location* **required field if you don’t specify** `location_code` or `location_coordinate` **if you use this field, you don’t need to specify `location_code` or `location_coordinate`** you can receive the list of available locations with `location_name` by making a separate request to `https://api.dataforseo.com/v3/business_data/google/locations` example: `London,England,United Kingdom`"
            },
            "location_code": {
              "type": "integer",
              "description": "*search engine location code* **required field if you don’t specify** `location_name` or `location_coordinate` **if you use this field, you don’t need to specify `location_name` or `location_coordinate`** you can receive the list of available locations with `location_code` by making a separate request to the `https://api.dataforseo.com/v3/business_data/google/locations` example: `2840`"
            },
            "location_coordinate": {
              "type": "string",
              "description": "*GPS coordinates of a location* **required field if you don’t specify** `location_name` or `location_code` **if you use this field, you don’t need to specify `location_name` or `location_code`** `location_coordinate` parameter should be specified in the *“latitude,longitude,radius”* format the maximum number of decimal digits for *“latitude”* and *“longitude”*: 7 the minimum value for *“radius”*: 199.9 (mm) the maximum value for *“radius”*: 199999 (mm) example: `53.476225,-2.243572,200`"
            },
            "language_name": {
              "type": "string",
              "description": "*full name of search engine language* **required field if you don’t specify** `language_code` **if you use this field, you don’t need to specify `language_code`** you can receive the list of available languages with `language_name` by making a separate request to `https://api.dataforseo.com/v3/business_data/google/languages` example: `English`"
            },
            "language_code": {
              "type": "string",
              "description": "*search engine language code* **required field if you don’t specify** `language_name` **if you use this field, you don’t need to specify `language_name`** you can receive the list of available languages with their `language_code` by making a separate request to `https://api.dataforseo.com/v3/business_data/google/languages` example: `en`"
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
