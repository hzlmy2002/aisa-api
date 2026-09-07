# get_coingecko_coins_categories

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "get_coingecko_coins_categories",
  "successful": true,
  "description": "Roughly 749 crypto categories with market data attached: `id`, `name`, `market_cap`, `market_cap_change_24h`, `volume_24h`, `top_3_coins_id`, `top_3_coins`, `content` and `updated_at`. Sort with `order` by market cap, name or 24h market-cap change. Use it to see which sectors are moving. For the plain identifier list that the `category` filter expects, `get_coingecko_coins_categories_list` is smaller and faster.",
  "provider": "coingecko",
  "method": "GET",
  "path": "/apis/v1/coingecko/coins/categories",
  "arguments_schema": {
    "type": "object",
    "properties": {
      "order": {
        "enum": [
          "market_cap_desc",
          "market_cap_asc",
          "name_desc",
          "name_asc",
          "market_cap_change_24h_desc",
          "market_cap_change_24h_asc"
        ],
        "type": "string"
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
