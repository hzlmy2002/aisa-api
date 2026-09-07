# post_dataforseo_business_social_media_pinterest_live

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "post_dataforseo_business_social_media_pinterest_live",
  "successful": true,
  "description": "How many times each of `targets` has been pinned on Pinterest. Returns `type`, `page_url` and `pins_count` per URL. Measured at 546 bytes and **$0.00004 upstream - the cheapest endpoint measured anywhere in this provider**, three hundred times under the flat rate billed. Wrapped in DataForSEO's envelope: data in `tasks[0].result`, outcome in `tasks[0].status_code` - a rejected request still returns HTTP 200. Takes a list, so check a whole site's pages in one call. For Pinterest content rather than counts, the pinterest server reads the platform directly.",
  "provider": "dataforseo",
  "method": "POST",
  "path": "/apis/v1/dataforseo/business_data/social_media/pinterest/live",
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
              "description": "*target URLs* **required field** target page should be specified with its absolute URL (including http:// or https://) example: `https://dataforseo.com/`**Note:** you can specify 10 targets maximum. You will be charged per earch URL you specify in this array"
            },
            "tag": {
              "type": "string",
              "description": "*user-defined task identifier* optional field *the character limit is 255* you can use this parameter to identify the task and match it with the result you will find the specified `tag` value in the `data` object of the response"
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
