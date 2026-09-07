# get_coingecko_exchanges_id_tickers

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "get_coingecko_exchanges_id_tickers",
  "successful": true,
  "description": "Every trading pair listed on one exchange, paged: `base`, `target`, `market`, `last`, `volume`, `converted_last`, `converted_volume`, `trust_score`, `bid_ask_spread_percentage`, `timestamp`, `trade_url` and the `is_anomaly` / `is_stale` flags. Narrow to specific assets with `coin_ids`, sort with `order`, and set `depth` to add order-book move costs. Use it to audit one venue's coverage or liquidity. For one coin's pairs across all venues use `get_coingecko_coins_id_tickers` instead.",
  "provider": "coingecko",
  "method": "GET",
  "path": "/apis/v1/coingecko/exchanges/{id}/tickers",
  "arguments_schema": {
    "type": "object",
    "properties": {
      "id": {
        "type": "string",
        "example": "binance",
        "description": "CoinGecko exchange ID (e.g., `binance`, `gdax`). Get the list via `/exchanges/list`."
      },
      "coin_ids": {
        "type": "string",
        "description": "Filter by coin IDs (comma-separated)."
      },
      "page": {
        "type": "integer",
        "default": 1
      },
      "depth": {
        "type": "boolean",
        "default": false
      },
      "order": {
        "enum": [
          "trust_score_desc",
          "trust_score_asc",
          "volume_desc"
        ],
        "type": "string"
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
