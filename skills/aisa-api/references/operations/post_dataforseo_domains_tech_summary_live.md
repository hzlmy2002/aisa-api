# post_dataforseo_domains_tech_summary_live

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "post_dataforseo_domains_tech_summary_live",
  "successful": true,
  "description": "Where a technology is used, rather than by whom: returns `countries`, `languages`, `content_languages` and `keywords` for the technology set you name. Measured at 1.4 KB. Wrapped in DataForSEO's envelope: data in `tasks[0].result`, upstream charge in `tasks[0].cost`, and the real outcome in `tasks[0].status_code` - a rejected request still returns HTTP 200, so check that field rather than the transport status. Use it to size a market before pulling domain lists. For counts broken down by group and category use `post_dataforseo_domains_tech_aggregation_live`; for adoption over time, `post_dataforseo_domains_tech_technology_stats_live`.",
  "provider": "dataforseo",
  "method": "POST",
  "path": "/apis/v1/dataforseo/domain_analytics/technologies/technologies_summary/live",
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
              "description": "target technology paths required field if you don’t specify groups, technologies and categories each technology path should be specified as a separate object containing “path” and “name”, where “path” is specified as “$group_id.$category_id” and “name” – as the name of the target technology; each object with a technology path should be separated with a comma you can find the full list of technology group ids, category ids and technology names on this page note: you can specify up to 10 technology paths in this array example: [{\"path\": \"content.cms\",\"name\": \"wordpress\"}, {\"path\": \"marketing.crm\",\"name\": \"salesforce\"}]"
            },
            "groups": {
              "type": "array",
              "items": {
                "type": "string"
              },
              "description": "ids of the target technology groups required field if you don’t specify technologies, technology_paths, categories, or keywords you can find the full list of technology group ids on this page note: you can specify up to 10 technology groups in this array example: [\"sales\", \"marketing\"]"
            },
            "categories": {
              "type": "array",
              "items": {
                "type": "string"
              },
              "description": "ids of the target technology categories required field if you don’t specify groups, technology_paths, technologies, or keywords you can find the full list of technology category ids on this page note: you can specify up to 10 technology categories in this array example: [\"payment_processors\",\"crm\"]"
            },
            "technologies": {
              "type": "array",
              "items": {
                "type": "string"
              },
              "description": "target technologies required field if you don’t specify groups, technology_paths, categories, or keywords you can find the full list of technologies you can specify here on this page note: you can specify up to 10 technologies in this array example: [\"Google Pay\",\"Salesforce\"]"
            },
            "keywords": {
              "type": "array",
              "items": {
                "type": "string"
              },
              "description": "target keywords in the domain’s title, description or meta keywords required field if you don’t specify groups, technology_paths, categories, or technologies you can specify the maximum of 10 keywords; UTF-8 encoding; example: [\"seo\",\"software\"] learn more about rules and limitations of keyword and keywords fields in DataForSEO APIs in this Help Center article"
            },
            "mode": {
              "type": "string",
              "description": "search mode optional field possible search mode types: as_is – search for results exactly matching the specified group ids, category ids, or technology names entry – search for results matching a part of the specified group ids, category ids, or technology names default value: as_is"
            },
            "filters": {
              "type": "array",
              "items": {},
              "description": "array of results filtering parameters optional field you can add several filters at once (8 filters maximum) you should set a logical operator and, or between the conditions the following operators are supported: , , >, >=, =, , in, not_in, like,not_like you can use the % operator with like and not_like to match any string of zero or more characters you can use the following parameters to filter the results: domain_rank, last_visited, country_iso_code, language_code, content_language_code example: [[\"country_iso_code\",\"=\",\"US\"], \"and\", [\"domain_rank\",\">\",800]] for more information about filters, please refer to Domain Analytics Technologies API – Filters"
            },
            "internal_list_limit": {
              "type": "integer",
              "description": "maximum number of elements within internal arrays optional field you can use this field to limit the number of elements within the following arrays: countries, languages, content_languages, keywords default value: 10 minimum value: 1 maximum value: 10000"
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
