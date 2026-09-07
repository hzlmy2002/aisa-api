# post_financial_financials_search_line_items

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "post_financial_financials_search_line_items",
  "successful": true,
  "description": "Pull named financial line items across one or more companies in a single call. Body takes `tickers` and `line_items` (both required, both arrays), plus `period` (annual, quarterly or ttm) and `limit`. Returns `search_results` with one row per ticker and period carrying only the fields you asked for, alongside `report_period`, `period` and `currency`. Use it to build a comparison table without pulling three full statements per company. The item names are the same field names the statement tools return, so look one up there first if unsure. For everything about a single company use `get_financial_financials`.",
  "provider": "financial",
  "method": "POST",
  "path": "/apis/v1/financial/financials/search/line-items",
  "arguments_schema": {
    "type": "object",
    "properties": {
      "line_items": {
        "minItems": 1,
        "type": "array",
        "items": {
          "type": "string",
          "description": "The financial metric to search for."
        },
        "description": "An array of line items to apply to the search."
      },
      "tickers": {
        "minItems": 1,
        "type": "array",
        "items": {
          "type": "string",
          "description": "The tickers to search for."
        },
        "description": "An array of tickers to apply to the search."
      },
      "period": {
        "enum": [
          "annual",
          "quarterly",
          "ttm"
        ],
        "type": "string",
        "description": "The time period for the financial data.",
        "default": "ttm"
      },
      "limit": {
        "minimum": 1,
        "type": "integer",
        "description": "The maximum number of results to return.",
        "default": 1
      }
    },
    "required": [
      "line_items",
      "tickers"
    ]
  },
  "response_schema": {
    "type": "object",
    "additionalProperties": true
  },
  "read_only": false,
  "idempotent": false,
  "side_effects": [
    "writes-upstream"
  ],
  "annotations": {
    "readOnlyHint": false,
    "destructiveHint": true,
    "idempotentHint": false,
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
