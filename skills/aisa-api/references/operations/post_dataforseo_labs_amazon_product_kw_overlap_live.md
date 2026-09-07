# post_dataforseo_labs_amazon_product_kw_overlap_live

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "post_dataforseo_labs_amazon_product_kw_overlap_live",
  "successful": true,
  "description": "The Amazon search terms two or more products both rank for. Pages with `limit`, `offset` and `offset_token`; use the token past the first pages. 💰 Measured at $0.01212 upstream, essentially the flat rate billed. **This family is the one to reach for by default**: the google_ads endpoints in seo-keywords answer similar questions at $0.09 - seven times more - and return megabytes with no way to cap them, where this one takes a `limit`. Wrapped in DataForSEO's envelope: data in `tasks[0].result`, outcome in `tasks[0].status_code` - a rejected request still returns HTTP 200. Where `post_dataforseo_labs_amazon_product_competitors_live` names the rivals, this names the terms they contest.",
  "provider": "dataforseo",
  "method": "POST",
  "path": "/apis/v1/dataforseo/dataforseo_labs/amazon/product_keyword_intersections/live",
  "arguments_schema": {
    "type": "object",
    "properties": {
      "body": {
        "type": "array",
        "items": {
          "required": [
            "asins"
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
            "asins": {
              "type": "object",
              "additionalProperties": {
                "type": "string"
              },
              "description": "asins of target products required field product IDs of the products for which you need to find keyword intersections; specify the ASINs as in the following example: \"asins\": { \"1\": \"019005476X\", \"2\": \"0190074442\" } the maximum number of ASINs you can specify in this object is 20; learn more about the parameter on this help center page"
            },
            "location_name": {
              "type": "string",
              "description": "full name of the location required field if don’t specify location_code you can receive the list of available locations with their location_name by making a separate request to https://api.dataforseo.com/v3/dataforseo_labs/locations_and_languages; Note: this endpoint currently supports the US, Egypt, Saudi Arabia, and the United Arab Emirates locations only; example: United Kingdom"
            },
            "location_code": {
              "type": "integer",
              "description": "location code required field if don’t specify location_name you can receive the list of available locations with their location_code by making a separate request to https://api.dataforseo.com/v3/dataforseo_labs/locations_and_languages; Note: this endpoint currently supports the US, Egypt, Saudi Arabia, and the United Arab Emirates locations only; example: 2840"
            },
            "language_name": {
              "type": "string",
              "description": "full name of the language required field if don’t specify language_code you can receive the list of available languages with their language_name by making a separate request to the https://api.dataforseo.com/v3/dataforseo_labs/locations_and_languages example: English"
            },
            "language_code": {
              "type": "string",
              "description": "language code required field if don’t specify language_name you can receive the list of available languages with their language_code by making a separate request to the https://api.dataforseo.com/v3/dataforseo_labs/locations_and_languages example: en"
            },
            "limit": {
              "type": "integer",
              "description": "the maximum number of products in the results array optional field default value: 100; maximum value: 1000"
            },
            "intersection_mode": {
              "type": "string",
              "description": "mode for finding asin intersections optional field possible values: union, intersect; default value: intersect; learn more about the parameter in this help center guide"
            },
            "filters": {
              "type": "array",
              "items": {},
              "description": "array of results filtering parameters optional field you can add several filters at once (8 filters maximum) you should set a logical operator and, or between the conditions the following operators are supported: regex, not_regex, , , >, >=, =, , in, not_in, ilike, not_ilike, like, not_like, match, not_match you can use the % operator with like and not_like, as well as ilike and not_ilike to match any string of zero or more characters example: [\"avg_position\",\" for more information about filters, please refer to Dataforseo Labs – Filters or this help center guide"
            },
            "order_by": {
              "type": "array",
              "items": {
                "type": "string"
              },
              "description": "results sorting rules optional field you can use the same values as in the filters array to sort the results possible sorting types: asc – results will be sorted in the ascending order desc – results will be sorted in the descending order you should use a comma to set up a sorting parameter example: [\"sum_position,desc\"] note that you can set no more than three sorting rules in a single request you should use a comma to separate several sorting rules example: [\"intersections,desc\",\"avg_position,asc\"] default rule: [\"intersections,desc\"]"
            },
            "offset": {
              "type": "integer",
              "description": "offset in the results array of returned keywords optional field default value: 0 if you specify the 10 value, the first ten keywords in the results array will be omitted and the data will be provided for the successive keywords"
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
