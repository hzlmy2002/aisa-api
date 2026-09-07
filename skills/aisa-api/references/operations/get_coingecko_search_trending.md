# get_coingecko_search_trending

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "get_coingecko_search_trending",
  "successful": true,
  "description": "CoinGecko's current trending board, ranked by search activity on CoinGecko itself: `coins` (15 entries), `nfts` (7) and `categories` (6). Each coin carries `id`, `name`, `symbol`, `market_cap_rank`, `price_btc`, `score` and a nested `data` block. Takes no parameters. Use it as a discovery entry point when the user named no specific asset. It reflects attention rather than price action — for movers ranked by market data use `get_coingecko_coins_markets` ordered by volume.",
  "provider": "coingecko",
  "method": "GET",
  "path": "/apis/v1/coingecko/search/trending",
  "arguments_schema": {
    "type": "object",
    "properties": {},
    "required": []
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
