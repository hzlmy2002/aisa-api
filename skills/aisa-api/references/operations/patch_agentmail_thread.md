# patch_agentmail_thread

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "patch_agentmail_thread",
  "successful": true,
  "description": "Adds or removes labels on a thread addressed by id alone, returning `thread_id` and the resulting `labels`. No inbox is named, so it resolves account-wide. Writes to the shared AgentMail workspace: Every AIsa caller shares one AgentMail account, so this reaches inboxes other callers created, and what you write here is visible and editable by the next caller. The scoped twin is `patch_agentmail_inbox_thread`.",
  "provider": "agentmail",
  "method": "PATCH",
  "path": "/apis/v1/agentmail/threads/{thread_id}",
  "arguments_schema": {
    "type": "object",
    "properties": {
      "thread_id": {
        "title": "ThreadId",
        "type": "string",
        "description": "ID of thread."
      },
      "add_labels": {
        "type": "array",
        "items": {
          "type": "string"
        },
        "description": "Labels to add to thread. Cannot be system labels."
      },
      "remove_labels": {
        "type": "array",
        "items": {
          "type": "string"
        },
        "description": "Labels to remove from thread. Cannot be system labels. Takes priority over `add_labels` (in the event of duplicate labels passed in)."
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
