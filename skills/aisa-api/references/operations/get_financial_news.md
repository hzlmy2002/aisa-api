# get_financial_news

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "get_financial_news",
  "successful": true,
  "description": "Recent news headlines for one stock: `title`, `source`, `date`, `url` and the echoed `ticker`, in a `news` array. `ticker` and `limit` are the only parameters — there is no full-text search and no date filter, so narrow by raising or lowering `limit` rather than by query. Use it for recent coverage of a company you have already identified. Headlines only: the article body is not returned, follow `url` for that. For the company's own filings rather than press coverage use `get_financial_filings`.",
  "provider": "financial",
  "method": "GET",
  "path": "/apis/v1/financial/news",
  "arguments_schema": {
    "type": "object",
    "properties": {
      "ticker": {
        "type": "string",
        "description": "The ticker symbol of the company. Omit for broad market news."
      },
      "limit": {
        "maximum": 10,
        "type": "integer",
        "default": 5,
        "description": "The maximum number of news articles to return (default: 5, max: 10)."
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
    "marketpulse",
    "stock-pulse"
  ]
}
```
