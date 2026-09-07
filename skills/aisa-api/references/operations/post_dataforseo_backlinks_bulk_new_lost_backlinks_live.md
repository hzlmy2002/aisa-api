# post_dataforseo_backlinks_bulk_new_lost_backlinks_live

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "post_dataforseo_backlinks_bulk_new_lost_backlinks_live",
  "successful": true,
  "description": "New and lost backlink counts for many `targets` since `date_from` - one row of `target`, `new_backlinks` and `lost_backlinks`. Measured at 654 bytes for two targets. Wrapped in DataForSEO's envelope: data in `tasks[0].result`, upstream charge in `tasks[0].cost`, outcome in `tasks[0].status_code` - a rejected request still returns HTTP 200. Use it to spot which sites in a list are gaining or bleeding links. For one target broken into periods use `post_dataforseo_backlinks_timeseries_new_lost_live`; for referring domains rather than links, `post_dataforseo_backlinks_bulk_new_lost_ref_domains_live`. 💰 Measured at $0.024 upstream on every endpoint in this family, twice the flat rate billed. This one takes no limit parameter, so the only lever is calling it less often.",
  "provider": "dataforseo",
  "method": "POST",
  "path": "/apis/v1/dataforseo/backlinks/bulk_new_lost_backlinks/live",
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
              "type": "array",
              "items": {
                "type": "string"
              },
              "description": "domains, subdomains or webpages to get new & lost backlinks for required field you can set up to 1000 domains, subdomains or webpages the domain or subdomain should be specified without https:// and www. the page should be specified with absolute URL (including http:// or https://) example: \"targets\": [ \"forbes.com\", \"cnn.com\", \"bbc.com\", \"yelp.com\", \"https://www.apple.com/iphone/\", \"https://ahrefs.com/blog/\", \"ibm.com\", \"https://variety.com/\", \"https://stackoverflow.com/\", \"www.trustpilot.com\" ]"
            },
            "date_from": {
              "type": "string",
              "description": "starting date of the time range optional field this field indicates the date which will be used as a threshold for new and lost backlinks; the backlinks that appeared in our index after the specified date will be considered as new; the backlinks that weren’t found after the specified date, but were present before, will be considered as lost; default value: today’s date -(minus) one month; e.g. if today is 2021-10-13, default date_from will be 2021-09-13. minimum value equals today’s date -(minus) one year; e.g. if today is 2021-10-13, minimum date_from will be 2020-10-13. date format: \"yyyy-mm-dd\" example: \"2021-01-01\""
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
