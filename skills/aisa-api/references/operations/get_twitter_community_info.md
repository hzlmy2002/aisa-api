# get_twitter_community_info

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "get_twitter_community_info",
  "successful": true,
  "description": "Get metadata for an X Community by its numeric community ID — name, description, member count, and access rules. Use this to qualify a community before pulling its members or posts. Returns the object under `community_info`. To discover communities by topic, search their posts with `get_twitter_community_tweets_all`.",
  "provider": "twitter",
  "method": "GET",
  "path": "/apis/v1/twitter/community/info",
  "arguments_schema": {
    "type": "object",
    "properties": {
      "community_id": {
        "type": "string",
        "description": "ID of the community"
      }
    },
    "required": [
      "community_id"
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
