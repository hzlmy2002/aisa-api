# get_coingecko_coins_id_tickers

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "get_coingecko_coins_id_tickers",
  "successful": true,
  "description": "Every trading pair for one coin across venues: `base`, `target`, `market`, `last`, `volume`, `converted_last`, `converted_volume`, `trust_score`, `bid_ask_spread_percentage`, `last_traded_at`, `trade_url`, and the anomaly flags `is_anomaly` and `is_stale`. Setting `depth` adds `cost_to_move_up_usd` and `cost_to_move_down_usd`. Narrow with `exchange_ids`, page with `page`, sort with `order` (trust score or volume). Use it to compare where one asset trades and how deep each book is. For every pair on one venue regardless of coin, use `get_coingecko_exchanges_id_tickers`.",
  "provider": "coingecko",
  "method": "GET",
  "path": "/apis/v1/coingecko/coins/{id}/tickers",
  "arguments_schema": {
    "type": "object",
    "properties": {
      "id": {
        "type": "string",
        "example": "bitcoin",
        "description": "CoinGecko coin ID (e.g., `bitcoin`, `ethereum`). Get the list via `/coins/list`."
      },
      "exchange_ids": {
        "type": "string",
        "description": "Comma-separated exchange IDs."
      },
      "page": {
        "type": "integer",
        "default": 1
      },
      "order": {
        "enum": [
          "trust_score_desc",
          "trust_score_asc",
          "volume_desc"
        ],
        "type": "string"
      },
      "depth": {
        "type": "boolean",
        "default": false
      },
      "include_exchange_logo": {
        "type": "boolean",
        "default": false,
        "description": "Show exchange logos in ticker results."
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
