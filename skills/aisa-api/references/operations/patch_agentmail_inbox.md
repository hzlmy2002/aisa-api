# patch_agentmail_inbox

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "patch_agentmail_inbox",
  "successful": true,
  "description": "Updates one inbox's `display_name` and `metadata`; the address itself cannot change. Returns the full inbox after the update. Writes to the shared AgentMail workspace: Every AIsa caller shares one AgentMail account, so this reaches inboxes other callers created, and what you write here is visible and editable by the next caller. To read without changing anything use `get_agentmail_inbox`.",
  "provider": "agentmail",
  "method": "PATCH",
  "path": "/apis/v1/agentmail/inboxes/{inbox_id}",
  "arguments_schema": {
    "type": "object",
    "properties": {
      "inbox_id": {
        "title": "InboxId",
        "type": "string",
        "description": "The ID of the inbox."
      },
      "display_name": {
        "$ref": "#/$defs/type_inboxes_DisplayName"
      },
      "metadata": {
        "description": "Metadata to merge into the inbox's existing metadata. Keys you include\nare added or overwritten; keys you omit are left unchanged. To remove a\nsingle key, send it with a null value. To clear all metadata, send\n`metadata` as null. Sending an empty object is rejected; use null to\nclear. Each update must include at least one of `display_name` or\n`metadata`.",
        "anyOf": [
          {
            "allOf": [
              {
                "$ref": "#/$defs/type_inboxes_UpdateMetadata"
              }
            ]
          },
          {
            "type": "null"
          }
        ]
      }
    },
    "required": [
      "inbox_id"
    ],
    "$defs": {
      "type_inboxes_DisplayName": {
        "title": "DisplayName",
        "type": "string",
        "description": "Display name: `Display Name <username@domain.com>`."
      },
      "type_inboxes_MetadataValue": {
        "title": "MetadataValue",
        "description": "A metadata value. May be a string, number, or boolean.",
        "anyOf": [
          {
            "type": "string"
          },
          {
            "type": "number",
            "format": "double"
          },
          {
            "type": "boolean"
          }
        ]
      },
      "type_inboxes_UpdateMetadata": {
        "title": "UpdateMetadata",
        "type": "object",
        "additionalProperties": {
          "anyOf": [
            {
              "allOf": [
                {
                  "$ref": "#/$defs/type_inboxes_MetadataValue"
                }
              ]
            },
            {
              "type": "null"
            }
          ]
        },
        "description": "Custom key-value pairs to merge into the inbox's existing metadata. A\nvalue may be a string, number, boolean, or null. Setting a key to null\nremoves it. Up to 256 keys; keys and string values are each limited to\n256 characters."
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
