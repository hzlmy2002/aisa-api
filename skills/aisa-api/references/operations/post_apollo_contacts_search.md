# post_apollo_contacts_search

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "post_apollo_contacts_search",
  "successful": true,
  "description": "Search contacts — the people saved in this Apollo workspace. Filter by name, title, account, owner, stage and custom fields; page with `page` and `per_page`. Returns `contacts` with `id`, `name`, `first_name`, `last_name`, `title`, `organization_name`, `linkedin_url`, `contact_stage_id`, `owner_id`, `person_id` and `source`, alongside `pagination` and `model_ids`. ⚠️ The workspace is shared across AIsa callers, so results include contacts other callers created. To find people who are not saved here, use `post_apollo_mixed_people_api_search`.",
  "provider": "apollo",
  "method": "POST",
  "path": "/apis/v1/apollo/contacts/search",
  "arguments_schema": {
    "type": "object",
    "properties": {
      "q_keywords": {
        "type": "string",
        "description": "Keyword query"
      },
      "contact_stage_ids": {
        "type": "string",
        "description": "Filter by contact stage IDs"
      },
      "contact_label_ids": {
        "type": "string",
        "description": "Filter by contact label IDs"
      },
      "sort_by_field": {
        "type": "string",
        "description": "Sort field (e.g. contact_last_activity_date, contact_created_at, contact_updated_at)"
      },
      "sort_ascending": {
        "type": "boolean",
        "description": "Sort ascending. Default false."
      },
      "per_page": {
        "type": "integer",
        "description": "Items per page"
      },
      "page": {
        "type": "integer",
        "description": "Page number"
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
    "apollo"
  ]
}
```
