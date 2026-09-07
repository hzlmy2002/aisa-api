# post_dataforseo_ai_llm_mentions_search_live

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "post_dataforseo_ai_llm_mentions_search_live",
  "successful": true,
  "description": "The individual answers in which an assistant mentioned your target. Returns `total_count`, `current_offset`, `search_after_token` and `items` - page with the token, not `offset`, past the first pages. Measured at 7.7 KB for one item. 🔴 **Measured at $0.101 upstream, roughly eight times the flat rate billed** - among the most expensive endpoints in this provider. ⚠️ `target` is an **array of objects**, each `{\"domain\": \"...\"}` or `{\"keyword\": \"...\"}`; a bare string is rejected as the wrong type and an array of strings as 'Each target item must be an object'. Filter fields come from `get_dataforseo_ai_llm_mentions_available_filters`. Wrapped in DataForSEO's envelope: data in `tasks[0].result`, outcome in `tasks[0].status_code` - a rejected request still returns HTTP 200. For counts rather than the mentions themselves use `post_dataforseo_ai_llm_mentions_aggregated_metrics_live`.",
  "provider": "dataforseo",
  "method": "POST",
  "path": "/apis/v1/dataforseo/ai_optimization/llm_mentions/search/live",
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
              "type": "array",
              "items": {
                "type": "object",
                "properties": {
                  "domain": {
                    "type": "string",
                    "description": "target domain required field if you don't specify keyword you can specify up to 63 characters in the domain field; a domain should be specified without https:// and www."
                  },
                  "keyword": {
                    "type": "string",
                    "description": "target keyword required field if you don't specify domain you can specify up to 250 characters in the keyword field all %## will be decoded (plus character ‘+’ will be decoded to a space character) if you need to use the “%” character for your keyword, please specify it as “%25”; if you need to use the “+” character for your keyword, please specify it as “%2B”learn more about rules and limitations of keyword and keywords fields in DataForSEO APIs in this Help Center article"
                  },
                  "search_filter": {
                    "type": "string",
                    "description": "Entity search filter: include or exclude; defaults to include."
                  },
                  "search_scope": {
                    "type": "array",
                    "items": {
                      "type": "string"
                    },
                    "description": "Search scope. Domain entities: any, sources, search_results. Keyword entities: any, question, answer, brand_entities, fan_out_queries. Default: any."
                  },
                  "include_subdomains": {
                    "type": "boolean",
                    "description": "indicates if the subdomains of the target domain will be included in the search optional field if set to true, the subdomains will be included in the search default value: false"
                  },
                  "match_type": {
                    "type": "string",
                    "description": "target keyword match type defines how the specified keyword is matched optional field possible values: word_match - full-text search for terms that match the specified seed keyword with additional words included before, after, or within the key phrase (e.g., search for \"light\" will return results with \"light bulb\", \"light switch\"); partial_match - substring search that finds all instances containing the specified sequence of characters, even if it appears inside a longer word (e.g., search for \"light\" will return results with \"lighting\", \"highlight\"); default value: word_match"
                  }
                },
                "anyOf": [
                  {
                    "required": [
                      "domain"
                    ]
                  },
                  {
                    "required": [
                      "keyword"
                    ]
                  }
                ]
              },
              "description": "array of objects containing target entities required field you can specify up to 10 entities (objects) in the target field one target entity can contain either one domain or one keyword and related parametersexamples: target array with a domain entity [{\"domain\": \"en.wikipedia.org\", \"search_filter\": \"exclude\"}] target array with a keyword entity [{\"keyword\": \"bmw\", \"search_scope\": [\"question\"], \"match_type \": \"partial_match\"}] target array with multiple entities [{\"domain\": \"en.wikipedia.org\", \"search_filter\": \"exclude\"}, {\"keyword\": \"bmw\", \"match_type \": \"partial_match\", \"search_scope\": [\"answer\"]}]"
            },
            "location_name": {
              "type": "string",
              "description": "full name of search location optional field if you use this field, you don't need to specify location_code if you don't specify this field, the location_code with 2840 value will be used by default; you can receive the list of available locations of the search engine with their location_name by making a separate request to the https://api.dataforseo.com/v3/ai_optimization/llm_mentions/locations_and_languages Note: chat_gpt data is available for United States only"
            },
            "location_code": {
              "type": "integer",
              "description": "search location code optional field if you use this field, you don't need to specify location_name you can receive the list of available locations of the search engine with their location_code by making a separate request to the https://api.dataforseo.com/v3/ai_optimization/llm_mentions/locations_and_languages default value: 2840 Note: chat_gpt data is available for 2840 only"
            },
            "language_name": {
              "type": "string",
              "description": "full name of search language optional field if you use this field, you don't need to specify language_code; if you don't specify this field, the language_code with en value will be used by default; you can receive the list of available languages of the search engine with their language_name by making a separate request to the https://api.dataforseo.com/v3/ai_optimization/llm_mentions/locations_and_languages Note: chat_gpt data is available for English only"
            },
            "language_code": {
              "type": "string",
              "description": "search language code optional field if you use this field, you don't need to specify language_name; you can receive the list of available languages of the search engine with their language_code_by making a separate request to the https://api.dataforseo.com/v3/ai_optimization/llm_mentions/locations_and_languages default value: en Note: chat_gpt data is available for en onlyn"
            },
            "platform": {
              "type": "string",
              "description": "target platform optional field possible values: chat_gpt, google default value: google Note: the data returned depends on the selected platform Note #2:chat_gpt data is available for the United States and English only"
            },
            "filters": {
              "type": "array",
              "items": {},
              "description": "array of results filtering parameters optional field you can add several filters at once (8 filters maximum) you should set a logical operator and, or between the conditions the following operators are supported: =, , in, not_in, like, not_like, ilike, not_ilike, match, not_match you can use the % operator with like and not_like to match any string of zero or more characters example: [\"ai_search_volume\",\">\",\"1000\"]The full list of possible filters is available here."
            },
            "order_by": {
              "type": "array",
              "items": {
                "type": "string"
              },
              "description": "results sorting rules optional field you can use the same values as in the filters array to sort the results possible sorting types: asc - results will be sorted in the ascending order desc - results will be sorted in the descending order you should use a comma to set up a sorting type example: [\"ai_search_volume,desc\"] note that you can set no more than three sorting rules in a single request you should use a comma to separate several sorting rules"
            },
            "offset": {
              "type": "integer",
              "description": "offset in the results array of the returned mentions data optional fielddefault value: 0 example: if you specify the 10 value, the first ten mentions objects in the results array will be omitted and the data will be provided for the successive objects; Note: the maximum value is 9,000, use the search_after_token if you would like to offset more results"
            },
            "search_after_token": {
              "type": "string",
              "description": "token for subsequent requests optional field provided in the identical filed of the response to each request; use this parameter to avoid timeouts while trying to obtain over 20,000 results in a single request; by specifying the unique search_after_token value from the response array, you will get the subsequent results of the initial task; search_after_token values are unique for each subsequent task ; Note: if the search_after_token is specified in the request, all other parameters should be identical to the previous request"
            },
            "limit": {
              "type": "integer",
              "description": "the maximum number of returned objects optional fielddefault value: 100 maximum value: 1000"
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
    "seo-ai-visibility"
  ]
}
```
