# post_apollo_emailer_campaigns_sequence_id_approve

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "post_apollo_emailer_campaigns_sequence_id_approve",
  "successful": true,
  "description": "Activate a sequence, which makes it start sending. ⚠️ Every contact already in it begins receiving steps from the workspace's connected mailboxes. Check membership with `post_apollo_emailer_campaigns_search` and mailbox health with `get_apollo_email_accounts` first. Writes land in the AIsa workspace, which every caller shares: the record becomes visible and editable by others, and there is no per-caller isolation. Activation affects everyone using this workspace.",
  "provider": "apollo",
  "method": "POST",
  "path": "/apis/v1/apollo/emailer_campaigns/{sequence_id}/approve",
  "arguments_schema": {
    "type": "object",
    "properties": {
      "sequence_id": {
        "type": "string",
        "description": "Sequence ID."
      }
    },
    "required": [
      "sequence_id"
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
    "apollo"
  ]
}
```
