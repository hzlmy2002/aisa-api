# get_reddit_search

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "get_reddit_search",
  "successful": true,
  "description": "Searches every public subreddit for posts matching a query and returns posts plus an after token to page. Each post carries title, author, selftext, selftext_html, subreddit, score, ups, downs, upvote_ratio, num_comments, created_utc, created_at_iso, url, permalink, subreddit_subscribers, is_video, over_18 and spoiler. sort accepts relevance, new, top and comment_count, and timeframe narrows the window. Measured at 8 to 16 seconds and 8 to 26 KB, the slowest endpoint here. To stay inside one community use get_reddit_subreddit_search, which is faster and pages with cursor rather than after; to read one post's discussion use get_reddit_post_comments.",
  "provider": "reddit",
  "method": "GET",
  "path": "/apis/v1/reddit/search",
  "arguments_schema": {
    "type": "object",
    "properties": {
      "query": {
        "type": "string",
        "description": "Search query"
      },
      "sort": {
        "enum": [
          "relevance",
          "new",
          "top",
          "comment_count"
        ],
        "type": "string",
        "example": "relevance",
        "description": "Sort by"
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
        "example": "all",
        "description": "Timeframe"
      },
      "after": {
        "type": "string",
        "example": "t3_1i8z28z",
        "description": "Used to paginate to next page"
      },
      "trim": {
        "type": "boolean",
        "example": "false",
        "description": "Set to true for a trimmed down version of the response"
      }
    },
    "required": [
      "query"
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
