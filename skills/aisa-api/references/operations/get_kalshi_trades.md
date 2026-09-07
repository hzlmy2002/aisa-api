# get_kalshi_trades

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "get_kalshi_trades",
  "successful": true,
  "description": "Get the executed-trade tape for Kalshi markets — actual fills, not quotes. Use this when you need realized prices and traded size over a window, for example to see how conviction moved while an event unfolded; narrow with `ticker` and the `min_ts` / `max_ts` Unix-second range, and set `is_block_trade` to isolate large negotiated trades.\n\nReturns `trades[]` with `trade_id`, `ticker`, `count_fp` (contracts), `yes_price_dollars` / `no_price_dollars`, `taker_side`, and `created_time`, plus a `cursor` to page with.\n\nFor the current quotes, settlement rules, and market metadata rather than fills, use `get_kalshi_markets`.",
  "provider": "kalshi",
  "method": "GET",
  "path": "/apis/v1/kalshi/trades",
  "arguments_schema": {
    "type": "object",
    "properties": {
      "limit": {
        "maximum": 1000,
        "minimum": 0,
        "type": "integer",
        "format": "int64",
        "default": 100,
        "example": 100,
        "description": "Number of results per page. Defaults to 100. Maximum value is 1000."
      },
      "cursor": {
        "type": "string",
        "description": "Pagination cursor from the previous response."
      },
      "ticker": {
        "type": "string",
        "example": "KXMVESPORTSMULTIGAMEEXTENDED-S20268A776ACB3C6-43886DEE17A",
        "description": "Filter by Kalshi market ticker."
      },
      "min_ts": {
        "type": "integer",
        "format": "int64",
        "description": "Filter trades after this Unix timestamp."
      },
      "max_ts": {
        "type": "integer",
        "format": "int64",
        "description": "Filter trades before this Unix timestamp."
      },
      "is_block_trade": {
        "type": "boolean",
        "example": false,
        "description": "Filter trades by whether they are block trades. Omit to return all trades."
      }
    },
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
    "prediction-market-data"
  ]
}
```
