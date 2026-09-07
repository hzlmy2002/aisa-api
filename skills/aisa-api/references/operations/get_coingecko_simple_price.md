# get_coingecko_simple_price

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "get_coingecko_simple_price",
  "successful": true,
  "description": "The cheapest price lookup: pass comma-separated CoinGecko `ids` and `vs_currencies`, get back a map keyed by coin id. Field names are built from the quote currency — with `vs_currencies` set to usd you get `usd`, plus `usd_market_cap`, `usd_24h_vol`, `usd_24h_change` and `last_updated_at` when the matching `include_market_cap`, `include_24hr_vol`, `include_24hr_change` and `include_last_updated_at` flags are set. Use it whenever the ids are already known and only current numbers are needed. For rank, supply or all-time-high data use `get_coingecko_coins_markets`; if you hold a contract address rather than an id use `get_coingecko_simple_token_price_id`.",
  "provider": "coingecko",
  "method": "GET",
  "path": "/apis/v1/coingecko/simple/price",
  "arguments_schema": {
    "type": "object",
    "properties": {
      "ids": {
        "type": "string",
        "example": "bitcoin,ethereum",
        "description": "Comma-separated coin IDs."
      },
      "vs_currencies": {
        "type": "string",
        "example": "usd,eur",
        "description": "Comma-separated target currencies."
      },
      "include_market_cap": {
        "type": "boolean",
        "default": false
      },
      "include_24hr_vol": {
        "type": "boolean",
        "default": false
      },
      "include_24hr_change": {
        "type": "boolean",
        "default": false
      },
      "include_last_updated_at": {
        "type": "boolean",
        "default": false
      },
      "precision": {
        "type": "string"
      }
    },
    "required": [
      "ids",
      "vs_currencies"
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
