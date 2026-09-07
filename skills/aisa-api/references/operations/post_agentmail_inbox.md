# post_agentmail_inbox

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "post_agentmail_inbox",
  "successful": true,
  "description": "Creates a new inbox — a real address that can send and receive. Optional `username` picks the local part (`support@agentmail.to`); omit it for a generated one such as `livelyspirit481@agentmail.to`. The domain is always `agentmail.to` here because AIsa does not expose domain management. Returns `inbox_id`, `email`, `display_name`, `client_id`, `pod_id`, `metadata` and timestamps. Writes to the shared AgentMail workspace: Every AIsa caller shares one AgentMail account, so this reaches inboxes other callers created, and what you write here is visible and editable by the next caller. Read one back with `get_agentmail_inbox`, list them with `get_agentmail_inboxes`.",
  "provider": "agentmail",
  "method": "POST",
  "path": "/apis/v1/agentmail/inboxes",
  "arguments_schema": {
    "type": "object",
    "properties": {
      "username": {
        "type": "string",
        "description": "Username of address. Randomly generated if not specified."
      },
      "domain": {
        "type": "string",
        "description": "Domain of address. Must be verified domain. Defaults to `agentmail.to`."
      },
      "display_name": {
        "$ref": "#/$defs/type_inboxes_DisplayName"
      },
      "client_id": {
        "$ref": "#/$defs/type_inboxes_ClientId"
      },
      "metadata": {
        "$ref": "#/$defs/type_inboxes_Metadata",
        "description": "Custom metadata to attach to the inbox."
      }
    },
    "required": [],
    "$defs": {
      "type_inboxes_DisplayName": {
        "title": "DisplayName",
        "type": "string",
        "description": "Display name: `Display Name <username@domain.com>`."
      },
      "type_inboxes_ClientId": {
        "title": "ClientId",
        "type": "string",
        "description": "Client ID of inbox."
      },
      "type_inboxes_Metadata": {
        "title": "Metadata",
        "type": "object",
        "additionalProperties": {
          "$ref": "#/$defs/type_inboxes_MetadataValue"
        },
        "description": "Custom key-value pairs attached to the inbox. Up to 256 keys. Keys and\nstring values are each limited to 256 characters. When updating metadata,\nsend a key with a null value to remove that key."
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
