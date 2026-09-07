# post_apollo_emailer_campaigns_remove_or_stop_contact_ids

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "post_apollo_emailer_campaigns_remove_or_stop_contact_ids",
  "successful": true,
  "description": "Remove contacts from a sequence, or stop it for them without removing them. Use it to halt sending to someone who replied or asked to stop. Already-sent messages are unaffected — this only prevents future steps. Writes land in the AIsa workspace, which every caller shares: the record becomes visible and editable by others, and there is no per-caller isolation.",
  "provider": "apollo",
  "method": "POST",
  "path": "/apis/v1/apollo/emailer_campaigns/remove_or_stop_contact_ids",
  "arguments_schema": {
    "type": "object",
    "properties": {
      "emailer_campaign_ids[]": {
        "type": "array",
        "items": {
          "type": "string"
        },
        "description": "Sequence IDs."
      },
      "contact_ids[]": {
        "type": "array",
        "items": {
          "type": "string"
        },
        "description": "Contact IDs."
      },
      "mode": {
        "type": "string",
        "description": "One of: mark_as_finished, remove, stop."
      }
    },
    "required": [
      "emailer_campaign_ids[]",
      "contact_ids[]",
      "mode"
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
