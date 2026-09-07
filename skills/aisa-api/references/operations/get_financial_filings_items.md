# get_financial_filings_items

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "get_financial_filings_items",
  "successful": true,
  "description": "The full text of the numbered items inside one SEC filing. `ticker`, `filing_type` (10-K, 10-Q or 8-K) and `year` are all required; narrow further with `quarter`, `item`, `accession_number` or `include_exhibits`. Returns `items` — each with `number`, `title` and the complete `text` — plus `filing_url` and `accession_number`. Mind the size: a 10-K comes back as roughly 19 items of full prose, so request a specific `item` rather than pulling everything unless you truly need the whole document. To find which filing to open in the first place, use `get_financial_filings`.",
  "provider": "financial",
  "method": "GET",
  "path": "/apis/v1/financial/filings/items",
  "arguments_schema": {
    "type": "object",
    "properties": {
      "ticker": {
        "type": "string",
        "description": "The ticker symbol."
      },
      "filing_type": {
        "enum": [
          "10-K",
          "10-Q",
          "8-K"
        ],
        "type": "string",
        "description": "The type of filing."
      },
      "year": {
        "type": "integer",
        "description": "The year of the filing."
      },
      "quarter": {
        "type": "integer",
        "description": "The quarter of the filing if 10-Q."
      },
      "item": {
        "enum": [
          "Item-1",
          "Item-1A",
          "Item-1B",
          "Item-2",
          "Item-3",
          "Item-4",
          "Item-5",
          "Item-6",
          "Item-7",
          "Item-7A",
          "Item-8",
          "Item-9",
          "Item-9A",
          "Item-9B",
          "Item-10",
          "Item-11",
          "Item-12",
          "Item-13",
          "Item-14",
          "Item-15",
          "Item-16",
          "Item-1.01",
          "Item-1.02",
          "Item-1.03",
          "Item-1.04",
          "Item-2.01",
          "Item-2.02",
          "Item-2.03",
          "Item-2.04",
          "Item-2.05",
          "Item-2.06",
          "Item-3.01",
          "Item-3.02",
          "Item-3.03",
          "Item-4.01",
          "Item-4.02",
          "Item-5.01",
          "Item-5.02",
          "Item-5.03",
          "Item-5.04",
          "Item-5.05",
          "Item-5.06",
          "Item-5.07",
          "Item-5.08",
          "Item-6.01",
          "Item-6.02",
          "Item-6.03",
          "Item-6.04",
          "Item-6.05",
          "Item-7.01",
          "Item-8.01",
          "Item-9.01"
        ],
        "type": "string",
        "description": "The item to get."
      },
      "accession_number": {
        "type": "string",
        "description": "The accession number of the filing if 8-K."
      },
      "include_exhibits": {
        "type": "boolean",
        "default": false,
        "description": "Whether to include the raw text from linked exhibits. Only applicable for 8-K filings. When true, exhibit objects will include the 'text' field containing the full exhibit content."
      }
    },
    "required": [
      "ticker",
      "filing_type",
      "year"
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
    "marketpulse"
  ]
}
```
