# get_coingecko_coins_markets

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "get_coingecko_coins_markets",
  "successful": true,
  "description": "A ranked market table covering many coins in one call: one row per coin with `current_price`, `market_cap`, `market_cap_rank`, `total_volume`, `high_24h`, `low_24h`, `price_change_percentage_24h`, `circulating_supply`, `total_supply`, `max_supply`, `ath` and `atl` with their dates, and `image`. Page with `per_page` and `page`, sort with `order` (market cap, volume or id, ascending or descending), and narrow with `ids` or `category`. Passing `price_change_percentage` adds a matching `price_change_percentage_24h_in_currency` field. Use it for leaderboards and segment scans. For the price of a few known coins `get_coingecko_simple_price` is far lighter; for one coin in full use `get_coingecko_coins_id`.",
  "provider": "coingecko",
  "method": "GET",
  "path": "/apis/v1/coingecko/coins/markets",
  "arguments_schema": {
    "type": "object",
    "properties": {
      "vs_currency": {
        "type": "string",
        "default": "usd",
        "description": "Target currency for price (e.g., `usd`, `eur`, `btc`). See `/simple/supported_vs_currencies`."
      },
      "ids": {
        "type": "string",
        "example": "bitcoin,ethereum",
        "description": "Comma-separated CoinGecko coin IDs."
      },
      "category": {
        "type": "string",
        "description": "Filter by category (see `/coins/categories/list`)."
      },
      "order": {
        "enum": [
          "market_cap_desc",
          "market_cap_asc",
          "volume_desc",
          "volume_asc",
          "id_asc",
          "id_desc"
        ],
        "type": "string",
        "default": "market_cap_desc"
      },
      "per_page": {
        "maximum": 250,
        "minimum": 1,
        "type": "integer",
        "default": 100
      },
      "page": {
        "type": "integer",
        "default": 1
      },
      "sparkline": {
        "type": "boolean",
        "default": false
      },
      "price_change_percentage": {
        "type": "string",
        "description": "Comma-separated windows: `1h,24h,7d,14d,30d,200d,1y`."
      },
      "locale": {
        "type": "string",
        "default": "en",
        "example": "en",
        "description": "Response language locale. Official values include `en`, `zh`, `zh-tw`, and other supported CoinGecko locales."
      },
      "precision": {
        "type": "string",
        "example": "2",
        "description": "`full` or a value from `0` to `18` to specify decimal places for currency price values."
      },
      "include_rehypothecated": {
        "type": "boolean",
        "default": false,
        "description": "Include rehypothecated tokens in market data when supported by CoinGecko."
      }
    },
    "required": [
      "vs_currency"
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
