# post_tavily_search

Installed API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.

## Contract

```json
{
  "operation_id": "post_tavily_search",
  "successful": true,
  "description": "Search the web and get back ranked results with the page text already extracted, so there is no second call to fetch content. `query` is required. Returns `results[]` with `url`, `title`, `content` (the extracted excerpt), `score` and optionally `raw_content`, alongside `query`, `images`, `response_time` and `request_id`; set `include_answer` to also get a one-paragraph `answer`. Filter with `topic` (general/news/finance), `time_range` or explicit `start_date`/`end_date`, and trade cost against depth with `search_depth`. Measured at roughly 6 seconds for 2 results. This is the default choice for open-web research, and the only search here that returns ranked results and page text in one call. Reach past it when: you already know the URLs — `post_tavily_extract` is cheaper and exact; the query is a description rather than keywords — `post_exa_search` matches on meaning; you want a written answer rather than a list to iterate — `post_perplexity_sonar`; you want peer-reviewed papers — `post_scholar_search_scholar`.",
  "provider": "tavily",
  "method": "POST",
  "path": "/apis/v1/tavily/search",
  "arguments_schema": {
    "type": "object",
    "properties": {
      "query": {
        "type": "string",
        "description": "The search query to execute with Tavily.",
        "example": "Who is Leo Messi?"
      },
      "search_depth": {
        "enum": [
          "advanced",
          "basic",
          "fast",
          "ultra-fast"
        ],
        "type": "string",
        "description": "Controls the latency vs. relevance tradeoff. advanced gives the highest relevance with higher latency and cost; basic is balanced; fast and ultra-fast optimize for lower latency.",
        "default": "basic"
      },
      "chunks_per_source": {
        "maximum": 3,
        "minimum": 1,
        "type": "integer",
        "description": "Maximum number of relevant chunks returned per source.",
        "default": 3
      },
      "max_results": {
        "maximum": 20,
        "minimum": 0,
        "type": "integer",
        "description": "Maximum number of search results to return.",
        "default": 5
      },
      "topic": {
        "enum": [
          "general",
          "news",
          "finance"
        ],
        "type": "string",
        "description": "Category of the search.",
        "default": "general"
      },
      "time_range": {
        "enum": [
          "day",
          "week",
          "month",
          "year",
          "d",
          "w",
          "m",
          "y"
        ],
        "type": "string",
        "description": "Time range to filter results based on publish date."
      },
      "start_date": {
        "type": "string",
        "description": "Return results after the specified start date.",
        "format": "date",
        "example": "2025-02-09"
      },
      "end_date": {
        "type": "string",
        "description": "Return results before the specified end date.",
        "format": "date",
        "example": "2025-12-29"
      },
      "include_answer": {
        "description": "Include an LLM-generated answer. true uses the default answer mode; basic or advanced selects the answer generation mode.",
        "default": false,
        "anyOf": [
          {
            "type": "boolean"
          },
          {
            "enum": [
              "basic",
              "advanced"
            ],
            "type": "string"
          }
        ]
      },
      "include_raw_content": {
        "description": "Include cleaned and parsed content for each search result. true or markdown returns markdown; text returns plain text and may increase latency.",
        "default": false,
        "anyOf": [
          {
            "type": "boolean"
          },
          {
            "enum": [
              "markdown",
              "text"
            ],
            "type": "string"
          }
        ]
      },
      "include_images": {
        "type": "boolean",
        "description": "Perform an image search and include results.",
        "default": false
      },
      "include_image_descriptions": {
        "type": "boolean",
        "description": "Add descriptive text for each image when include_images is true.",
        "default": false
      },
      "safe_search": {
        "type": "boolean",
        "description": "Filter out adult or unsafe content from search results. Enterprise only; not supported when search_depth is fast or ultra-fast.",
        "default": false
      },
      "include_favicon": {
        "type": "boolean",
        "description": "Include the favicon URL for each result.",
        "default": false
      },
      "include_domains": {
        "maxItems": 300,
        "type": "array",
        "items": {
          "type": "string"
        },
        "description": "List of domains to specifically include in the search results."
      },
      "exclude_domains": {
        "maxItems": 150,
        "type": "array",
        "items": {
          "type": "string"
        },
        "description": "List of domains to specifically exclude from the search results."
      },
      "country": {
        "enum": [
          "afghanistan",
          "albania",
          "algeria",
          "andorra",
          "angola",
          "argentina",
          "armenia",
          "australia",
          "austria",
          "azerbaijan",
          "bahamas",
          "bahrain",
          "bangladesh",
          "barbados",
          "belarus",
          "belgium",
          "belize",
          "benin",
          "bhutan",
          "bolivia",
          "bosnia and herzegovina",
          "botswana",
          "brazil",
          "brunei",
          "bulgaria",
          "burkina faso",
          "burundi",
          "cambodia",
          "cameroon",
          "canada",
          "cape verde",
          "central african republic",
          "chad",
          "chile",
          "china",
          "colombia",
          "comoros",
          "congo",
          "costa rica",
          "croatia",
          "cuba",
          "cyprus",
          "czech republic",
          "denmark",
          "djibouti",
          "dominican republic",
          "ecuador",
          "egypt",
          "el salvador",
          "equatorial guinea",
          "eritrea",
          "estonia",
          "ethiopia",
          "fiji",
          "finland",
          "france",
          "gabon",
          "gambia",
          "georgia",
          "germany",
          "ghana",
          "greece",
          "guatemala",
          "guinea",
          "haiti",
          "honduras",
          "hungary",
          "iceland",
          "india",
          "indonesia",
          "iran",
          "iraq",
          "ireland",
          "israel",
          "italy",
          "jamaica",
          "japan",
          "jordan",
          "kazakhstan",
          "kenya",
          "kuwait",
          "kyrgyzstan",
          "latvia",
          "lebanon",
          "lesotho",
          "liberia",
          "libya",
          "liechtenstein",
          "lithuania",
          "luxembourg",
          "madagascar",
          "malawi",
          "malaysia",
          "maldives",
          "mali",
          "malta",
          "mauritania",
          "mauritius",
          "mexico",
          "moldova",
          "monaco",
          "mongolia",
          "montenegro",
          "morocco",
          "mozambique",
          "myanmar",
          "namibia",
          "nepal",
          "netherlands",
          "new zealand",
          "nicaragua",
          "niger",
          "nigeria",
          "north korea",
          "north macedonia",
          "norway",
          "oman",
          "pakistan",
          "panama",
          "papua new guinea",
          "paraguay",
          "peru",
          "philippines",
          "poland",
          "portugal",
          "qatar",
          "romania",
          "russia",
          "rwanda",
          "saudi arabia",
          "senegal",
          "serbia",
          "singapore",
          "slovakia",
          "slovenia",
          "somalia",
          "south africa",
          "south korea",
          "south sudan",
          "spain",
          "sri lanka",
          "sudan",
          "sweden",
          "switzerland",
          "syria",
          "taiwan",
          "tajikistan",
          "tanzania",
          "thailand",
          "togo",
          "trinidad and tobago",
          "tunisia",
          "turkey",
          "turkmenistan",
          "uganda",
          "ukraine",
          "united arab emirates",
          "united kingdom",
          "united states",
          "uruguay",
          "uzbekistan",
          "venezuela",
          "vietnam",
          "yemen",
          "zambia",
          "zimbabwe"
        ],
        "type": "string",
        "description": "Boost search results from a specific country. Available only when topic is general."
      },
      "auto_parameters": {
        "type": "boolean",
        "description": "Automatically configure search parameters based on query content.",
        "default": false
      },
      "include_usage": {
        "type": "boolean",
        "description": "Include credit usage information in the response.",
        "default": false
      }
    },
    "required": [
      "query"
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
