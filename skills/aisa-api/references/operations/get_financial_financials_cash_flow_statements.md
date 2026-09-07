# get_financial_financials_cash_flow_statements

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "get_financial_financials_cash_flow_statements",
  "successful": true,
  "description": "Cash flow statements for one company, about 27 fields per period: `net_cash_flow_from_operations`, `net_cash_flow_from_investing`, `net_cash_flow_from_financing`, `capital_expenditure`, `depreciation_and_amortization`, `share_based_compensation`, `issuance_or_repayment_of_debt_securities`, `issuance_or_purchase_of_equity_shares` and `dividends_and_other_cash_distributions`, stamped with `report_period`, `fiscal_period` and `currency`. `period` is required. Use it to see cash generation rather than accounting earnings. Free cash flow yield and similar derived figures live in `get_financial_financial_metrics`.",
  "provider": "financial",
  "method": "GET",
  "path": "/apis/v1/financial/financials/cash-flow-statements",
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
        "description": "The time period of the cash flow statements."
      },
      "limit": {
        "type": "integer",
        "format": "int32",
        "description": "The maximum number of cash flow statements to return."
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
