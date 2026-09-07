# post_apollo_mixed_companies_search

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "post_apollo_mixed_companies_search",
  "successful": true,
  "description": "Find companies matching criteria: name, domain, headcount, industry, location, funding stage and technologies in use. Returns `organizations` and `accounts` side by side — organizations are Apollo's global database, accounts are records that already exist in this Apollo workspace — plus `pagination` and `breadcrumbs` echoing the filters that were applied. Use it to build a target list. When you already know the domain, `get_apollo_organizations_enrich` answers directly and costs less.",
  "provider": "apollo",
  "method": "POST",
  "path": "/apis/v1/apollo/mixed_companies/search",
  "arguments_schema": {
    "type": "object",
    "properties": {
      "q_organization_domains_list[]": {
        "type": "array",
        "items": {
          "type": "string"
        },
        "description": "The domain name for the person's employer. This can be the current employer or a previous employer. Do not include www., the @ symbol, or similar. This parameter accepts up to 1,000 domains in a single request. Examples: apollo.io; microsoft.com"
      },
      "organization_num_employees_ranges[]": {
        "type": "array",
        "items": {
          "type": "string"
        },
        "description": "The number range of employees working for the company. This enables you to find companies based on headcount. You can add multiple ranges to expand your search results. Each range you add needs to be a string, with the upper and lower numbers of the range separated only by a comma. Examples: 1,10; 250,500; 10000,20000"
      },
      "organization_locations[]": {
        "type": "array",
        "items": {
          "type": "string"
        },
        "description": "The location of the company headquarters. You can search across cities, US states, and countries. If a company has several office locations, results are still based on the headquarters location. For example, if you search chicago but a company's HQ location is in boston, any Boston-based companies will not appearch in your search results, even if they match other parameters.. To exclude companies based on location, use the organization_not_locations parameter. Examples: texas; tokyo; spain"
      },
      "organization_not_locations[]": {
        "type": "array",
        "items": {
          "type": "string"
        },
        "description": "Exclude companies from search results based on the location of the company headquarters. You can use cities, US states, and countries as locations to exclude. This parameter is useful for ensuring you do not prospect in an undesirable territory. For example, if you use ireland as a value, no Ireland-based companies will appear in your search results. Examples: minnesota; ireland; seoul"
      },
      "revenue_range[min]": {
        "type": "integer",
        "description": "Search for organizations based on their revenue. Use this parameter to set the lower range of organization revenue. Use the revenue_range[max] parameter to set the upper range of revenue. Do not enter currency symbols, commas, or decimal points in the figure. Example: 300000"
      },
      "revenue_range[max]": {
        "type": "integer",
        "description": "Search for organizations based on their revenue. Use this parameter to set the upper range of organization revenue. Use the revenue_range[min] parameter to set the lower range of revenue. Do not enter currency symbols, commas, or decimal points in the figure. Example: 50000000"
      },
      "currently_using_any_of_technology_uids[]": {
        "type": "array",
        "items": {
          "type": "string"
        },
        "description": "Find organizations based on the technologies they currently use. Apollo supports filtering by 1,500+ technologies. Apollo calculates technologies data from multiple sources. This data is updated regularly. Check out the full list of supported technologies by downloading this CSV file . Use underscores (_) to replace spaces and periods for the technologies listed in the CSV file. Examples: salesforce; google_analytics; wordpress_org"
      },
      "q_organization_keyword_tags[]": {
        "type": "array",
        "items": {
          "type": "string"
        },
        "description": "Filter search results based on keywords associated with companies. For example, you can enter mining as a value to return only companies that have an association with the mining industry. Examples: mining; sales strategy; consulting"
      },
      "q_organization_name": {
        "type": "string",
        "description": "Filter search results to include a specific company name. If the value you enter for this parameter does not match with a company's name, the company will not appear in search results, even if it matches other parameters. Partial matches are accepted. For example, if you filter by the value marketing, a company called NY Marketing Unlimited would still be eligible as a search result, but NY Market Analysis would not be eligible. Example: apollo or mining"
      },
      "organization_ids[]": {
        "type": "array",
        "items": {
          "type": "string"
        },
        "description": "The Apollo IDs for the companies you want to include in your search results. Each company in the Apollo database is assigned a unique ID. To find IDs, identify the values for organization_id when you call this endpoint. Example: 5e66b6381e05b4008c8331b8"
      },
      "latest_funding_amount_range[min]": {
        "type": "integer",
        "description": "The minimum amount the company received with its most recent funding round. Use this parameter in combination with latest_funding_amount_range[max] to set a monetary range for the company's most recent funding round. Do not enter currency symbols, commas, or decimal points in the figure. Examples: 5000000; 15000000"
      },
      "latest_funding_amount_range[max]": {
        "type": "integer",
        "description": "The maximium amount the company received with its most recent funding round. Use this parameter in combination with latest_funding_amount_range[min] to set a monetary range for the company's most recent funding round. Do not enter currency symbols, commas, or decimal points in the figure. Examples: 5000000; 15000000"
      },
      "total_funding_range[min]": {
        "type": "integer",
        "description": "The minimum amount the company received during all of its funding rounds combined. Use this parameter in combination with total_funding_range[max] to set a monetary range for all of the company's funding rounds. Do not enter currency symbols, commas, or decimal points in the figure. Examples: 50000000; 350000000"
      },
      "total_funding_range[max]": {
        "type": "integer",
        "description": "The maximum amount the company received during all of its funding rounds combined. Use this parameter in combination with total_funding_range[min] to set a monetary range for all of the company's funding rounds. Do not enter currency symbols, commas, or decimal points in the figure. Examples: 50000000; 350000000"
      },
      "latest_funding_date_range[min]": {
        "type": "string",
        "description": "The earliest date when the company received its most recent funding round. Use this parameter in combination with latest_funding_date_range[max] to set a date range for when the company received its most recent funding round. Example: 2025-07-25"
      },
      "latest_funding_date_range[max]": {
        "type": "string",
        "description": "The latest date when the company received its most recent funding round. Use this parameter in combination with latest_funding_date_range[min] to set a date range for when the company received its most recent funding round. Example: 2025-09-25"
      },
      "q_organization_job_titles[]": {
        "type": "array",
        "items": {
          "type": "string"
        },
        "description": "The job titles that are listed in active job postings at the company. Examples: sales manager; research analyst"
      },
      "organization_job_locations[]": {
        "type": "array",
        "items": {
          "type": "string"
        },
        "description": "The locations of the jobs being actively recruited by the company. Examples: atlanta; japan"
      },
      "organization_num_jobs_range[min]": {
        "type": "integer",
        "description": "The minimum number of job postings active at the company. Use this parameter in combination with organization_num_jobs_range[max] to set a job postings range. Examples: 50; 500"
      },
      "organization_num_jobs_range[max]": {
        "type": "integer",
        "description": "The maximum number of job postings active at the company. Use this parameter in combination with organization_num_jobs_range[min] to set a job postings range. Examples: 50; 500"
      },
      "organization_job_posted_at_range[min]": {
        "type": "string",
        "description": "The earliest date when jobs were posted by the company. Use this parameter in combination with organization_job_posted_at_range[max] to set a date range for when jobs posted. Example: 2025-07-25"
      },
      "organization_job_posted_at_range[max]": {
        "type": "string",
        "description": "The latest date when jobs were posted by the company. Use this parameter in combination with organization_job_posted_at_range[min] to set a date range for when jobs posted. Example: 2025-09-25"
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
