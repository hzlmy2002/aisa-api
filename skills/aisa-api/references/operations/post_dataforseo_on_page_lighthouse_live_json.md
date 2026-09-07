# post_dataforseo_on_page_lighthouse_live_json

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "post_dataforseo_on_page_lighthouse_live_json",
  "successful": true,
  "description": "Runs a Google Lighthouse audit on one `url` and returns the full report: `lighthouseVersion`, `requestedUrl`, `finalUrl`, `fetchTime`, `gatherMode`, `runWarnings` and every audit and category score. `for_mobile` switches the emulated device, `categories` and `audits` narrow the run. Measured at $0.005. 🔴 **Measured at 245 KB for a single audit of example.com, the largest response in this provider** - a full Lighthouse report is a JSON document, not a metric, and it will dominate an agent's context. Pass `categories` or `audits` to cut it down, and prefer `post_dataforseo_on_page_waterfall` when the question is simply why a page is slow. Wrapped in DataForSEO's envelope: data in `tasks[0].result`, outcome in `tasks[0].status_code` - a rejected request still returns HTTP 200.",
  "provider": "dataforseo",
  "method": "POST",
  "path": "/apis/v1/dataforseo/on_page/lighthouse/live/json",
  "arguments_schema": {
    "type": "object",
    "properties": {
      "body": {
        "type": "array",
        "items": {
          "required": [
            "url"
          ],
          "type": "object",
          "properties": {
            "url": {
              "type": "string",
              "description": "target URL required field target page should be specified with its absolute URL (including http:// or https://) example: https://dataforseo.com/"
            },
            "for_mobile": {
              "type": "boolean",
              "description": "applies mobile emulation optional field if set to true, Lighthouse will use mobile device and screen emulation to test the page against mobile environment if set to false, the results will be provided for desktop default value: false"
            },
            "categories": {
              "type": "array",
              "items": {
                "type": "string"
              },
              "description": "categories of Lighthouse audits optional field each category is a collection of audits and audit groups that applies weighting and scoring to the section (see official definition) if you ignore this field, we will return data for all categories unless you specify audits use this field to get data for specific categories you indicate here possible values: seo, performance, best_practices, accessibility"
            },
            "audits": {
              "type": "array",
              "items": {
                "type": "string"
              },
              "description": "Lighthouse audits optional field audits are individual tests Lighthouse runs for each specific feature/optimization/metric to produce a numeric score (see official definition); if you ignore this field, we will return data for all audits; use this field to get data for specific audits you indicate here; Note: that some audits do not belong to a specific category and are stand-alone page quality measurements; in general, there can be several use cases: 1. if you ignore categories, you can use this field to get data for the specified audits only for example, if you ignore \"categories\" and specify \"audits\": [\"metrics/cumulative-layout-shift\",\"metrics/largest-contentful-paint\",\"metrics/total-blocking-time\"], you will get data only for these audits 2. if you specify a category, you can use this field to additionally receive audits that do not belong to the category(-ies) you specified for example, if you specify \"categories\": [\"seo\"] and \"audits\": [\"metrics/cumulative-layout-shift\",\"metrics/largest-contentful-paint\",\"metrics/total-blocking-time\"], you will get only these audits under “performance” and all audits under “seo” you can get the full list of possible audits here"
            },
            "version": {
              "type": "string",
              "description": "lighthouse version optional field you can obtain the results specific to a certain Lighthouse version by specifying its number the list of available versions is available through the Lighthouse Versions endpoint"
            },
            "language_name": {
              "type": "string",
              "description": "lighthouse language name optional field you can receive the list of available languages of the search engine with their language_name by making a separate request to https://api.dataforseo.com/v3/on_page/lighthouse/languages default value: English"
            },
            "language_code": {
              "type": "string",
              "description": "lighthouse language code optional field you can receive the list of available languages of the search engine with their language_code by making a separate request to https://api.dataforseo.com/v3/on_page/lighthouse/languages default value: en"
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
    "seo-onpage"
  ]
}
```
