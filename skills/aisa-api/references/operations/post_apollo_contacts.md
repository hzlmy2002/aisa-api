# post_apollo_contacts

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "post_apollo_contacts",
  "successful": true,
  "description": "Create a contact — a person saved into this workspace. Search with `post_apollo_contacts_search` first to avoid duplicates, which Apollo does not reject here the way it rejects duplicate account domains. Writes land in the AIsa workspace, which every caller shares: the record becomes visible and editable by others, and there is no per-caller isolation. To look someone up without saving them, use `post_apollo_people_match`.",
  "provider": "apollo",
  "method": "POST",
  "path": "/apis/v1/apollo/contacts",
  "arguments_schema": {
    "type": "object",
    "properties": {
      "first_name": {
        "type": "string",
        "description": "First name"
      },
      "last_name": {
        "type": "string",
        "description": "Last name"
      },
      "organization_name": {
        "type": "string",
        "description": "Organization name"
      },
      "title": {
        "type": "string",
        "description": "Title"
      },
      "account_id": {
        "type": "string",
        "description": "Account ID"
      },
      "email": {
        "type": "string",
        "description": "Email"
      },
      "website_url": {
        "type": "string",
        "description": "Website URL"
      },
      "label_names": {
        "type": "string",
        "description": "Labels to set on the contact"
      },
      "contact_stage_id": {
        "type": "string",
        "description": "Contact stage ID"
      },
      "present_raw_address": {
        "type": "string",
        "description": "Raw address"
      },
      "direct_phone": {
        "type": "string",
        "description": "Direct phone"
      },
      "corporate_phone": {
        "type": "string",
        "description": "Corporate phone"
      },
      "mobile_phone": {
        "type": "string",
        "description": "Mobile phone"
      },
      "home_phone": {
        "type": "string",
        "description": "Home phone"
      },
      "other_phone": {
        "type": "string",
        "description": "Other phone"
      },
      "typed_custom_fields": {
        "type": "object",
        "description": "Typed custom fields object"
      },
      "run_dedupe": {
        "type": "boolean",
        "description": "Enable deduplication. Default false."
      }
    },
    "required": []
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
