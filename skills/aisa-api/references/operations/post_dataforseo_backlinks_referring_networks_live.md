# post_dataforseo_backlinks_referring_networks_live

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "post_dataforseo_backlinks_referring_networks_live",
  "successful": true,
  "description": "Collapses referring domains to the networks behind them - one row per `network_address` with `referring_domains` plus `rank`, `backlinks`, `first_seen`, `lost_date`, `backlinks_spam_score`, `broken_backlinks` and `broken_pages`. `network_address_type` chooses IP or subnet. Measured at 1.2 KB. Wrapped in DataForSEO's envelope: data in `tasks[0].result`, upstream charge in `tasks[0].cost`, outcome in `tasks[0].status_code` - a rejected request still returns HTTP 200. This is the level at which link schemes become visible: many domains on one subnet is one operator, not many endorsements. The un-collapsed view is `post_dataforseo_backlinks_referring_domains_live`. 💰 Measured at $0.024 upstream on every endpoint in this family, twice the flat rate billed - keep `limit` low and do not loop.",
  "provider": "dataforseo",
  "method": "POST",
  "path": "/apis/v1/dataforseo/backlinks/referring_networks/live",
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
              "description": "domain, subdomain or webpage to get referring networks for required field a domain or a subdomain should be specified without https:// and www. a page should be specified with absolute URL (including http:// or https://)"
            },
            "network_address_type": {
              "type": "string",
              "description": "indicates the type of network to get data for optional field possible values: ip, subnet default value: ip"
            },
            "limit": {
              "type": "integer",
              "description": "the maximum number of returned networks optional field default value: 100 maximum value: 1000"
            },
            "offset": {
              "type": "integer",
              "description": "offset in the results array of returned networks optional field default value: 0 if you specify the 10 value, the first ten domains in the results array will be omitted and the data will be provided for the successive pages"
            },
            "internal_list_limit": {
              "type": "integer",
              "description": "maximum number of elements within internal arrays optional field you can use this field to limit the number of elements within the following arrays: referring_links_tld referring_links_types referring_links_attributes referring_links_platform_types referring_links_semantic_locations default value: 10 maximum value: 1000"
            },
            "backlinks_status_type": {
              "type": "string",
              "description": "set what backlinks to return and count optional field you can use this field to choose what backlinks will be returned and used for aggregated metrics for your target; possible values: all – all backlinks will be returned and counted; live – backlinks found during the last check will be returned and counted; lost – lost backlinks will be returned and counted; default value: live"
            },
            "filters": {
              "type": "array",
              "items": {},
              "description": "array of results filtering parameters optional field you can add several filters at once (8 filters maximum) you should set a logical operator and, or between the conditions the following operators are supported: regex, not_regex, =, , in, not_in, like, not_like, ilike, not_ilike, match, not_match you can use the % operator with like and not_like to match any string of zero or more characters example: [\"referring_pages\",\">\",\"1\"] [[\"referring_pages\",\">\",\"2\"], \"and\", [\"backlinks\",\">\",\"10\"]] [[\"first_seen\",\">\",\"2017-10-23 11:31:45 +00:00\"], \"and\", [[\"network_address\",\"like\",\"194.1.%\"],\"or\",[\"referring_ips\",\">\",\"10\"]]] The full list of possible filters is available here."
            },
            "order_by": {
              "type": "array",
              "items": {
                "type": "string"
              },
              "description": "results sorting rules optional field you can use the same values as in the filters array to sort the results possible sorting types: asc – results will be sorted in the ascending order desc – results will be sorted in the descending order you should use a comma to set up a sorting type example: [\"backlinks,desc\"] note that you can set no more than three sorting rules in a single request you should use a comma to separate several sorting rules example: [\"backlinks,desc\",\"rank,asc\"]"
            },
            "backlinks_filters": {
              "type": "array",
              "items": {},
              "description": "filter the backlinks of your target optional field you can use this field to filter the initial backlinks that will be included in the dataset for aggregated metrics for your target you can filter the backlinks by all fields available in the response of this endpoint using this parameter, you can include only dofollow backlinks in the response and create a flexible backlinks dataset to calculate the metrics for example: \"backlinks_filters\": [[\"dofollow\", \"=\", true]]"
            },
            "include_subdomains": {
              "type": "boolean",
              "description": "indicates if the subdomains of the target will be included in the search optional field if set to false, the subdomains will be ignored default value: true"
            },
            "include_indirect_links": {
              "type": "boolean",
              "description": "indicates if indirect links to the target will be included in the results optional field if set to true, the results will include data on indirect links pointing to a page that either redirects to the target, or points to a canonical page if set to false, indirect links will be ignored default value: true"
            },
            "exclude_internal_backlinks": {
              "type": "boolean",
              "description": "indicates whether the backlinks from subdomains of the target are excluded optional field if set to false, the backlinks from subdomains of the target will be ommited and you won’t receive the same domain in the response; default value: true"
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
