# post_dataforseo_backlinks_timeseries_summary_live

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "post_dataforseo_backlinks_timeseries_summary_live",
  "successful": true,
  "description": "One `target`'s core backlink metrics over time, grouped by `group_range` (day, week, month). Returns `date_from`, `date_to`, `group_range` and one item per period. Measured at 1.8 KB for three monthly points, against 4.1 KB for the same span from `post_dataforseo_backlinks_history_live` - use this one unless you need history's fuller metric set. Wrapped in DataForSEO's envelope: data in `tasks[0].result`, upstream charge in `tasks[0].cost`, outcome in `tasks[0].status_code` - a rejected request still returns HTTP 200. For gains and losses rather than totals use `post_dataforseo_backlinks_timeseries_new_lost_live`. 💰 Measured at $0.024 upstream on every endpoint in this family, twice the flat rate billed. This one takes no limit parameter, so the only lever is calling it less often.",
  "provider": "dataforseo",
  "method": "POST",
  "path": "/apis/v1/dataforseo/backlinks/timeseries_summary/live",
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
              "description": "starting date of the time range optional field this field indicates the date which will be used as a threshold for summary data; minimum value: 2019-01-30 maximum value shouldn’t exceed the date specified in the date_to date format: \"yyyy-mm-dd\" example: \"2021-01-01\""
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
