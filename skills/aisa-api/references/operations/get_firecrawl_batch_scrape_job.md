# get_firecrawl_batch_scrape_job

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "get_firecrawl_batch_scrape_job",
  "successful": true,
  "description": "Fetch a batch scrape job submitted by `post_firecrawl_batch_scrape`, by its `jobId`. Returns the same envelope — `id`, `status`, `createdAt`, `completedAt`, `pricing`, `output`, `error`. Repeat until `status` is terminal; on success `output` is an array of documents with `markdown` and `metadata`. Reads a job only; it cannot start one.",
  "provider": "firecrawl",
  "method": "GET",
  "path": "/apis/v1/firecrawl/batch-scrape/{jobId}",
  "arguments_schema": {
    "type": "object",
    "properties": {
      "jobId": {
        "type": "string",
        "description": "The job id returned by the submit call."
      }
    },
    "required": [
      "jobId"
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
    "web-search"
  ]
}
```
