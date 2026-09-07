# post_agentmail_inbox_message_send

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "post_agentmail_inbox_message_send",
  "successful": true,
  "description": "Sends a new email from one inbox and returns `message_id` and `thread_id`. Takes `to`, `cc`, `bcc`, `subject`, `text`, `html`, `labels` and `attachments`. 🔴 **This sends real email and it cannot be recalled.** Every AIsa caller shares one AgentMail account, so this reaches inboxes other callers created, so the sending address may not be one you created — check `get_agentmail_inbox` first. To answer an existing message use `post_agentmail_inbox_message_reply`; to write without sending, `post_agentmail_inbox_draft`.",
  "provider": "agentmail",
  "method": "POST",
  "path": "/apis/v1/agentmail/inboxes/{inbox_id}/messages/send",
  "arguments_schema": {
    "type": "object",
    "properties": {
      "inbox_id": {
        "title": "InboxId",
        "type": "string",
        "description": "The ID of the inbox."
      },
      "labels": {
        "$ref": "#/$defs/type_messages_MessageLabels"
      },
      "reply_to": {
        "$ref": "#/$defs/type_messages_SendMessageReplyTo"
      },
      "to": {
        "$ref": "#/$defs/type_messages_SendMessageTo"
      },
      "cc": {
        "$ref": "#/$defs/type_messages_SendMessageCc"
      },
      "bcc": {
        "$ref": "#/$defs/type_messages_SendMessageBcc"
      },
      "subject": {
        "$ref": "#/$defs/type_messages_MessageSubject"
      },
      "text": {
        "$ref": "#/$defs/type_messages_MessageText"
      },
      "html": {
        "$ref": "#/$defs/type_messages_MessageHtml"
      },
      "attachments": {
        "$ref": "#/$defs/type_messages_SendMessageAttachments"
      },
      "headers": {
        "$ref": "#/$defs/type_messages_SendMessageHeaders"
      }
    },
    "required": [
      "inbox_id"
    ],
    "$defs": {
      "type_messages_MessageSubject": {
        "title": "MessageSubject",
        "type": "string",
        "description": "Subject of message."
      },
      "type_messages_MessageText": {
        "title": "MessageText",
        "type": "string",
        "description": "Plain text body of message."
      },
      "type_attachments_AttachmentContentType": {
        "title": "AttachmentContentType",
        "type": "string",
        "description": "Content type of attachment."
      },
      "type_messages_SendMessageBcc": {
        "title": "SendMessageBcc",
        "description": "BCC recipient address or addresses.",
        "$ref": "#/$defs/type_messages_Addresses"
      },
      "type_attachments_AttachmentContentId": {
        "title": "AttachmentContentId",
        "type": "string",
        "description": "Content ID of attachment."
      },
      "type_messages_SendMessageTo": {
        "title": "SendMessageTo",
        "description": "Recipient address or addresses.",
        "$ref": "#/$defs/type_messages_Addresses"
      },
      "type_messages_SendMessageCc": {
        "title": "SendMessageCc",
        "description": "CC recipient address or addresses.",
        "$ref": "#/$defs/type_messages_Addresses"
      },
      "type_messages_MessageLabels": {
        "title": "MessageLabels",
        "type": "array",
        "items": {
          "type": "string"
        },
        "description": "Labels of message."
      },
      "type_messages_SendMessageAttachments": {
        "title": "SendMessageAttachments",
        "type": "array",
        "items": {
          "$ref": "#/$defs/type_attachments_SendAttachment"
        },
        "description": "Attachments to include in message."
      },
      "type_attachments_AttachmentFilename": {
        "title": "AttachmentFilename",
        "type": "string",
        "description": "Filename of attachment."
      },
      "type_messages_SendMessageHeaders": {
        "title": "SendMessageHeaders",
        "type": "object",
        "additionalProperties": {
          "type": "string"
        },
        "description": "Headers to include in message."
      },
      "type_messages_MessageHtml": {
        "title": "MessageHtml",
        "type": "string",
        "description": "HTML body of message."
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
      "type_messages_SendMessageReplyTo": {
        "title": "SendMessageReplyTo",
        "description": "Reply-to address or addresses.",
        "$ref": "#/$defs/type_messages_Addresses"
      },
      "type_messages_Addresses": {
        "title": "Addresses",
        "anyOf": [
          {
            "type": "string"
          },
          {
            "type": "array",
            "items": {
              "type": "string"
            }
          }
        ]
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
