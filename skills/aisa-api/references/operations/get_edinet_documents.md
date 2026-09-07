# get_edinet_documents

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "get_edinet_documents",
  "successful": true,
  "description": "Lists every disclosure filed with Japan's EDINET on one date. date is required (YYYY-MM-DD). type=2 returns the filings under results — docID, filerName, secCode, JCN, docTypeCode, docDescription, submitDateTime, periodStart and periodEnd per filing — while type=1 returns metadata only, with the day's count under metadata.resultset.count and no results array. Measured at 612 KB for a typical business day (648 filings), and there are no filter parameters, so type=2 always returns the whole day; check the count with type=1 first when in doubt. About two thirds of filings carry a secCode (listed companies), the rest are funds and unlisted filers. A filing's docID feeds get_edinet_document_download.",
  "provider": "edinet",
  "method": "GET",
  "path": "/apis/v1/edinet/documents.json",
  "arguments_schema": {
    "type": "object",
    "properties": {
      "date": {
        "type": "string",
        "format": "date",
        "examples": [
          "2026-07-23"
        ],
        "description": "File date in YYYY-MM-DD format."
      },
      "type": {
        "enum": [
          1,
          2
        ],
        "type": "integer",
        "default": 1,
        "description": "Response mode: 1 for metadata only, 2 for metadata plus filing list."
      }
    },
    "required": [
      "date"
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
