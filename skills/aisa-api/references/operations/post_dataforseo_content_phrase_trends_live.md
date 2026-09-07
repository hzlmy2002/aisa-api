# post_dataforseo_content_phrase_trends_live

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "post_dataforseo_content_phrase_trends_live",
  "successful": true,
  "description": "The summary metrics for a keyword, repeated per time period. Each entry carries a `date` plus `total_count`, `rank`, `top_domains` (each `domain` and `count`), `sentiment_connotations` (anger, happiness, love, sadness, share, fun), `connotation_types` (positive, negative, neutral), `text_categories`, `page_categories`, `page_types`, `countries` and `languages`. `date_from`, `date_to` and `date_group` (day, week, month) set the range and granularity. Measured at 1.6 KB for two monthly points. Every response wraps its payload in DataForSEO's envelope - `tasks[0].result` holds the data and `tasks[0].cost` the upstream charge. Use this to see whether mentions of a phrase are rising or falling; for a single point in time use `post_dataforseo_content_summary_live`. To track a whole product category rather than one phrase, use `post_dataforseo_content_category_trends_live`.",
  "provider": "dataforseo",
  "method": "POST",
  "path": "/apis/v1/dataforseo/content_analysis/phrase_trends/live",
  "arguments_schema": {
    "type": "object",
    "properties": {
      "body": {
        "type": "array",
        "items": {
          "required": [
            "keyword",
            "date_from"
          ],
          "type": "object",
          "properties": {
            "keyword": {
              "type": "string",
              "description": "target keyword required field UTF-8 encoding the keywords will be converted to a lowercase format; Note: to match an exact phrase instead of a stand-alone keyword, use double quotes and backslashes; example: \"keyword\": \"\\\"tesla palo alto\\\"\" learn more about rules and limitations of keyword and keywords fields in DataForSEO APIs in this Help Center article"
            },
            "keyword_fields": {
              "type": "object",
              "properties": {
                "title": {
                  "type": "string"
                },
                "main_title": {
                  "type": "string"
                },
                "previous_title": {
                  "type": "string"
                },
                "snippet": {
                  "type": "string"
                }
              },
              "description": "target keyword fields and target keywords optional field use this parameter to filter the dataset by keywords that certain fields should contain; fields you can specify: title, main_title, previous_title, snippet you can indicate several fields; Note: to match an exact phrase instead of a stand-alone keyword, use double quotes and backslashes; example: \"keyword_fields\": { \"snippet\": \"\\\"logitech mouse\\\"\", \"main_title\": \"sale\" }"
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
              "description": "results grouping type optional field possible grouping types: as_is – returns data on all citations for the target keyword one_per_domain – returns data on one citation of the keyword per domain default value: as_is"
            },
            "internal_list_limit": {
              "type": "integer",
              "description": "maximum number of elements within internal arrays optional field you can use this field to limit the number of elements within the following arrays: top_domains text_categories page_categories countries languages default value: 1 maximum value: 20"
            },
            "date_from": {
              "type": "string",
              "description": "starting date of the time range required field date format: \"yyyy-mm-dd\" example: \"2019-01-15\""
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
              "description": "initial dataset filtering parameters optional field initial filtering parameters that apply to fields in the Search endpoint; you can add several filters at once (8 filters maximum); you should set a logical operator and, or between the conditions; the following operators are supported: regex, not_regex, , , >, >=, =, , in, not_in, like,not_like, has, has_not, match, not_match you can use the % operator with like and not_like to match any string of zero or more characters; example: [\"domain\",\"\", \"logitech.com\"] [[\"domain\",\"\",\"logitech.com\"],\"and\",[\"content_info.connotation_types.negative\",\">\",1000]] [[\"domain\",\"\",\"logitech.com\"]], \"and\", [[\"content_info.connotation_types.negative\",\">\",1000], \"or\", [\"content_info.text_category\",\"has\",10994]]] for more information about filters, please refer to Content Analysis API – Filters learn more about the initial dataset filters in this help center article."
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
