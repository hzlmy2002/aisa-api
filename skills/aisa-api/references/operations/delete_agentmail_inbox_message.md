# delete_agentmail_inbox_message

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "delete_agentmail_inbox_message",
  "successful": true,
  "description": "Permanently deletes one message. Returns no body. **This cannot be undone** and Every AIsa caller shares one AgentMail account, so this reaches inboxes other callers created, so the message may not be yours. To hide a message from a workflow without destroying it, relabel it with `patch_agentmail_inbox_message` instead.",
  "provider": "agentmail",
  "method": "DELETE",
  "path": "/apis/v1/agentmail/inboxes/{inbox_id}/messages/{message_id}",
  "arguments_schema": {
    "type": "object",
    "properties": {
      "inbox_id": {
        "title": "InboxId",
        "type": "string",
        "description": "The ID of the inbox."
      },
      "message_id": {
        "title": "MessageId",
        "type": "string",
        "description": "ID of message."
      }
    },
    "required": [
      "inbox_id",
      "message_id"
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
