# post_waveinflu_email_lookup

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "post_waveinflu_email_lookup",
  "successful": true,
  "description": "Looks up contact emails for one TikTok, Instagram or YouTube creator from a profile URL. Returns `platform` parsed from the URL, `username`, `profileLink`, `platformUserId`, `region`, a primary `email`, an `emails` array of every address found, and a `contacts` array of external links each shaped `{url, type}` (personal sites, WhatsApp links), plus `quota.cost` in credits and `quota.remainingQuota`. Measured at 533 bytes and about 2 seconds for one Instagram creator. `email` is null and `emails` empty when the creator publishes no address — a normal result, not an error. Handles one creator per call. To assemble a creator list first use `post_waveinflu_similar_creators`, which already returns an `email` for most matches; call this endpoint for the ones that come back null, and for Instagram creators, which the similar-creators endpoint does not cover.",
  "provider": "waveinflu",
  "method": "POST",
  "path": "/apis/v1/waveinflu/email-lookup",
  "arguments_schema": {
    "type": "object",
    "properties": {
      "url": {
        "type": "string",
        "description": "TikTok, Instagram, or YouTube creator profile URL.",
        "example": "https://www.instagram.com/onkimia/"
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
    "creator-discovery"
  ]
}
```
