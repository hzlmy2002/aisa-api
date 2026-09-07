# get_agentmail_inbox_metrics

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "get_agentmail_inbox_metrics",
  "successful": true,
  "description": "Returns the same aggregate counters as `get_agentmail_metrics` but for one inbox: a flat map of counter name to an array of data points, keyed by `message.received`, `message.received.spam`, `message.received.blocked`, `message.received.unauthenticated`, `message.sent`, `message.delivered`, `message.bounced`, `message.complained`, `message.rejected`, `message.opened` and `domain.verified`. An empty array means no activity, not an error. The shape is not pinned in this spec, so read the keys actually returned. For individual events rather than counts use `get_agentmail_inbox_events`; for the account-wide totals, `get_agentmail_metrics`.",
  "provider": "agentmail",
  "method": "GET",
  "path": "/apis/v1/agentmail/inboxes/{inbox_id}/metrics",
  "arguments_schema": {
    "type": "object",
    "properties": {
      "inbox_id": {
        "title": "InboxId",
        "type": "string",
        "description": "The ID of the inbox."
      },
      "event_types": {
        "title": "MetricEventTypes",
        "type": "array",
        "items": {
          "$ref": "#/$defs/type_metrics_MetricEventType"
        },
        "description": "List of metric event types to query."
      },
      "start": {
        "title": "Start",
        "type": "string",
        "description": "Start timestamp for the query.",
        "format": "date-time"
      },
      "end": {
        "title": "End",
        "type": "string",
        "description": "End timestamp for the query.",
        "format": "date-time"
      },
      "period": {
        "title": "Period",
        "type": "string",
        "description": "Period in number of seconds for the query."
      },
      "limit": {
        "title": "MetricLimit",
        "type": "integer",
        "description": "Limit on number of buckets to return."
      },
      "descending": {
        "title": "Descending",
        "type": "boolean",
        "description": "Sort in descending order."
      }
    },
    "required": [
      "inbox_id"
    ],
    "$defs": {
      "type_metrics_MetricEventType": {
        "title": "MetricEventType",
        "enum": [
          "message.sent",
          "message.delivered",
          "message.bounced",
          "message.delayed",
          "message.rejected",
          "message.complained",
          "message.received"
        ],
        "type": "string",
        "description": "Type of metric event."
      }
    }
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
