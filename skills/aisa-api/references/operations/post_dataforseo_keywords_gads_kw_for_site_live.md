# post_dataforseo_keywords_gads_kw_for_site_live

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "post_dataforseo_keywords_gads_kw_for_site_live",
  "successful": true,
  "description": "The Google Ads keywords a whole site ranks or bids for, from a `target` domain, each with `keyword`, `location_code`, `language_code`, `search_partners`, `competition`, `competition_index`, `search_volume`, `low_top_of_page_bid`, `high_top_of_page_bid`, `cpc` and `monthly_searches`. `target_type` selects the page or the domain. 🔴 **Measured at 7.2 MB for one site - the largest live response in this provider - and there is no limit parameter to cap it.** Treat this as a bulk export, not something to call inside an agent loop; `post_dataforseo_labs_google_kw_for_site_live` answers a similar question with paging. 🔴 **Measured at $0.09 upstream against the $0.012 billed - a sevenfold loss on every call.** The price does not fall with fewer keywords, so send the whole batch in one call. Wrapped in DataForSEO's envelope: data in `tasks[0].result`, outcome in `tasks[0].status_code` - a rejected request still returns HTTP 200. The submit and fetch twins of this endpoint do the same work asynchronously, at the same price, for batches too large to wait on.",
  "provider": "dataforseo",
  "method": "POST",
  "path": "/apis/v1/dataforseo/keywords_data/google_ads/keywords_for_site/live",
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
              "description": "domain or page required field the domain name of the target website or the url of the target page; note: to obtain keywords for the target website, use the target_type parameter"
            },
            "target_type": {
              "type": "string",
              "description": "search keywords for site or for url optional field possible values: site, page; default value: page; if set to site, keywords will be provided for the entire site; if set to page, keywords will be provided for the specified webpage"
            },
            "location_name": {
              "type": "string",
              "description": "full name of search engine location optional field if you do not indicate the location, you will receive worldwide results, i.e., for all available locations; if you use this field, you don’t need to specify location_code or location_coordinate you can receive the list of available locations of the search engine with their location_name by making a separate request to https://api.dataforseo.com/v3/keywords_data/google_ads/locations example: London,England,United Kingdom"
            },
            "location_code": {
              "type": "integer",
              "description": "search engine location code optional field if you do not indicate the location, you will receive worldwide results, i.e., for all available locations; if you use this field, you don’t need to specify location_name or location_coordinate; you can receive the list of available locations of the search engines with their location_code by making a separate request to https://api.dataforseo.com/v3/keywords_data/google_ads/locations example: 2840"
            },
            "location_coordinate": {
              "type": "string",
              "description": "GPS coordinates of a location optional field if you do not indicate the location, you will receive worldwide results, i.e., for all available locations; if you use this field, you don’t need to specify location_name or location_code; location_coordinate parameter should be specified in the “latitude,longitude” format; the data will be provided for the country the specified coordinates belong to; example: 52.6178549,-155.352142"
            },
            "language_name": {
              "type": "string",
              "description": "full name of search engine language optional field you can receive the list of available languages of the search engine with their language_name by making a separate request to https://api.dataforseo.com/v3/keywords_data/google_ads/languages example: English"
            },
            "language_code": {
              "type": "string",
              "description": "search engine language code optional field you can receive the list of available languages of the search engine with their language_code by making a separate request to https://api.dataforseo.com/v3/keywords_data/google_ads/languages example: en"
            },
            "search_partners": {
              "type": "boolean",
              "description": "include Google search partners optional field if you specify true, the results will be delivered for owned, operated, and syndicated networks across Google and partner sites that host Google search; default value: false – results are returned for Google search sites"
            },
            "date_from": {
              "type": "string",
              "description": "starting date of the time range optional field date format: \"yyyy-mm-dd\" minimal value: 4 years from the current date by default, data is returned for the past 12 months; Note: the indicated date cannot be greater than that specified in date_to and/or yesterday’s date;if Status endpoint returns false in the actual_data field, date_from can be set to the month before last and prior; if Status endpoint returns true in the actual_data field, date_from can be set to the last month and prior"
            },
            "date_to": {
              "type": "string",
              "description": "ending date of the time range optional field Note: the indicated date cannot be greater than yesterday’s date; if you don’t specify this field, yesterday’s date will be used by default date format: \"yyyy-mm-dd\" example: \"2022-11-30\""
            },
            "include_adult_keywords": {
              "type": "boolean",
              "description": "include keywords associated with adult content optional field if set to true, adult keywords will be included in the response default value: false note that the API may return no data for such keywords due to Google Ads restrictions"
            },
            "sort_by": {
              "type": "string",
              "description": "results sorting parameters optional field Use these parameters to sort the results by relevance, search_volume, competition_index, low_top_of_page_bid, or high_top_of_page_bid in descending order default value: relevance"
            },
            "tag": {
              "type": "string",
              "description": "user-defined task identifier optional field the character limit is 255 you can use this parameter to identify the task and match it with the result you will find the specified tag value in the data object of the response"
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
    "seo-keywords"
  ]
}
```
