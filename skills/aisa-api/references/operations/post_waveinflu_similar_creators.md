# post_waveinflu_similar_creators

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "post_waveinflu_similar_creators",
  "successful": true,
  "description": "Finds creators similar to a seed profile, a natural-language content direction, or both, on YouTube or TikTok. `platform` is required; supply `seedProfileUrl`, `contentDirection` (max 800 characters) or both, with `limit` (1–100, default 25) and optional `filters` for regions, languages, follower and average-view ranges. The response echoes the resolved `mode` — `homepage` for a seed alone, `direction` for a direction alone, `homepage_direction` for both — and sets `sourceUserId` only when a seed resolved. Each match carries `username`, `platformHandle`, `description`, `email`, `profileUrl`, `avatar`, `similarityScore` (sorted descending), `followerCount`, `averagePlayCount`, `lastPublishedTime`, `region` and `language`. Field shape differs by platform: YouTube matches add `channelId` and `channelTitle`; TikTok matches add `userId`, `uniqueId`, `nickname` and `averageLikeCount`, none of which YouTube returns. Measured at 4.2 KB for 5 YouTube matches (about 8 seconds) and 2.5 KB for 3 TikTok matches. Most matches already include an `email`; use `post_waveinflu_email_lookup` for the ones that come back null and for Instagram creators, which this endpoint does not match.",
  "provider": "waveinflu",
  "method": "POST",
  "path": "/apis/v1/waveinflu/similar",
  "arguments_schema": {
    "type": "object",
    "properties": {
      "platform": {
        "enum": [
          "youtube",
          "tiktok"
        ],
        "type": "string",
        "description": "Target platform. Currently supports youtube and tiktok.",
        "example": "youtube"
      },
      "limit": {
        "maximum": 100,
        "minimum": 1,
        "type": "number",
        "description": "Maximum number of creators to return. Default 25, range 1–100.",
        "default": 25,
        "example": 10
      },
      "seedProfileUrl": {
        "type": "string",
        "description": "YouTube or TikTok creator profile URL as the seed for matching.",
        "example": "https://www.youtube.com/@mkbhd"
      },
      "contentDirection": {
        "maxLength": 800,
        "type": "string",
        "description": "Natural-language description of the creator type you are looking for. Max 800 characters.",
        "example": "consumer tech creators covering AI apps, Android phones, productivity gadgets, and honest product reviews"
      },
      "filters": {
        "$ref": "#/$defs/SimilarCreatorFilters"
      }
    },
    "required": [
      "platform"
    ],
    "$defs": {
      "SimilarCreatorFilters": {
        "type": "object",
        "properties": {
          "regions": {
            "type": "array",
            "items": {
              "type": "string"
            },
            "description": "Creator regions, e.g. [\"US\", \"GB\", \"JP\"]."
          },
          "languages": {
            "type": "array",
            "items": {
              "type": "string"
            },
            "description": "Creator languages, e.g. [\"en\", \"ja\", \"zh-cn\"]."
          },
          "minFollowers": {
            "type": "number",
            "description": "Minimum follower / subscriber count."
          },
          "maxFollowers": {
            "type": "number",
            "description": "Maximum follower / subscriber count."
          },
          "minVideosAverageViews": {
            "type": "number",
            "description": "Minimum average view / play count."
          },
          "maxVideosAverageViews": {
            "type": "number",
            "description": "Maximum average view / play count."
          }
        }
      }
    }
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
    "creator-discovery"
  ]
}
```
