# get_instagram_post_comments

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "get_instagram_post_comments",
  "successful": true,
  "description": "Returns the comments on a public post or reel by URL in an already-normalised shape: comments, each with id, text, comment_like_count, child_comment_count, created_at and a nested user, plus cursor to page. Measured at about 10 KB, one of the few small responses in this API. Only top-level comments are returned; child_comment_count reports how many replies a comment has but the replies themselves are not included, and there is no endpoint that expands them. For the post itself, its caption, view counts and video URL, call get_instagram_post with the same URL.",
  "provider": "instagram",
  "method": "GET",
  "path": "/apis/v1/instagram/post/comments",
  "arguments_schema": {
    "type": "object",
    "properties": {
      "url": {
        "type": "string",
        "example": "https://www.instagram.com/reel/DOq6eV6iIgD",
        "description": "The URL of the post or reel to get comments from"
      },
      "cursor": {
        "type": "string",
        "example": "eyJjYWNoZWRfY29tbWVud...",
        "description": "The cursor to get more comments. Get 'cursor' from previous response."
      }
    },
    "required": [
      "url"
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
    "instagram"
  ]
}
```
