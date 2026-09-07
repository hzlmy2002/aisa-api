# post_dataforseo_on_page_page_screenshot

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "post_dataforseo_on_page_page_screenshot",
  "successful": true,
  "description": "Renders any `url` and returns a screenshot, with `full_page_screenshot` for the whole scroll height and `browser_screen_width` and `browser_screen_height` setting the viewport. Standalone - no crawl needed. Wrapped in DataForSEO's envelope: data in `tasks[0].result`, outcome in `tasks[0].status_code` - a rejected request still returns HTTP 200. ⚠️ An image is a large tool result even before an agent can do anything with it; ask for a screenshot only when the visual is the point, and use `post_dataforseo_on_page_content_parsing_live` when the text is.",
  "provider": "dataforseo",
  "method": "POST",
  "path": "/apis/v1/dataforseo/on_page/page_screenshot",
  "arguments_schema": {
    "type": "object",
    "properties": {
      "body": {
        "type": "array",
        "items": {
          "required": [
            "url"
          ],
          "type": "object",
          "properties": {
            "url": {
              "type": "string",
              "description": "page url required field absolute URL of the page to snap note: if the URL you indicate here returns a 404 status code or the indicated value is not a valid URL, you will obtain \"error_message\":\"Screenshot is empty\" in the response array"
            },
            "accept_language": {
              "type": "string",
              "description": "language header for accessing the website optional field all locale formats are supported (xx, xx-XX, xxx-XX, etc.) note: if you do not specify this parameter, some websites may deny access; in this case, you will obtain \"error_message\":\"Screenshot is empty\" in the response array"
            },
            "custom_user_agent": {
              "type": "string",
              "description": "custom user agent optional field custom user agent for crawling a website example: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36 default value: Mozilla/5.0 (compatible; RSiteAuditor)"
            },
            "browser_preset": {
              "type": "string",
              "description": "preset for browser screen parameters optional field if you use this field, you don’t need to indicate browser_screen_width, browser_screen_height, browser_screen_scale_factor possible values: desktop, mobile, tablet desktop preset will apply the following values: browser_screen_width: 1920 browser_screen_height: 1080 browser_screen_scale_factor: 1 mobile preset will apply the following values: browser_screen_width: 390 browser_screen_height: 844 browser_screen_scale_factor: 3 tablet preset will apply the following values: browser_screen_width: 1024 browser_screen_height: 1366 browser_screen_scale_factor: 2 Note: in this endpoint, the enable_browser_rendering, enable_javascript, load_resources, and enable_xhr parameters are always enabled."
            },
            "browser_screen_width": {
              "type": "integer",
              "description": "browser screen width optional field you can set a custom browser screen width to perform audit for a particular device; if you use this field, you don’t need to indicate browser_preset as it will be ignored; minimum value, in pixels: 240 maximum value, in pixels: 9999"
            },
            "browser_screen_height": {
              "type": "integer",
              "description": "browser screen height optional field you can set a custom browser screen height to perform audit for a particular device; if you use this field, you don’t need to indicate browser_preset as it will be ignored; minimum value, in pixels: 240 maximum value, in pixels: 9999"
            },
            "browser_screen_scale_factor": {
              "type": "number",
              "description": "browser screen scale factor optional field you can set a custom browser screen resolution ratio to perform audit for a particular device; if you use this field, you don’t need to indicate browser_preset as it will be ignored; minimum value: 0.5 maximum value: 3"
            },
            "full_page_screenshot": {
              "type": "boolean",
              "description": "take a screenshot of the full page optional field set to false if you want to capture only the part of the page displayed before scrolling default value: true"
            },
            "disable_cookie_popup": {
              "type": "boolean",
              "description": "disable the cookie popup optional field set to true if you want to disable the popup requesting cookie consent from the user; default value: false"
            },
            "switch_pool": {
              "type": "boolean",
              "description": "switch proxy pool optional field if true, additional proxy pools will be used to obtain the requested data; the parameter can be used if a multitude of tasks is set simultaneously, resulting in occasional rate-limit and/or site_unreachable errors"
            },
            "ip_pool_for_scan": {
              "type": "string",
              "description": "proxy pool optional field you can choose a location of the proxy pool that will be used to obtain the requested data; the parameter can be used if page content is inaccessible in one of the locations, resulting in occasional site_unreachable errors possible values: us, de"
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
