# post_dataforseo_ai_gemini_llm_scraper_live_html

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "post_dataforseo_ai_gemini_llm_scraper_live_html",
  "successful": true,
  "description": "The same Gemini answer as `post_dataforseo_ai_gemini_llm_scraper_live`, returned as raw HTML. `expand_citations` unfolds the source list. Wrapped in DataForSEO's envelope: data in `tasks[0].result`, outcome in `tasks[0].status_code` - a rejected request still returns HTTP 200. ⚠️ Larger than the 26.1 KB parsed form; take it only when you need markup the parser dropped.",
  "provider": "dataforseo",
  "method": "POST",
  "path": "/apis/v1/dataforseo/ai_optimization/gemini/llm_scraper/live/html",
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
                },
                {
                  "required": [
                    "location_coordinate"
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
              "description": "keyword required field you can specify up to 2000 characters in the keyword field all %## will be decoded (plus character ‘+’ will be decoded to a space character) if you need to use the “%” character for your keyword, please specify it as “%25”; if you need to use the “+” character for your keyword, please specify it as “%2B”learn more about rules and limitations of keyword and keywords fields in DataForSEO APIs in this Help Center article"
            },
            "location_name": {
              "type": "string",
              "description": "full name of search engine location required field if you don't specify location_code if you use this field, you don't need to specify location_code you can receive the list of available locations of the search engine with their location_name by making a separate request to the https://api.dataforseo.com/v3/ai_optimization/gemini/llm_scraper/locations example: United States"
            },
            "location_code": {
              "type": "integer",
              "description": "search engine location code required field if you don't specify location_name if you use this field, you don't need to specify location_name you can receive the list of available locations of the search engines with their location_code by making a separate request to the https://api.dataforseo.com/v3/ai_optimization/gemini/llm_scraper/locations example: 2840"
            },
            "language_name": {
              "type": "string",
              "description": "full name of search engine language required field if you don't specify language_code if you use this field, you don't need to specify language_code you can receive the list of available languages of the search engine with their language_name by making a separate request to the https://api.dataforseo.com/v3/ai_optimization/gemini/llm_scraper/languages example: English"
            },
            "language_code": {
              "type": "string",
              "description": "search engine language code required field if you don't specify language_name if you use this field, you don't need to specify language_name you can receive the list of available languages of the search engine with their language_code_by making a separate request to the https://api.dataforseo.com/v3/ai_optimization/gemini/llm_scraper/languages example:enn"
            },
            "expand_citations": {
              "type": "boolean",
              "description": "return expanded citation bar in HTML results optional field when enabled, the endpoint will return HTML data from the expanded citation bar; default value: false"
            },
            "tag": {
              "type": "string",
              "description": "user-defined task identifier optional field the character limit is 255 you can use this parameter to identify the task and match it with the result you will find the specified tag value in the data object of the response"
            },
            "location_coordinate": {
              "type": "string",
              "description": "Search location as latitude,longitude,radius. Use instead of location_name or location_code."
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
    "seo-ai-visibility"
  ]
}
```
