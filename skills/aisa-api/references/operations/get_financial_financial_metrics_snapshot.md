# get_financial_financial_metrics_snapshot

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "get_financial_financial_metrics_snapshot",
  "successful": true,
  "description": "The same ratio set as `get_financial_financial_metrics` but current-only: one `snapshot` object of about 41 fields — `market_cap`, `enterprise_value`, `price_to_earnings_ratio`, `price_to_book_ratio`, `price_to_sales_ratio`, `enterprise_value_to_ebitda_ratio`, `free_cash_flow_yield`, `peg_ratio`, the margin and return ratios, and the liquidity ratios. Takes only `ticker` or `cik`, with no period argument. Use it to size up a company right now. For history, or to see whether a multiple is unusual for this company, use `get_financial_financial_metrics`.",
  "provider": "financial",
  "method": "GET",
  "path": "/apis/v1/financial/financial-metrics/snapshot",
  "arguments_schema": {
    "type": "object",
    "properties": {
      "ticker": {
        "type": "string",
        "description": "The ticker symbol of the company."
      },
      "cik": {
        "type": "string",
        "description": "The Central Index Key (CIK) of the company. Can be used instead of ticker."
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
