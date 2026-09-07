# get_coingecko_simple_token_price_id

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "get_coingecko_simple_token_price_id",
  "successful": true,
  "description": "Price lookup keyed by on-chain contract address rather than CoinGecko id. `id` is the asset platform, `contract_addresses` a comma-separated list of token addresses, `vs_currencies` the quote currency. Returns a map keyed by lowercase contract address whose field names are built from the quote currency — `usd`, plus `usd_market_cap`, `usd_24h_vol`, `usd_24h_change` and `last_updated_at` when the matching `include_market_cap`, `include_24hr_vol`, `include_24hr_change` and `include_last_updated_at` flags are set. Use it when you hold an address and no id. For the token's full profile use `get_coingecko_token_data`; if you already have the CoinGecko id use `get_coingecko_simple_price`.",
  "provider": "coingecko",
  "method": "GET",
  "path": "/apis/v1/coingecko/simple/token_price/{id}",
  "arguments_schema": {
    "type": "object",
    "properties": {
      "id": {
        "type": "string",
        "example": "ethereum",
        "description": "Platform ID (e.g., `ethereum`, `binance-smart-chain`, `polygon-pos`)."
      },
      "contract_addresses": {
        "type": "string",
        "example": "0xdAC17F958D2ee523a2206206994597C13D831ec7",
        "description": "Comma-separated contract addresses."
      },
      "vs_currencies": {
        "type": "string",
        "example": "usd",
        "description": "Comma-separated target currencies."
      },
      "include_market_cap": {
        "type": "boolean"
      },
      "include_24hr_vol": {
        "type": "boolean"
      },
      "include_24hr_change": {
        "type": "boolean"
      },
      "include_last_updated_at": {
        "type": "boolean"
      },
      "precision": {
        "type": "string",
        "example": "2",
        "description": "`full` or a value from `0` to `18` to specify decimal places for currency price values."
      }
    },
    "required": [
      "id",
      "contract_addresses",
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
