# get_coingecko_coins_id_market_chart

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "get_coingecko_coins_id_market_chart",
  "successful": true,
  "description": "Historical series for one coin over a trailing window set by `days`, returned as three parallel arrays: `prices`, `market_caps` and `total_volumes`. Each entry is a two-element pair of timestamp and value, and the timestamp is in milliseconds. Granularity follows `days` automatically, or force it with `interval` (`daily` or `hourly`). Use it to chart a trend ending now. For an explicit start and end use `get_coingecko_coins_id_market_chart_range`; for candlesticks use `get_coingecko_coins_id_ohlc`; for one specific past day use `get_coingecko_coins_id_history`.",
  "provider": "coingecko",
  "method": "GET",
  "path": "/apis/v1/coingecko/coins/{id}/market_chart",
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
        "description": "Data up to N days ago. Accepts `1`, `7`, `14`, `30`, `90`, `180`, `365`, or `max`."
      },
      "interval": {
        "enum": [
          "daily",
          "hourly"
        ],
        "type": "string",
        "description": "Data interval. CoinGecko supports `daily`; `hourly` is also available for supported ranges."
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
