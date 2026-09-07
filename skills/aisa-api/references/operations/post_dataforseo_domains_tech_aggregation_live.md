# post_dataforseo_domains_tech_aggregation_live

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "post_dataforseo_domains_tech_aggregation_live",
  "successful": true,
  "description": "Counts rather than domains: how many sites match a technology query, broken down by group, category and technology. Returns `total_count`, `items_count`, `offset` and `items`, with `internal_groups_list_limit`, `internal_categories_list_limit`, `internal_technologies_list_limit` and `internal_list_limit` each capping a different nesting level - set all four or the response grows quickly. Measured at 680 bytes with every limit at 1, the smallest response in this family. Wrapped in DataForSEO's envelope: data in `tasks[0].result`, upstream charge in `tasks[0].cost`, and the real outcome in `tasks[0].status_code` - a rejected request still returns HTTP 200, so check that field rather than the transport status. For the domains themselves rather than their counts, use `post_dataforseo_domains_tech_domains_by_technology_live`.",
  "provider": "dataforseo",
  "method": "POST",
  "path": "/apis/v1/dataforseo/domain_analytics/technologies/aggregation_technologies/live",
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
                    "group"
                  ]
                },
                {
                  "required": [
                    "category"
                  ]
                },
                {
                  "required": [
                    "technology"
                  ]
                },
                {
                  "required": [
                    "keyword"
                  ]
                }
              ]
            }
          ],
          "properties": {
            "group": {
              "type": "string",
              "description": "id of the target technology group required field if you don’t specify technology, category or keyword at least one field (group, category, keyword, technology) must be set you can find the full list of technology group ids on this page example: \"marketing\""
            },
            "category": {
              "type": "string",
              "description": "id of the target technology category required field if you don’t specify group, keyword or technology at least one field (group, category, keyword, technology) must be set you can find the full list of technology category ids on this page example: \"crm\""
            },
            "technology": {
              "type": "string",
              "description": "target technology required field if you don’t specify group, keyword or category at least one field (group, category, keyword, technology) must be set you can find the full list of technologies on this page example: \"Salesforce\""
            },
            "keyword": {
              "type": "string",
              "description": "target keyword in the domain’s meta keywords required field if you don’t specify group, category or technology at least one field (group, category, keyword, technology) must be set UTF-8 encoding example: \"seo\"learn more about rules and limitations of keyword and keywords fields in DataForSEO APIs in this Help Center article"
            },
            "mode": {
              "type": "string",
              "description": "search mode optional field possible search mode types: as_is – search for results exactly matching the specified group ids, category ids, or technology names entry – search for results matching a part of the specified group ids, category ids, or technology names default value: as_is"
            },
            "filters": {
              "type": "array",
              "items": {},
              "description": "array of results filtering parameters optional field you can add several filters at once (8 filters maximum) you should set a logical operator and, or between the conditions the following operators are supported: , , >, >=, =, , in, not_in, like,not_like you can use the % operator with like and not_like to match any string of zero or more characters you can use the following parameters to filter the results: domain_rank, last_visited, country_iso_code, language_code, content_language_code Note: all filtering parameters are taken from the domain_technology_item of the domain_technologies endpoint; example: [[\"country_iso_code\",\"=\",\"US\"], \"and\", [\"domain_rank\",\">\",800]]for more information about filters, please refer to Domain Analytics Technologies API – Filters"
            },
            "order_by": {
              "type": "array",
              "items": {
                "type": "string"
              },
              "description": "results sorting rules optional field you can use the following values to sort the results: groups_count, categories_count, technologies_count possible sorting types: asc – results will be sorted in the ascending order desc – results will be sorted in the descending order you should use a comma to set up a sorting type example: [\"groups_count,desc\"] note that you can set no more than three sorting rules in a single request you should use a comma to separate several sorting rules example: [\"groups_count,desc\",\"technologies_count,desc\"] default value: [\"groups_count,desc\",\"categories_count,desc\",\"technologies_count,desc\"]"
            },
            "internal_groups_list_limit": {
              "type": "integer",
              "description": "maximum number of returned technology groups optional field you can use this field to limit the number of items with identical \"group\" in the results default value: 5 minimum value: 1 maximum value: 10000"
            },
            "internal_categories_list_limit": {
              "type": "integer",
              "description": "maximum number of returned technology categories within the same group optional field you can use this field to limit the number of items with identical \"category\" in the results default value: 5 minimum value: 1 maximum value: 10000"
            },
            "internal_technologies_list_limit": {
              "type": "integer",
              "description": "maximum number of returned technologies within the same category optional field you can use this field to limit the number of items with identical \"technology\" in the results default value: 10 minimum value: 1 maximum value: 10000"
            },
            "internal_list_limit": {
              "type": "integer",
              "description": "maximum number of items with identical \"category\", \"group\", and \"technology\" optional field if you use this field, the values specified in internal_groups_list_limit, internal_categories_list_limit and internal_technologies_list_limit will be ignored; you can use this field to limit the number of items with identical \"category\", \"group\", or \"technology\" default value: 10 minimum value: 1 maximum value: 10000"
            },
            "limit": {
              "type": "integer",
              "description": "the maximum number of returned technologies optional field default value: 100 maximum value: 10000"
            },
            "offset": {
              "type": "integer",
              "description": "offset in the results array of returned domains optional field default value: 0 maximum value: 9999 if you specify the 10 value, the first ten technologies in the results array will be omitted and the data will be provided for the successive technologies"
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
    "seo-domains"
  ]
}
```
