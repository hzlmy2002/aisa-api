# post_dataforseo_app_apple_app_listings_search_live

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "post_dataforseo_app_apple_app_listings_search_live",
  "successful": true,
  "description": "Searches DataForSEO's own index of App Store listings, synchronously - the Apple twin of `post_dataforseo_app_google_app_listings_search_live`, same arguments and same shape. Measured at 8.1 KB for one result. Wrapped in DataForSEO's envelope: data in `tasks[0].result`, outcome in `tasks[0].status_code` - a rejected request still returns HTTP 200. 🔴 **Measured at $0.101 upstream, about eight times the flat rate billed**, and the price does not fall with `limit` - ask for many results in one call rather than few in several. Category names come from `get_dataforseo_app_apple_app_listings_categories`.",
  "provider": "dataforseo",
  "method": "POST",
  "path": "/apis/v1/dataforseo/app_data/apple/app_listings/search/live",
  "arguments_schema": {
    "type": "object",
    "properties": {
      "body": {
        "type": "array",
        "items": {
          "type": "object",
          "properties": {
            "categories": {
              "type": "array",
              "items": {
                "type": "string"
              },
              "description": "app categories optional field the categories you specify are used to search for app listings; you can get the full list of available app listing categories by this link you can specify up to 10 categories"
            },
            "description": {
              "type": "string",
              "description": "keyword in the app’s description optional field keywords that occur in the description of the app; can contain up to 200 characters"
            },
            "title": {
              "type": "string",
              "description": "keyword in the app’s title optional field keywords that occur in the title of the app; can contain up to 200 characters"
            },
            "filters": {
              "type": "array",
              "items": {},
              "description": "array of results filtering parameters optional field you can add several filters at once (8 filters maximum) you should set a logical operator and, or between the conditions the following operators are supported: regex, not_regex, , , >, >=, =, , in, not_in, like, not_like you can use the % operator with like and not_like to match any string of zero or more characters example: [\"rating.value\",\">\",3] you can receive the list of available filters by making a separate request to https://api.dataforseo.com/v3/app_data/apple/app_listings/available_filters"
            },
            "order_by": {
              "type": "array",
              "items": {
                "type": "string"
              },
              "description": "results sorting rules optional field you can use the same values as in the filters array to sort the results possible sorting types: asc – results will be sorted in the ascending order desc – results will be sorted in the descending order you should use a comma to set up a sorting parameter example: [\"item.rating.value,desc\"] note that you can set no more than three sorting rules in a single request you should use a comma to separate several sorting rules example: [\"item.rating.value,desc\",\"item.rating.value,desc\"]"
            },
            "limit": {
              "type": "integer",
              "description": "the maximum number of returned apps optional field default value: 100 maximum value: 1000"
            },
            "offset": {
              "type": "integer",
              "description": "offset in the results array of returned apps optional field default value: 0 if you specify the 10 value, the first ten entities in the results array will be omitted and the data will be provided for the successive entities Note: we recommend using this parameter only when retrieving up to 10,000 results for retrieving over 10,000 results, use the offset_token instead."
            },
            "offset_token": {
              "type": "string",
              "description": "token for subsequent requests optional field provided in the identical filed of the response to each request; use this parameter to avoid timeouts while trying to obtain over 100,000 results in a single request; by specifying the unique offset_token value from the response array, you will get the subsequent results of the initial task; offset_token values are unique for each subsequent task Note: if the offset_token is specified in the request, all other parameters should be identical to the previous request learn more about this parameter on our Help Center"
            },
            "tag": {
              "type": "string",
              "description": "user-defined task identifier optional field the character limit is 255 you can use this parameter to identify the task and match it with the result you will find the specified tag value in the data object of the response"
            }
          }
        }
      }
    },
    "required": []
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
