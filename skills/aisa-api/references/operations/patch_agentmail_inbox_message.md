# patch_agentmail_inbox_message

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "patch_agentmail_inbox_message",
  "successful": true,
  "description": "Adds or removes labels on one message and returns `message_id` with the resulting `labels`. Labels are the only mutable part of a received message. Writes to the shared AgentMail workspace: Every AIsa caller shares one AgentMail account, so this reaches inboxes other callers created, and what you write here is visible and editable by the next caller. Read the current labels with `get_agentmail_inbox_message`.",
  "provider": "agentmail",
  "method": "PATCH",
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
      "message_id"
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
