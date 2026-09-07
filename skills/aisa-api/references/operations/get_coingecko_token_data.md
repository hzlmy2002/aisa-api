# get_coingecko_token_data

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "get_coingecko_token_data",
  "successful": true,
  "description": "A full coin profile looked up by contract address instead of CoinGecko id. `id` is the asset platform and `contract_address` the token; both are required and there are no other parameters. Returns the same shape as `get_coingecko_coins_id` — `description`, `links`, `image`, `categories`, `platforms`, `detail_platforms`, `market_cap_rank`, a `market_data` block and an embedded `tickers` array — plus `contract_address` itself. Use it to identify an unknown token from an address. If only the current price is needed, `get_coingecko_simple_token_price_id` is far lighter.",
  "provider": "coingecko",
  "method": "GET",
  "path": "/apis/v1/coingecko/coins/{id}/contract/{contract_address}",
  "arguments_schema": {
    "type": "object",
    "properties": {
      "id": {
        "type": "string",
        "default": "ethereum",
        "example": "ethereum",
        "description": "Asset platform ID (e.g., `ethereum`). Refers to the `/asset_platforms` list on CoinGecko."
      },
      "contract_address": {
        "type": "string",
        "default": "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
        "example": "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
        "description": "The contract address of the token."
      }
    },
    "required": [
      "id",
      "contract_address"
    ]
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
