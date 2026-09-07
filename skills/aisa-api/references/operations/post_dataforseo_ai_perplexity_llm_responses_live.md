# post_dataforseo_ai_perplexity_llm_responses_live

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "post_dataforseo_ai_perplexity_llm_responses_live",
  "successful": true,
  "description": "Sends a `user_prompt` to a Perplexity model and returns its reply, synchronously. `model_name` must come from `get_dataforseo_ai_perplexity_llm_responses_models` - `sonar`, `sonar-pro` and `sonar-reasoning-pro`. `web_search_country_iso_code` scopes the search, which the other three vendors do not offer. Returns `model_name`, `input_tokens`, `output_tokens`, `reasoning_tokens`, `web_search`, `money_spent`, `datetime`, `items` and `fan_out_queries`. 💰 **Priced by tokens upstream, not per call**: a sixteen-token reply measured $0.0006, but nothing caps a long one, and AIsa bills a flat $0.012 either way. Read `money_spent` on the response to see what a prompt actually cost. Wrapped in DataForSEO's envelope: data in `tasks[0].result`, outcome in `tasks[0].status_code` - a rejected request still returns HTTP 200. ⚠️ Perplexity searches by default, so its cost varies more with the question than the other vendors' do - `post_perplexity_sonar_deep_research` is the documented case of that going badly (CASEBOOK C5).",
  "provider": "dataforseo",
  "method": "POST",
  "path": "/apis/v1/dataforseo/ai_optimization/perplexity/llm_responses/live",
  "arguments_schema": {
    "type": "object",
    "properties": {
      "body": {
        "type": "array",
        "items": {
          "required": [
            "user_prompt",
            "model_name"
          ],
          "type": "object",
          "properties": {
            "user_prompt": {
              "type": "string",
              "description": "prompt for the AI model required field the question or task you want to send to the AI model; you can specify up to 500 characters in the user_prompt field"
            },
            "model_name": {
              "type": "string",
              "description": "name of the AI model required field model_nameconsists of the actual model name and version name; if the basic model name is specified, its latest version will be set by default; you can receive the list of available LLM models by making a separate request to the following endpoint: https://api.dataforseo.com/v3/ai_optimization/perplexity/llm_responses/models"
            },
            "max_output_tokens": {
              "type": "integer",
              "description": "maximum number of tokens in the AI response optional field minimum value: 1 maximum value: 4096; default value: 2048; Note: if the reasoning model is specified in the request, the output token count may exceed the specified max_output_tokens limit"
            },
            "temperature": {
              "type": "number",
              "description": "randomness of the AI response optional field higher values make output more diverse lower values make output more focused minimum value: 0 maximum value: 1.9 default value: 0.77"
            },
            "top_p": {
              "type": "number",
              "description": "diversity of the AI response optional field controls diversity of the response by limiting token selection minimum value: 0 maximum value: 1 default value: 0.9"
            },
            "web_search_country_iso_code": {
              "type": "string",
              "description": "country code for web search localization optional field specify the country ISO code to get localized web search results Note: available only for Perplexity Sonar models example: US"
            },
            "system_message": {
              "type": "string",
              "description": "instructions for the AI behavior optional field defines the AI's role, tone, or specific behavior you can specify up to 500 characters in the system_message field"
            },
            "message_chain": {
              "type": "array",
              "items": {
                "required": [
                  "role",
                  "message"
                ],
                "type": "object",
                "properties": {
                  "role": {
                    "enum": [
                      "user",
                      "ai"
                    ],
                    "type": "string"
                  },
                  "message": {
                    "type": "string"
                  }
                }
              },
              "description": "conversation history optional field array of message objects representing previous conversation turns; each object must contain: role string with either user or ai role; message string with message content (max 500 characters); you can specify maximum of 10 message objects in the array; Note: for Perplexity models, messages must strictly alternate between user and AI roles (user → ai); example: \"message_chain\": [{\"role\":\"user\",\"message\":\"Hello, what’s up?\"},{\"role\":\"ai\",\"message\":\"Hello! I’m doing well, thank you. How can I assist you today?\"}]"
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
