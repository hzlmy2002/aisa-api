# post_apollo_people_bulk_match

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "post_apollo_people_bulk_match",
  "successful": true,
  "description": "Enrich up to 10 people in one call. Body takes `details`, an array of the same identifier objects `post_apollo_people_match` accepts. Returns `matches` alongside `status`, `total_requested_enrichments`, `unique_enriched_records`, `missing_records` and `credits_consumed` — read `missing_records` rather than assuming every input matched. Costs one credit per record enriched, not per call. Use this over a loop of single calls: same credits, one round trip. For a single person `post_apollo_people_match` is simpler.",
  "provider": "apollo",
  "method": "POST",
  "path": "/apis/v1/apollo/people/bulk_match",
  "arguments_schema": {
    "type": "object",
    "properties": {
      "run_waterfall_email": {
        "type": "boolean",
        "description": "Set to true to enable email waterfall enrichment"
      },
      "run_waterfall_phone": {
        "type": "boolean",
        "description": "Set to true to enable phone waterfall enrichment"
      },
      "reveal_personal_emails": {
        "type": "boolean",
        "description": "Set to true if you want to enrich all matched people with personal emails. This potentially consumes credits as part of your Apollo pricing plan . The default value is false. If a person resides in a GDPR -compliant region, Apollo will not reveal their personal email."
      },
      "reveal_phone_number": {
        "type": "boolean",
        "description": "Set to true if you want to enrich the data of all matched people with all available phone numbers, including mobile phone numbers. This potentially consumes credits as part of your Apollo pricing plan . The default value is false. If this parameter is set to true, you must enter a webhook URL for the webhook_url parameter. Apollo will asynchronously verify phone numbers for you, then send a JSON response that includes only details about the phone numbers to the webhook URL you provide. It can take several minutes for the phone numbers to be delivered."
      },
      "webhook_url": {
        "type": "string",
        "description": "If you set the reveal_phone_number parameter to true, this parameter becomes mandatory. Otherwise, do not use this parameter. Enter the webhook URL that specifies where Apollo should send a JSON response that includes the phone number you requested. Apollo suggests testing this flow to ensure you receive the separate response with the phone number. If phone numbers are not revealed delivered to the webhook URL, try applying UTF-8 encoding to the webhook URL. Example: https://webhook.site/cc4cf44e-e047-4774-8dac-473d28474e40; https%3A%2F%2Fwebhook.site%2Fcc4cf44e-e047-4774-8dac-473d28474e40"
      },
      "details": {
        "type": "array",
        "items": {
          "type": "object",
          "properties": {
            "first_name": {
              "type": "string",
              "description": "First name, used with last_name. Example: tim"
            },
            "last_name": {
              "type": "string",
              "description": "Last name, used with first_name. Example: zheng"
            },
            "name": {
              "type": "string",
              "description": "Full name, e.g. \"tim zheng\"; replaces first_name + last_name."
            },
            "email": {
              "type": "string",
              "description": "Email address of the person."
            },
            "hashed_email": {
              "type": "string",
              "description": "MD5 or SHA-256 hash of the email address."
            },
            "organization_name": {
              "type": "string",
              "description": "Name of the person's employer. Example: apollo"
            },
            "domain": {
              "type": "string",
              "description": "Domain of the person's employer, without www. Example: apollo.io"
            },
            "id": {
              "type": "string",
              "description": "Apollo person id, e.g. from a people search."
            },
            "linkedin_url": {
              "type": "string",
              "description": "LinkedIn profile URL of the person."
            }
          },
          "description": "One person to enrich. Give whatever identifiers you have — the more, the likelier the match."
        },
        "description": "Provide info for each person you want to enrich as an object within this array. Add up to 10 people."
      }
    },
    "required": [
      "details"
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
    "apollo"
  ]
}
```
