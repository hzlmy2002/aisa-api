# post_dataforseo_backlinks_timeseries_new_lost_live

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "post_dataforseo_backlinks_timeseries_new_lost_live",
  "successful": true,
  "description": "New and lost backlinks and referring domains for one `target` per period, grouped by `group_range`. Measured at 1.4 KB for three monthly points. Wrapped in DataForSEO's envelope: data in `tasks[0].result`, upstream charge in `tasks[0].cost`, outcome in `tasks[0].status_code` - a rejected request still returns HTTP 200. This is the derivative of `post_dataforseo_backlinks_timeseries_summary_live`: that one gives the level, this one the change. A flat total hiding heavy churn only shows up here. For the same figures across many targets at once use `post_dataforseo_backlinks_bulk_new_lost_backlinks_live`. 💰 Measured at $0.024 upstream on every endpoint in this family, twice the flat rate billed. This one takes no limit parameter, so the only lever is calling it less often.",
  "provider": "dataforseo",
  "method": "POST",
  "path": "/apis/v1/dataforseo/backlinks/timeseries_new_lost_summary/live",
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
              "description": "domain to get data for required field a domain should be specified without https:// and www. example: \"forbes.com\""
            },
            "date_from": {
              "type": "string",
              "description": "starting date of the time range optional field this field indicates the date which will be used as a threshold for new and lost backlinks and referring domains; the backlinks and referring domains that appeared in our index after the specified date will be considered as new; the backlinks and referring domains that weren’t found after the specified date, but were present before, will be considered as lost; minimum value: 2019-01-30 maximum value shouldn’t exceed the date specified in the date_to date format: \"yyyy-mm-dd\" example: \"2021-01-01\""
            },
            "date_to": {
              "type": "string",
              "description": "ending date of the time range optional field if you don’t specify this field, the today’s date will be used by default minimum value shouldn’t preceed the date specified in the date_from maximum value: today’s date date format: \"yyyy-mm-dd\" example: \"2021-01-15\""
            },
            "group_range": {
              "type": "string",
              "description": "time range which will be used to group the results optional field default value: month possible values: day, week, month, year note: for day, we will return items corresponding to all dates between and including date_from and date_to; for week/month/year, we will return items corresponding to full weeks/months/years, where each item will indicate the last day of the week/month/year for example, if you specify: \"group_range\": \"month\", \"date_from\": \"2022-03-23\", \"date_to\": \"2022-05-13\" we will return items falling between 2022-03-01 and 2022-05-31, namely, three items corresponding to the following dates: 2022-03-31, 2022-04-30, 2022-05-31 if there is no data for a certain day/week/month/year, we will return 0"
            },
            "include_subdomains": {
              "type": "boolean",
              "description": "indicates if the subdomains of the target will be included in the search optional field if set to false, the subdomains will be ignored default value: true"
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
