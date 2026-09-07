# get_dataforseo_ai_gemini_llm_scraper_locations

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "get_dataforseo_ai_gemini_llm_scraper_locations",
  "successful": true,
  "description": "The locations the Gemini scraper accepts, as `location_code`, `location_name`, `location_code_parent`, `country_iso_code` and `location_type`. 🔴 **Measured at 42 MB** - every city and region worldwide, and the third Google-side location catalogue in this provider to measure over 40 MB. Do not call it from an agent: `location_code` 2840 is the United States, and other codes belong in DataForSEO's documentation. Free upstream, so nothing warns you.",
  "provider": "dataforseo",
  "method": "GET",
  "path": "/apis/v1/dataforseo/ai_optimization/gemini/llm_scraper/locations",
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
