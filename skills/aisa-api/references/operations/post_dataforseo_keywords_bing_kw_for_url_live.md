# post_dataforseo_keywords_bing_kw_for_url_live

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "post_dataforseo_keywords_bing_kw_for_url_live",
  "successful": true,
  "description": "Suggests Bing keywords for one page `target`, reading the page itself rather than a seed list. `exclude_brands` drops brand terms, `language_code` scopes it. Wrapped in DataForSEO's envelope: data in `tasks[0].result`, outcome in `tasks[0].status_code` - a rejected request still returns HTTP 200. Use it when you have a URL and no keyword list yet; once you have seeds, `post_dataforseo_keywords_bing_kw_for_keywords_live` expands them. The submit and fetch twins of this endpoint do the same work asynchronously, at the same price, for batches too large to wait on.",
  "provider": "dataforseo",
  "method": "POST",
  "path": "/apis/v1/dataforseo/keywords_data/bing/keyword_suggestions_for_url/live",
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
          "allOf": [
            {
              "anyOf": [
                {
                  "required": [
                    "language_name"
                  ]
                },
                {
                  "required": [
                    "language_code"
                  ]
                }
              ]
            }
          ],
          "properties": {
            "target": {
              "type": "string",
              "description": "target URL of the webpage to scan for possible keywords required field maximum length: 2000 characters"
            },
            "language_code": {
              "type": "string",
              "description": "search engine language code required field if you don’t specify language_name if you use this field, you don’t need to specify language_name you can receive the list of available languages with their language_code by making a separate request to https://api.dataforseo.com/v3/keywords_data/bing/keyword_suggestions_for_url/languages example: en"
            },
            "exclude_brands": {
              "type": "boolean",
              "description": "determines whether the results exclude brand keywords optional field"
            },
            "language_name": {
              "type": "string",
              "description": "Full name of the search engine language. Required if language_code is not supplied; either language_name or language_code is sufficient."
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
    "seo-keywords"
  ]
}
```
