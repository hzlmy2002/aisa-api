# get_agentmail_threads

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "get_agentmail_threads",
  "successful": true,
  "description": "Lists conversation threads across **every inbox in the account**. Returns `count`, `limit`, `next_page_token` and `threads`; page with `next_page_token`. Each thread carries `thread_id`, `inbox_id`, `labels`, `timestamp`, `senders`, `recipients`, `subject`, `preview`, `message_count` and `last_message_id`. This is the organization-wide view spanning every inbox in the account. Every AIsa caller shares one AgentMail account, so this reaches inboxes other callers created; the inbox-scoped twin `get_agentmail_inbox_threads` is the one to use when a single inbox is meant.",
  "provider": "agentmail",
  "method": "GET",
  "path": "/apis/v1/agentmail/threads",
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
      "labels": {
        "title": "Labels",
        "type": "array",
        "items": {
          "type": "string"
        },
        "description": "Labels to filter by."
      },
      "before": {
        "title": "Before",
        "type": "string",
        "description": "Timestamp before which to filter by.",
        "format": "date-time"
      },
      "after": {
        "title": "After",
        "type": "string",
        "description": "Timestamp after which to filter by.",
        "format": "date-time"
      },
      "ascending": {
        "title": "Ascending",
        "type": "boolean",
        "description": "Sort in ascending temporal order."
      },
      "include_spam": {
        "title": "IncludeSpam",
        "type": "boolean",
        "description": "Include spam in results."
      },
      "include_blocked": {
        "title": "IncludeBlocked",
        "type": "boolean",
        "description": "Include blocked in results."
      },
      "include_unauthenticated": {
        "title": "IncludeUnauthenticated",
        "type": "boolean",
        "description": "Include unauthenticated in results."
      },
      "include_trash": {
        "title": "IncludeTrash",
        "type": "boolean",
        "description": "Include trash in results."
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
