# post_dataforseo_domains_tech_domains_by_technology_live

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "post_dataforseo_domains_tech_domains_by_technology_live",
  "successful": true,
  "description": "Finds domains running a given technology - the reverse of `post_dataforseo_domains_tech_for_domain_live`. Accepts `technologies`, `technology_paths`, `groups`, `categories` and `keywords`, with `filters` and `order_by` over the fields named by `get_dataforseo_domains_tech_available_filters`. Returns `total_count`, `items_count`, `offset`, `offset_token` and `items`, each item the same profile as the per-domain call: `domain`, `title`, `description`, `meta_keywords`, `domain_rank`, `last_visited`, `country_iso_code`, `language_code`, `content_language_code`, `phone_numbers`, `emails`, `social_graph_urls` and `technologies`. Measured at 1.5 KB for one item, so cap it with `limit` - the item shape is heavy and `total_count` runs to millions for a popular platform. Wrapped in DataForSEO's envelope: data in `tasks[0].result`, upstream charge in `tasks[0].cost`, and the real outcome in `tasks[0].status_code` - a rejected request still returns HTTP 200, so check that field rather than the transport status.",
  "provider": "dataforseo",
  "method": "POST",
  "path": "/apis/v1/dataforseo/domain_analytics/technologies/domains_by_technology/live",
  "arguments_schema": {
    "type": "object",
    "properties": {
      "body": {
        "type": "array",
        "items": {
          "type": "object",
          "allOf": [
            {
              "anyOf": [
                {
                  "required": [
                    "technology_paths"
                  ]
                },
                {
                  "required": [
                    "groups"
                  ]
                },
                {
                  "required": [
                    "categories"
                  ]
                },
                {
                  "required": [
                    "technologies"
                  ]
                },
                {
                  "required": [
                    "keywords"
                  ]
                }
              ]
            }
          ],
          "properties": {
            "technology_paths": {
              "type": "array",
              "items": {
                "required": [
                  "path",
                  "name"
                ],
                "type": "object",
                "properties": {
                  "path": {
                    "type": "string"
                  },
                  "name": {
                    "type": "string"
                  }
                }
              },
              "description": "target technology paths required field if you don’t specify groups, technologies, keywords or categories at least one field (technology_paths, groups, technologies, keywords or categories) must be set; each technology path should be specified as a separate object containing “path” and “name”, where “path” is specified as “$group_id.$category_id” and “name” – as the name of the target technology; each object with a technology path should be separated with a comma you can find the full list of technology group ids, category ids and technology names on this page note: you can specify up to 10 technology paths in this array example: [{\"path\": \"content.cms\",\"name\": \"wordpress\"}, {\"path\": \"marketing.crm\",\"name\": \"salesforce\"}]"
            },
            "groups": {
              "type": "array",
              "items": {
                "type": "string"
              },
              "description": "ids of the target technology groups required field if you don’t specify technologies, technology_paths, keywords or categories you can find the full list of technology group ids on this page note: you can specify up to 10 technology groups in this array example: [\"sales\", \"marketing\"]"
            },
            "categories": {
              "type": "array",
              "items": {
                "type": "string"
              },
              "description": "ids of the target technology categories required field if you don’t specify groups, technology_paths, keywords or technologies you can find the full list of technology category ids on this page note: you can specify up to 10 technology categories in this array example: [\"payment_processors\",\"crm\"]"
            },
            "technologies": {
              "type": "array",
              "items": {
                "type": "string"
              },
              "description": "target technologies required field if you don’t specify groups, technology_paths, keywords or categories you can find the full list of technologies you can specify here on this page note: you can specify up to 10 technologies in this array example: [\"Google Pay\",\"Salesforce\"]"
            },
            "keywords": {
              "type": "array",
              "items": {
                "type": "string"
              },
              "description": "target keywords in the domain’s title, description or meta keywords required field if you don’t specify groups, technology_paths, technologies or categories optional field you can specify the maximum of 10 keywords; UTF-8 encoding; example: [\"seo\",\"software\"] learn more about rules and limitations of keyword and keywords fields in DataForSEO APIs in this Help Center article"
            },
            "mode": {
              "type": "string",
              "description": "search mode optional field possible search mode types: as_is – search for results exactly matching the specified group ids, category ids, or technology names entry – search for results matching a part of the specified group ids, category ids, or technology names default value: as_is"
            },
            "filters": {
              "type": "array",
              "items": {},
              "description": "array of results filtering parameters optional field you can add several filters at once (8 filters maximum) you should set a logical operator and, or between the conditions the following operators are supported: , , >, >=, =, , in, not_in, like, not_like you can use the % operator with like and not_like to match any string of zero or more characters example: [\"country_iso_code\",\"=\",\"US\"] [[\"country_iso_code\",\"=\",\"US\"], \"and\", [\"domain_rank\",\">\",100]] [[\"domain_rank\",\">\",100], \"and\", [[\"country_iso_code\",\"=\",\"US\"],\"or\",[\"country_iso_code\",\"=\",\"CA\"]]] for more information about filters, please refer to Domain Analytics Technologies API – Filters"
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
