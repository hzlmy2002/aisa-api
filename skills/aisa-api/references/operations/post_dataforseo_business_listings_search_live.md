# post_dataforseo_business_listings_search_live

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "post_dataforseo_business_listings_search_live",
  "successful": true,
  "description": "Searches DataForSEO's own index of local business listings by `categories`, `description`, `title` and `location_coordinate` - a latitude, longitude and radius triple. Returns `total_count`, `count`, `offset`, `offset_token` and `items`, paged with the token. Measured at 4.0 KB for one result and $0.01236 upstream, close to the flat rate billed - **the only reasonably priced way into this family**. Wrapped in DataForSEO's envelope: data in `tasks[0].result`, outcome in `tasks[0].status_code` - a rejected request still returns HTTP 200. This reads an index and answers immediately; everything else here queues a live scrape of the source. Start with this and drill in only where it matters.",
  "provider": "dataforseo",
  "method": "POST",
  "path": "/apis/v1/dataforseo/business_data/business_listings/search/live",
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
              "description": "*business categories* optional field the categories you specify are used to search for business listings; if you don’t use this field, we will return business listings found in the specified location; you can specify **up to 10 categories**"
            },
            "description": {
              "type": "string",
              "description": "*description of the element in SERP* optional field the description of the business entity for which the results are collected; can contain up to 200 characters"
            },
            "title": {
              "type": "string",
              "description": "*title of the element in SERP* optional field the name of the business entity for which the results are collected; can contain up to 200 characters"
            },
            "is_claimed": {
              "type": "boolean",
              "description": "*indicates whether the business is verified by its owner on Google Maps* optional field"
            },
            "location_coordinate": {
              "type": "string",
              "description": "*GPS coordinates of a location* optional field `location_coordinate` parameter should be specified in the *“latitude,longitude,radius”* format the maximum number of decimal digits for *“latitude”* and *“longitude”*: 7 the value of *“radius”* is specified in kilometres (km) the minimum value for *“radius”*: `1` the maximum value for *“radius”*: `100000` example: `53.476225,-2.243572,200`"
            },
            "filters": {
              "type": "array",
              "items": {},
              "description": "*array of results filtering parameters* optional field **you can add several filters at once (8 filters maximum)** you should set a logical operator `and`, `or` between the conditions the following operators are supported: `regex`, `not_regex`, ``, `>=`, `=`, ``, `in`, `not_in`, `like`, `not_like`, `ilike`, `not_ilike`, `match`, `not_match` you can use the `%` operator with `like` and `not_like` to match any string of zero or more characters example: `[\"rating.value\",\">\",3]` you can receive the list of available filters by making a separate request to `https://api.dataforseo.com/v3/business_data/business_listings/available_filters`"
            },
            "order_by": {
              "type": "array",
              "items": {
                "type": "string"
              },
              "description": "*results sorting rules* optional field you can use the same values as in the `filters` array to sort the results possible sorting types: `asc` – results will be sorted in the ascending order `desc` – results will be sorted in the descending order you should use a comma to set up a sorting parameter example: `[\"rating.value,desc\"]`**note that you can set no more than three sorting rules in a single request** you should use a comma to separate several sorting rules example: `[\"rating.value,desc\",\"rating.votes_count,desc\"]`"
            },
            "limit": {
              "type": "integer",
              "description": "*the maximum number of returned businesses* optional field default value: `100` maximum value: `1000`"
            },
            "offset": {
              "type": "integer",
              "description": "*offset in the results array of returned businesses* optional field default value: `0` if you specify the `10` value, the first ten entities in the results array will be omitted and the data will be provided for the successive entities"
            },
            "offset_token": {
              "type": "string",
              "description": "*token for subsequent requests* optional field provided in the identical filed of the response to each request; use this parameter to avoid timeouts while trying to obtain over 100,000 results in a single request; by specifying the unique `offset_token` value from the response array, you will get the subsequent results of the initial task; `offset_token` values are unique for each subsequent task **Note:** if the `offset_token` is specified in the request, all other parameters should be identical to the previous request"
            },
            "tag": {
              "type": "string",
              "description": "*user-defined task identifier* optional field *the character limit is 255* you can use this parameter to identify the task and match it with the result you will find the specified `tag` value in the `data` object of the response"
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
    "seo-business"
  ]
}
```
