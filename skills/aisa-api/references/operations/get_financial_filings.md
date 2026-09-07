# get_financial_filings

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "get_financial_filings",
  "successful": true,
  "description": "The SEC filing index for one company — a list of filings, not their contents. Each entry carries `cik`, `accession_number`, `filing_type`, `report_date`, `filing_date`, `ticker` and `url`. Accepts `ticker` or `cik`, narrows by `filing_type`, and caps with `limit`. Use it to find which filing you want and to get its `accession_number`. To read the text inside one, use `get_financial_filings_items`.",
  "provider": "financial",
  "method": "GET",
  "path": "/apis/v1/financial/filings",
  "arguments_schema": {
    "type": "object",
    "properties": {
      "cik": {
        "type": "string",
        "description": "The Central Index Key (CIK) of the company."
      },
      "ticker": {
        "type": "string",
        "description": "The ticker symbol."
      },
      "filing_type": {
        "type": "array",
        "items": {
          "enum": [
            "10-K",
            "10-Q",
            "8-K",
            "20-F",
            "6-K"
          ],
          "type": "string"
        },
        "description": "Filter by one or more filing types. Repeat the query parameter to pass multiple values (e.g. filing_type=10-Q&filing_type=10-K)."
      },
      "limit": {
        "minimum": 1,
        "type": "integer",
        "default": 10,
        "description": "The maximum number of filings to return (default: 10)."
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
    "marketpulse"
  ]
}
```
