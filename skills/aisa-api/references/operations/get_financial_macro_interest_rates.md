# get_financial_macro_interest_rates

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "get_financial_macro_interest_rates",
  "successful": true,
  "description": "One central bank's policy rate over time, as an `interest_rates` array of `bank`, `name`, `date` and `rate`. `bank` is required and bound by `start_date` and `end_date`. Trap worth knowing: the code is case-sensitive and must be uppercase — FED works, fed returns HTTP 404 with \"No data found\", which reads like an empty result rather than a bad argument. Valid codes are FED, ECB, BOJ, BOE, BOC, RBA, PBOC, SNB, RBI and BOK; `get_financial_macro_interest_rates_snapshot` with no arguments lists them all.",
  "provider": "financial",
  "method": "GET",
  "path": "/apis/v1/financial/macro/interest-rates",
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
        "description": "The bank whose interest rates to return. Use the /macro/interest-rates/banks endpoint to get a list of available banks. Case-sensitive: must be uppercase. A lowercase code returns HTTP 404 \"No data found\", which reads like an empty result rather than a bad argument."
      },
      "start_date": {
        "type": "string",
        "description": "The start date of the interest rates to return in YYYY-MM-DD format."
      },
      "end_date": {
        "type": "string",
        "description": "The end date of the interest rates to return in YYYY-MM-DD format."
      }
    },
    "required": [
      "bank"
    ]
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
