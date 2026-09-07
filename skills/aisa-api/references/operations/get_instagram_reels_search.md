# get_instagram_reels_search

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "get_instagram_reels_search",
  "successful": true,
  "description": "Searches reels by keyword through Google rather than Instagram's login-gated search, returning reels with shortcode, url, caption, video_url, video_duration, video_play_count, video_view_count, like_count, comment_count, owner, location and taken_at, plus next_page. Because the index is Google's, coverage is what Google has indexed publicly, not everything on Instagram, and date_posted narrows to a relative window. Measured at about 87 KB and 8 seconds, with all four engagement counts populated. Use get_instagram_search_hashtag to search a specific hashtag, and get_instagram_reels_trending for what is popular right now with no query at all.",
  "provider": "instagram",
  "method": "GET",
  "path": "/apis/v1/instagram/reels/search",
  "arguments_schema": {
    "type": "object",
    "properties": {
      "query": {
        "type": "string",
        "example": "dogs",
        "description": "The keyword to search for"
      },
      "date_posted": {
        "enum": [
          "last-hour",
          "last-day",
          "last-week",
          "last-month",
          "last-year"
        ],
        "type": "string",
        "example": "last-hour",
        "description": "Optional Google-search date filter. Runtime confirmed with `last-hour`; omit this parameter if a provider search window is unavailable."
      },
      "page": {
        "type": "number",
        "example": 1,
        "description": "The page number to return."
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
    "instagram"
  ]
}
```
