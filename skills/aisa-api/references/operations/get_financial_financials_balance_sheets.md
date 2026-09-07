# get_financial_financials_balance_sheets

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "get_financial_financials_balance_sheets",
  "successful": true,
  "description": "Balance sheets for one company, about 36 fields per period: `total_assets`, `current_assets`, `cash_and_equivalents`, `inventory`, `trade_and_non_trade_receivables`, `property_plant_and_equipment`, `goodwill_and_intangible_assets`, `total_liabilities`, `current_liabilities`, `current_debt`, `trade_and_non_trade_payables`, `deferred_revenue` and the equity lines, stamped with `report_period`, `fiscal_period`, `currency` and `filing_url`. `period` is required. Use it for capital structure and liquidity. For the ratios already computed off these numbers use `get_financial_financial_metrics`.",
  "provider": "financial",
  "method": "GET",
  "path": "/apis/v1/financial/financials/balance-sheets",
  "arguments_schema": {
    "type": "object",
    "properties": {
      "ticker": {
        "type": "string",
        "description": "The ticker symbol. Required if cik is not provided."
      },
      "period": {
        "enum": [
          "annual",
          "quarterly",
          "ttm"
        ],
        "type": "string",
        "description": "The time period of the balance sheets."
      },
      "limit": {
        "type": "integer",
        "format": "int32",
        "description": "The maximum number of balance sheets to return"
      },
      "cik": {
        "type": "string",
        "description": "The Central Index Key (CIK) of the company."
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
