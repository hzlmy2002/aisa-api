# get_apollo_organizations_organization_id_job_postings

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "get_apollo_organizations_organization_id_job_postings",
  "successful": true,
  "description": "Live job postings for one company, by Apollo organization id. Each posting carries its title, location, posted date and source URL. Useful as a hiring signal — which functions a company is expanding, and where. Get the organization id from `get_apollo_organizations_enrich` first. This reads Apollo's job board data, not the company's own careers page, so absence of postings is not proof a company is not hiring.",
  "provider": "apollo",
  "method": "GET",
  "path": "/apis/v1/apollo/organizations/{organization_id}/job_postings",
  "arguments_schema": {
    "type": "object",
    "properties": {
      "organization_id": {
        "type": "string",
        "description": "The organization ID of the company for which you want to find job postings. Each company in the Apollo database is assigned a unique ID. To find IDs, call the Organization Search endpoint and identify the values for organization_id. Example: 5e66b6381e05b4008c8331b8"
      },
      "page": {
        "type": "integer",
        "description": "The page number of the Apollo data that you want to retrieve. Use this parameter in combination with the per_page parameter to make search results for navigable and improve the performance of the endpoint. Example: 4"
      },
      "per_page": {
        "type": "integer",
        "description": "The number of search results that should be returned for each page. Limiting the number of results per page improves the endpoint's performance. Use the page parameter to search the different pages of data. Example: 10"
      }
    },
    "required": [
      "organization_id"
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
