# get_coingecko_coins_id_history

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "get_coingecko_coins_id_history",
  "successful": true,
  "description": "A snapshot of one coin on a single calendar day. `date` is required and must be formatted dd-mm-yyyy (day, month, four-digit year). Returns `market_data` holding `current_price`, `market_cap` and `total_volume` as of that day, alongside `community_data`, `developer_data` and `public_interest_stats`. Use it for one fixed point in time. For a continuous series use `get_coingecko_coins_id_market_chart` for a trailing window, or `get_coingecko_coins_id_market_chart_range` for an explicit one.",
  "provider": "coingecko",
  "method": "GET",
  "path": "/apis/v1/coingecko/coins/{id}/history",
  "arguments_schema": {
    "type": "object",
    "properties": {
      "id": {
        "type": "string",
        "example": "bitcoin",
        "description": "CoinGecko coin ID (e.g., `bitcoin`, `ethereum`). Get the list via `/coins/list`."
      },
      "date": {
        "type": "string",
        "example": "30-12-2024",
        "description": "Date in `dd-mm-yyyy` format."
      },
      "localization": {
        "type": "boolean",
        "default": true
      }
    },
    "required": [
      "id",
      "date"
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
    "crypto-market-data"
  ]
}
```
