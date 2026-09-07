# get_reddit_subreddit_details

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "get_reddit_subreddit_details",
  "successful": true,
  "description": "Returns metadata about one subreddit, by name or by URL: subreddit_id, display_name, subscribers, weekly_active_users, weekly_contributions, description, rules, icon_img, header_img, advertiser_category, submit_text and created_at. Use it to size a community or read its rules before posting anything elsewhere. The name is case-sensitive, so AskReddit resolves and askreddit does not. Measured at about 5 KB, the smallest response here. It returns no posts at all: for those call get_reddit_subreddit, or get_reddit_subreddit_search to query within the community.",
  "provider": "reddit",
  "method": "GET",
  "path": "/apis/v1/reddit/subreddit/details",
  "arguments_schema": {
    "type": "object",
    "properties": {
      "subreddit": {
        "type": "string",
        "example": "AskReddit",
        "description": "Subreddit name. MUST be case sensitive. So 'AskReddit' not 'askreddit'."
      },
      "url": {
        "type": "string",
        "example": "https://www.reddit.com/r/AbsoluteUnits/",
        "description": "Subreddit URL"
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
    "reddit"
  ]
}
```
