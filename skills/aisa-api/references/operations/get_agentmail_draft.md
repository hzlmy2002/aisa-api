# get_agentmail_draft

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "get_agentmail_draft",
  "successful": true,
  "description": "Fetches one unsent draft by id without naming an inbox: `draft_id`, `inbox_id`, `client_id`, `labels`, `reply_to`, `to`, `cc`, `bcc`, `subject`, `preview`, `text`, `html`, `attachments`, `in_reply_to` and `references`. This is the organization-wide view spanning every inbox in the account. Every AIsa caller shares one AgentMail account, so this reaches inboxes other callers created; the inbox-scoped twin `get_agentmail_inbox_draft` is the one to use when a single inbox is meant.",
  "provider": "agentmail",
  "method": "GET",
  "path": "/apis/v1/agentmail/drafts/{draft_id}",
  "arguments_schema": {
    "type": "object",
    "properties": {
      "draft_id": {
        "title": "DraftId",
        "type": "string",
        "description": "ID of draft."
      }
    },
    "required": [
      "draft_id"
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
