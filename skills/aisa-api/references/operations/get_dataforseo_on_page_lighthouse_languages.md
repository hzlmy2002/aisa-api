# get_dataforseo_on_page_lighthouse_languages

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "get_dataforseo_on_page_lighthouse_languages",
  "successful": true,
  "description": "The languages a Lighthouse report can be returned in, as `language_name` and `language_code`. Measured at 2.5 KB. Free: upstream cost is 0. Pass one as `language_name` or `language_code` on the audit endpoints - it changes the wording of the findings, not what is measured.",
  "provider": "dataforseo",
  "method": "GET",
  "path": "/apis/v1/dataforseo/on_page/lighthouse/languages",
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
    "seo-onpage"
  ]
}
```
