# get_reddit_post_comments

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "get_reddit_post_comments",
  "successful": true,
  "description": "Returns one post and its discussion from a post URL: post with title, author, selftext, score, ups, upvote_ratio, num_comments, created_utc, permalink, archived and locked, then comments, each with author, body, score, ups, downs, created_utc, parent_id, permalink and a nested replies object holding items and more. Paging is a third shape again: the top level carries more.has_more and more.cursor rather than the after of get_reddit_search or the cursor of get_reddit_subreddit_search. Measured at about 21 KB for 19 top-level comments. To find posts worth opening, start from get_reddit_search or get_reddit_subreddit.",
  "provider": "reddit",
  "method": "GET",
  "path": "/apis/v1/reddit/post/comments",
  "arguments_schema": {
    "type": "object",
    "properties": {
      "url": {
        "type": "string",
        "example": "https://www.reddit.com/r/AskReddit/comments/ablzuq/people_who_havent_pooped_in_2019_yet_why_are_you/",
        "description": "Reddit post URL"
      },
      "cursor": {
        "type": "string",
        "example": "ed1lvsa,ed3fnpq,ed25l2w",
        "description": "Cursor to get more comments, or replies."
      },
      "trim": {
        "type": "boolean",
        "example": "false",
        "description": "Set to true for a trimmed down version of the response"
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
    "reddit"
  ]
}
```
