# get_coingecko_simple_supported_vs_currencies

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "get_coingecko_simple_supported_vs_currencies",
  "successful": true,
  "description": "The 63 quote currencies accepted by the `vs_currency` / `vs_currencies` parameter of every other CoinGecko tool — fiat such as `usd` and `eur`, metals such as `xau`, and crypto such as `btc`. Returns a flat array of lowercase strings and takes no parameters. Call it before using a non-obvious quote currency rather than guessing at one. For the coin-side identifier map use `get_coingecko_coins_list`.",
  "provider": "coingecko",
  "method": "GET",
  "path": "/apis/v1/coingecko/simple/supported_vs_currencies",
  "arguments_schema": {
    "type": "object",
    "properties": {},
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
