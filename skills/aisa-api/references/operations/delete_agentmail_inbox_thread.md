# delete_agentmail_inbox_thread

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "delete_agentmail_inbox_thread",
  "successful": true,
  "description": "Permanently deletes a thread and every message in it. Returns no body. **This cannot be undone and it removes more than one message** — Every AIsa caller shares one AgentMail account, so this reaches inboxes other callers created, so read the thread with `get_agentmail_inbox_thread` first. To hide it instead, relabel with `patch_agentmail_inbox_thread`.",
  "provider": "agentmail",
  "method": "DELETE",
  "path": "/apis/v1/agentmail/inboxes/{inbox_id}/threads/{thread_id}",
  "arguments_schema": {
    "type": "object",
    "properties": {
      "inbox_id": {
        "title": "InboxId",
        "type": "string",
        "description": "The ID of the inbox."
      },
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
      "inbox_id",
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
