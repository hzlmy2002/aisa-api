# post_dataforseo_domains_whois_overview_live

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "post_dataforseo_domains_whois_overview_live",
  "successful": true,
  "description": "Whois records enriched with SEO metrics. Each item carries `domain`, `created_datetime`, `changed_datetime`, `expiration_datetime`, `updated_datetime`, `first_seen`, `epp_status_codes`, `tld`, `registered`, `registrar`, plus `metrics` and `backlinks_info`. Paged with `limit`, `offset` and `offset_token`, filtered over the fields in `get_dataforseo_domains_whois_available_filters`. Measured at 2.5 KB for one item. Wrapped in DataForSEO's envelope: data in `tasks[0].result`, upstream charge in `tasks[0].cost`, and the real outcome in `tasks[0].status_code` - a rejected request still returns HTTP 200, so check that field rather than the transport status. 🔴 **The most expensive endpoint in this family by an order of magnitude: measured at $0.1212 upstream for a single record.** Filter hard and keep `limit` low; do not call it in a loop over a domain list.",
  "provider": "dataforseo",
  "method": "POST",
  "path": "/apis/v1/dataforseo/domain_analytics/whois/overview/live",
  "arguments_schema": {
    "type": "object",
    "properties": {
      "body": {
        "type": "array",
        "items": {
          "type": "object",
          "properties": {
            "limit": {
              "type": "integer",
              "description": "the maximum number of returned domains optional field default value: 100 maximum value: 1000"
            },
            "offset": {
              "type": "integer",
              "description": "offset in the results array of returned items optional field default value: 0 if you specify the 10 value, the first ten items in the results array will be omitted and the data will be provided for the successive items; Note: we recommend using this parameter only when retrieving up to 10,000 results for retrieving over 10,000 results, use the offset_token instead"
            },
            "offset_token": {
              "type": "string",
              "description": "token for subsequent requests optional field provided in the identical filed of the response to each request; use this parameter to avoid timeouts while trying to obtain over 100,000 results in a single request; by specifying the unique offset_token value from the response array, you will get the subsequent results of the initial task; offset_token values are unique for each subsequent task Note: if the offset_token is specified in the request, all other parameters should be identical to the previous request learn more about this parameter on our Help Center"
            },
            "filters": {
              "type": "array",
              "items": {},
              "description": "array of results filtering parameters optional field you can add several filters at once (8 filters maximum) you should set a logical operator and, or between the conditions the following operators are supported: regex, , , >, >=, =, , in, not_in, like, not_like you can use the % operator with like and not_like to match any string of zero or more characters"
            },
            "order_by": {
              "type": "array",
              "items": {
                "type": "string"
              },
              "description": "results sorting rules optional field you can use the same values as in the filters array to sort the results possible sorting types: asc - results will be sorted in the ascending order desc - results will be sorted in the descending order the comma is used as a separator example: [\"metrics.organic.pos_1,desc\"] default rule: [\"metrics.organic.count,desc\"] note that you can set no more than three sorting rules in a single request you should use a comma to separate several sorting rules example: [\"expiration_datetime,asc\",\"metrics.organic.etv,desc\",\"metrics.organic.pos_1,desc\"]"
            },
            "tag": {
              "type": "string",
              "description": "user-defined task identifier optional field the character limit is 255 you can use this parameter to identify the task and match it with the result you will find the specified tag value in the data object of the response"
            }
          }
        }
      }
    },
    "required": []
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
