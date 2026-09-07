# post_dataforseo_on_page_keyword_density

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "post_dataforseo_on_page_keyword_density",
  "successful": true,
  "description": "Word and phrase frequency across a crawl, with `keyword_length` choosing n-gram size. Returns `total_items_count`, `items_count` and `items`. Measured at 611 bytes. Reads a finished crawl, so it needs the `id` from `post_dataforseo_on_page_submit` and returns `crawl_progress` plus a `crawl_status` of `max_crawl_pages`, `pages_in_queue` and `pages_crawled` - check those before trusting a small result, because a crawl still running simply has less to report. This describes what a site says about itself; for what the web says about it use `post_dataforseo_backlinks_anchors_live`, and for what people search use `post_dataforseo_keywords_gads_search_volume_live`. 💰 Free upstream: querying a finished crawl costs nothing, only the crawl itself does. This family is the cheapest in the provider.",
  "provider": "dataforseo",
  "method": "POST",
  "path": "/apis/v1/dataforseo/on_page/keyword_density",
  "arguments_schema": {
    "type": "object",
    "properties": {
      "body": {
        "type": "array",
        "items": {
          "required": [
            "id",
            "keyword_length"
          ],
          "type": "object",
          "properties": {
            "id": {
              "type": "string",
              "description": "ID of the task required field you can get this ID in the response of the Task POST endpoint example: “07131248-1535-0216-1000-17384017ad04”"
            },
            "keyword_length": {
              "type": "integer",
              "description": "number of words for a keyword required field possible values: 1, 2, 3, 4, 5"
            },
            "url": {
              "type": "string",
              "description": "page URL optional field if you do not specify a page here, the results will be provided for the whole website if you use this field, the API response will contain only keywords from the specified page a page should be specified with absolute URL (including http:// or https://)"
            },
            "limit": {
              "type": "integer",
              "description": "the maximum number of returned keywords optional field default value: 100 maximum value: 1000"
            },
            "filters": {
              "type": "array",
              "items": {},
              "description": "array of results filtering parameters optional field you can add several filters at once (8 filters maximum) you should set a logical operator and, or between the conditions the following operators are supported: regex, not_regex, =, , in, not_in, like, not_like you can use the % operator with like and not_like to match any string of zero or more characters example: [\"keyword\",\"=\",\"%seo%\"] [[\"keyword\",\"=\",\"%seo%\"], \"and\", [\"frequency\",\" [[\"keyword\",\"not_like\",\"%seo%\"], \"and\", [[\"frequency\",\">\",\"6\"],\"or\",[\"density\",\">\",\"0.02\"]]] The full list of possible filters is available by this link."
            },
            "order_by": {
              "type": "array",
              "items": {
                "type": "string"
              },
              "description": "results sorting rules optional field you can use the same values as in the filters array to sort the results possible sorting types: asc – results will be sorted in the ascending order desc – results will be sorted in the descending order you should use a comma to set up a sorting type example: [\"frequency,desc\"] note that you can set no more than three sorting rules in a single request you should use a comma to separate several sorting rules example: [\"keyword,asc\",\"frequency,desc\"]"
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
    "seo-onpage"
  ]
}
```
