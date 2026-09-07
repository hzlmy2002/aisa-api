# get_agentmail_inbox_drafts

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "get_agentmail_inbox_drafts",
  "successful": true,
  "description": "Lists unsent drafts in one inbox. Returns `count`, `limit`, `next_page_token` and `drafts`; page with `next_page_token`. Each draft carries `draft_id`, `labels`, `to`, `cc`, `bcc`, `subject`, `preview`, `attachments`, `in_reply_to`, `send_status`, `send_at` and `updated_at`. List items carry `preview` only — `text` and `html` come from `get_agentmail_inbox_draft`. Drafts are not sent until `post_agentmail_inbox_draft_send`. The account-wide view is `get_agentmail_drafts`.",
  "provider": "agentmail",
  "method": "GET",
  "path": "/apis/v1/agentmail/inboxes/{inbox_id}/drafts",
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
