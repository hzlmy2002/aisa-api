# get_coingecko_coins_list

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "get_coingecko_coins_list",
  "successful": true,
  "description": "The full CoinGecko identifier map: every listed coin as `id`, `symbol` and `name`. Use it once to resolve a ticker into the `id` that every other CoinGecko tool requires — `bitcoin`, not BTC. Set `include_platform` to also get each coin's contract address per chain. Mind the size: this returns roughly 18,000 entries and takes several seconds, so cache it instead of calling it per lookup. If you already know the ids and only want numbers, call `get_coingecko_simple_price` directly; to identify a coin from a contract address instead, use `get_coingecko_token_data`.",
  "provider": "coingecko",
  "method": "GET",
  "path": "/apis/v1/coingecko/coins/list",
  "arguments_schema": {
    "type": "object",
    "properties": {
      "include_platform": {
        "type": "boolean",
        "default": false,
        "description": "Include platform + contract addresses."
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
