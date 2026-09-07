# get_agentmail_inbox_messages_search

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "get_agentmail_inbox_messages_search",
  "successful": true,
  "description": "Full-text search across one inbox's messages. Returns `count`, `limit`, `next_page_token` and `messages`; page with `next_page_token`. Same message fields as `get_agentmail_inbox_messages`, which is the one to use when you want everything in date order rather than a query. Searching conversations instead of individual messages is `get_agentmail_inbox_threads_search`.",
  "provider": "agentmail",
  "method": "GET",
  "path": "/apis/v1/agentmail/inboxes/{inbox_id}/messages/search",
  "arguments_schema": {
    "type": "object",
    "properties": {
      "inbox_id": {
        "title": "InboxId",
        "type": "string",
        "description": "The ID of the inbox."
      },
      "q": {
        "title": "Query",
        "type": "string",
        "description": "Full-text search query. Matched against the sender, recipients, and\nsubject (substring) and the message body (tokenized full text)."
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
      }
    },
    "required": [
      "inbox_id",
      "q"
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
