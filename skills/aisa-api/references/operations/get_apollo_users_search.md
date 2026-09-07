# get_apollo_users_search

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "get_apollo_users_search",
  "successful": true,
  "description": "The user accounts in this Apollo workspace, as a `users` array with `id`, `first_name`, `last_name`, `email`, `title`, `team_id` and the various credit limits, plus `pagination`. Use it to resolve an `owner_id` seen on a contact, account or deal into a person. ⚠️ This exposes the workspace's own members and their email addresses, and the workspace belongs to AIsa rather than to the caller. Expect it to be slow — measured at roughly 16 seconds.",
  "provider": "apollo",
  "method": "GET",
  "path": "/apis/v1/apollo/users/search",
  "arguments_schema": {
    "type": "object",
    "properties": {
      "page": {
        "type": "integer",
        "description": "Page number."
      },
      "per_page": {
        "type": "integer",
        "description": "Results per page."
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
