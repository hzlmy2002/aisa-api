# get_agentmail_list_entries

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "get_agentmail_list_entries",
  "successful": true,
  "description": "Lists the account-wide allow or block entries that apply to every inbox. `direction` selects inbound or outbound and `type` the list kind. Returns `count`, `limit`, `next_page_token` and `entries`; page with `next_page_token`. Each entry carries `entry`, `entry_type`, `reason`, `direction`, `list_type`, `created_at` and `read_only`. This is the organization-wide view spanning every inbox in the account. Every AIsa caller shares one AgentMail account, so this reaches inboxes other callers created; the inbox-scoped twin `get_agentmail_inbox_list_entries` is the one to use when a single inbox is meant.",
  "provider": "agentmail",
  "method": "GET",
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
      "limit": {
        "title": "Limit",
        "type": "integer",
        "description": "Limit of number of items returned."
      },
      "page_token": {
        "title": "PageToken",
        "type": "string",
        "description": "Page token for pagination."
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
