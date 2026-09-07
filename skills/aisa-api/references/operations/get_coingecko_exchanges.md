# get_coingecko_exchanges

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "get_coingecko_exchanges",
  "successful": true,
  "description": "A paged directory of active exchanges with `id`, `name`, `year_established`, `country`, `description`, `url`, `image`, `trust_score`, `trust_score_rank`, `trade_volume_24h_btc` and `has_trading_incentive`. Page with `per_page` and `page`. Use it to rank or filter venues by trust and volume. If you only need the identifier mapping, `get_coingecko_exchanges_list` returns all of them with no market data and no paging; for one venue in full use `get_coingecko_exchanges_id`.",
  "provider": "coingecko",
  "method": "GET",
  "path": "/apis/v1/coingecko/exchanges",
  "arguments_schema": {
    "type": "object",
    "properties": {
      "per_page": {
        "maximum": 250,
        "type": "integer",
        "default": 100
      },
      "page": {
        "type": "integer",
        "default": 1
      }
    },
    "required": []
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
