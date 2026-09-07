# get_financial_financials

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "get_financial_financials",
  "successful": true,
  "description": "All three statements for one company in a single call. Returns a `financials` object holding `income_statements`, `balance_sheets` and `cash_flow_statements`, each the same shape the dedicated tools return. `period` is required (annual, quarterly or ttm); identify the company by `ticker` or `cik` and cap with `limit`. Use it when you need the full picture and would otherwise make three calls. When you only need one statement, `get_financial_financials_income_statements`, `get_financial_financials_balance_sheets` or `get_financial_financials_cash_flow_statements` returns far less data; when you need a handful of named fields across several companies, `post_financial_financials_search_line_items` is narrower still.",
  "provider": "financial",
  "method": "GET",
  "path": "/apis/v1/financial/financials",
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
        "description": "The time period of the financial statements."
      },
      "limit": {
        "type": "integer",
        "format": "int32",
        "description": "The maximum number of financial statements to return."
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
