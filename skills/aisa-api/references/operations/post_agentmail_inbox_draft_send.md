# post_agentmail_inbox_draft_send

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "post_agentmail_inbox_draft_send",
  "successful": true,
  "description": "Sends an existing draft and returns `message_id` and `thread_id`. 🔴 **This sends real email and it cannot be recalled** — review the draft with `get_agentmail_inbox_draft` first, since this call takes no content of its own and sends whatever the draft currently holds. Every AIsa caller shares one AgentMail account, so this reaches inboxes other callers created.",
  "provider": "agentmail",
  "method": "POST",
  "path": "/apis/v1/agentmail/inboxes/{inbox_id}/drafts/{draft_id}/send",
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
      "add_labels": {
        "$ref": "#/$defs/type_messages_UpdateMessageLabels",
        "description": "Label or labels to add to message."
      },
      "remove_labels": {
        "$ref": "#/$defs/type_messages_UpdateMessageLabels",
        "description": "Label or labels to remove from message."
      }
    },
    "required": [
      "inbox_id",
      "draft_id"
    ],
    "$defs": {
      "type_messages_UpdateMessageLabels": {
        "title": "UpdateMessageLabels",
        "description": "Label or list of labels.",
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
