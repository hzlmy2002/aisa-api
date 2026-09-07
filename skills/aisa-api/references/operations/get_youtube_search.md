# get_youtube_search

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "get_youtube_search",
  "successful": true,
  "description": "Search YouTube and get back matching videos, channels, and playlists. Set `engine=youtube` and pass the query in `q`; both are required. Optionally narrow by country (`gl`) and interface language (`hl`), or pass a YouTube filter token in `sp` for pagination and advanced filters such as upload date, duration, or result type. Use this to find video content on a topic, track a channel's recent uploads, or gauge how much video coverage a subject has. Note: this is served through the AIsa mapped path `/apis/v1/youtube/search`; the upstream provider's canonical path is not mounted directly.",
  "provider": "youtube",
  "method": "GET",
  "path": "/apis/v1/youtube/search",
  "arguments_schema": {
    "type": "object",
    "properties": {
      "engine": {
        "enum": [
          "youtube"
        ],
        "type": "string",
        "description": "SearchApi engine identifier. Use `youtube` for this YouTube endpoint."
      },
      "q": {
        "type": "string",
        "description": "Search query. Required by runtime and upstream SearchApi."
      },
      "sp": {
        "type": "string",
        "description": "YouTube filter token (pagination or advanced filters)"
      },
      "gl": {
        "type": "string",
        "description": "Country code (e.g. us, jp)"
      },
      "hl": {
        "type": "string",
        "description": "Interface language"
      }
    },
    "required": [
      "engine",
      "q"
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
    "youtube-search"
  ]
}
```
