# get_agentmail_inbox_list_entry

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "get_agentmail_inbox_list_entry",
  "successful": true,
  "description": "Fetches one allow or block entry on an inbox: `entry`, `entry_type`, `reason`, `direction`, `list_type`, `created_at`, `read_only`, `inbox_id`, `pod_id` and `organization_id`. `read_only` marks entries the platform manages, which cannot be deleted. List them all with `get_agentmail_inbox_list_entries`.",
  "provider": "agentmail",
  "method": "GET",
  "path": "/apis/v1/agentmail/inboxes/{inbox_id}/lists/{direction}/{type}/{entry}",
  "arguments_schema": {
    "type": "object",
    "properties": {
      "inbox_id": {
        "title": "InboxId",
        "type": "string",
        "description": "The ID of the inbox."
      },
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
      "inbox_id",
      "direction",
      "type",
      "entry"
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
