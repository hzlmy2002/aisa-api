# get_agentmail_inboxes

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "get_agentmail_inboxes",
  "successful": true,
  "description": "Lists every inbox in the AgentMail account. Returns `count`, `limit`, `next_page_token` and `inboxes`; page with `next_page_token`. Each inbox carries `inbox_id`, `email`, `display_name`, `client_id`, `pod_id`, `metadata`, `created_at` and `updated_at`. Every AIsa caller shares one AgentMail account, so this reaches inboxes other callers created, so this list is not scoped to you and the inboxes it returns may belong to someone else. Use `get_agentmail_inbox` for one inbox you already know the id of, and `post_agentmail_inbox` to create one.",
  "provider": "agentmail",
  "method": "GET",
  "path": "/apis/v1/agentmail/inboxes",
  "arguments_schema": {
    "type": "object",
    "properties": {
      "limit": {
        "title": "Limit",
        "type": "integer",
        "description": "Limit of number of items returned."
      },
      "page_token": {
        "title": "PageToken",
        "type": "string",
        "description": "Page token for pagination."
      },
      "ascending": {
        "title": "Ascending",
        "type": "boolean",
        "description": "Sort in ascending temporal order."
      }
    },
    "required": []
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
