# post_dataforseo_on_page_submit

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "post_dataforseo_on_page_submit",
  "successful": true,
  "description": "Starts a crawl of `target` and returns a task `id` in `tasks[0].id` - **that id is the handle every other tool in this family needs**, so keep it. `max_crawl_pages` caps the crawl, `start_url`, `max_crawl_depth`, `priority_urls` and `crawl_delay` shape it, and `store_raw_html` decides whether `post_dataforseo_on_page_raw_html` will have anything to serve later. Measured at $0.00015 to submit a one-page crawl. Wrapped in DataForSEO's envelope: data in `tasks[0].result`, outcome in `tasks[0].status_code` - a rejected request still returns HTTP 200. ⚠️ This is not the usual submit/fetch pair: the crawl is a session that a dozen other tools then query by id. Poll `get_dataforseo_on_page_summary` until `crawl_progress` reads `finished`; a one-page crawl of example.com took well under a minute.",
  "provider": "dataforseo",
  "method": "POST",
  "path": "/apis/v1/dataforseo/on_page/task_post",
  "arguments_schema": {
    "type": "object",
    "properties": {
      "body": {
        "type": "array",
        "items": {
          "required": [
            "target",
            "max_crawl_pages"
          ],
          "type": "object",
          "properties": {
            "target": {
              "type": "string",
              "description": "target domain required field domain name should be specified without https:// and www. if you specify the page URL, the results will be returned for the domain included in the URL"
            },
            "max_crawl_pages": {
              "type": "integer",
              "description": "crawled pages limit required field the number of pages to crawl on the specified domain Note: if you set max_crawl_pages to 1 and do not specify start_url or set a homepage in it, the following sitewide checks will be disabled: test_canonicalization, enable_www_redirect_check, test_hidden_server_signature, test_page_not_found, test_directory_browsing, test_https_redirect to enable them anyway, set force_sitewide_checks to trueif you set max_crawl_pages to 1 and specify start_url other than a homepage, all sitewide checks will be disabled; to enable them anyway, set force_sitewide_checks to true"
            },
            "start_url": {
              "type": "string",
              "description": "the first url to crawl optional field Note: you should specify an absolute URL if you want to crawl a single page, specify its URL in this field and additionally set the max_crawl_pages parameter to 1 you can also use the live Instant Pages endpoint to get page-specific data"
            },
            "force_sitewide_checks": {
              "type": "boolean",
              "description": "enable sitewide checks when crawling a single page optional field set to true to get data on sitewide checks when crawling a single page; default value: false"
            },
            "priority_urls": {
              "type": "array",
              "items": {
                "type": "string"
              },
              "description": "urls to be crawled bypassing the queue optional field URLs specified in this array will be crawled in the first instance, bypassing the crawling queue; Note: you should specify the absolute URL; you can specify up to 20 URLs; all URLs in the array must belong to the target domain; subdomains will be ignored unless the allow_subdomains parameter is set to trueexample: \"priority_urls\": [ \"https://dataforseo.com/apis/serp-api\", \"https://dataforseo.com/contact\" ]"
            },
            "max_crawl_depth": {
              "type": "integer",
              "description": "crawl depth optional field the linking depth of the pages to crawl; for example, starting page of the crawl is level 0, pages that have links from that page are level 1, etc."
            },
            "crawl_delay": {
              "type": "integer",
              "description": "delay between hits, ms optional field the custom delay between crawler hits to the server default value: 2000"
            },
            "store_raw_html": {
              "type": "boolean",
              "description": "store HTML of crawled pages optional field set to true if you want to get the HTML of the page using the OnPage Raw HTML endpoint default value: false"
            },
            "enable_content_parsing": {
              "type": "boolean",
              "description": "parse content on crawled pages optional field set to true to use the OnPage Content Parsing endpoint default value: false"
            },
            "support_cookies": {
              "type": "boolean",
              "description": "support cookies on crawled pages optional field set to true to support cookies when crawling the pages default value: false"
            },
            "accept_language": {
              "type": "string",
              "description": "language header for accessing the website optional field all locale formats are supported (xx, xx-XX, xxx-XX, etc.) Note: if you do not specify this parameter, some websites may deny access; in this case, pages will be returned with the \"type\":\"broken in the response array"
            },
            "custom_robots_txt": {
              "type": "string",
              "description": "custom robots.txt settings optional field example: Disallow: /directory1/"
            },
            "robots_txt_merge_mode": {
              "type": "string",
              "description": "merge with or override robots.txt settings optional field possible values: merge, override; set to override if you want to ignore website crawling restrictions and other robots.txt settings default value: merge; Note: if set to override, specify the custom_robots_txt parameter"
            },
            "custom_user_agent": {
              "type": "string",
              "description": "custom user agent optional field custom user agent for crawling a website example: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36 default value: Mozilla/5.0 (compatible; RSiteAuditor)"
            },
            "browser_preset": {
              "type": "string",
              "description": "preset for browser screen parameters optional field if you use this field, you don’t need to indicate browser_screen_width, browser_screen_height, browser_screen_scale_factorpossible values: desktop, mobile, tabletdesktop preset will apply the following values:browser_screen_width: 1920 browser_screen_height: 1080 browser_screen_scale_factor: 1mobile preset will apply the following values:browser_screen_width: 390 browser_screen_height: 844 browser_screen_scale_factor: 3tablet preset will apply the following values:browser_screen_width: 1024 browser_screen_height: 1366 browser_screen_scale_factor: 2 Note: to use this parameter, set enable_javascript or enable_browser_rendering to true"
            },
            "browser_screen_width": {
              "type": "integer",
              "description": "browser screen width optional field you can set a custom browser screen width to perform audit for a particular device; if you use this field, you don’t need to indicate browser_preset as it will be ignored; Note: to use this parameter, set enable_javascript or enable_browser_rendering to trueminimum value, in pixels: 240 maximum value, in pixels: 9999"
            },
            "browser_screen_height": {
              "type": "integer",
              "description": "browser screen height optional field you can set a custom browser screen height to perform an audit for a particular device; if you use this field, you don’t need to indicate browser_preset as it will be ignored; Note: to use this parameter, set enable_javascript or enable_browser_rendering to trueminimum value, in pixels: 240 maximum value, in pixels: 9999"
            },
            "browser_screen_scale_factor": {
              "type": "number",
              "description": "browser screen scale factor optional field you can set a custom browser screen resolution ratio to perform audit for a particular device; if you use this field, you don’t need to indicate browser_preset as it will be ignored; Note: to use this parameter, set enable_javascript or enable_browser_rendering to trueminimum value: 0.5 maximum value: 3"
            },
            "respect_sitemap": {
              "type": "boolean",
              "description": "respect sitemap when crawling optional field set to true if you want to follow the order of pages indicated in the primary sitemap when crawling; default value: false Note: if set to true, the click_depth value in the API response will equal 0; the max_crawl_depth field of the request will be ignored, you can specify the number of pages to crawl using the max_crawl_pages parameter"
            },
            "custom_sitemap": {
              "type": "string",
              "description": "custom sitemap url optional field the URL of the page where the alternative sitemap is located Note: if you want to use this parameter, respect_sitemap should be true"
            },
            "crawl_sitemap_only": {
              "type": "boolean",
              "description": "crawl only pages indicated in the sitemap optional field set to true if you want to crawl only the pages indicated in the sitemap if you set this parameter to true and do not specify custom_sitemap, we will crawl the default sitemap default value: false Note: if you want to use this parameter, respect_sitemap should be true"
            },
            "load_resources": {
              "type": "boolean",
              "description": "load resources optional field set to true if you want to load image, stylesheets, scripts, and broken resources default value: false Note: if you use this parameter, additional charges will apply; learn more about the cost of tasks with this parameter in our help article; the cost can be calculated on the Pricing Page"
            },
            "enable_www_redirect_check": {
              "type": "boolean",
              "description": "check if the domain implemented the www redirection optional field set to true if you want to check if the requested domain implemented the www to non-www or non-www to www redirect; default value: false"
            },
            "enable_javascript": {
              "type": "boolean",
              "description": "load javascript on a page optional field set to true if you want to load the scripts available on a page default value: false Note: if you use this parameter, additional charges will apply; learn more about the cost of tasks with this parameter in our help article; the cost can be calculated on the Pricing Page"
            },
            "enable_xhr": {
              "type": "boolean",
              "description": "enable XMLHttpRequest on a page optional field set to true if you want our crawler to request data from a web server using the XMLHttpRequest object default value: false;if you use this field, enable_javascript must be set to true;"
            },
            "enable_browser_rendering": {
              "type": "boolean",
              "description": "emulate browser rendering to measure Core Web Vitals optional field by using this parameter you will be able to emulate a browser when loading a web page; enable_browser_rendering loads styles, images, fonts, animations, videos, and other resources on a page; default value: false set to true to obtain Core Web Vitals (FID, CLS, LCP) metrics in the response; if you use this field, enable_javascript, and load_resources parameters must be set to true Note: if you use this parameter, additional charges will apply; learn more about the cost of tasks with this parameter in our help article; the cost can be calculated on the Pricing Page"
            },
            "disable_cookie_popup": {
              "type": "boolean",
              "description": "disable the cookie popup optional field set to true if you want to disable the popup requesting cookie consent from the user; default value: false"
            },
            "custom_js": {
              "type": "string",
              "description": "custom javascript optional field Note that the execution time for the script you enter here should be 700 ms maximum, for example, you can use the following JS snippet to check if the website contains Google Tag Manager as a scr attribute: let meta = { haveGoogleAnalytics: false, haveTagManager: false };\\r\\nfor (var i = 0; i = 0)\\r\\n meta.haveGoogleAnalytics = true;\\r\\n\\tif (src.indexOf(\\\"gtm.js\\\") >= 0)\\r\\n meta.haveTagManager = true;\\r\\n }\\r\\n}\\r\\nmeta;the returned value depends on what you specified in this field. For instance, if you specify the following script: meta = {}; meta.url = document.URL; meta.test = 'test'; meta; as a response you will receive the following data: \"custom_js_response\": { \"url\": \"https://dataforseo.com/\", \"test\": \"test\" } Note: the length of the script you enter must be no more than 2000 characters Note: if you use this parameter, additional charges will apply; learn more about the cost of tasks with this parameter in our help article; the cost can be calculated on the Pricing Page"
            },
            "validate_micromarkup": {
              "type": "boolean",
              "description": "enable microdata validation optional field set to true if you want to use the OnPage API Microdata endpoint default value: false"
            },
            "allow_subdomains": {
              "type": "boolean",
              "description": "include pages on subdomains optional field set to true if you want to crawl all subdomains of a target website default value: false"
            },
            "allowed_subdomains": {
              "type": "array",
              "items": {
                "type": "string"
              },
              "description": "subdomains to crawl optional field specify subdomains that you want to crawl example: [\"blog.site.com\", \"my.site.com\", \"shop.site.com\"] Note: to use this parameter, the allow_subdomains parameter should be set to false; otherwise, the content of allowed_subdomains field will be ignored and the results will be returned for all subdomains"
            },
            "disallowed_subdomains": {
              "type": "array",
              "items": {
                "type": "string"
              },
              "description": "subdomains not to crawl optional field specify subdomains that you don’t want to crawl example: [\"status.site.com\", \"docs.site.com\"] Note: to use this parameter, the allow_subdomains parameter should be set to true"
            },
            "check_spell": {
              "type": "boolean",
              "description": "check spelling optional field set to true to check spelling on a website using Hunspell library default value: false"
            },
            "check_spell_language": {
              "type": "string",
              "description": "language of the spell check optional field supported languages: ‘hy’, ‘eu’, ‘bg’, ‘ca’, ‘hr’, ‘cs’, ‘da’, ‘nl’, ‘en’, ‘eo’, ‘et’, ‘fo’, ‘fa’, ‘fr’, ‘fy’, ‘gl’, ‘ka’, ‘de’, ‘el’, ‘he’, ‘hu’, ‘is’, ‘ia’, ‘ga’, ‘it’, ‘rw’, ‘la’, ‘lv’, ‘lt’, ‘mk’, ‘mn’, ‘ne’, ‘nb’, ‘nn’, ‘pl’, ‘pt’, ‘ro’, ‘gd’, ‘sr’, ‘sk’, ‘sl’, ‘es’, ‘sv’, ‘tr’, ‘tk’, ‘uk’, ‘vi’ Note: if no language is specified, it will be set automatically based on page content"
            },
            "check_spell_exceptions": {
              "type": "array",
              "items": {
                "type": "string"
              },
              "description": "words excluded from spell check optional field specify the words that you want to exclude from spell check maximum word length: 100 characters maximum amount of words: 1000 example: \"SERP\", \"minifiers\", \"JavaScript\""
            },
            "calculate_keyword_density": {
              "type": "boolean",
              "description": "calculate keyword density for the target domain optional field set to true if you want to calculate keyword density for website pages default value: false Note: if you use this parameter, additional charges will apply; learn more about the cost of tasks with this parameter in our help article once the crawl is completed, you can obtain keyword density values with the Keyword Density endpoint"
            },
            "checks_threshold": {
              "type": "object",
              "description": "custom threshold values for checks optional field you can specify custom threshold values for the parameters included in the checks object of OnPage API responses; Note: only integer threshold values can be modified; for example, the high_loading_time and large_page_size parameters are set to 3 seconds and 1 megabyte respectively by default; if you want to change these thresholds to 1 second and 1000 kbytes, use the following snippet: \"checks_threshold\": { \"high_loading_time\": 1, \"large_page_size\": 1000 }available customizable parameters with default values: \"title_too_short\", default value: 30, type: \"int\" \"title_too_long\", default value: 65, type: \"int\" \"small_page_size\", default value: 1024, type: \"int\" \"large_page_size\", default value: 1048576 (1024 * 1024), type: \"int\" \"low_character_count\", default value: 1024, type: \"int\" \"high_character_count\", default value: 256000 (250 * 1024), type: \"int\" \"low_content_rate\", default value: 0.1, type: \"float\" \"high_content_rate\", default value: 0.9, type: \"float\" \"high_loading_time\", default value: 3000, type: \"int\" \"high_waiting_time\", default value: 1500, type: \"int\" \"low_readability_rate\", default value: 15.0, type: \"float\" \"irrelevant_description\", default value: 0.2, type: \"float\" \"irrelevant_title\", default value: 0.3, type: \"float\" \"irrelevant_meta_keywords\", default value: 0.6, type: \"float\""
            },
            "disable_sitewide_checks": {
              "type": "array",
              "items": {
                "type": "string"
              },
              "description": "prevent certain sitewide checks from running optional field specify the following checks to prevent them from running on the target website: \"test_page_not_found\" \"test_canonicalization\" \"test_https_redirect\" \"test_directory_browsing\"example: \"disable_sitewide_checks\": [\"test_directory_browsing\", \"test_page_not_found\"]learn more on our help center"
            },
            "disable_page_checks": {
              "type": "array",
              "items": {
                "type": "string"
              },
              "description": "prevent certain page checks from running optional field specify certain checks to prevent them from running and impacting the onpage_scoreexample: \"disable_page_checks\": [\"is_5xx_code\", \"is_4xx_code\"]"
            },
            "switch_pool": {
              "type": "boolean",
              "description": "switch proxy pool optional field if true, additional proxy pools will be used to obtain the requested data; the parameter can be used if a multitude of tasks is set simultaneously, resulting in occasional rate-limit and/or site_unreachable errors"
            },
            "return_despite_timeout": {
              "type": "boolean",
              "description": "return data on pages despite the timeout error optional field if true, the data will be provided on pages that failed to load within 120 seconds and responded with a timeout error; default value: false"
            },
            "tag": {
              "type": "string",
              "description": "user-defined task identifier optional field the character limit is 255 you can use this parameter to identify the task and match it with the result you will find the specified tag value in the data object of the response"
            },
            "pingback_url": {
              "type": "string",
              "description": "notification URL of a completed task optional field when a task is completed we will notify you by GET request sent to the URL you have specified you can use the ‘$id’ string as a $id variable and ‘$tag’ as urlencoded $tag variable. We will set the necessary values before sending the request. example: http://your-server.com/pingscript?id=$id http://your-server.com/pingscript?id=$id&tag=$tag Note: special characters in pingback_url will be urlencoded; i.a., the # character will be encoded into %23 learn more on our Help Center"
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
    "seo-onpage"
  ]
}
```
