# post_dataforseo_business_trustpilot_reviews_submit

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "post_dataforseo_business_trustpilot_reviews_submit",
  "successful": true,
  "description": "Queues Trustpilot reviews for one business, returning a task `id`. Asynchronous: submit returns a task `id` in `tasks[0].id`, fetch returns the result once ready, and the charge lands on the submit - fetching is free, including re-fetching. Wrapped in DataForSEO's envelope: data in `tasks[0].result`, outcome in `tasks[0].status_code` - a rejected request still returns HTTP 200. Retrieve with `get_dataforseo_business_trustpilot_reviews_fetch`; the Tripadvisor equivalent is `post_dataforseo_business_tripadvisor_reviews_submit`.",
  "provider": "dataforseo",
  "method": "POST",
  "path": "/apis/v1/dataforseo/business_data/trustpilot/reviews/task_post",
  "arguments_schema": {
    "type": "object",
    "properties": {
      "body": {
        "type": "array",
        "items": {
          "required": [
            "domain"
          ],
          "type": "object",
          "properties": {
            "domain": {
              "type": "string",
              "description": "*domain of the local establishment* **required field** domain of the local establishment on Trustpilot; you can find the domain in the URL of every business listed on Trustpilot example: `www.thepearlsource.com` `https://www.trustpilot.com/review/www.thepearlsource.com`"
            },
            "sort_by": {
              "type": "string",
              "description": "*results sorting parameter* optional field you can use this field to sort the results; possible sorting parameters: `recency` — most recent reviews first; `relevance` — most relevant reviews first; default value: `relevance`"
            },
            "priority": {
              "type": "integer",
              "description": "*task priority* optional field can take the following values: 1 – normal execution priority (set by default) 2 – high execution priority You will be additionally charged for the tasks with high execution priority. The cost can be calculated on the [Pricing](https://dataforseo.com/pricing/business-data/business-data-api-trustpilot-reviews-pricing \"Pricing\") page."
            },
            "depth": {
              "type": "integer",
              "description": "*parsing depth* optional field number of reviews to be returned from the API response we strongly recommend setting the parsing depth in the multiples of twenty, because our system processes twenty reviews in a row default value: `20` maximum value: `200` **Your account will be billed per each SERP containing up to 20 results;** Setting depth above 20 may result in additional charges if the search engine returns more than 20 results; The cost can be calculated on the [Pricing](https://dataforseo.com/pricing/business-data/business-data-api-trustpilot-reviews-pricing \"Pricing\") page."
            },
            "tag": {
              "type": "string",
              "description": "*user-defined task identifier* optional field *the character limit is 255* you can use this parameter to identify the task and match it with the result you will find the specified `tag` value in the `data` object of the response"
            },
            "postback_url": {
              "type": "string",
              "description": "*return URL for sending task results* optional field once the task is completed, we will send a POST request with its results compressed in the `gzip` format to the `postback_url` you specified you can use the ‘$id’ string as a `$id` variable and ‘$tag’ as urlencoded `$tag` variable. We will set the necessary values before sending the request. example: `http://your-server.com/postbackscript?id=$id` `http://your-server.com/postbackscript?id=$id&tag=$tag` **Note:** special characters in `postback_url` will be urlencoded; i.a., the `#` character will be encoded into `%23`learn more on our [Help Center](https://dataforseo.com/help-center/pingbacks-postbacks-with-dataforseo-api)"
            },
            "pingback_url": {
              "type": "string",
              "description": "*notification URL of a completed task* optional field when a task is completed we will notify you by GET request sent to the URL you have specified you can use the ‘$id’ string as a `$id` variable and ‘$tag’ as urlencoded `$tag` variable. We will set the necessary values before sending the request. example: `http://your-server.com/pingscript?id=$id` `http://your-server.com/pingscript?id=$id&tag=$tag` **Note:** special characters in `pingback_url` will be urlencoded; i.a., the `#` character will be encoded into `%23`learn more on our [Help Center](https://dataforseo.com/help-center/pingbacks-postbacks-with-dataforseo-api)"
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
    "seo-business"
  ]
}
```
