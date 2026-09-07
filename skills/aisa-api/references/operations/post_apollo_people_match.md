# post_apollo_people_match

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "post_apollo_people_match",
  "successful": true,
  "description": "Enrich one person: give whatever identifiers you have and get back Apollo's full record for them. Accepts `email`, `first_name` plus `last_name`, `name`, `domain`, `organization_name`, `linkedin_url` or `hashed_email` — the more you supply, the likelier the match. Returns a `person` object with `id`, `name`, `title`, `headline`, `linkedin_url`, `twitter_url`, `github_url`, `photo_url`, `organization_id` and an `employment_history` array, plus a `request_id`. Personal emails and phone numbers are withheld unless `reveal_personal_emails` or `reveal_phone_number` is set, and those cost extra credits. A 200 does not guarantee a match — check whether `person` actually came back. Use `post_apollo_people_bulk_match` for up to 10 people in one call; use `post_apollo_mixed_people_api_search` when you do not have an identifier and need to find candidates first.",
  "provider": "apollo",
  "method": "POST",
  "path": "/apis/v1/apollo/people/match",
  "arguments_schema": {
    "type": "object",
    "properties": {
      "first_name": {
        "type": "string",
        "description": "The first name of the person. This is typically used in combination with the last_name parameter. Example: tim"
      },
      "last_name": {
        "type": "string",
        "description": "The last name of the person. This is typically used in combination with the first_name parameter. Example: zheng"
      },
      "name": {
        "type": "string",
        "description": "The full name of the person. This will typically be a first name and last name separated by a space. If you use this parameter, you do not need to use the first_name and last_name parameters. Example: tim zheng"
      },
      "email": {
        "type": "string",
        "description": "The email address of the person. Example: example@email.com"
      },
      "hashed_email": {
        "type": "string",
        "description": "The hashed email of the person. The email should adhere to either the MD5 or SHA-256 hash format. Example: 8d935115b9ff4489f2d1f9249503cadf (MD5) or 97817c0c49994eb500ad0a5e7e2d8aed51977b26424d508f66e4e8887746a152 (SHA-256)"
      },
      "organization_name": {
        "type": "string",
        "description": "The name of the person's employer. This can be the current employer or a previous employer. Example: apollo"
      },
      "domain": {
        "type": "string",
        "description": "The domain name for the person's employer. This can be the current employer or a previous employer. Do not include www., the @ symbol, or similar. Example: apollo.io or microsoft.com"
      },
      "id": {
        "type": "string",
        "description": "The Apollo ID for the person. Each person in the Apollo database is assigned a unique ID. To find IDs, call the People API Search endpoint and identify the values for person_id. Example: 587cf802f65125cad923a266"
      },
      "linkedin_url": {
        "type": "string",
        "description": "The URL for the person's LinkedIn profile. Example: http://www.linkedin.com/in/tim-zheng-677ba010"
      },
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
        "description": "Set to true if you want to enrich the person's data with personal emails. This potentially consumes credits as part of your Apollo pricing plan . The default value is false. If a person resides in a GDPR -compliant region, Apollo will not reveal their personal email."
      },
      "reveal_phone_number": {
        "type": "boolean",
        "description": "Set to true if you want to enrich the person's data with all available phone numbers, including mobile phone numbers. This potentially consumes credits as part of your Apollo pricing plan . The default value is false. If this parameter is set to true, you must enter a webhook URL for the webhook_url parameter. Apollo will asynchronously verify phone numbers for you, then send a JSON response that includes only details about the person's phone numbers to the webhook URL you provide. It can take several minutes for the phone numbers to be delivered."
      },
      "webhook_url": {
        "type": "string",
        "description": "If you set the reveal_phone_number parameter to true, this parameter becomes mandatory. Otherwise, do not use this parameter. Enter the webhook URL that specifies where Apollo should send a JSON response that includes the phone number you requested. Apollo suggests testing this flow to ensure you receive the separate response with the phone number. If phone numbers are not revealed delivered to the webhook URL, try applying UTF-8 encoding to the webhook URL. Example: https://webhook.site/cc4cf44e-e047-4774-8dac-473d28474e40; https%3A%2F%2Fwebhook.site%2Fcc4cf44e-e047-4774-8dac-473d28474e40"
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
    "apollo"
  ]
}
```
