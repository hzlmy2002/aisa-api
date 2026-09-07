# post_dataforseo_domains_tech_for_domain_live

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "post_dataforseo_domains_tech_for_domain_live",
  "successful": true,
  "description": "Everything detected about one domain from a single `target`. Returns `domain`, `title`, `description`, `meta_keywords`, `domain_rank`, `last_visited`, `country_iso_code`, `language_code`, `content_language_code`, `phone_numbers`, `emails`, `social_graph_urls` and `technologies`. Measured at 3.5 KB for stripe.com. Wrapped in DataForSEO's envelope: data in `tasks[0].result`, upstream charge in `tasks[0].cost`, and the real outcome in `tasks[0].status_code` - a rejected request still returns HTTP 200, so check that field rather than the transport status. This is the per-domain direction; to go the other way and find the domains using a given technology use `post_dataforseo_domains_tech_domains_by_technology_live`. The `emails` and `phone_numbers` it surfaces are scraped from the site itself, not a contact database.",
  "provider": "dataforseo",
  "method": "POST",
  "path": "/apis/v1/dataforseo/domain_analytics/technologies/domain_technologies/live",
  "arguments_schema": {
    "type": "object",
    "properties": {
      "body": {
        "type": "array",
        "items": {
          "required": [
            "target"
          ],
          "type": "object",
          "properties": {
            "target": {
              "type": "string",
              "description": "target domain required field domain name of the website to analyze Note: results will be returned for the specified domain only"
            }
          }
        }
      }
    },
    "required": [
      "body"
    ]
  },
  "response_schema": {
    "type": "object",
    "additionalProperties": true
  },
  "read_only": false,
  "idempotent": false,
  "side_effects": [
    "writes-upstream"
  ],
  "annotations": {
    "readOnlyHint": false,
    "destructiveHint": true,
    "idempotentHint": false,
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
    "seo-domains"
  ]
}
```
