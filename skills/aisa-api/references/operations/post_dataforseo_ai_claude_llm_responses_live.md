# post_dataforseo_ai_claude_llm_responses_live

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "post_dataforseo_ai_claude_llm_responses_live",
  "successful": true,
  "description": "Sends a `user_prompt` to a Claude model and returns its reply, synchronously. `model_name` must come from `get_dataforseo_ai_claude_llm_responses_models` - names look like `claude-sonnet-5`, and a plausible-looking guess is rejected. A sixteen-token reply measured $0.000744. Returns `model_name`, `input_tokens`, `output_tokens`, `reasoning_tokens`, `web_search`, `money_spent`, `datetime`, `items` and `fan_out_queries`. 💰 **Priced by tokens upstream, not per call**: a sixteen-token reply measured $0.0006, but nothing caps a long one, and AIsa bills a flat $0.012 either way. Read `money_spent` on the response to see what a prompt actually cost. Wrapped in DataForSEO's envelope: data in `tasks[0].result`, outcome in `tasks[0].status_code` - a rejected request still returns HTTP 200.",
  "provider": "dataforseo",
  "method": "POST",
  "path": "/apis/v1/dataforseo/ai_optimization/claude/llm_responses/live",
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
              "description": "name of the AI model required field model_nameconsists of the actual model name and version name; if the basic model name is specified, its latest version will be set by default; for example, if claude-opus-4-0 is specified, the claude-opus-4-20250514 will be set as model_name automatically; you can receive the list of available LLM models by making a separate request to the https://api.dataforseo.com/v3/ai_optimization/claude/llm_responses/models"
            },
            "max_output_tokens": {
              "type": "integer",
              "description": "maximum number of tokens in the AI response optional field minimum value: 1; maximum value: 4096; default value: 2048; Note: if web_search is set to true or the reasoning model is specified in the request, the output token count may exceed the specified max_output_tokens limit Note #2: if use_reasoning is set to true, the minimum value for max_output_tokens is 1025"
            },
            "temperature": {
              "type": "number",
              "description": "randomness of the AI response optional field higher values make output more diverse; lower values make output more focused; minimum value: 0 maximum value: 1 default value: 0.7Note: temperature cannot be used together with top_p in the same request"
            },
            "top_p": {
              "type": "number",
              "description": "diversity of the AI response optional field controls diversity of the response by limiting token selection; minimum value: 0 maximum value: 1 default value: nullNote: top_p cannot be used together with temperature in the same request"
            },
            "web_search": {
              "type": "boolean",
              "description": "enable web search for current information optional field when enabled, the AI model can access and cite current web information; Note: refer to the Models endpoint for a list of models that support web_search; default value: false; The cost of the parameter can be calculated on the Pricing page"
            },
            "force_web_search": {
              "type": "boolean",
              "description": "force AI agent to use web search optional field to enable this parameter, web_search must also be enabled; when enabled, the AI model is forced to access and cite current web information; default value: false; Note: even if the parameter is set to true, there is no guarantee web sources will be cited in the response"
            },
            "web_search_country_iso_code": {
              "type": "string",
              "description": "ISO country code of the location optional field possible values: 'AR','AT','AU','BE','BR','CA','CH','CL','CN','DE','DK','ES','FI','FR','GB','HK','ID','IN','IT','JP','KR','MX','MY','NL','NO','NZ','PH','PL','PT','RU','SA','SE','TR','TW','US','ZA'"
            },
            "web_search_city": {
              "type": "string",
              "description": "city name of the location optional field Note: specify web_search_country_iso_code to use this parameter"
            },
            "system_message": {
              "type": "string",
              "description": "instructions for the AI behaviour optional field defines the AI's role, tone, or specific behavior; you can specify up to 500 characters in the system_message field"
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
              "description": "conversation history optional field array of message objects representing previous conversation turns; each object must contain role and message parameters: role string with either user or ai role; message string with message content (max 500 characters); you can specify the maximum of 10 message objects in the array; example: \"message_chain\": [{\"role\":\"user\",\"message\":\"Hello, what’s up?\"},{\"role\":\"ai\",\"message\":\"Hello! I’m doing well, thank you. How can I assist you today?\"}]"
            },
            "use_reasoning": {
              "type": "boolean",
              "description": "enable reasoning for the AI model optional field when enabled, the model will perform reasoning before generating a response refer to the Models endpoint for a list of models that support reasoning default value: false Note: if set to true, the minimum value for max_output_tokens is 1025 Note #2: if set to true, force_web_search must be set to false Note #3: if set to true, the temperature and top_p cannot be used"
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
