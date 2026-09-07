# get_coingecko_token_market_chart_range

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "get_coingecko_token_market_chart_range",
  "successful": true,
  "description": "Historical series between two explicit points in time for a token identified by contract address. `id` is the asset platform and `contract_address` the token; `from` and `to` are Unix timestamps in seconds while response timestamps are in milliseconds. Returns `prices`, `market_caps` and `total_volumes` as timestamp-and-value pairs. Use it when you have an address and a fixed window. For a trailing window use `get_coingecko_token_market_chart`; if you hold a CoinGecko id rather than an address use `get_coingecko_coins_id_market_chart_range`.",
  "provider": "coingecko",
  "method": "GET",
  "path": "/apis/v1/coingecko/coins/{id}/contract/{contract_address}/market_chart/range",
  "arguments_schema": {
    "type": "object",
    "properties": {
      "id": {
        "type": "string",
        "example": "ethereum",
        "description": "Asset platform ID (e.g., `ethereum`)."
      },
      "contract_address": {
        "type": "string",
        "example": "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
        "description": "Token contract address."
      },
      "vs_currency": {
        "type": "string",
        "default": "usd",
        "description": "Target currency for price (e.g., `usd`, `eur`, `btc`). See `/simple/supported_vs_currencies`."
      },
      "from": {
        "type": "integer",
        "example": 1751328000,
        "description": "Start UNIX timestamp (seconds)."
      },
      "to": {
        "type": "integer",
        "example": 1751414400,
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
      "contract_address",
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
