# post_dataforseo_domains_tech_domains_by_html_terms_live

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "post_dataforseo_domains_tech_domains_by_html_terms_live",
  "successful": true,
  "description": "Finds domains whose HTML contains given `search_terms` - a raw string match where `post_dataforseo_domains_tech_domains_by_technology_live` matches a detected technology. Use it for a tracking snippet, an affiliate tag or a template signature that no detector names. Returns `total_count`, `items_count`, `offset`, `offset_token` and `items` carrying the same profile as the technology search. Measured at 1.8 KB for one item; cap with `limit`. Wrapped in DataForSEO's envelope: data in `tasks[0].result`, upstream charge in `tasks[0].cost`, and the real outcome in `tasks[0].status_code` - a rejected request still returns HTTP 200, so check that field rather than the transport status.",
  "provider": "dataforseo",
  "method": "POST",
  "path": "/apis/v1/dataforseo/domain_analytics/technologies/domains_by_html_terms/live",
  "arguments_schema": {
    "type": "object",
    "properties": {
      "body": {
        "type": "array",
        "items": {
          "required": [
            "search_terms"
          ],
          "type": "object",
          "properties": {
            "search_terms": {
              "type": "array",
              "items": {
                "type": "string"
              },
              "description": "target search terms required field specify target HTML elements, tags, attributes, their content or all of the above if you specify more than one search term, you will receive only the domains containing all of the specified terms in the HTML code of their homepage maximum number of search terms you can specify: 10 example: [\"data-attrid\"]"
            },
            "keywords": {
              "type": "array",
              "items": {
                "type": "string"
              },
              "description": "target keywords in the domain’s title, description or meta keywords optional field UTF-8 encoding maximum number of keywords you can specify: 10 example: [\"seo\",\"software\"] learn more about rules and limitations of keyword and keywords fields in DataForSEO APIs in this Help Center article"
            },
            "mode": {
              "type": "string",
              "description": "search mode optional field possible search mode types: strict_entry – search for results exactly matching the order, intervals and separators in the specified search terms entry – search for results ignoring the order, intervals and separators in the specified search terms default value: entry"
            },
            "filters": {
              "type": "array",
              "items": {},
              "description": "array of results filtering parameters optional field you can add several filters at once (8 filters maximum) you should set a logical operator and, or between the conditions the following operators are supported: , , >, >=, =, , in, not_in, like, not_like you can use the % operator with like and not_like to match any string of zero or more characters example: [\"domain\",\"like\",\"%seo%\"] [[\"country_iso_code\",\"=\",\"US\"], \"and\", [\"domain_rank\",\">\",100]] [[\"domain_rank\",\">\",100], \"and\", [[\"country_iso_code\",\"=\",\"US\"],\"or\",[\"country_iso_code\",\"=\",\"CA\"]]] for more information about filters, please refer to Domain Analytics Technologies API – Filters"
            },
            "order_by": {
              "type": "array",
              "items": {
                "type": "string"
              },
              "description": "results sorting rules optional field available fields: domain_rank, domain, last_visited, country_iso_code, language_code, content_language_code possible sorting types: asc – results will be sorted in the ascending order desc – results will be sorted in the descending order you should use a comma to set up a sorting type example: [\"last_visited,desc\"] default rule: [\"domain_rank,desc\"] note that you can set no more than three sorting rules in a single request you should use a comma to separate several sorting rules example: [\"last_visited,desc\",\"domain_rank,desc\"]"
            },
            "limit": {
              "type": "integer",
              "description": "the maximum number of returned domains optional field default value: 100 maximum value: 10000"
            },
            "offset": {
              "type": "integer",
              "description": "offset in the results array of returned domains optional field default value: 0 if you specify the 10 value, the first ten domains in the results array will be omitted and the data will be provided for the successive domains; Note: the maximum value is 9999, the sum of limit and offset must not exceed 10000; use the offset_token if you would like to offset more results"
            },
            "offset_token": {
              "type": "string",
              "description": "token for subsequent requests optional field provided in the identical filed of the response to each request; use this parameter to avoid timeouts while trying to obtain over 100,000 results in a single request; by specifying the unique offset_token value from the response array, you will get the subsequent results of the initial task; offset_token values are unique for each subsequent task Note: if the offset_token is specified in the request, all other parameters should be identical to the previous request learn more about this parameter on our Help Center"
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
    "seo-domains"
  ]
}
```
