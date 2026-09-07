# get_instagram_search_profiles

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "get_instagram_search_profiles",
  "successful": true,
  "description": "Searches Google for public Instagram profiles matching a keyword or bio phrase and returns profiles with username, full_name, biography, follower_count, following_count, media_count, is_verified, is_private, category_name, external_url, bio_links, url, the numeric id, and matched_from, which records whether the hit came from a profile page or from a post. google_title and google_description carry the underlying search result. Measured at about 18 KB and 13 seconds. The numeric id feeds get_instagram_basic_profile directly. To search posts rather than people, use get_instagram_search_hashtag or get_instagram_reels_search.",
  "provider": "instagram",
  "method": "GET",
  "path": "/apis/v1/instagram/search/profiles",
  "arguments_schema": {
    "type": "object",
    "properties": {
      "query": {
        "type": "string",
        "example": "fitness coach",
        "description": "Bio or caption keyword/phrase to search for."
      },
      "cursor": {
        "type": "string",
        "example": "2",
        "description": "The cursor returned by the previous response. In this version, it is the next Google results page number."
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
