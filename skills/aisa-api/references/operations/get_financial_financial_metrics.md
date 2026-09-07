# get_financial_financial_metrics

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "get_financial_financial_metrics",
  "successful": true,
  "description": "Computed ratios for one company over time, about 49 per period: `market_cap`, `enterprise_value`, `price_to_earnings_ratio`, `price_to_book_ratio`, `price_to_sales_ratio`, `enterprise_value_to_ebitda_ratio`, `free_cash_flow_yield`, `peg_ratio`, `gross_margin`, `operating_margin`, `net_margin`, `return_on_equity`, `return_on_assets`, `return_on_invested_capital`, the turnover and liquidity ratios, each stamped with `report_period` and `fiscal_period`. `period` is required; identify by `ticker` or `cik`. Use it to trend a ratio across periods. For the current values only, `get_financial_financial_metrics_snapshot` is one row and much smaller.",
  "provider": "financial",
  "method": "GET",
  "path": "/apis/v1/financial/financial-metrics",
  "arguments_schema": {
    "type": "object",
    "properties": {
      "ticker": {
        "type": "string",
        "description": "The ticker symbol of the company. Required if cik is not provided."
      },
      "cik": {
        "type": "string",
        "description": "The Central Index Key (CIK) of the company. Can be used instead of ticker."
      },
      "period": {
        "enum": [
          "annual",
          "quarterly",
          "ttm"
        ],
        "type": "string",
        "description": "The time period for the financial data."
      },
      "limit": {
        "type": "integer",
        "description": "The maximum number of results to return."
      },
      "report_period": {
        "type": "string",
        "format": "date",
        "description": "Filter by exact report period date in YYYY-MM-DD format."
      },
      "report_period_gte": {
        "type": "string",
        "format": "date",
        "description": "Filter by report period greater than or equal to date in YYYY-MM-DD format."
      },
      "report_period_lte": {
        "type": "string",
        "format": "date",
        "description": "Filter by report period less than or equal to date in YYYY-MM-DD format."
      },
      "report_period_gt": {
        "type": "string",
        "format": "date",
        "description": "Filter by report period greater than date in YYYY-MM-DD format."
      },
      "report_period_lt": {
        "type": "string",
        "format": "date",
        "description": "Filter by report period less than date in YYYY-MM-DD format."
      }
    },
    "required": [
      "period"
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
