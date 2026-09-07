# patch_apollo_contacts_contact_id

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "patch_apollo_contacts_contact_id",
  "successful": true,
  "description": "Update one contact by its Apollo id. Send only the fields you intend to change. Stage fields expect an id from `get_apollo_contact_stages`. Writes land in the AIsa workspace, which every caller shares: the record becomes visible and editable by others, and there is no per-caller isolation.",
  "provider": "apollo",
  "method": "PATCH",
  "path": "/apis/v1/apollo/contacts/{contact_id}",
  "arguments_schema": {
    "type": "object",
    "properties": {
      "contact_id": {
        "type": "string",
        "description": "Contact ID"
      },
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
      }
    },
    "required": [
      "contact_id"
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
