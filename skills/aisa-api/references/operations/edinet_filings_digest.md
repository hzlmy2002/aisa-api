# edinet_filings_digest

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "edinet_filings_digest",
  "successful": true,
  "description": "One day of Japanese EDINET filings as a scannable list, with the filtering upstream lacks.\n\nCalls the same upstream as `get_edinet_documents` (which measured 612 KB for one\nbusiness day, with no filter parameters at all) and keeps six fields per filing:\ndocID, filerName, secCode, docTypeCode, docDescription, submitDateTime. Filters\nrun only on what you pass: `doc_type_code` matches exactly (for example 120 for\nannual securities reports, 140 for quarterly, 160 for semi-annual, 350 for large\nshareholding reports), and `listed_only=true` keeps filings that carry a secCode\n— about two thirds of a typical day. Measured: 112 KB unfiltered, 73 KB with\nlisted_only, around 10 KB with a doc_type_code.\n\nReturns `filings` in upstream order plus `total_filings` (the day's full count)\nand `returned`, so a filtered view can never pass for the whole day. Each docID\nfeeds the REST download endpoint; the raw fourteen-field records live in\n`get_edinet_documents`.\n\n`date` is YYYY-MM-DD. It does NOT rank or select beyond your filters.",
  "provider": "aisa",
  "method": "POST",
  "path": "mcp://edinet_filings_digest",
  "arguments_schema": {
    "additionalProperties": false,
    "properties": {
      "date": {
        "type": "string"
      },
      "doc_type_code": {
        "anyOf": [
          {
            "type": "string"
          },
          {
            "type": "null"
          }
        ],
        "default": null
      },
      "listed_only": {
        "default": false,
        "type": "boolean"
      }
    },
    "required": [
      "date"
    ],
    "type": "object"
  },
  "response_schema": {
    "additionalProperties": true,
    "type": "object"
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
