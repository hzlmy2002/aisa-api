# post_agentmail_inbox_draft

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "post_agentmail_inbox_draft",
  "successful": true,
  "description": "Composes a draft in one inbox without sending it. Takes `to`, `cc`, `bcc`, `subject`, `text`, `html`, `labels`, `attachments`, and `in_reply_to` / `references` to thread it. Returns the full draft including `draft_id`. Nothing leaves the account until you call `post_agentmail_inbox_draft_send`, which makes this the safe way to stage outbound mail for review. Writes to the shared AgentMail workspace: Every AIsa caller shares one AgentMail account, so this reaches inboxes other callers created, and what you write here is visible and editable by the next caller.",
  "provider": "agentmail",
  "method": "POST",
  "path": "/apis/v1/agentmail/inboxes/{inbox_id}/drafts",
  "arguments_schema": {
    "type": "object",
    "properties": {
      "inbox_id": {
        "title": "InboxId",
        "type": "string",
        "description": "The ID of the inbox."
      },
      "labels": {
        "$ref": "#/$defs/type_drafts_DraftLabels"
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
      "attachments": {
        "type": "array",
        "items": {
          "$ref": "#/$defs/type_attachments_SendAttachment"
        },
        "description": "Attachments to include in draft."
      },
      "in_reply_to": {
        "$ref": "#/$defs/type_drafts_DraftInReplyTo"
      },
      "send_at": {
        "$ref": "#/$defs/type_drafts_DraftSendAt"
      },
      "client_id": {
        "$ref": "#/$defs/type_drafts_DraftClientId"
      }
    },
    "required": [
      "inbox_id"
    ],
    "$defs": {
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
      "type_drafts_DraftInReplyTo": {
        "title": "DraftInReplyTo",
        "type": "string",
        "description": "ID of message being replied to."
      },
      "type_drafts_DraftBcc": {
        "title": "DraftBcc",
        "type": "array",
        "items": {
          "type": "string"
        },
        "description": "Addresses of BCC recipients. In format `username@domain.com` or `Display Name <username@domain.com>`."
      },
      "type_attachments_AttachmentContentType": {
        "title": "AttachmentContentType",
        "type": "string",
        "description": "Content type of attachment."
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
      "type_attachments_AttachmentContentId": {
        "title": "AttachmentContentId",
        "type": "string",
        "description": "Content ID of attachment."
      },
      "type_drafts_DraftSubject": {
        "title": "DraftSubject",
        "type": "string",
        "description": "Subject of draft."
      },
      "type_drafts_DraftCc": {
        "title": "DraftCc",
        "type": "array",
        "items": {
          "type": "string"
        },
        "description": "Addresses of CC recipients. In format `username@domain.com` or `Display Name <username@domain.com>`."
      },
      "type_drafts_DraftLabels": {
        "title": "DraftLabels",
        "type": "array",
        "items": {
          "type": "string"
        },
        "description": "Labels of draft."
      },
      "type_drafts_DraftClientId": {
        "title": "DraftClientId",
        "type": "string",
        "description": "Client ID of draft."
      },
      "type_attachments_AttachmentFilename": {
        "title": "AttachmentFilename",
        "type": "string",
        "description": "Filename of attachment."
      },
      "type_attachments_AttachmentContentDisposition": {
        "title": "AttachmentContentDisposition",
        "enum": [
          "inline",
          "attachment"
        ],
        "type": "string",
        "description": "Content disposition of attachment."
      },
      "type_drafts_DraftTo": {
        "title": "DraftTo",
        "type": "array",
        "items": {
          "type": "string"
        },
        "description": "Addresses of recipients. In format `username@domain.com` or `Display Name <username@domain.com>`."
      },
      "type_attachments_SendAttachment": {
        "title": "SendAttachment",
        "type": "object",
        "properties": {
          "filename": {
            "$ref": "#/$defs/type_attachments_AttachmentFilename"
          },
          "content_type": {
            "$ref": "#/$defs/type_attachments_AttachmentContentType"
          },
          "content_disposition": {
            "$ref": "#/$defs/type_attachments_AttachmentContentDisposition"
          },
          "content_id": {
            "$ref": "#/$defs/type_attachments_AttachmentContentId"
          },
          "content": {
            "type": "string",
            "description": "Base64 encoded content of attachment."
          },
          "url": {
            "type": "string",
            "description": "URL to the attachment."
          }
        }
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
