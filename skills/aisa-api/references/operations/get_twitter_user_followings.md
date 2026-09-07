# get_twitter_user_followings

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "get_twitter_user_followings",
  "successful": true,
  "description": "List the accounts a given X user follows, identified by @handle. Returns 200 entries per page with `has_next_page` and `next_cursor`. Use this to infer a user's interests, information sources, or professional network — who someone follows is usually a stronger signal of intent than who follows them. For the opposite direction use `get_twitter_user_followers`. To test a single specific pair without paging through thousands of records, use `get_twitter_user_check_follow_relationship`.",
  "provider": "twitter",
  "method": "GET",
  "path": "/apis/v1/twitter/user/followings",
  "arguments_schema": {
    "type": "object",
    "properties": {
      "userName": {
        "type": "string",
        "description": "Screen name of the user."
      },
      "cursor": {
        "type": "string",
        "description": "The cursor to paginate through the results. First page is empty."
      },
      "pageSize": {
        "maximum": 200,
        "minimum": 20,
        "type": "integer",
        "default": 200,
        "description": "The number of followings to return per page."
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
