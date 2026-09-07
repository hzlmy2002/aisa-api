# get_twitter_user_about

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "get_twitter_user_about",
  "successful": true,
  "description": "Get the extended 'About this account' panel for an X user by @handle. Use this for provenance and trust checks — it surfaces signals the standard profile does not, such as the account's country, verification details, and username-change history. Returns a single profile object under `data`. For the standard profile (bio, follower counts, avatar), use `get_twitter_user_info` instead.",
  "provider": "twitter",
  "method": "GET",
  "path": "/apis/v1/twitter/user_about",
  "arguments_schema": {
    "type": "object",
    "properties": {
      "userName": {
        "type": "string",
        "description": "The screen name of the user"
      }
    },
    "required": [
      "userName"
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
    "twitter-api"
  ]
}
```
