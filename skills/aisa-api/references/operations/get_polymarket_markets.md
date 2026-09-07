# get_polymarket_markets

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "get_polymarket_markets",
  "successful": true,
  "description": "List individual Polymarket prediction markets — one binary question each — with live pricing. Use this when you need the market-implied probability of a specific outcome, or to screen markets by size and timing; filter with `slug`, `condition_ids`, `clob_token_ids`, `tag_id`, `closed`, and the `volume_num_*` / `start_date_*` / `end_date_*` ranges.\n\nReturns a top-level array of market objects. The probability signal is `outcomes` paired with `outcomePrices`, quoted against `bestBid` / `bestAsk`; `conditionId` and `clobTokenIds` are the on-chain identifiers you need to join to other Polymarket data.\n\nFor the topic that groups several related questions together, use `get_polymarket_events`. For the same kind of question on the US-regulated Kalshi exchange, use `get_kalshi_markets`.",
  "provider": "polymarket",
  "method": "GET",
  "path": "/apis/v1/polymarket/markets",
  "arguments_schema": {
    "type": "object",
    "properties": {
      "limit": {
        "minimum": 0,
        "type": "integer",
        "example": 20,
        "description": "Maximum number of markets to return."
      },
      "offset": {
        "minimum": 0,
        "type": "integer",
        "example": 0,
        "description": "Number of markets to skip for offset-based pagination."
      },
      "order": {
        "type": "string",
        "example": "volume",
        "description": "Comma-separated list of fields to order by."
      },
      "ascending": {
        "type": "boolean",
        "example": false,
        "description": "Sort ascending when true."
      },
      "id": {
        "type": "array",
        "items": {
          "type": "integer"
        },
        "example": [
          540817
        ],
        "description": "Filter by one or more Polymarket market IDs."
      },
      "slug": {
        "type": "array",
        "items": {
          "type": "string"
        },
        "example": [
          "new-rhianna-album-before-gta-vi-926"
        ],
        "description": "Filter by one or more market slugs."
      },
      "clob_token_ids": {
        "type": "array",
        "items": {
          "type": "string"
        },
        "description": "Filter by one or more CLOB token IDs."
      },
      "condition_ids": {
        "type": "array",
        "items": {
          "type": "string"
        },
        "example": [
          "0x1fad72fae204143ff1c3035e99e7c0f65ea8d5cd9bd1070987bd1a3316f772be"
        ],
        "description": "Filter by one or more market condition IDs."
      },
      "volume_num_min": {
        "type": "number",
        "example": 1000,
        "description": "Minimum total volume."
      },
      "volume_num_max": {
        "type": "number",
        "example": 1000000,
        "description": "Maximum total volume."
      },
      "start_date_min": {
        "type": "string",
        "format": "date-time",
        "example": "2025-01-01T00:00:00Z",
        "description": "Filter markets starting after this ISO timestamp."
      },
      "start_date_max": {
        "type": "string",
        "format": "date-time",
        "example": "2026-01-01T00:00:00Z",
        "description": "Filter markets starting before this ISO timestamp."
      },
      "end_date_min": {
        "type": "string",
        "format": "date-time",
        "example": "2025-01-01T00:00:00Z",
        "description": "Filter markets ending after this ISO timestamp."
      },
      "end_date_max": {
        "type": "string",
        "format": "date-time",
        "example": "2026-01-01T00:00:00Z",
        "description": "Filter markets ending before this ISO timestamp."
      },
      "tag_id": {
        "type": "integer",
        "example": 1,
        "description": "Filter by tag ID."
      },
      "closed": {
        "type": "boolean",
        "default": false,
        "example": false,
        "description": "Filter by whether the market is closed."
      },
      "include_tag": {
        "type": "boolean",
        "example": true,
        "description": "Include tag metadata when true."
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
    "prediction-market-data"
  ]
}
```
