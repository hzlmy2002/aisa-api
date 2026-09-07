# get_exa_agent_run

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "get_exa_agent_run",
  "successful": true,
  "description": "Fetch an Agent run submitted by `post_exa_agent_runs`, by its `jobId`. Returns the same envelope — `id`, `status`, `createdAt`, `completedAt`, `pricing`, `output`, `error`. Repeat until `status` is `completed`, `failed` or `cancelled`; on success `output` carries `text`, `structured` and `grounding`. Reads a run only; it cannot start one.",
  "provider": "exa",
  "method": "GET",
  "path": "/apis/v1/exa/agent/runs/{jobId}",
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
