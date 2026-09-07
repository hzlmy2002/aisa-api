# post_apollo_news_articles_search

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "post_apollo_news_articles_search",
  "successful": true,
  "description": "News coverage for specific companies. `organization_ids[]` is required — omitting it returns HTTP 422 with \"organization_ids is required\", so resolve the companies first with `get_apollo_organizations_enrich` or `post_apollo_mixed_companies_search`. Narrow further with `categories[]` (funding, hires, launches and similar), `published_at[min]`, `published_at[max]`, and page with `page` and `per_page`. Returns `news_articles` and `pagination`. Use it to catch a trigger event before reaching out.",
  "provider": "apollo",
  "method": "POST",
  "path": "/apis/v1/apollo/news_articles/search",
  "arguments_schema": {
    "type": "object",
    "properties": {
      "organization_ids[]": {
        "type": "array",
        "items": {
          "type": "string"
        },
        "description": "The Apollo IDs for the companies you want to include in your search results. Each company in the Apollo database is assigned a unique ID. To find IDs, call the Organization Search endpoint and identify the values for organization_id. Example: 5e66b6381e05b4008c8331b8"
      },
      "categories[]": {
        "type": "array",
        "items": {
          "type": "string"
        },
        "description": "Filter your search to include only certain categories or sub-categories of news. Use the News search filter for companies within Apollo to uncover all possible categories and sub-categories. Examples: hires; investment; contract"
      },
      "published_at[min]": {
        "type": "string",
        "description": "Set the lower bound of the date range you want to search. Use this parameter in combination with the published_at[max] parameter. This date should fall before the published_at[max] date. The date should be formatted as YYYY-MM-DD. Example: 2025-02-15"
      },
      "published_at[max]": {
        "type": "string",
        "description": "Set the upper bound of the date range you want to search. Use this parameter in combination with the published_at[min] parameter. This date should fall after the published_at[min] date. The date should be formatted as YYYY-MM-DD. Example: 2025-05-15"
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
      "organization_ids[]"
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
