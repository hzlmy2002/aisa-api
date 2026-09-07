# get_financial_insider_trades

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "get_financial_insider_trades",
  "successful": true,
  "description": "Form 4 insider transactions for one stock. Each row carries the person (`name`, `title`, `is_board_director`), the trade (`transaction_date`, `transaction_code`, `transaction_type`, `transaction_shares`, `transaction_price_per_share`, `transaction_value`), the resulting position (`shares_owned_before_transaction`, `shares_owned_after_transaction`) and the filing (`form_type`, `filing_date`, `security_title`). `ticker` is required. Filter with `name` or `transaction_type`, and bound by filing date with `filing_date`, `filing_date_gte`, `filing_date_lte`, `filing_date_gt` or `filing_date_lt`. Use it for who inside the company bought or sold and when.",
  "provider": "financial",
  "method": "GET",
  "path": "/apis/v1/financial/insider-trades",
  "arguments_schema": {
    "type": "object",
    "properties": {
      "ticker": {
        "type": "string",
        "description": "The ticker symbol of the company."
      },
      "limit": {
        "type": "integer",
        "default": 10,
        "description": "The maximum number of transactions to return (default: 10)."
      },
      "name": {
        "type": "string",
        "description": "Filter by insider name (e.g., 'Jen Hsun Huang'). Use the /insider-trades/names endpoint to get available names for a ticker."
      },
      "transaction_type": {
        "type": "string",
        "description": "Filter by transaction type (e.g., 'Open market sale', 'Gift'). Use the /insider-trades/transaction-types endpoint to get available types."
      },
      "filing_date": {
        "type": "string",
        "format": "date",
        "description": "Filter by exact filing date in YYYY-MM-DD format."
      },
      "filing_date_gte": {
        "type": "string",
        "format": "date",
        "description": "Filter by filing date greater than or equal to this date (YYYY-MM-DD)."
      },
      "filing_date_lte": {
        "type": "string",
        "format": "date",
        "description": "Filter by filing date less than or equal to this date (YYYY-MM-DD)."
      },
      "filing_date_gt": {
        "type": "string",
        "format": "date",
        "description": "Filter by filing date greater than this date (YYYY-MM-DD)."
      },
      "filing_date_lt": {
        "type": "string",
        "format": "date",
        "description": "Filter by filing date less than this date (YYYY-MM-DD)."
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
    "marketpulse"
  ]
}
```
