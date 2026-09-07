# patch_agentmail_inbox_draft

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "patch_agentmail_inbox_draft",
  "successful": true,
  "description": "Rewrites an unsent draft's recipients, subject, body or attachments and returns the full draft after the change. Still sends nothing — `post_agentmail_inbox_draft_send` does that. Writes to the shared AgentMail workspace: Every AIsa caller shares one AgentMail account, so this reaches inboxes other callers created, and what you write here is visible and editable by the next caller.",
  "provider": "agentmail",
  "method": "PATCH",
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
      },
      "reply_to": {
        "$ref": "#/$defs/type_drafts_DraftReplyTo"
      },
      "to": {
        "$ref": "#/$defs/type_drafts_DraftTo"
      },
      "cc": {
        "$ref": "#/$defs/type_drafts_DraftCc"
      },
      "bcc": {
        "$ref": "#/$defs/type_drafts_DraftBcc"
      },
      "subject": {
        "$ref": "#/$defs/type_drafts_DraftSubject"
      },
      "text": {
        "$ref": "#/$defs/type_drafts_DraftText"
      },
      "html": {
        "$ref": "#/$defs/type_drafts_DraftHtml"
      },
      "send_at": {
        "$ref": "#/$defs/type_drafts_DraftSendAt"
      }
    },
    "required": [
      "inbox_id",
      "draft_id"
    ],
    "$defs": {
      "type_drafts_DraftCc": {
        "title": "DraftCc",
        "type": "array",
        "items": {
          "type": "string"
        },
        "description": "Addresses of CC recipients. In format `username@domain.com` or `Display Name <username@domain.com>`."
      },
      "type_drafts_DraftHtml": {
        "title": "DraftHtml",
        "type": "string",
        "description": "HTML body of draft."
      },
      "type_drafts_DraftText": {
        "title": "DraftText",
        "type": "string",
        "description": "Plain text body of draft."
      },
      "type_drafts_DraftBcc": {
        "title": "DraftBcc",
        "type": "array",
        "items": {
          "type": "string"
        },
        "description": "Addresses of BCC recipients. In format `username@domain.com` or `Display Name <username@domain.com>`."
      },
      "type_drafts_DraftReplyTo": {
        "title": "DraftReplyTo",
        "type": "array",
        "items": {
          "type": "string"
        },
        "description": "Reply-to addresses. In format `username@domain.com` or `Display Name <username@domain.com>`."
      },
      "type_drafts_DraftSendAt": {
        "title": "DraftSendAt",
        "type": "string",
        "description": "Time at which to schedule send draft.",
        "format": "date-time"
      },
      "type_drafts_DraftSubject": {
        "title": "DraftSubject",
        "type": "string",
        "description": "Subject of draft."
      },
      "type_drafts_DraftTo": {
        "title": "DraftTo",
        "type": "array",
        "items": {
          "type": "string"
        },
        "description": "Addresses of recipients. In format `username@domain.com` or `Display Name <username@domain.com>`."
      }
    }
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
