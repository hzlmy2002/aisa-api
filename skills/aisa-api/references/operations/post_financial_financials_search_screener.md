# post_financial_financials_search_screener

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "post_financial_financials_search_screener",
  "successful": true,
  "description": "Find tickers that match numeric conditions. Body takes `filters` — each a `field`, an `operator` and a `value` — plus `limit`. Returns `results` with `ticker`, `currency`, `sector`, `industry` and whichever filtered field was matched. This is the only tool here that works without knowing a ticker in advance; everything else takes one as input. Filterable fields are the metric names `get_financial_financial_metrics` returns. Use it to build a candidate list, then pull detail on each name with the statement or metric tools.",
  "provider": "financial",
  "method": "POST",
  "path": "/apis/v1/financial/financials/search/screener",
  "arguments_schema": {
    "type": "object",
    "properties": {
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
        "maximum": 100,
        "minimum": 1,
        "type": "integer",
        "description": "The maximum number of results to return.",
        "default": 100
      },
      "order_by": {
        "enum": [
          "ticker",
          "-ticker",
          "report_period",
          "-report_period"
        ],
        "type": "string",
        "description": "The field to order the results by.  Use -field to order in descending order.",
        "default": "ticker"
      },
      "currency": {
        "enum": [
          "USD",
          "EUR",
          "GBP",
          "JPY",
          "CHF",
          "AUD",
          "CAD",
          "SEK"
        ],
        "type": "string",
        "description": "The currency of the financial data."
      },
      "historical": {
        "type": "boolean",
        "description": "Whether to return historical financial data.",
        "default": false
      },
      "filters": {
        "minItems": 1,
        "type": "array",
        "items": {
          "required": [
            "field",
            "operator",
            "value"
          ],
          "type": "object",
          "properties": {
            "field": {
              "type": "string",
              "description": "The criteria to filter on.  For financial metric fields, use 'gt', 'lt', 'gte', 'lte', 'eq' operators.  For 'ticker' and 'cik' fields, use the 'in' operator to filter against multiple values."
            },
            "operator": {
              "enum": [
                "gt",
                "lt",
                "gte",
                "lte",
                "eq",
                "in"
              ],
              "type": "string",
              "description": "The comparison operator. The 'in' operator can only be used with a field value of 'ticker' or 'cik' and lets you filter against multiple values."
            },
            "value": {
              "anyOf": [
                {
                  "type": "number",
                  "description": "The value to compare against for single-value operators (gt, lt, gte, lte, eq)"
                },
                {
                  "type": "array",
                  "items": {
                    "type": "string"
                  },
                  "description": "Array of ticker or cik values to compare against when using the 'in' operator"
                }
              ]
            }
          }
        },
        "description": "An array of filter objects to apply to the search."
      }
    },
    "required": [
      "filters"
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
