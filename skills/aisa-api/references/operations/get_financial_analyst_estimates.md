# get_financial_analyst_estimates

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "get_financial_analyst_estimates",
  "successful": true,
  "description": "Forward analyst consensus for one stock: `fiscal_period`, `period`, `revenue` and `earnings_per_share` per estimated period. `ticker` is required; `period` selects annual or quarterly and `limit` caps how many periods come back. Deliberately narrow — no analyst names, no ratings, no price targets, no high/low dispersion. Use it for what the street expects. For what was actually reported, and by how much it beat or missed, use `get_financial_earnings`.",
  "provider": "financial",
  "method": "GET",
  "path": "/apis/v1/financial/analyst-estimates",
  "arguments_schema": {
    "type": "object",
    "properties": {
      "ticker": {
        "type": "string",
        "description": "The ticker to get analyst estimates for."
      },
      "period": {
        "enum": [
          "annual",
          "quarterly"
        ],
        "type": "string",
        "description": "The period to get analyst estimates for. Use the /analyst-estimates/periods endpoint to get a list of available periods. Defaults to 'annual'."
      },
      "limit": {
        "type": "integer",
        "description": "The maximum number of estimates to return (max 3 for annual, 12 for quarterly)."
      }
    },
    "required": [
      "ticker"
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
