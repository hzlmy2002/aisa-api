# delete_agentmail_list_entry

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "delete_agentmail_list_entry",
  "successful": true,
  "description": "Removes one entry from an **account-wide** allow or block list. Returns no body. 🔴 This changes mail handling for **every inbox in the account, including other callers'**; the inbox-scoped `delete_agentmail_inbox_list_entry` is the narrower action. Entries whose `read_only` is true are platform managed and cannot be removed — check with `get_agentmail_list_entry` first.",
  "provider": "agentmail",
  "method": "DELETE",
  "path": "/apis/v1/agentmail/lists/{direction}/{type}/{entry}",
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
        "description": "Email address or domain."
      }
    },
    "required": [
      "direction",
      "type",
      "entry"
    ]
  },
  "response_schema": {},
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
