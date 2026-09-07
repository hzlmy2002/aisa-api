# twitter_stock_pulse

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "twitter_stock_pulse",
  "successful": true,
  "description": "Assemble everything behind \"what is X saying about stocks right now\" in one call.\n\nSearches X/Twitter for a topic, extracts every $TICKER cashtag mentioned in the\nresults, then fetches a price snapshot for the most-mentioned symbols — optionally\nrecent company news too.\n\nUse this when you need the posts AND the market data behind them together. Doing it\nyourself means one search call, parsing cashtags, then one price call per symbol, then\njoining the results; this returns the joined bundle.\n\nReturns the raw tweets, per-symbol mention counts, price snapshots, a `coverage`\nblock saying which upstream sources succeeded or failed, and a `billing` block with\nthe calls made.\n\nIt does NOT rank, score, or interpret. `mentions` is a raw count, not a heat ranking —\nyou decide what \"hot\" means and what the numbers imply. If you only need the posts,\nuse `get_twitter_tweet_advanced_search`. If you already know the symbols, use\n`get_financial_prices_snapshot` directly.",
  "provider": "aisa",
  "method": "POST",
  "path": "mcp://twitter_stock_pulse",
  "arguments_schema": {
    "additionalProperties": false,
    "properties": {
      "topic": {
        "type": "string"
      },
      "since": {
        "default": "7d",
        "type": "string"
      },
      "max_tickers": {
        "default": 5,
        "type": "integer"
      },
      "include_news": {
        "default": false,
        "type": "boolean"
      }
    },
    "required": [
      "topic"
    ],
    "type": "object"
  },
  "response_schema": {
    "additionalProperties": true,
    "type": "object"
  },
  "read_only": true,
  "idempotent": false,
  "side_effects": [],
  "annotations": {
    "readOnlyHint": true,
    "destructiveHint": false,
    "idempotentHint": false,
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
    "stock-pulse"
  ]
}
```
