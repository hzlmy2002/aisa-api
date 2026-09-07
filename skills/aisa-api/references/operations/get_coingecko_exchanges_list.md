# get_coingecko_exchanges_list

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "get_coingecko_exchanges_list",
  "successful": true,
  "description": "A flat identifier map of roughly 1,500 exchanges as `id` and `name`. Use it to resolve a venue name into the `id` required by `get_coingecko_exchanges_id` and by the `exchange_ids` filter on `get_coingecko_coins_id_tickers`. It takes no parameters and carries no market data; for trust scores and volumes use `get_coingecko_exchanges`.",
  "provider": "coingecko",
  "method": "GET",
  "path": "/apis/v1/coingecko/exchanges/list",
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
