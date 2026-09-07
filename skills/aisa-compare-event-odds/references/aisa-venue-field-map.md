# Field-by-field map between Polymarket and Kalshi

Field-by-field mapping between Polymarket and Kalshi for the concepts that do not translate cleanly: identifiers, pagination, time filters, and status. Read this before querying both venues for the same question — three of the differences (boolean vs enum status, ISO vs Unix timestamps, offset vs cursor paging) produce wrong results rather than errors.

Parameter contracts from the installed operation catalog. Compare identifiers, paging, time filters and status using each operation's own schema; call get_details for the current contract.

## get_kalshi_markets

```json
{
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
}
```

## get_kalshi_trades

```json
{
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
}
```

## get_polymarket_activity

```json
{
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
}
```

## get_polymarket_events

```json
{
  "type": "object",
  "properties": {
    "limit": {
      "minimum": 0,
      "type": "integer",
      "example": 20,
      "description": "Maximum number of events to return."
    },
    "offset": {
      "minimum": 0,
      "type": "integer",
      "example": 0,
      "description": "Number of events to skip for offset-based pagination."
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
      "description": "Filter by one or more event IDs."
    },
    "slug": {
      "type": "array",
      "items": {
        "type": "string"
      },
      "description": "Filter by one or more event slugs."
    },
    "tag_id": {
      "type": "integer",
      "description": "Filter by tag ID."
    },
    "tag_slug": {
      "type": "string",
      "example": "sports",
      "description": "Filter by tag slug."
    },
    "active": {
      "type": "boolean",
      "description": "Filter by active events."
    },
    "archived": {
      "type": "boolean",
      "description": "Filter by archived events."
    },
    "featured": {
      "type": "boolean",
      "description": "Filter by featured events."
    },
    "closed": {
      "type": "boolean",
      "description": "Filter by whether the event is closed."
    },
    "liquidity_min": {
      "type": "number",
      "description": "Minimum liquidity."
    },
    "liquidity_max": {
      "type": "number",
      "description": "Maximum liquidity."
    },
    "volume_min": {
      "type": "number",
      "description": "Minimum volume."
    },
    "volume_max": {
      "type": "number",
      "description": "Maximum volume."
    },
    "start_date_min": {
      "type": "string",
      "format": "date-time",
      "description": "Filter events starting after this ISO timestamp."
    },
    "start_date_max": {
      "type": "string",
      "format": "date-time",
      "description": "Filter events starting before this ISO timestamp."
    },
    "end_date_min": {
      "type": "string",
      "format": "date-time",
      "description": "Filter events ending after this ISO timestamp."
    },
    "end_date_max": {
      "type": "string",
      "format": "date-time",
      "description": "Filter events ending before this ISO timestamp."
    }
  },
  "required": []
}
```

## get_polymarket_markets

```json
{
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
}
```
