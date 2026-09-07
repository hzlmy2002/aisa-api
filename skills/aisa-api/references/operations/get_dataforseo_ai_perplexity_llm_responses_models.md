# get_dataforseo_ai_perplexity_llm_responses_models

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "get_dataforseo_ai_perplexity_llm_responses_models",
  "successful": true,
  "description": "The Perplexity models available - `sonar`, `sonar-pro`, `sonar-reasoning-pro` - each with `model_name`, `reasoning`, `web_search_supported` and `task_post_supported`. Measured at 745 bytes, the smallest model list here. Free: upstream cost is 0. Note there is no queued variant for Perplexity; the live endpoint is the only one.",
  "provider": "dataforseo",
  "method": "GET",
  "path": "/apis/v1/dataforseo/ai_optimization/perplexity/llm_responses/models",
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
