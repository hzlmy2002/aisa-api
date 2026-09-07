# post_dataforseo_labs_google_search_intent_live

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "post_dataforseo_labs_google_search_intent_live",
  "successful": true,
  "description": "Classifies `keywords` as informational, navigational, commercial or transactional. Returns `language_code`, `items_count` and `items`. Measured at 673 bytes and **$0.001212 - ten times cheaper than everything else in this family**, so classify freely. Wrapped in DataForSEO's envelope: data in `tasks[0].result`, outcome in `tasks[0].status_code` - a rejected request still returns HTTP 200. Intent decides what a page has to be before volume decides whether it is worth writing; pair it with `post_dataforseo_labs_google_keyword_overview_live`.",
  "provider": "dataforseo",
  "method": "POST",
  "path": "/apis/v1/dataforseo/dataforseo_labs/google/search_intent/live",
  "arguments_schema": {
    "type": "object",
    "properties": {
      "body": {
        "type": "array",
        "items": {
          "required": [
            "keywords"
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
            "keywords": {
              "type": "array",
              "items": {
                "type": "string"
              },
              "description": "target keywords required field UTF-8 encoding maximum number of keywords you can specify in this array: 1000; the keywords will be converted to lowercase format learn more about rules and limitations of keyword and keywords fields in DataForSEO APIs in this Help Center article"
            },
            "language_name": {
              "type": "string",
              "description": "full name of the language required field if don’t specify language_code you can receive the list of available languages with their language_name by making a separate request to https://api.dataforseo.com/v3/dataforseo_labs/locations_and_languages Note: this endpoint currently supports the following languages only: Arabic, ar, Chinese(Traditional), zh-TW, Czech, cs, Danish, da, Dutch, nl, English, en, Finnish, fi, French, fr, German, de, Hebrew, he, Hindi, hi, Italian, it, Japanese, ja, Korean, ko, Malay, ms, Norwegian(Bokmål), nb, Polish, pl, Portuguese, pt, Romanian, ro, Russian, ru, Spanish, es, Swedish, sv, Thai, th, Ukrainian, uk, Vietnamese, vi, Bulgarian, bg, Croatian, hr, Serbian, sr, Slovenian, sl, Bosnian, bs, Greek, el, Hungarian, hu, Slovak, sk, Turkish, tr example: English"
            },
            "language_code": {
              "type": "string",
              "description": "language code required field if don’t specify language_name you can receive the list of available languages with their language_code by making a separate request to https://api.dataforseo.com/v3/dataforseo_labs/locations_and_languages Note: this endpoint currently supports these languages only; example: en"
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
    "seo-labs"
  ]
}
```
