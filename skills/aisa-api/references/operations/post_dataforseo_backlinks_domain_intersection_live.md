# post_dataforseo_backlinks_domain_intersection_live

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "post_dataforseo_backlinks_domain_intersection_live",
  "successful": true,
  "description": "The domains linking to several targets at once. ⚠️ `targets` here is an **object keyed by position** - `{\"1\": \"a.com\", \"2\": \"b.com\"}` - not the array the bulk endpoints take. `exclude_targets` removes sites from the comparison. Each row carries `domain_intersection` and a `summary` per target. Measured at 2.0 KB for one row. Wrapped in DataForSEO's envelope: data in `tasks[0].result`, upstream charge in `tasks[0].cost`, outcome in `tasks[0].status_code` - a rejected request still returns HTTP 200. Use it to find who links to your competitors but not to you. The page-level equivalent is `post_dataforseo_backlinks_page_intersection_live`. 💰 Measured at $0.024 upstream on every endpoint in this family, twice the flat rate billed - keep `limit` low and do not loop.",
  "provider": "dataforseo",
  "method": "POST",
  "path": "/apis/v1/dataforseo/backlinks/domain_intersection/live",
  "arguments_schema": {
    "type": "object",
    "properties": {
      "body": {
        "type": "array",
        "items": {
          "required": [
            "targets"
          ],
          "type": "object",
          "properties": {
            "targets": {
              "type": "object",
              "additionalProperties": {
                "type": "string"
              },
              "description": "domains, subdomains or webpages to get links for required field you can set up to 20 domains, subdomains or webpages a domain or a subdomain should be specified without https:// and www. a page should be specified with absolute URL (including http:// or https://) example: \"targets\": { \"1\": \"http://planet.postgresql.org/\", \"2\": \"http://gborg.postgresql.org/\" }"
            },
            "exclude_targets": {
              "type": "array",
              "items": {
                "type": "string"
              },
              "description": "domains, subdomains or webpages you want to exclude optional field you can specify up to 10 domains, subdomains or webpages if you use this array, results will contain the referring domains that link to targets but don’t link to exclude_targets example: \"exclude_targets\": [ \"bbc.com\", \"https://www.apple.com/iphone/*\", \"https://dataforseo.com/apis/*\"]"
            },
            "filters": {
              "type": "array",
              "items": {},
              "description": "array of results filtering parameters optional field you can add several filters at once (8 filters maximum) you should set a logical operator and, or between the conditions the following operators are supported: regex, not_regex, =, , in, not_in, like, not_like, ilike, not_ilike, match, not_match you can use the % operator with like and not_like to match any string of zero or more characters example: [\"1.internal_links_count\",\">\",\"1\"] [[\"2.referring_pages\",\">\",\"2\"], \"and\", [\"1.backlinks\",\">\",\"10\"]] [[\"1.first_seen\",\">\",\"2017-10-23 11:31:45 +00:00\"], \"and\", [[\"2.target\",\"like\",\"%dataforseo.com%\"],\"or\",[\"1.referring_domains\",\">\",\"10\"]]] The full list of possible filters is available here."
            },
            "order_by": {
              "type": "array",
              "items": {
                "type": "string"
              },
              "description": "results sorting rules optional field you can use the same values as in the filters array to sort the results possible sorting types: asc – results will be sorted in the ascending order desc – results will be sorted in the descending order you should use a comma to set up a sorting type example: [\"backlinks,desc\"] note that you can set no more than three sorting rules in a single request you should use a comma to separate several sorting rules example: [\"backlinks,desc\",\"rank,asc\"]"
            },
            "offset": {
              "type": "integer",
              "description": "offset in the array of returned results optional field default value: 0 if you specify the 10 value, the first ten backlinks in the results array will be omitted and the data will be provided for the successive backlinks"
            },
            "limit": {
              "type": "integer",
              "description": "the maximum number of returned results optional field default value: 100 maximum value: 1000"
            },
            "internal_list_limit": {
              "type": "integer",
              "description": "maximum number of elements within internal arrays optional field you can use this field to limit the number of elements within the following arrays: referring_links_tld referring_links_types referring_links_attributes referring_links_platform_types referring_links_semantic_locations default value: 10 maximum value: 1000"
            },
            "backlinks_status_type": {
              "type": "string",
              "description": "set what backlinks to return and count optional field you can use this field to choose what backlinks will be returned and used for aggregated metrics for your targets; possible values: all – all backlinks will be returned and counted; live – backlinks found during the last check will be returned and counted; lost – lost backlinks will be returned and counted; default value: live"
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
              "description": "indicates if indirect links to the targets will be included in the results optional field if set to true, the results will include data on indirect links pointing to a page that either redirects to a target, or points to a canonical page if set to false, indirect links will be ignored default value: true"
            },
            "exclude_internal_backlinks": {
              "type": "boolean",
              "description": "indicates whether the backlinks from subdomains of the target are excluded optional field if set to false, the backlinks from subdomains of the target will be omitted and you won’t receive the same domain in the response; default value: true"
            },
            "intersection_mode": {
              "type": "string",
              "description": "indicates whether to intersect backlinks optional field use this field to intersect or merge results for the specified domains possible values: all, partial all – results are based on all backlinks; partial – results are based on the intersecting backlinks only; default value: all"
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
