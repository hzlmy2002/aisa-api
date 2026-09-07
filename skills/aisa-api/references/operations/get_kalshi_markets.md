# get_kalshi_markets

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "get_kalshi_markets",
  "successful": true,
  "description": "List markets on Kalshi, the CFTC-regulated US prediction exchange, with live bid/ask quotes in dollars. Use this when you need odds from a regulated venue, or to cross-check a Polymarket price against a second market; fetch specific markets with `tickers` (comma-separated), scope to a group with `event_ticker` / `series_ticker`, or narrow with `status`, `search`, and the created / close / settled timestamp ranges.\n\nReturns `markets[]` with `title`, `status`, `yes_bid_dollars` / `yes_ask_dollars`, `last_price_dollars`, `volume_fp`, `open_interest_fp`, and `rules_primary` (the settlement criteria), plus a `cursor` to page with.\n\nFor executed fills rather than quotes, use `get_kalshi_trades`. For the crypto-native venue carrying similar questions, use `get_polymarket_markets`.",
  "provider": "kalshi",
  "method": "GET",
  "path": "/apis/v1/kalshi/markets",
  "arguments_schema": {
    "type": "object",
    "properties": {
      "tickers": {
        "type": "string",
        "example": "KXMVESPORTSMULTIGAMEEXTENDED-S20268A776ACB3C6-43886DEE17A",
        "description": "Comma-separated Kalshi market tickers to retrieve."
      },
      "event_ticker": {
        "type": "string",
        "example": "KXMVESPORTSMULTIGAMEEXTENDED-S20268A776ACB3C6",
        "description": "Filter by a single Kalshi event ticker."
      },
      "search": {
        "type": "string",
        "example": "bitcoin",
        "description": "Search markets by keywords in title and description. Must be URL encoded (e.g., 'bitcoin%20price' for 'bitcoin price')."
      },
      "status": {
        "enum": [
          "unopened",
          "open",
          "paused",
          "closed",
          "settled"
        ],
        "type": "string",
        "example": "open",
        "description": "Filter markets by status."
      },
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
      "series_ticker": {
        "type": "string",
        "description": "Filter by series ticker."
      },
      "min_created_ts": {
        "type": "integer",
        "format": "int64",
        "description": "Filter markets created after this Unix timestamp."
      },
      "max_created_ts": {
        "type": "integer",
        "format": "int64",
        "description": "Filter markets created before this Unix timestamp."
      },
      "min_updated_ts": {
        "type": "integer",
        "format": "int64",
        "description": "Filter markets updated after this Unix timestamp."
      },
      "max_close_ts": {
        "type": "integer",
        "format": "int64",
        "description": "Filter markets closing before this Unix timestamp."
      },
      "min_close_ts": {
        "type": "integer",
        "format": "int64",
        "description": "Filter markets closing after this Unix timestamp."
      },
      "min_settled_ts": {
        "type": "integer",
        "format": "int64",
        "description": "Filter markets settled after this Unix timestamp."
      },
      "max_settled_ts": {
        "type": "integer",
        "format": "int64",
        "description": "Filter markets settled before this Unix timestamp."
      },
      "mve_filter": {
        "enum": [
          "only",
          "exclude"
        ],
        "type": "string",
        "description": "Filter by multivariate events."
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
