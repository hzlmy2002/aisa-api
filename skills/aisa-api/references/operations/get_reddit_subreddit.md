# get_reddit_subreddit

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "get_reddit_subreddit",
  "successful": true,
  "description": "Returns the post stream of one subreddit with an after token to page. Posts carry the same fields as get_reddit_search, including title, author, selftext, score, ups, upvote_ratio, num_comments, created_utc, created_at_iso, url, permalink and subreddit_subscribers. sort accepts best, hot, new, top and rising. Important: timeframe is only accepted together with sort=top, and any other combination returns 400 rather than ignoring the parameter. Subreddit names are case-sensitive. Measured at about 18 KB for 24 posts. To search inside the same subreddit use get_reddit_subreddit_search, and for its metadata use get_reddit_subreddit_details.",
  "provider": "reddit",
  "method": "GET",
  "path": "/apis/v1/reddit/subreddit",
  "arguments_schema": {
    "type": "object",
    "properties": {
      "subreddit": {
        "type": "string",
        "description": "Subreddit name"
      },
      "timeframe": {
        "enum": [
          "all",
          "day",
          "week",
          "month",
          "year"
        ],
        "type": "string",
        "description": "Timeframe to get posts from. Runtime requires `sort=top` when `timeframe` is provided."
      },
      "sort": {
        "enum": [
          "best",
          "hot",
          "new",
          "top",
          "rising"
        ],
        "type": "string",
        "description": "Sort order"
      },
      "after": {
        "type": "string",
        "example": "t3_1234567890",
        "description": "After to get more posts. Get 'after' from previous response."
      },
      "trim": {
        "type": "boolean",
        "example": "false",
        "description": "Set to true for a trimmed down version of the response"
      }
    },
    "required": [
      "subreddit"
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
    "reddit"
  ]
}
```
