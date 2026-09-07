# get_polymarket_events

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "get_polymarket_events",
  "successful": true,
  "description": "List Polymarket events — the topic-level grouping that bundles related markets, such as an election or a season-long series. Use this to browse by subject rather than by individual question, or to find every market attached to one storyline; filter with `tag_slug`, `active`, `featured`, `archived`, `closed`, and the liquidity / volume ranges.\n\nReturns a top-level array of event objects with `title`, `ticker`, `slug`, `volume`, `volume24hr`, `liquidity`, `startDate` / `endDate`, and a nested `markets` array holding the tradable questions.\n\nWhen you already know which question you want and need its price, use `get_polymarket_markets` instead.",
  "provider": "polymarket",
  "method": "GET",
  "path": "/apis/v1/polymarket/events",
  "arguments_schema": {
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
