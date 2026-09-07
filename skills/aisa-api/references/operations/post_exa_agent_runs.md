# post_exa_agent_runs

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "post_exa_agent_runs",
  "successful": true,
  "description": "Hand a research task to an agent that works in the background. `query` and an `Idempotency-Key` are required; `effort` trades depth against time, `outputSchema` shapes the result, `dataSources` restricts where it looks, and `previousRunId` continues an earlier run. Asynchronous. Submitting returns HTTP 202 and a job envelope — `id`, `object`, `endpoint`, `status`, `createdAt`, `completedAt`, `pricing`, `output`, `error` — with `output` still null. Poll `get_exa_agent_run` until terminal; `output` then carries `text`, `structured` and `grounding`. A one-sentence question completed in well under a minute. Billed a flat $0.10 per run — `pricing.billingMode` is `fixed_request`, so unlike a Firecrawl crawl the price does not grow with what it finds. Use it when a report is the deliverable. For an answer you read in one sitting, `post_exa_answer` returns in about two seconds. Send a fresh `Idempotency-Key` per distinct task.",
  "provider": "exa",
  "method": "POST",
  "path": "/apis/v1/exa/agent/runs",
  "arguments_schema": {
    "type": "object",
    "properties": {
      "Idempotency-Key": {
        "maxLength": 191,
        "type": "string",
        "description": "Unique key (1 to 191 characters) that makes the submit idempotent. Re-submitting with the same key and request fingerprint returns the original run."
      },
      "query": {
        "type": "string",
        "description": "The natural-language research query.",
        "example": "Summarize the main changes in RAG evaluation methods over the past year as a bullet list."
      },
      "outputSchema": {
        "type": "object",
        "description": "JSON Schema used to validate the structured output."
      },
      "input": {
        "type": "object",
        "properties": {
          "data": {
            "type": "array",
            "items": {},
            "description": "Input rows for the run."
          },
          "exclusion": {
            "description": "Items to exclude from processing."
          }
        },
        "description": "Row-processing input: rows to process and exclusions."
      },
      "effort": {
        "type": "string",
        "description": "Compute/depth tier for the run."
      },
      "previousRunId": {
        "type": "string",
        "description": "Continue from a previously completed run."
      },
      "dataSources": {
        "type": "array",
        "items": {},
        "description": "Third-party data sources (Exa Connect) the Agent is granted access to."
      }
    },
    "required": [
      "Idempotency-Key",
      "query"
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
