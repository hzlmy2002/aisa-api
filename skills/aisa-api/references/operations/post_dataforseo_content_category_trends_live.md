# post_dataforseo_content_category_trends_live

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "post_dataforseo_content_category_trends_live",
  "successful": true,
  "description": "The same per-period metrics as `post_dataforseo_content_phrase_trends_live`, but for an entire product category instead of one keyword. Takes `category_code` from `get_dataforseo_content_categories`, with `date_from`, `date_to` and `date_group` setting range and granularity, and returns a `date` plus `total_count`, `rank`, `top_domains` (each `domain` and `count`), `sentiment_connotations` (anger, happiness, love, sadness, share, fun), `connotation_types` (positive, negative, neutral), `text_categories`, `page_categories`, `page_types`, `countries` and `languages` per period. Every response wraps its payload in DataForSEO's envelope - `tasks[0].result` holds the data and `tasks[0].cost` the upstream charge. Use it to see how a market moves rather than a single phrase; swap to the phrase endpoint when you already know the exact wording you care about.",
  "provider": "dataforseo",
  "method": "POST",
  "path": "/apis/v1/dataforseo/content_analysis/category_trends/live",
  "arguments_schema": {
    "type": "object",
    "properties": {
      "body": {
        "type": "array",
        "items": {
          "required": [
            "category_code",
            "date_from"
          ],
          "type": "object",
          "properties": {
            "category_code": {
              "type": "integer",
              "description": "target category code required field to obtain a full list of available categories, refer to the Categories endpoint"
            },
            "page_type": {
              "type": "array",
              "items": {
                "type": "string"
              },
              "description": "target page types optional field use this parameter to filter the dataset by page types possible values: \"ecommerce\", \"news\", \"blogs\", \"message-boards\", \"organization\""
            },
            "search_mode": {
              "type": "string",
              "description": "results grouping type optional field possible grouping types: as_is – returns data on all citations for the target category_code one_per_domain – returns data on one citation of the category_code per domain default value: as_is"
            },
            "internal_list_limit": {
              "type": "integer",
              "description": "maximum number of elements within internal arrays optional field you can use this field to limit the number of elements within the following arrays: top_domains text_categories page_categories countries languages default value: 1 maximum value: 20"
            },
            "date_from": {
              "type": "string",
              "description": "starting date of the time range required field minimum value: 2022-10-31 date format: \"yyyy-mm-dd\" example: \"2019-01-15\""
            },
            "date_to": {
              "type": "string",
              "description": "ending date of the time range optional field if you don’t specify this field, today’s date will be used by default date format: \"yyyy-mm-dd\" example: \"2019-01-15\""
            },
            "date_group": {
              "type": "string",
              "description": "time range which will be used to group the results optional field default value: month possible values: day, week, month"
            },
            "initial_dataset_filters": {
              "type": "array",
              "items": {},
              "description": "initial dataset filtering parameters optional field initial filtering parameters that apply to fields in the Search endpoint; you can add several filters at once (8 filters maximum) you should set a logical operator and, or between the conditions the following operators are supported: regex, not_regex, , , >, >=, =, , in, not_in, like,not_like, has, has_not, match, not_match you can use the % operator with like and not_like to match any string of zero or more characters example: [\"domain\",\"\", \"logitech.com\"] [[\"domain\",\"\",\"logitech.com\"],\"and\",[\"content_info.connotation_types.negative\",\">\",1000]] [[\"domain\",\"\",\"logitech.com\"]], \"and\", [[\"content_info.connotation_types.negative\",\">\",1000], \"or\", [\"content_info.text_category\",\"has\",10994]]] for more information about filters, please refer to Content Analysis API – Filters learn more about the initial dataset filters in this help center article."
            },
            "rank_scale": {
              "type": "string",
              "description": "defines the scale used for calculating and displaying the rank values optional field you can use this parameter to choose whether rank values are presented on a 0–100 or 0–1000 scale possible values: one_hundred — rank values are displayed on a 0–100 scale one_thousand — rank values are displayed on a 0–1000 scale default value: one_thousand learn more about how this parameter works in this Help Center article"
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
    "seo-content"
  ]
}
```
