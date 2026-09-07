# post_dataforseo_backlinks_page_intersection_live

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "post_dataforseo_backlinks_page_intersection_live",
  "successful": true,
  "description": "The pages linking to several target URLs at once, rather than the domains. ⚠️ `targets` is an **object keyed by position** and takes full URLs, not bare domains. Each row carries `page_intersection` and a `summary` per target. Measured at 3.9 KB for one row - the heaviest row shape here, since each carries a summary per target. Wrapped in DataForSEO's envelope: data in `tasks[0].result`, upstream charge in `tasks[0].cost`, outcome in `tasks[0].status_code` - a rejected request still returns HTTP 200. The domain-level equivalent is `post_dataforseo_backlinks_domain_intersection_live`, which is the one to reach for first. 💰 Measured at $0.024 upstream on every endpoint in this family, twice the flat rate billed - keep `limit` low and do not loop.",
  "provider": "dataforseo",
  "method": "POST",
  "path": "/apis/v1/dataforseo/backlinks/page_intersection/live",
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
              "description": "domains, subdomains or webpages you want to exclude optional field you can set up to 10 domains, subdomains or webpages if you use this array, results will contain the referring pages that link to targets but don’t link to exclude_targets example: \"exclude_targets\": [ \"bbc.com\", \"https://www.apple.com/iphone/*\", \"https://dataforseo.com/apis/*\"]"
            },
            "backlinks_status_type": {
              "type": "string",
              "description": "set what backlinks to return and count optional field you can use this field to choose what backlinks will be returned and used for aggregated metrics for your targets; possible values: all – all backlinks will be returned and counted; live – backlinks found during the last check will be returned and counted; lost – lost backlinks will be returned and counted; default value: live"
            },
            "filters": {
              "type": "array",
              "items": {},
              "description": "array of results filtering parameters optional field you can add several filters at once (8 filters maximum) you should set a logical operator and, or between the conditions the following operators are supported: regex, not_regex, =, , in, not_in, like, not_like, ilike, not_ilike, match, not_match you can use the % operator with like and not_like to match any string of zero or more characters example: [\"1.rank\",\">\",\"80\"] [[\"2.page_from_rank\",\">\",\"55\"], \"and\", [\"1.original\",\"=\",\"true\"]] [[\"1.first_seen\",\">\",\"2017-10-23 11:31:45 +00:00\"], \"and\", [[\"1.acnhor\",\"like\",\"%seo%\"],\"or\",[\"1.text_pre\",\"not_like\",\"%seo%\"]]] The full list of possible filters is available here."
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
              "description": "offset in the results array of the returned backlinks optional field default value: 0 if you specify the 10 value, the first ten backlinks in the results array will be omitted and the data will be provided for the successive backlinks"
            },
            "limit": {
              "type": "integer",
              "description": "the maximum number of returned backlinks optional field default value: 100 maximum value: 1000"
            },
            "internal_list_limit": {
              "type": "integer",
              "description": "maximum number of elements within internal arrays optional field you can use this field to limit the number of elements within the following arrays: attributes domain_from_platform_type default value: 10 maximum value: 1000"
            },
            "include_subdomains": {
              "type": "boolean",
              "description": "indicates if the subdomains of the targets will be included in the search optional field if set to false, the subdomains will be ignored default value: true"
            },
            "include_indirect_links": {
              "type": "boolean",
              "description": "indicates if indirect links to the targets will be included in the results optional field if set to true, the results will include data on indirect links pointing to a page that either redirects to a target, or points to a canonical page if set to false, indirect links will be ignored default value: true"
            },
            "exclude_internal_backlinks": {
              "type": "boolean",
              "description": "indicates if internal backlinks from subdomains to the target will be excluded from the results optional field if set to true, the results will not include data on internal backlinks from subdomains of the same domain as target if set to false, internal links will be included in the result default value: true"
            },
            "intersection_mode": {
              "type": "string",
              "description": "indicates whether to intersect backlinks optional field use this field to intersect or merge results for the specified URLs possible values: all, partial all – results are based on all backlinks; partial – results are based on the intersecting backlinks only; default value: all"
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
