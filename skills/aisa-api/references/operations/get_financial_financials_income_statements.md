# get_financial_financials_income_statements

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "get_financial_financials_income_statements",
  "successful": true,
  "description": "Income statements for one company, about 32 fields per period: `revenue`, `cost_of_revenue`, `gross_profit`, `operating_expense`, `selling_general_and_administrative_expenses`, `research_and_development`, `operating_income`, `interest_expense`, `ebit`, `income_tax_expense`, `net_income`, `net_income_common_stock` and the per-share lines, each stamped with `report_period`, `fiscal_period`, `currency`, `filing_date` and `filing_url`. `period` is required (annual, quarterly or ttm). Use it for the revenue-to-earnings walk. For all three statements at once use `get_financial_financials`.",
  "provider": "financial",
  "method": "GET",
  "path": "/apis/v1/financial/financials/income-statements",
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
        "description": "The time period of the income statements."
      },
      "limit": {
        "type": "integer",
        "format": "int32",
        "description": "The maximum number of income statements to return."
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
