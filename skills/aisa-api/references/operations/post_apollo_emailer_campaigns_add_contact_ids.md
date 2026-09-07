# post_apollo_emailer_campaigns_add_contact_ids

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "post_apollo_emailer_campaigns_add_contact_ids",
  "successful": true,
  "description": "Add contacts to an email sequence. ⚠️ This is the endpoint that causes real email to be sent: once added to an active sequence, contacts start receiving its steps from the workspace's connected mailboxes. Get the sequence id from `post_apollo_emailer_campaigns_search` and confirm its state before adding anyone. Writes land in the AIsa workspace, which every caller shares: the record becomes visible and editable by others, and there is no per-caller isolation. Sending cannot be recalled once a step goes out.",
  "provider": "apollo",
  "method": "POST",
  "path": "/apis/v1/apollo/emailer_campaigns/{sequence_id}/add_contact_ids",
  "arguments_schema": {
    "type": "object",
    "properties": {
      "sequence_id": {
        "type": "string",
        "description": "Sequence (emailer campaign) ID."
      },
      "emailer_campaign_id": {
        "type": "string",
        "description": "Sequence ID (same as sequence_id)."
      },
      "contact_ids[]": {
        "type": "array",
        "items": {
          "type": "string"
        },
        "description": "Contact IDs to add. Provide either contact_ids[] or label_names[] (or both)."
      },
      "label_names[]": {
        "type": "array",
        "items": {
          "type": "string"
        },
        "description": "Label names for contacts to add. Provide either label_names[] or contact_ids[] (or both)."
      },
      "send_email_from_email_account_id": {
        "type": "string",
        "description": "Email account ID (or IDs) to send from."
      },
      "send_email_from_email_address": {
        "type": "string",
        "description": "Optional from-address alias."
      },
      "sequence_no_email": {
        "type": "boolean",
        "description": "Allow contacts without email."
      },
      "sequence_unverified_email": {
        "type": "boolean",
        "description": "Allow contacts with unverified email."
      },
      "sequence_job_change": {
        "type": "boolean",
        "description": "Allow contacts with job change."
      },
      "sequence_active_in_other_campaigns": {
        "type": "boolean",
        "description": "Allow contacts active in other sequences."
      },
      "sequence_finished_in_other_campaigns": {
        "type": "boolean",
        "description": "Allow contacts finished in other sequences."
      }
    },
    "required": [
      "sequence_id",
      "emailer_campaign_id",
      "send_email_from_email_account_id"
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
