# get_coingecko_coins_id

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "get_coingecko_coins_id",
  "successful": true,
  "description": "Everything CoinGecko holds on one coin, selected by `id`: `description`, `links`, `image`, `categories`, `platforms` and `detail_platforms` (contract addresses per chain), `market_cap_rank`, and a `market_data` block carrying `current_price`, `market_cap`, `total_volume`, `fully_diluted_valuation`, `ath` and `atl` with dates and change percentages. The heavy sections are opt-in via `market_data`, `community_data`, `developer_data`, `tickers`, `sparkline` and `localization` — leave them off unless needed, the full payload is large. Use it for a coin profile. For a price table across many coins use `get_coingecko_coins_markets`; to look the same coin up by contract address use `get_coingecko_token_data`.",
  "provider": "coingecko",
  "method": "GET",
  "path": "/apis/v1/coingecko/coins/{id}",
  "arguments_schema": {
    "type": "object",
    "properties": {
      "id": {
        "type": "string",
        "example": "bitcoin",
        "description": "CoinGecko coin ID (e.g., `bitcoin`, `ethereum`). Get the list via `/coins/list`."
      },
      "localization": {
        "type": "boolean",
        "default": true
      },
      "tickers": {
        "type": "boolean",
        "default": true
      },
      "market_data": {
        "type": "boolean",
        "default": true
      },
      "community_data": {
        "type": "boolean",
        "default": true
      },
      "developer_data": {
        "type": "boolean",
        "default": true
      },
      "sparkline": {
        "type": "boolean",
        "default": false
      }
    },
    "required": [
      "id"
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
