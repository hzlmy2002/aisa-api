# get_agentmail_inbox_threads

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "get_agentmail_inbox_threads",
  "successful": true,
  "description": "Lists conversation threads in one inbox, newest first. Returns `count`, `limit`, `next_page_token` and `threads`; page with `next_page_token`. Each thread carries `thread_id`, `labels`, `timestamp`, `senders`, `recipients`, `subject`, `preview`, `message_count`, `last_message_id`, `size` and attachment metadata. Threads group messages; for the individual messages use `get_agentmail_inbox_messages`. To query rather than page, `get_agentmail_inbox_threads_search`.",
  "provider": "agentmail",
  "method": "GET",
  "path": "/apis/v1/agentmail/inboxes/{inbox_id}/threads",
  "arguments_schema": {
    "type": "object",
    "properties": {
      "inbox_id": {
        "title": "InboxId",
        "type": "string",
        "description": "The ID of the inbox."
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
    "required": [
      "inbox_id"
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
