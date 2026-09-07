# delete_agentmail_inbox

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "delete_agentmail_inbox",
  "successful": true,
  "description": "Permanently deletes an inbox and the mail in it. Returns no body. **This cannot be undone, and the inbox may not be yours** — Every AIsa caller shares one AgentMail account, so this reaches inboxes other callers created, so confirm ownership from `get_agentmail_inbox` before calling. To stop using an inbox without destroying it, simply leave it alone.",
  "provider": "agentmail",
  "method": "DELETE",
  "path": "/apis/v1/agentmail/inboxes/{inbox_id}",
  "arguments_schema": {
    "type": "object",
    "properties": {
      "inbox_id": {
        "title": "InboxId",
        "type": "string",
        "description": "The ID of the inbox."
      }
    },
    "required": [
      "inbox_id"
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
