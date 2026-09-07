# get_polymarket_activity

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "get_polymarket_activity",
  "successful": true,
  "description": "Get one wallet's on-chain Polymarket activity — a per-address lookup, not a market-wide trade feed. The `user` parameter is required. Use it to reconstruct what a specific trader did — position splits, merges and redemptions, with size, price, and the transaction that settled them; narrow further with `market_slug`, `condition_id`, and the `start_time` / `end_time` Unix-second range.\n\nReturns `activities[]` with `side` (`MERGE` / `SPLIT` / `REDEEM`), `market_slug`, `condition_id`, `shares`, `price`, `timestamp`, and `tx_hash`, plus a `pagination` object whose key you pass back as `pagination_key`.\n\nFor market-wide prices rather than one wallet's history, use `get_polymarket_markets`.",
  "provider": "polymarket",
  "method": "GET",
  "path": "/apis/v1/polymarket/activity",
  "arguments_schema": {
    "type": "object",
    "properties": {
      "user": {
        "pattern": "^0x[0-9a-fA-F]{40}$",
        "type": "string",
        "example": "0x7c3db723f1d4d8cb9c550095203b686cb11e5c6b",
        "description": "Wallet address or user identifier. Required by the runtime route."
      },
      "start_time": {
        "type": "integer",
        "example": 1640995200,
        "description": "Filter activity from this Unix timestamp in seconds (inclusive)"
      },
      "end_time": {
        "type": "integer",
        "example": 1672531200,
        "description": "Filter activity until this Unix timestamp in seconds (inclusive)"
      },
      "market_slug": {
        "type": "string",
        "example": "bitcoin-up-or-down-july-25-8pm-et",
        "description": "Filter activity by market slug"
      },
      "condition_id": {
        "type": "string",
        "example": "0x4567b275e6b667a6217f5cb4f06a797d3a1eaf1d0281fb5bc8c75e2046ae7e57",
        "description": "Filter activity by condition ID"
      },
      "limit": {
        "maximum": 1000,
        "minimum": 1,
        "type": "integer",
        "default": 100,
        "example": 50,
        "description": "Number of activities to return (1-1000)"
      },
      "pagination_key": {
        "type": "string",
        "example": "eyJibG9ja190aW1lc3RhbXAiOiIyMDI1LTAxLTE5VDEyOjAwOjAwLjAwMFoiLCJzaWRlIjoiU1BMSVQiLCJ0eF9oYXNoIjoiMHgxMjM0NTY3ODkwYWJjZGVmIiwibG9nX2luZGV4IjoxMCwidG90YWwiOjE5ODkwMTc3Nn0=",
        "description": "Base64-encoded cursor for efficient pagination. Returned in the previous response's pagination object."
      }
    },
    "required": [
      "user"
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
    "prediction-market-data"
  ]
}
```
