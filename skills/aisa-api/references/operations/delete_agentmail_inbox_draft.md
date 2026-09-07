# delete_agentmail_inbox_draft

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "delete_agentmail_inbox_draft",
  "successful": true,
  "description": "Permanently deletes an unsent draft. Returns no body. Nothing was ever sent, so this is the least destructive delete in this API — but it cannot be undone and Every AIsa caller shares one AgentMail account, so this reaches inboxes other callers created. Read it first with `get_agentmail_inbox_draft` if unsure.",
  "provider": "agentmail",
  "method": "DELETE",
  "path": "/apis/v1/agentmail/inboxes/{inbox_id}/drafts/{draft_id}",
  "arguments_schema": {
    "type": "object",
    "properties": {
      "inbox_id": {
        "title": "InboxId",
        "type": "string",
        "description": "The ID of the inbox."
      },
      "draft_id": {
        "title": "DraftId",
        "type": "string",
        "description": "ID of draft."
      }
    },
    "required": [
      "inbox_id",
      "draft_id"
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
