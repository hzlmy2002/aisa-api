# post_dataforseo_content_search_live

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "post_dataforseo_content_search_live",
  "successful": true,
  "description": "Lists the individual pages citing a keyword, rather than the totals. Each item carries `url`, `domain`, `main_domain`, `url_rank`, `domain_rank`, `spam_score`, `fetch_time`, `country`, `language`, `score` and `page_category`, alongside `total_count` and `items_count`. Page with `offset_token` from the previous response, and cap the payload with `limit` - measured at 2.2 KB for a single item. Every response wraps its payload in DataForSEO's envelope - `tasks[0].result` holds the data and `tasks[0].cost` the upstream charge. `filters` accepts the fields listed by `get_dataforseo_content_available_filters`. For counts and distributions instead of pages, use `post_dataforseo_content_summary_live`.",
  "provider": "dataforseo",
  "method": "POST",
  "path": "/apis/v1/dataforseo/content_analysis/search/live",
  "arguments_schema": {
    "type": "object",
    "properties": {
      "body": {
        "type": "array",
        "items": {
          "type": "object",
          "anyOf": [
            {
              "required": [
                "keyword"
              ]
            },
            {
              "required": [
                "offset_token"
              ]
            }
          ],
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
              "description": "results grouping type optional field possible grouping types: as_is – returns all citations for the target keyword one_per_domain – returns one citation of the keyword per domain default value: as_is"
            },
            "limit": {
              "type": "integer",
              "description": "the maximum number of returned citations optional field default value: 100 maximum value: 1000"
            },
            "filters": {
              "type": "array",
              "items": {},
              "description": "array of results filtering parameters optional field you can add several filters at once (8 filters maximum) you should set a logical operator and, or between the conditions the following operators are supported: regex, not_regex, , , >, >=, =, , in, not_in, like,not_like, match, not_match you can use the % operator with like and not_like to match any string of zero or more characters example: [\"country\",\"=\", \"US\"] [[\"domain_rank\",\">\",800],\"and\",[\"content_info.connotation_types.negative\",\">\",0.9]] [[\"domain_rank\",\">\",800], \"and\", [[\"page_types\",\"has\",\"ecommerce\"], \"or\", [\"content_info.text_category\",\"has\",10994]]] for more information about filters, please refer to Content Analysis API – Filters"
            },
            "order_by": {
              "type": "array",
              "items": {
                "type": "string"
              },
              "description": "results sorting rules optional field you can use the same values as in the filters array to sort the results possible sorting types: asc – results will be sorted in the ascending order desc – results will be sorted in the descending order you should use a comma to set up a sorting type example: [\"content_info.sentiment_connotations.anger,desc\"] default rule: [\"content_info.sentiment_connotations.anger,desc\"] note that you can set no more than three sorting rules in a single request you should use a comma to separate several sorting rules example: [\"content_info.sentiment_connotations.anger,desc\",\"keyword_data.keyword_info.cpc,desc\"]"
            },
            "offset": {
              "type": "integer",
              "description": "offset in the results array of returned citations optional field default value: 0 if you specify the 10 value, the first ten citations in the results array will be omitted and the data will be provided for the successive citations Note: we recommend using this parameter only when retrieving up to 10,000 results for retrieving over 10,000 results, use the offset_token instead."
            },
            "offset_token": {
              "type": "string",
              "description": "offset token for subsequent requests optional field provided in the identical field of the response to each request; use this parameter to avoid timeouts while trying to obtain over 10,000 results in a single request; by specifying the unique offset_token value from the response array, you will get the subsequent results of the initial task; offset_token values are unique for each subsequent task Note: if the offset_token is specified in the request, all other parameters except limit will not be taken into account when processing a task learn more about this parameter on our Help Center"
            },
            "rank_scale": {
              "type": "string",
              "description": "defines the scale used for calculating and displaying the domain_rank, and url_rank values optional field you can use this parameter to choose whether rank values are presented on a 0–100 or 0–1000 scale possible values: one_hundred — rank values are displayed on a 0–100 scale one_thousand — rank values are displayed on a 0–1000 scale default value: one_thousand learn more about how this parameter works in this Help Center article"
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
