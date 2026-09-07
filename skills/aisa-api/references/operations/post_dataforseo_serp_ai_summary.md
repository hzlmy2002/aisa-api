# post_dataforseo_serp_ai_summary

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "post_dataforseo_serp_ai_summary",
  "successful": true,
  "description": "Returns the AI overview Google shows above the results for a query on Google. Returns `keyword`, `type`, `se_domain`, `location_code`, `language_code`, `check_url`, `datetime`, `spell`, `refinement_chips`, `item_types`, `items_count` and `items`. 💰 Measured at $0.002 upstream against the $0.012 billed - this family is the cheapest source of search data here, six times under the flat rate. Wrapped in DataForSEO's envelope: data in `tasks[0].result`, outcome in `tasks[0].status_code` - a rejected request still returns HTTP 200.",
  "provider": "dataforseo",
  "method": "POST",
  "path": "/apis/v1/dataforseo/serp/ai_summary",
  "arguments_schema": {
    "type": "object",
    "properties": {
      "body": {
        "type": "array",
        "items": {
          "required": [
            "task_id"
          ],
          "type": "object",
          "properties": {
            "task_id": {
              "type": "string",
              "description": "Unique identifier of the associated task in UUID format; can be used within 30 days"
            },
            "prompt": {
              "type": "string",
              "description": "Additional AI prompt; maximum 2000 characters"
            },
            "support_extra": {
              "type": "boolean",
              "description": "Whether to consider extra SERP features such as answer_box, knowledge_graph, and featured_snippet; default true"
            },
            "fetch_content": {
              "type": "boolean",
              "description": "Whether to fetch content from pages in SERPs; default false"
            },
            "include_links": {
              "type": "boolean",
              "description": "Whether to include source links in the summary; default false"
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
    "seo-serp-other-engines"
  ]
}
```
