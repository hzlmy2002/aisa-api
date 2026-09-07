# post_agentmail_list_entry

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "post_agentmail_list_entry",
  "successful": true,
  "description": "Adds one address or domain to an **account-wide** allow or block list and returns the created entry. 🔴 This is a standing rule that changes mail handling for **every inbox in the account, including other callers'** — the inbox-scoped `post_agentmail_inbox_list_entry` affects only one inbox and is almost always the one you want. Every AIsa caller shares one AgentMail account, so this reaches inboxes other callers created.",
  "provider": "agentmail",
  "method": "POST",
  "path": "/apis/v1/agentmail/lists/{direction}/{type}",
  "arguments_schema": {
    "type": "object",
    "properties": {
      "direction": {
        "title": "Direction",
        "enum": [
          "send",
          "receive",
          "reply"
        ],
        "type": "string",
        "description": "Direction of list entry."
      },
      "type": {
        "title": "ListType",
        "enum": [
          "allow",
          "block"
        ],
        "type": "string",
        "description": "Type of list entry."
      },
      "entry": {
        "type": "string",
        "description": "Email address or domain to add."
      },
      "reason": {
        "type": "string",
        "description": "Reason for adding the entry."
      }
    },
    "required": [
      "direction",
      "type"
    ]
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
