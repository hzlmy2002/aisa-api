# post_dataforseo_backlinks_backlinks_live

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "post_dataforseo_backlinks_backlinks_live",
  "successful": true,
  "description": "The individual inbound links to one `target`, one row per link. Returns `total_count`, `items_count`, `items` and a `search_after_token` for paging - use that rather than `offset` past the first few pages. `mode` and `custom_mode` control grouping, `backlinks_status_type` selects live, lost or all. Measured at 2.5 KB for one link. Wrapped in DataForSEO's envelope: data in `tasks[0].result`, upstream charge in `tasks[0].cost`, outcome in `tasks[0].status_code` - a rejected request still returns HTTP 200. For counts rather than rows use `post_dataforseo_backlinks_summary_live`; for the linking domains grouped, `post_dataforseo_backlinks_referring_domains_live`. 💰 Measured at $0.024 upstream on every endpoint in this family, twice the flat rate billed - keep `limit` low and do not loop.",
  "provider": "dataforseo",
  "method": "POST",
  "path": "/apis/v1/dataforseo/backlinks/backlinks/live",
  "arguments_schema": {
    "type": "object",
    "properties": {
      "body": {
        "type": "array",
        "items": {
          "required": [
            "target"
          ],
          "type": "object",
          "properties": {
            "target": {
              "type": "string",
              "description": "domain, subdomain or webpage to get backlinks for required field a domain or a subdomain should be specified without https:// and www. a page should be specified with absolute URL (including http:// or https://)"
            },
            "mode": {
              "type": "string",
              "description": "results grouping type optional field possible grouping types: as_is – returns all backlinks one_per_domain – returns one backlink per domain one_per_anchor – returns one backlink per anchor default value: as_is"
            },
            "custom_mode": {
              "type": "object",
              "properties": {
                "field": {
                  "type": "string"
                },
                "value": {
                  "type": "integer"
                }
              },
              "description": "detailed results grouping type optional field use this object to get a specific number of backlinks per field if you use custom_mode, then mode will be ignored example: \"custom_mode\": {\"field\": \"domain\", \"value\": 100}"
            },
            "filters": {
              "type": "array",
              "items": {},
              "description": "array of results filtering parameters optional field you can add several filters at once (8 filters maximum) you should set a logical operator and, or between the conditions the following operators are supported: =, , in, not_in, like, not_like, ilike, not_ilike, regex, not_regex, match, not_match you can use the % operator with like and not_like to match any string of zero or more characters example: [\"rank\",\">\",\"80\"] [[\"page_from_rank\",\">\",\"55\"], \"and\", [\"dofollow\",\"=\",true]] [[\"first_seen\",\">\",\"2017-10-23 11:31:45 +00:00\"], \"and\", [[\"anchor\",\"like\",\"%seo%\"],\"or\",[\"text_pre\",\"like\",\"%seo%\"]]] The full list of possible filters is available here."
            },
            "order_by": {
              "type": "array",
              "items": {
                "type": "string"
              },
              "description": "results sorting rules optional field you can use the same values as in the filters array to sort the results possible sorting types: asc – results will be sorted in the ascending order desc – results will be sorted in the descending order you should use a comma to set up a sorting type example: [\"rank,desc\"] note that you can set no more than three sorting rules in a single request you should use a comma to separate several sorting rules example: [\"domain_from_rank,desc\",\"page_from_rank,asc\"]"
            },
            "offset": {
              "type": "integer",
              "description": "offset in the results array of the returned backlinks optional field default value: 0 if you specify the 10 value, the first ten backlinks in the results array will be omitted and the data will be provided for the successive backlinks; Note: the maximum value is 20,000, use the search_after_token if you would like to offset more results"
            },
            "search_after_token": {
              "type": "string",
              "description": "token for subsequent requests optional field provided in the identical filed of the response to each request; use this parameter to avoid timeouts while trying to obtain over 20,000 results in a single request; by specifying the unique search_after_token value from the response array, you will get the subsequent results of the initial task; search_after_token values are unique for each subsequent task ; Note: if the search_after_token is specified in the request, all other parameters should be identical to the previous request"
            },
            "limit": {
              "type": "integer",
              "description": "the maximum number of returned backlinks optional field default value: 100 maximum value: 1000"
            },
            "backlinks_status_type": {
              "type": "string",
              "description": "set what backlinks to return and count optional field you can use this field to choose what backlinks will be returned and used for aggregated metrics for your target; possible values: all – all backlinks will be returned and counted; live – backlinks found during the last check will be returned and counted; lost – lost backlinks will be returned and counted; default value: live"
            },
            "include_subdomains": {
              "type": "boolean",
              "description": "indicates if the subdomains of the target will be included in the search optional field if set to false, the subdomains will be ignored default value: true"
            },
            "exclude_internal_backlinks": {
              "type": "boolean",
              "description": "indicates if internal backlinks from subdomains to the target will be excluded from the results optional field if set to true, the results will not include data on internal backlinks from subdomains of the same domain as target if set to false, internal links will be included in the results default value: true"
            },
            "rank_scale": {
              "type": "string",
              "description": "defines the scale used for calculating and displaying the rank, domain_from_rank, and page_from_rank values optional field you can use this parameter to choose whether rank values are presented on a 0–100 or 0–1000 scale possible values: one_hundred — rank values are displayed on a 0–100 scale one_thousand — rank values are displayed on a 0–1000 scale default value: one_thousand learn more about how this parameter works and how ranking metrics are calculated in this Help Center article"
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
    "seo-backlinks"
  ]
}
```
