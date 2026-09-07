# delete_agentmail_thread

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "delete_agentmail_thread",
  "successful": true,
  "description": "Permanently deletes a thread addressed by id alone, and every message in it. Returns no body. **This cannot be undone, deletes more than one message, and names no inbox** — Every AIsa caller shares one AgentMail account, so this reaches inboxes other callers created, so it can destroy a conversation belonging to another caller. Read it first with `get_agentmail_thread`; the scoped twin is `delete_agentmail_inbox_thread`.",
  "provider": "agentmail",
  "method": "DELETE",
  "path": "/apis/v1/agentmail/threads/{thread_id}",
  "arguments_schema": {
    "type": "object",
    "properties": {
      "thread_id": {
        "title": "ThreadId",
        "type": "string",
        "description": "ID of thread."
      },
      "permanent": {
        "type": "boolean",
        "description": "If true, permanently delete the thread instead of moving to trash."
      }
    },
    "required": [
      "thread_id"
    ]
  },
  "response_schema": {},
  "read_only": false,
  "idempotent": false,
  "side_effects": [
    "writes-upstream"
  ],
  "annotations": {
    "readOnlyHint": false,
    "destructiveHint": true,
    "idempotentHint": false,
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
