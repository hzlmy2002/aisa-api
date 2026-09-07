# get_financial_prices

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "get_financial_prices",
  "successful": true,
  "description": "Historical OHLCV bars for one stock. All four of `ticker`, `interval`, `start_date` and `end_date` are required — there is no trailing-window shortcut. `interval` is one of day, week, month or year. Each bar carries `open`, `close`, `high`, `low`, `volume` and `time`, wrapped in a `prices` array alongside the echoed `ticker`. Use it to chart or to measure a move across a known window. For just the latest price use `get_financial_prices_snapshot`.",
  "provider": "financial",
  "method": "GET",
  "path": "/apis/v1/financial/prices",
  "arguments_schema": {
    "type": "object",
    "properties": {
      "ticker": {
        "type": "string",
        "description": "The stock ticker symbol (e.g. AAPL, MSFT)."
      },
      "interval": {
        "enum": [
          "day",
          "week",
          "month",
          "year"
        ],
        "type": "string",
        "description": "The time interval for the price data."
      },
      "start_date": {
        "type": "string",
        "format": "date",
        "description": "The start date for the price data (format: YYYY-MM-DD)."
      },
      "end_date": {
        "type": "string",
        "format": "date",
        "description": "The end date for the price data (format: YYYY-MM-DD)."
      }
    },
    "required": [
      "ticker",
      "interval",
      "start_date",
      "end_date"
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
