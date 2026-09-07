# get_dataforseo_ai_gemini_llm_responses_models

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "get_dataforseo_ai_gemini_llm_responses_models",
  "successful": true,
  "description": "The Gemini models available, each with `model_name`, `reasoning`, `web_search_supported` and `task_post_supported`. Measured at 1.5 KB. Free: upstream cost is 0. Read it before calling; an unlisted `model_name` is rejected with 40501 inside an HTTP 200.",
  "provider": "dataforseo",
  "method": "GET",
  "path": "/apis/v1/dataforseo/ai_optimization/gemini/llm_responses/models",
  "arguments_schema": {
    "type": "object",
    "properties": {},
    "required": []
  },
  "response_schema": {
    "type": "object",
    "additionalProperties": true
  },
  "read_only": true,
  "idempotent": true,
  "side_effects": [],
  "annotations": {
    "readOnlyHint": true,
    "destructiveHint": false,
    "idempotentHint": true,
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
