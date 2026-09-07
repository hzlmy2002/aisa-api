# get_reddit_subreddit_search

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "get_reddit_subreddit_search",
  "successful": true,
  "description": "Searches inside one subreddit and returns matching posts with a cursor token to page. Posts carry title, author, selftext, score, ups, upvote_ratio, num_comments, created_utc, created_at_iso, url, permalink and is_video. Despite what sort suggests, every sort value returns posts and only posts: comments and media were confirmed absent from all five. Measured at about 5 KB and 2 seconds, faster than get_reddit_search, which searches all of Reddit and pages with after instead of cursor. For the replies under a result, pass its url to get_reddit_post_comments.",
  "provider": "reddit",
  "method": "GET",
  "path": "/apis/v1/reddit/subreddit/search",
  "arguments_schema": {
    "type": "object",
    "properties": {
      "subreddit": {
        "type": "string",
        "description": "Subreddit name (e.g. 'Fitness', not 'r/Fitness' or a full URL)"
      },
      "query": {
        "type": "string",
        "example": "push ups",
        "description": "Search query to find matching content"
      },
      "sort": {
        "enum": [
          "relevance",
          "hot",
          "top",
          "new",
          "comments"
        ],
        "type": "string",
        "description": "Sort order. For posts/media: relevance, hot, top, new, comments. For comments: relevance, top, new"
      },
      "timeframe": {
        "enum": [
          "all",
          "year",
          "month",
          "week",
          "day",
          "hour"
        ],
        "type": "string",
        "description": "Timeframe to filter results"
      },
      "cursor": {
        "type": "string",
        "example": "eyJjYW5kaWRhdGVzX3JldHVybmVkIjoi...",
        "description": "Cursor to get more results. Get 'cursor' from previous response."
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
