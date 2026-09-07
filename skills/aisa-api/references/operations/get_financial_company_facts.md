# get_financial_company_facts

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "get_financial_company_facts",
  "successful": true,
  "description": "Identity and classification for one company: `name`, `ticker`, `cik`, `sector`, `industry`, `exchange`, `location`, `is_active`, `sec_filings_url`, and the SIC trio `sic_code` / `sic_industry` / `sic_sector`. Accepts either `ticker` or `cik`. No prices and no fundamentals at all. Use it to resolve a ticker into the `cik` that the filings tools accept, or to confirm what sector a company is actually classified under before comparing it to peers.",
  "provider": "financial",
  "method": "GET",
  "path": "/apis/v1/financial/company/facts",
  "arguments_schema": {
    "type": "object",
    "properties": {
      "ticker": {
        "type": "string",
        "description": "The ticker symbol."
      },
      "cik": {
        "type": "string",
        "description": "The CIK of the company."
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
