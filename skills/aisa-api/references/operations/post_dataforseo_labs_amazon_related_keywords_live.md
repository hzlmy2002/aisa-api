# post_dataforseo_labs_amazon_related_keywords_live

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "post_dataforseo_labs_amazon_related_keywords_live",
  "successful": true,
  "description": "Amazon search terms related to a seed keyword. Pages with `limit`, `offset` and `offset_token`; use the token past the first pages. 💰 Measured at $0.01212 upstream, essentially the flat rate billed. **This family is the one to reach for by default**: the google_ads endpoints in seo-keywords answer similar questions at $0.09 - seven times more - and return megabytes with no way to cap them, where this one takes a `limit`. Wrapped in DataForSEO's envelope: data in `tasks[0].result`, outcome in `tasks[0].status_code` - a rejected request still returns HTTP 200. The Google-side equivalent is `post_dataforseo_labs_google_related_keywords_live`; shopping intent and web intent diverge sharply, so do not substitute one for the other.",
  "provider": "dataforseo",
  "method": "POST",
  "path": "/apis/v1/dataforseo/dataforseo_labs/amazon/related_keywords/live",
  "arguments_schema": {
    "type": "object",
    "properties": {
      "body": {
        "type": "array",
        "items": {
          "required": [
            "keyword"
          ],
          "type": "object",
          "allOf": [
            {
              "anyOf": [
                {
                  "required": [
                    "location_name"
                  ]
                },
                {
                  "required": [
                    "location_code"
                  ]
                }
              ]
            },
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
            "keyword": {
              "type": "string",
              "description": "keyword required field UTF-8 encoding the keywords should be specified in the lowercase format learn more about rules and limitations of keyword and keywords fields in DataForSEO APIs in this Help Center article"
            },
            "location_name": {
              "type": "string",
              "description": "full name of the location required field if you don’t specify location_code Note: it is required to specify either location_name or location_code you can receive the list of available locations with their location_name by making a separate request to https://api.dataforseo.com/v3/dataforseo_labs/locations_and_languages; Note: this endpoint currently supports the US, Egypt, Saudi Arabia, and the United Arab Emirates locations only; example: United States"
            },
            "location_code": {
              "type": "integer",
              "description": "location code required field if you don’t specify location_name Note: it is required to specify either location_name or location_code you can receive the list of available locations with their location_code by making a separate request to https://api.dataforseo.com/v3/dataforseo_labs/locations_and_languages; Note: this endpoint currently supports the US, Egypt, Saudi Arabia, and the United Arab Emirates locations only; example: 2840"
            },
            "language_name": {
              "type": "string",
              "description": "full name of the language required field if you don’t specify language_code Note: it is required to specify either language_name or language_code you can receive the list of available locations with their language_name by making a separate request to https://api.dataforseo.com/v3/dataforseo_labs/locations_and_languages example: English"
            },
            "language_code": {
              "type": "string",
              "description": "language code required field if you don’t specify language_name Note: it is required to specify either language_name or language_code you can receive the list of available locations with their language_code by making a separate request to https://api.dataforseo.com/v3/dataforseo_labs/locations_and_languages example: en"
            },
            "depth": {
              "type": "integer",
              "description": "keyword search depth optional field default value: 1; number of the returned results depends on the value you set in this field; you can specify a level from 0 to 4; estimated number of keywords for each level (maximum): 0 – the keyword set in the keyword field 1 – 6 keywords 2 – 42 keywords 3 – 258 keywords 4 – 1554 keywords"
            },
            "include_seed_keyword": {
              "type": "boolean",
              "description": "include data for the seed keyword optional field if set to true, data for the seed keyword specified in the keyword field will be provided in the seed_keyword_data array of the response default value: false"
            },
            "ignore_synonyms": {
              "type": "boolean",
              "description": "ignore highly similar keywords optional field if set to true only core keywords will be returned, all highly similar keywords will be excluded; default value: false"
            },
            "limit": {
              "type": "integer",
              "description": "the maximum number of returned keywords optional field default value: 100 maximum value: 1000"
            },
            "offset": {
              "type": "integer",
              "description": "offset in the results array of returned keywords optional field default value: 0 if you specify the 10 value, the first ten keywords in the results array will be omitted and the data will be provided for the successive keywords"
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
