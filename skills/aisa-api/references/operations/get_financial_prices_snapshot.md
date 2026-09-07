# get_financial_prices_snapshot

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "get_financial_prices_snapshot",
  "successful": true,
  "description": "The current price of one stock in a single call: `price`, `day_change`, `day_change_percent`, and `time` (plus `time_milliseconds`). `ticker` is required. Use it whenever the question is \"what is it trading at now\" — this is the cheapest and fastest way to get one number. For a series of bars over a date range use `get_financial_prices`; for valuation multiples rather than the raw price use `get_financial_financial_metrics_snapshot`.",
  "provider": "financial",
  "method": "GET",
  "path": "/apis/v1/financial/prices/snapshot",
  "arguments_schema": {
    "type": "object",
    "properties": {
      "ticker": {
        "type": "string",
        "description": "The stock ticker symbol (e.g. AAPL, MSFT)."
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
    "marketpulse",
    "stock-pulse"
  ]
}
```
