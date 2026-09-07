# get_coingecko_coins_id_market_chart_range

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "get_coingecko_coins_id_market_chart_range",
  "successful": true,
  "description": "Historical series for one coin between two explicit points in time. `from` and `to` are Unix timestamps in seconds, while the timestamps inside the response are in milliseconds — the two are not the same unit, which is the usual source of empty or misaligned results. Returns `prices`, `market_caps` and `total_volumes` as timestamp-and-value pairs; CoinGecko picks granularity from the window length. Use it to line a series up with a known event window. For a trailing window ending now, `get_coingecko_coins_id_market_chart` takes a `days` count instead.",
  "provider": "coingecko",
  "method": "GET",
  "path": "/apis/v1/coingecko/coins/{id}/market_chart/range",
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
      "from": {
        "type": "integer",
        "example": 1713398400,
        "description": "Start UNIX timestamp (seconds)."
      },
      "to": {
        "type": "integer",
        "example": 1713484800,
        "description": "End UNIX timestamp (seconds)."
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
      "from",
      "to"
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
