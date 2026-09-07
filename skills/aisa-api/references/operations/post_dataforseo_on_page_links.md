# post_dataforseo_on_page_links

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "post_dataforseo_on_page_links",
  "successful": true,
  "description": "Every link found during a crawl, by `id`. Filter with `page_from` and `page_to` to get the links out of or into one page. Returns `total_items_count`, `items_count`, `items`, and a `search_after_token` for paging - use that rather than `offset` past the first pages. Measured at 1.0 KB for one link. Reads a finished crawl, so it needs the `id` from `post_dataforseo_on_page_submit` and returns `crawl_progress` plus a `crawl_status` of `max_crawl_pages`, `pages_in_queue` and `pages_crawled` - check those before trusting a small result, because a crawl still running simply has less to report. 💰 Free upstream: querying a finished crawl costs nothing, only the crawl itself does. This family is the cheapest in the provider.",
  "provider": "dataforseo",
  "method": "POST",
  "path": "/apis/v1/dataforseo/on_page/links",
  "arguments_schema": {
    "type": "object",
    "properties": {
      "body": {
        "type": "array",
        "items": {
          "required": [
            "id"
          ],
          "type": "object",
          "properties": {
            "id": {
              "type": "string",
              "description": "ID of the task required field you can get this ID in the response of the Task POST endpoint example: “07131248-1535-0216-1000-17384017ad04”"
            },
            "page_from": {
              "type": "string",
              "description": "relative page URL optional field if you use this field, the API response will contain only links from the specified page note that in this field you can specify relative URLs only"
            },
            "page_to": {
              "type": "string",
              "description": "relative page URL optional field if you use this field, the API response will contain only internal links pointing to the specified page note that in this field you can specify relative URLs only"
            },
            "limit": {
              "type": "integer",
              "description": "the maximum number of returned links optional field default value: 100 maximum value: 1000"
            },
            "offset": {
              "type": "integer",
              "description": "offset in the results array of returned links optional field default value: 0 if you specify the 10 value, the first ten links in the results array will be omitted and the data will be provided for the successive links"
            },
            "filters": {
              "type": "array",
              "items": {},
              "description": "array of results filtering parameters optional field you can add several filters at once (8 filters maximum) you should set a logical operator and, or between the conditions the following operators are supported: regex, not_regex, =, , in, not_in, like, not_like you can use the % operator with like and not_like to match any string of zero or more characters example: [\"direction\",\"=\",\"external\"] [[\"domain_to\",\"\",\"example.com\"], \"and\", [\"link_from\",\"not_like\",\"%example.com/blog%\"]] [[\"direction\",\"=\",\"external\"], \"and\", [[\"link_from\",\"like\",\"%example.com/blog%\"],\"or\",[\"link_from\",\"like\",\"%example.com/help%\"]]] The full list of possible filters is available by this link."
            },
            "search_after_token": {
              "type": "string",
              "description": "token for subsequent requests optional field provided in the identical filed of the response to each request; use this parameter to avoid timeouts while trying to obtain over 20,000 results in a single request; by specifying the unique search_after_token value from the response array, you will get the subsequent results of the initial task; search_after_token values are unique for each subsequent task ; Note: if the search_after_token is specified in the request, all other parameters should be identical to the previous request"
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
