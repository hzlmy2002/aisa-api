# get_apollo_phone_calls_search

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "get_apollo_phone_calls_search",
  "successful": true,
  "description": "Search logged calls in this workspace. Returns `phone_calls` with `pagination`, `breadcrumbs`, `faceting` and `pipeline_total`. These are call records written into Apollo, not telephony data — a call only appears here if something logged it.",
  "provider": "apollo",
  "method": "GET",
  "path": "/apis/v1/apollo/phone_calls/search",
  "arguments_schema": {
    "type": "object",
    "properties": {
      "date_range[max]": {
        "type": "string",
        "description": "Upper bound for call date range (YYYY-MM-DD)."
      },
      "date_range[min]": {
        "type": "string",
        "description": "Lower bound for call date range (YYYY-MM-DD)."
      },
      "duration[max]": {
        "type": "integer",
        "description": "Upper bound for duration (seconds)."
      },
      "duration[min]": {
        "type": "integer",
        "description": "Lower bound for duration (seconds)."
      },
      "inbound": {
        "type": "string",
        "description": "Inbound or outbound."
      },
      "user_ids[]": {
        "type": "array",
        "items": {
          "type": "string"
        },
        "description": "User IDs."
      },
      "contact_label_ids[]": {
        "type": "array",
        "items": {
          "type": "string"
        },
        "description": "Contact label IDs."
      },
      "phone_call_purpose_ids[]": {
        "type": "array",
        "items": {
          "type": "string"
        },
        "description": "Purpose IDs."
      },
      "phone_call_outcome_ids[]": {
        "type": "array",
        "items": {
          "type": "string"
        },
        "description": "Outcome IDs."
      },
      "q_keywords": {
        "type": "string",
        "description": "Keyword filter."
      },
      "page": {
        "type": "integer",
        "description": "Page number."
      },
      "per_page": {
        "type": "integer",
        "description": "Results per page."
      }
    },
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
    "apollo"
  ]
}
```
