# post_dataforseo_backlinks_competitors_live

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "post_dataforseo_backlinks_competitors_live",
  "successful": true,
  "description": "Sites sharing referring domains with one `target`, ranked by how many they share. Each row gives `target`, `rank` and `intersections` - the count of shared linking domains. `main_domain`, `exclude_large_domains` and `exclude_internal_backlinks` shape what counts. Measured at 570 bytes, the smallest response in this family. Wrapped in DataForSEO's envelope: data in `tasks[0].result`, upstream charge in `tasks[0].cost`, outcome in `tasks[0].status_code` - a rejected request still returns HTTP 200. These are link-graph competitors, not search competitors; for the latter use `post_dataforseo_labs_google_serp_competitors_live`. To see the actual shared domains use `post_dataforseo_backlinks_domain_intersection_live`. 💰 Measured at $0.024 upstream on every endpoint in this family, twice the flat rate billed - keep `limit` low and do not loop.",
  "provider": "dataforseo",
  "method": "POST",
  "path": "/apis/v1/dataforseo/backlinks/competitors/live",
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
              "description": "domain, subdomain or webpage to get competitor domains for required field a domain or a subdomain should be specified without https:// and www. a page should be specified with absolute URL (including http:// or https://)"
            },
            "limit": {
              "type": "integer",
              "description": "the maximum number of returned domains optional field default value: 100 maximum value: 1000"
            },
            "offset": {
              "type": "integer",
              "description": "offset in the results array of returned domains optional field default value: 0 if you specify the 10 value, the first ten domains in the results array will be omitted and the data will be provided for the successive pages"
            },
            "filters": {
              "type": "array",
              "items": {},
              "description": "array of results filtering parameters optional field you can add several filters at once (8 filters maximum) you should set a logical operator and, or between the conditions the following operators are supported: regex, not_regex, =, , in, not_in, like, not_like, ilike, not_ilike, match, not_match you can use the % operator with like and not_like to match any string of zero or more characters example: [\"rank\",\">\",\"100\"] [[\"target\",\"like\",\"%forbes%\"], \"and\", [[\"rank\",\">\",\"100\"],\"or\",[\"intersections\",\">\",\"5\"]]] The full list of possible filters is available here."
            },
            "order_by": {
              "type": "array",
              "items": {
                "type": "string"
              },
              "description": "results sorting rules optional field you can use the same values as in the filters array to sort the results possible sorting types: asc – results will be sorted in the ascending order desc – results will be sorted in the descending order you should use a comma to set up a sorting type example: [\"rank,desc\"] note that you can set no more than three sorting rules in a single request you should use a comma to separate several sorting rules example: [\"intersections,desc\",\"rank,asc\"]"
            },
            "main_domain": {
              "type": "boolean",
              "description": "indicates if only main domain of the target will be included in the search optional field if set to true, only the main domain will be included in search; default value: true"
            },
            "exclude_large_domains": {
              "type": "boolean",
              "description": "indicates whether large domain will appear in results optional field if set to true, the results from the large domain (google.com, amazon.com, etc.) will be omitted; default value: true"
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
