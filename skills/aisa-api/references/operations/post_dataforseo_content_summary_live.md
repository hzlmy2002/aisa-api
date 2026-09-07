# post_dataforseo_content_summary_live

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "post_dataforseo_content_summary_live",
  "successful": true,
  "description": "Aggregate view of every citation of a keyword across the web index. Returns `total_count`, `rank`, `top_domains` (each `domain` and `count`), `sentiment_connotations` (anger, happiness, love, sadness, share, fun), `connotation_types` (positive, negative, neutral), `text_categories`, `page_categories`, `page_types`, `countries` and `languages`. Measured at 1.1 KB for one keyword. Every response wraps its payload in DataForSEO's envelope - `tasks[0].result` holds the data and `tasks[0].cost` the upstream charge. This is the hub of the content family: `post_dataforseo_content_sentiment_analysis_live` returns only the two connotation blocks already included here, so call this one instead unless you specifically want the smaller payload. For the individual citing pages rather than the totals use `post_dataforseo_content_search_live`; for the same aggregate over time, `post_dataforseo_content_phrase_trends_live`.",
  "provider": "dataforseo",
  "method": "POST",
  "path": "/apis/v1/dataforseo/content_analysis/summary/live",
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
            "internal_list_limit": {
              "type": "integer",
              "description": "maximum number of elements within internal arrays optional field you can use this field to limit the number of elements within the following arrays: top_domains text_categories page_categories countries languages default value: 1 maximum value: 20"
            },
            "positive_connotation_threshold": {
              "type": "number",
              "description": "positive connotation threshold optional field specified as the probability index threshold for positive sentiment related to the citation content if you specify this field, connotation_types object in the response will only contain data on citations with positive sentiment probability more than or equal to the specified value possible values: from 0 to 1 default value: 0.4"
            },
            "sentiments_connotation_threshold": {
              "type": "number",
              "description": "sentiment connotation threshold optional field specified as the probability index threshold for sentiment connotations related to the citation content if you specify this field, sentiment_connotations object in the response will only contain data on citations where the probability per each sentiment is more than or equal to the specified value possible values: from 0 to 1 default value: 0.4"
            },
            "initial_dataset_filters": {
              "type": "array",
              "items": {},
              "description": "initial dataset filtering parameters optional field initial filtering parameters that apply to fields in the Search endpoint you can add several filters at once (8 filters maximum) you should set a logical operator and, or between the conditions the following operators are supported: regex, not_regex, , , >, >=, =, , in, not_in, like,not_like, has, has_not you can use the % operator with like and not_like to match any string of zero or more characters example: [\"domain\",\"\", \"logitech.com\"] [[\"domain\",\"\",\"logitech.com\"],\"and\",[\"content_info.connotation_types.negative\",\">\",1000]] [[\"domain\",\"\",\"logitech.com\"]], \"and\", [[\"content_info.connotation_types.negative\",\">\",1000], \"or\", [\"content_info.text_category\",\"has\",10994]]] for more information about filters, please refer to Content Analysis API – Filters learn more about the initial dataset filters in this help center article."
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
