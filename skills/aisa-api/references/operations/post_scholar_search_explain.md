# post_scholar_search_explain

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "post_scholar_search_explain",
  "successful": true,
  "description": "Explain a result set you already fetched. Unlike the three search endpoints this one takes a **JSON body**: `search_id` (required — the `id` returned by `post_scholar_search_web`, `post_scholar_search_scholar` or `post_scholar_search_mixed`), plus `detail_level` (BRIEF / MODERATE / DETAILED), `language`, and `response_mode`. ⚠️ Use `response_mode: NON_STREAMING`. It returns `{\"message\": \"…\"}` as JSON, measured at about 2 KB. The COMPLETE and INCREMENTAL modes emit server-sent events in which **each event repeats the whole answer so far** — the identical explanation measured 177 KB that way, roughly 90 times larger, and a tool call cannot consume a stream incrementally anyway. It only ever explains an existing search; it cannot run one.",
  "provider": "scholar",
  "method": "POST",
  "path": "/apis/v1/scholar/search/explain",
  "arguments_schema": {
    "type": "object",
    "properties": {
      "search_id": {
        "type": "string",
        "description": "ID of the search to explain"
      },
      "response_mode": {
        "enum": [
          "COMPLETE",
          "INCREMENTAL",
          "NON_STREAMING"
        ],
        "type": "string",
        "description": "Format of the explanation response. COMPLETE and INCREMENTAL stream server-sent events; NON_STREAMING returns a JSON response.",
        "default": "NON_STREAMING"
      },
      "language": {
        "type": "string",
        "description": "Language code for the explanation (e.g., en, zh, ar)",
        "default": "en",
        "example": "ar"
      },
      "detail_level": {
        "enum": [
          "BRIEF",
          "MODERATE",
          "DETAILED"
        ],
        "type": "string",
        "description": "Level of detail in the explanation",
        "default": "MODERATE"
      }
    },
    "required": [
      "search_id"
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
    "web-search"
  ]
}
```
