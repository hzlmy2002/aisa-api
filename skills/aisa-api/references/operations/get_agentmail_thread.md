# get_agentmail_thread

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "get_agentmail_thread",
  "successful": true,
  "description": "Fetches one thread by id without naming an inbox: `thread_id`, `inbox_id`, `labels`, `timestamp`, `received_timestamp`, `sent_timestamp`, `senders`, `recipients`, `subject`, `preview`, attachments and messages. Because no inbox is named, this resolves against the whole account. Every AIsa caller shares one AgentMail account, so this reaches inboxes other callers created, so a thread id that is not yours still resolves — check the returned `inbox_id`. The scoped twin is `get_agentmail_inbox_thread`.",
  "provider": "agentmail",
  "method": "GET",
  "path": "/apis/v1/agentmail/threads/{thread_id}",
  "arguments_schema": {
    "type": "object",
    "properties": {
      "thread_id": {
        "title": "ThreadId",
        "type": "string",
        "description": "ID of thread."
      }
    },
    "required": [
      "thread_id"
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
    "agentmail"
  ]
}
```
