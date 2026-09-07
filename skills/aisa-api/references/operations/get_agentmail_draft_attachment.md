# get_agentmail_draft_attachment

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "get_agentmail_draft_attachment",
  "successful": true,
  "description": "Fetches metadata for one attachment on a draft addressed by id alone. Returns `attachment_id`, `filename`, `size`, `content_type`, `content_disposition`, `content_id` and a short-lived `download_url` with `expires_at`. The bytes are not inlined — fetch `download_url` before it expires. This is the organization-wide view spanning every inbox in the account. Every AIsa caller shares one AgentMail account, so this reaches inboxes other callers created; the inbox-scoped twin `get_agentmail_inbox_draft_attachment` is the one to use when a single inbox is meant.",
  "provider": "agentmail",
  "method": "GET",
  "path": "/apis/v1/agentmail/drafts/{draft_id}/attachments/{attachment_id}",
  "arguments_schema": {
    "type": "object",
    "properties": {
      "draft_id": {
        "title": "DraftId",
        "type": "string",
        "description": "ID of draft."
      },
      "attachment_id": {
        "title": "AttachmentId",
        "type": "string",
        "description": "ID of attachment."
      }
    },
    "required": [
      "draft_id",
      "attachment_id"
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
