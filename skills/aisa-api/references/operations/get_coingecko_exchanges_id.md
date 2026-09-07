# get_coingecko_exchanges_id

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "get_coingecko_exchanges_id",
  "successful": true,
  "description": "The full profile of one exchange: `name`, `year_established`, `country`, `description`, `url`, `image`, social handles, `centralized`, `trust_score`, `trust_score_rank`, `trade_volume_24h_btc`, `coins`, `pairs`, plus an embedded `tickers` sample and `status_updates`. Use it for venue due diligence. For a ranked list across many venues use `get_coingecko_exchanges`; for that venue's complete paged pair list use `get_coingecko_exchanges_id_tickers`.",
  "provider": "coingecko",
  "method": "GET",
  "path": "/apis/v1/coingecko/exchanges/{id}",
  "arguments_schema": {
    "type": "object",
    "properties": {
      "id": {
        "type": "string",
        "example": "binance",
        "description": "CoinGecko exchange ID (e.g., `binance`, `gdax`). Get the list via `/exchanges/list`."
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
