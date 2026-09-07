# get_financial_earnings

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "get_financial_earnings",
  "successful": true,
  "description": "Reported earnings for one stock, actuals against estimates. Each entry carries `report_period`, `fiscal_period`, `filing_date`, `filing_url` and `accession_number`, a `quarterly` block with `revenue`, `estimated_revenue`, `revenue_surprise` and `revenue_surprise_pct`, the same trio for `earnings_per_share`, plus year-over-year change fields. It also returns `signals`: upstream-computed flags such as EPS_BEAT with a `headline` and the `actual` / `estimate` / `surprise_pct` behind it. `ticker` is required and it is the only parameter. Use it for what a company actually reported. For forward-looking consensus that has not happened yet use `get_financial_analyst_estimates`.",
  "provider": "financial",
  "method": "GET",
  "path": "/apis/v1/financial/earnings",
  "arguments_schema": {
    "type": "object",
    "properties": {
      "ticker": {
        "type": "string",
        "description": "The ticker symbol."
      }
    },
    "required": [
      "ticker"
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
