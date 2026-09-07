# post_dataforseo_domains_tech_technology_stats_live

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "post_dataforseo_domains_tech_technology_stats_live",
  "successful": true,
  "description": "Adoption of one `technology` over time. Returns `technology`, `date_from`, `date_to`, `items_count` and `items`. ⚠️ **`date_from` and `date_to` must both be present or both absent** - sending only `date_from` is rejected with `status_code` 40501, `Invalid Field: 'date_from'`, inside an HTTP 200. Omit both to get the default window. Measured at 516 bytes. Wrapped in DataForSEO's envelope: data in `tasks[0].result`, upstream charge in `tasks[0].cost`, and the real outcome in `tasks[0].status_code` - a rejected request still returns HTTP 200, so check that field rather than the transport status. For a single point in time use `post_dataforseo_domains_tech_summary_live`.",
  "provider": "dataforseo",
  "method": "POST",
  "path": "/apis/v1/dataforseo/domain_analytics/technologies/technology_stats/live",
  "arguments_schema": {
    "type": "object",
    "properties": {
      "body": {
        "type": "array",
        "items": {
          "required": [
            "technology"
          ],
          "type": "object",
          "properties": {
            "technology": {
              "type": "string",
              "description": "target technology required field you can find the full list of technologies you can specify here on this page example: \"Salesforce\""
            },
            "date_from": {
              "type": "string",
              "description": "starting date of the time range optional field minimum value: 2022-10-31 if you don’t specify this field, the minimum value will be used by default date format: \"yyyy-mm-dd\" example: \"2023-06-01\""
            },
            "date_to": {
              "type": "string",
              "description": "ending date of the time range optional field if you don’t specify this field, the today’s date will be used by default date format: \"yyyy-mm-dd\" example: \"2023-01-15\""
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
