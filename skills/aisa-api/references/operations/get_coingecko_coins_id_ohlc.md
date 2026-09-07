# get_coingecko_coins_id_ohlc

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "get_coingecko_coins_id_ohlc",
  "successful": true,
  "description": "Candlestick data for one coin as a bare array of rows, each row positional: timestamp in milliseconds, then open, high, low and close. There are no field names in the response and no volume. Candle width is derived from `days`, which is required. Use it for candle or technical analysis. For a price line together with market cap and traded volume use `get_coingecko_coins_id_market_chart` instead.",
  "provider": "coingecko",
  "method": "GET",
  "path": "/apis/v1/coingecko/coins/{id}/ohlc",
  "arguments_schema": {
    "type": "object",
    "properties": {
      "id": {
        "type": "string",
        "example": "bitcoin",
        "description": "CoinGecko coin ID (e.g., `bitcoin`, `ethereum`). Get the list via `/coins/list`."
      },
      "vs_currency": {
        "type": "string",
        "default": "usd",
        "description": "Target currency for price (e.g., `usd`, `eur`, `btc`). See `/simple/supported_vs_currencies`."
      },
      "days": {
        "type": "string",
        "example": "7",
        "description": "`1`, `7`, `14`, `30`, `90`, `180`, `365`."
      },
      "precision": {
        "type": "string",
        "example": "2",
        "description": "`full` or a value from `0` to `18` to specify decimal places for currency price values."
      }
    },
    "required": [
      "id",
      "vs_currency",
      "days"
    ]
  },
  "response_schema": {
    "type": "object",
    "additionalProperties": true,
    "x-fastmcp-wrap-result": true
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
