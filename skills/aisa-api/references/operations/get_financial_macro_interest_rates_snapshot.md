# get_financial_macro_interest_rates_snapshot

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "get_financial_macro_interest_rates_snapshot",
  "successful": true,
  "description": "Current policy rates for the ten central banks tracked here, as an `interest_rates` array of `bank`, `name`, `rate` and `date`. `bank` is optional — omit it to get all ten at once, which is also how you discover the valid codes: FED, ECB, BOJ, BOE, BOC, RBA, PBOC, SNB, RBI and BOK. Use it for the current rate backdrop. For one bank's rate path over time use `get_financial_macro_interest_rates`.",
  "provider": "financial",
  "method": "GET",
  "path": "/apis/v1/financial/macro/interest-rates/snapshot",
  "arguments_schema": {
    "type": "object",
    "properties": {
      "bank": {
        "enum": [
          "FED",
          "ECB",
          "BOJ",
          "BOE",
          "BOC",
          "RBA",
          "PBOC",
          "SNB",
          "RBI",
          "BOK"
        ],
        "type": "string",
        "description": "Optional central bank code (e.g., FED, ECB, BOJ). AIsa also accepts this endpoint without `bank` and returns the latest snapshot for all major central banks. Case-sensitive: must be uppercase. A lowercase code returns HTTP 404 \"No data found\", which reads like an empty result rather than a bad argument."
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
    "marketpulse"
  ]
}
```
