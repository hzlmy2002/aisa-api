## Directory overview

575 operations below, each listed once. Read means read-only according to the original annotations; Write means the operation may change upstream state. A composed operation can make multiple billed API requests. Full parameters and descriptions are in the linked local details; get_details remains a fallback.

| Category | Coverage | Servers |
| --- | --- | --- |
| seo | Search and AI-answer visibility: rankings, keywords, backlinks, site health, app and marketplace listings, local business data, and how a brand shows up in ChatGPT, Claude, Gemini  | `seo-ai-visibility`, `seo-apps`, `seo-backlinks`, `seo-business`, `seo-content`, `seo-domains`, `seo-keywords`, `seo-labs`, `seo-merchant`, `seo-onpage`, `seo-serp`, `seo-serp-other-engines` |
| finance | Market and company data: prices, fundamentals, filings, insider trades, crypto markets, prediction markets, and a scene agent that aligns what X is saying about tickers with how th | `marketpulse`, `crypto-market-data`, `prediction-market-data`, `stock-pulse` |
| social | Public social data: X/Twitter users, posts, search and trends; Instagram, Reddit and Pinterest profiles and content; YouTube search. | `twitter-api`, `instagram`, `reddit`, `pinterest`, `youtube-search` |
| search | Web search, page extraction, crawling and grounded research through Tavily, Firecrawl, Exa, Perplexity, Oxylabs, txyz, and Anthropic/OpenAI grounded search. | `web-search` |
| sales | People and company search, enrichment, sequences and CRM objects through Apollo, creator discovery, and Similarweb market intelligence: any domain's traffic, audience, rankings and | `apollo`, `creator-discovery`, `similarweb` |
| mail | Inboxes, threads, drafts and sending for agents through AgentMail. | `agentmail` |

If this file is truncated by your client, read the relevant server heading or use local file search for a provider or operation name. Do not assume unshown operations are missing.

## seo — AIsa SEO & AI Visibility

### seo-ai-visibility — AIsa AI Visibility (23)

| Operation ID | Access | Purpose |
| --- | --- | --- |
| `get_dataforseo_ai_chat_gpt_llm_responses_models` | Read | List of ChatGPT models for LLM Responses [Details](operations/get_dataforseo_ai_chat_gpt_llm_responses_models.md) |
| `get_dataforseo_ai_claude_llm_responses_models` | Read | List of Claude Models for LLM Responses [Details](operations/get_dataforseo_ai_claude_llm_responses_models.md) |
| `get_dataforseo_ai_gemini_llm_responses_models` | Read | List of Gemini models for LLM Responses [Details](operations/get_dataforseo_ai_gemini_llm_responses_models.md) |
| `get_dataforseo_ai_gemini_llm_scraper_languages` | Read | Gemini LLM Scraper Languages List [Details](operations/get_dataforseo_ai_gemini_llm_scraper_languages.md) |
| `get_dataforseo_ai_gemini_llm_scraper_locations` | Read | Gemini LLM Scraper Locations List [Details](operations/get_dataforseo_ai_gemini_llm_scraper_locations.md) |
| `get_dataforseo_ai_keyword_locales` | Read | List of Locations and Languages for AI Keyword Data API [Details](operations/get_dataforseo_ai_keyword_locales.md) |
| `get_dataforseo_ai_llm_mentions_available_filters` | Read | Filters for AI Optimization LLM Mentions API [Details](operations/get_dataforseo_ai_llm_mentions_available_filters.md) |
| `get_dataforseo_ai_llm_mentions_locales` | Read | List of Locations and Languages for AI Optimization LLM Mentions API [Details](operations/get_dataforseo_ai_llm_mentions_locales.md) |
| `get_dataforseo_ai_perplexity_llm_responses_models` | Read | List of Perplexity models for LLM Responses [Details](operations/get_dataforseo_ai_perplexity_llm_responses_models.md) |
| `post_dataforseo_ai_chat_gpt_llm_responses_live` | Write | Live ChatGPT LLM Responses [Details](operations/post_dataforseo_ai_chat_gpt_llm_responses_live.md) |
| `post_dataforseo_ai_chat_gpt_llm_scraper_live` | Write | Live ChatGPT LLM Scraper [Details](operations/post_dataforseo_ai_chat_gpt_llm_scraper_live.md) |
| `post_dataforseo_ai_chat_gpt_llm_scraper_live_html` | Write | Live ChatGPT LLM Scraper API HTML [Details](operations/post_dataforseo_ai_chat_gpt_llm_scraper_live_html.md) |
| `post_dataforseo_ai_claude_llm_responses_live` | Write | Live Claude LLM Responses [Details](operations/post_dataforseo_ai_claude_llm_responses_live.md) |
| `post_dataforseo_ai_gemini_llm_responses_live` | Write | Live Gemini LLM Responses [Details](operations/post_dataforseo_ai_gemini_llm_responses_live.md) |
| `post_dataforseo_ai_gemini_llm_scraper_live` | Write | Live Gemini LLM Scraper Advanced [Details](operations/post_dataforseo_ai_gemini_llm_scraper_live.md) |
| `post_dataforseo_ai_gemini_llm_scraper_live_html` | Write | Live Gemini LLM Scraper HTML [Details](operations/post_dataforseo_ai_gemini_llm_scraper_live_html.md) |
| `post_dataforseo_ai_keyword_volume_live` | Write | AI Keyword Data Keyword Search Volume [Details](operations/post_dataforseo_ai_keyword_volume_live.md) |
| `post_dataforseo_ai_llm_mentions_aggregated_metrics_live` | Write | Live LLM Mentions Aggregated Metrics [Details](operations/post_dataforseo_ai_llm_mentions_aggregated_metrics_live.md) |
| `post_dataforseo_ai_llm_mentions_cross_metrics_live` | Write | Live LLM Mentions Cross Aggregated Metrics [Details](operations/post_dataforseo_ai_llm_mentions_cross_metrics_live.md) |
| `post_dataforseo_ai_llm_mentions_search_live` | Write | Live LLM Mentions [Details](operations/post_dataforseo_ai_llm_mentions_search_live.md) |
| `post_dataforseo_ai_llm_mentions_top_domains_live` | Write | Live LLM Mentions Top Domains [Details](operations/post_dataforseo_ai_llm_mentions_top_domains_live.md) |
| `post_dataforseo_ai_llm_mentions_top_pages_live` | Write | Live LLM Mentions Top Pages [Details](operations/post_dataforseo_ai_llm_mentions_top_pages_live.md) |
| `post_dataforseo_ai_perplexity_llm_responses_live` | Write | Live Perplexity LLM Responses [Details](operations/post_dataforseo_ai_perplexity_llm_responses_live.md) |

### seo-apps — AIsa App Store Data (29)

| Operation ID | Access | Purpose |
| --- | --- | --- |
| `get_dataforseo_app_apple_app_info_fetch` | Read | Get Apple App Info Results by id [Details](operations/get_dataforseo_app_apple_app_info_fetch.md) |
| `get_dataforseo_app_apple_app_list_fetch` | Read | Get Apple App List Results by id [Details](operations/get_dataforseo_app_apple_app_list_fetch.md) |
| `get_dataforseo_app_apple_app_listings_categories` | Read | List of App Store Listings Categories for App Data API [Details](operations/get_dataforseo_app_apple_app_listings_categories.md) |
| `get_dataforseo_app_apple_app_reviews_fetch` | Read | Get Apple App Reviews Results by id [Details](operations/get_dataforseo_app_apple_app_reviews_fetch.md) |
| `get_dataforseo_app_apple_app_searches_fetch` | Read | Get Apple App Searches Results by id [Details](operations/get_dataforseo_app_apple_app_searches_fetch.md) |
| `get_dataforseo_app_apple_categories` | Read | List of Apple App Categories for App Data API [Details](operations/get_dataforseo_app_apple_categories.md) |
| `get_dataforseo_app_apple_languages` | Read | List of Apple Languages for App Data API [Details](operations/get_dataforseo_app_apple_languages.md) |
| `get_dataforseo_app_apple_locations` | Read | List of Apple Locations for App Data API [Details](operations/get_dataforseo_app_apple_locations.md) |
| `get_dataforseo_app_google_app_info_fetch` | Read | Get Google App Info Results by id [Details](operations/get_dataforseo_app_google_app_info_fetch.md) |
| `get_dataforseo_app_google_app_info_fetch_html` | Read | Get Google App Info HTML Results by id [Details](operations/get_dataforseo_app_google_app_info_fetch_html.md) |
| `get_dataforseo_app_google_app_list_fetch` | Read | Get Google App List Results by id [Details](operations/get_dataforseo_app_google_app_list_fetch.md) |
| `get_dataforseo_app_google_app_list_fetch_html` | Read | Get Google App List HTML Results by id [Details](operations/get_dataforseo_app_google_app_list_fetch_html.md) |
| `get_dataforseo_app_google_app_listings_categories` | Read | List of Google App Listings Categories for App Data API [Details](operations/get_dataforseo_app_google_app_listings_categories.md) |
| `get_dataforseo_app_google_app_reviews_fetch` | Read | Get Google App Reviews Results by id [Details](operations/get_dataforseo_app_google_app_reviews_fetch.md) |
| `get_dataforseo_app_google_app_searches_fetch` | Read | Get Google App Searches Results by id [Details](operations/get_dataforseo_app_google_app_searches_fetch.md) |
| `get_dataforseo_app_google_app_searches_fetch_html` | Read | Get Google App Searches HTML Results by id [Details](operations/get_dataforseo_app_google_app_searches_fetch_html.md) |
| `get_dataforseo_app_google_categories` | Read | List of Google App Categories for App Data API [Details](operations/get_dataforseo_app_google_categories.md) |
| `get_dataforseo_app_google_languages` | Read | List of Google Languages for App Data API [Details](operations/get_dataforseo_app_google_languages.md) |
| `get_dataforseo_app_google_locations` | Read | List of Google Locations for App Data API [Details](operations/get_dataforseo_app_google_locations.md) |
| `post_dataforseo_app_apple_app_info_submit` | Write | Setting Apple App Info Tasks [Details](operations/post_dataforseo_app_apple_app_info_submit.md) |
| `post_dataforseo_app_apple_app_list_submit` | Write | Setting Apple App List Tasks [Details](operations/post_dataforseo_app_apple_app_list_submit.md) |
| `post_dataforseo_app_apple_app_listings_search_live` | Write | Live Apple App Listings Search Results [Details](operations/post_dataforseo_app_apple_app_listings_search_live.md) |
| `post_dataforseo_app_apple_app_reviews_submit` | Write | Setting Apple App Reviews Tasks [Details](operations/post_dataforseo_app_apple_app_reviews_submit.md) |
| `post_dataforseo_app_apple_app_searches_submit` | Write | Setting Apple App Searches Tasks [Details](operations/post_dataforseo_app_apple_app_searches_submit.md) |
| `post_dataforseo_app_google_app_info_submit` | Write | Setting Google App Info Tasks [Details](operations/post_dataforseo_app_google_app_info_submit.md) |
| `post_dataforseo_app_google_app_list_submit` | Write | Setting Google App List Tasks [Details](operations/post_dataforseo_app_google_app_list_submit.md) |
| `post_dataforseo_app_google_app_listings_search_live` | Write | Live Google App Listings Search Results [Details](operations/post_dataforseo_app_google_app_listings_search_live.md) |
| `post_dataforseo_app_google_app_reviews_submit` | Write | Setting Google App Reviews Tasks [Details](operations/post_dataforseo_app_google_app_reviews_submit.md) |
| `post_dataforseo_app_google_app_searches_submit` | Write | Setting Google App Searches Tasks [Details](operations/post_dataforseo_app_google_app_searches_submit.md) |

### seo-backlinks — AIsa Backlinks (27)

| Operation ID | Access | Purpose |
| --- | --- | --- |
| `get_dataforseo_backlinks_index` | Read | Backlinks Index [Details](operations/get_dataforseo_backlinks_index.md) |
| `get_semrush_backlink_anchors` | Read | Backlink Anchors [Details](operations/get_semrush_backlink_anchors.md) |
| `get_semrush_backlink_competitors` | Read | Backlink Competitors [Details](operations/get_semrush_backlink_competitors.md) |
| `get_semrush_backlinks` | Read | Backlinks [Details](operations/get_semrush_backlinks.md) |
| `get_semrush_backlinks_overview` | Read | Backlinks Overview [Details](operations/get_semrush_backlinks_overview.md) |
| `get_semrush_indexed_pages` | Read | Indexed Pages [Details](operations/get_semrush_indexed_pages.md) |
| `get_semrush_referring_domains` | Read | Referring Domains [Details](operations/get_semrush_referring_domains.md) |
| `post_dataforseo_backlinks_anchors_live` | Write | Anchors [Details](operations/post_dataforseo_backlinks_anchors_live.md) |
| `post_dataforseo_backlinks_backlinks_live` | Write | Backlinks [Details](operations/post_dataforseo_backlinks_backlinks_live.md) |
| `post_dataforseo_backlinks_bulk_backlinks_live` | Write | Bulk Backlinks [Details](operations/post_dataforseo_backlinks_bulk_backlinks_live.md) |
| `post_dataforseo_backlinks_bulk_new_lost_backlinks_live` | Write | Bulk New & Lost Backlinks [Details](operations/post_dataforseo_backlinks_bulk_new_lost_backlinks_live.md) |
| `post_dataforseo_backlinks_bulk_new_lost_ref_domains_live` | Write | Bulk New & Lost Referring Domains [Details](operations/post_dataforseo_backlinks_bulk_new_lost_ref_domains_live.md) |
| `post_dataforseo_backlinks_bulk_pages_summary_live` | Write | Bulk Pages Summary [Details](operations/post_dataforseo_backlinks_bulk_pages_summary_live.md) |
| `post_dataforseo_backlinks_bulk_ranks_live` | Write | Bulk Ranks [Details](operations/post_dataforseo_backlinks_bulk_ranks_live.md) |
| `post_dataforseo_backlinks_bulk_referring_domains_live` | Write | Bulk Referring Domains [Details](operations/post_dataforseo_backlinks_bulk_referring_domains_live.md) |
| `post_dataforseo_backlinks_bulk_spam_score_live` | Write | Bulk Spam Score [Details](operations/post_dataforseo_backlinks_bulk_spam_score_live.md) |
| `post_dataforseo_backlinks_competitors_live` | Write | Competitors [Details](operations/post_dataforseo_backlinks_competitors_live.md) |
| `post_dataforseo_backlinks_domain_intersection_live` | Write | Domain Intersection [Details](operations/post_dataforseo_backlinks_domain_intersection_live.md) |
| `post_dataforseo_backlinks_domain_pages_live` | Write | Domain Pages [Details](operations/post_dataforseo_backlinks_domain_pages_live.md) |
| `post_dataforseo_backlinks_domain_pages_summary_live` | Write | Domain Pages Summary [Details](operations/post_dataforseo_backlinks_domain_pages_summary_live.md) |
| `post_dataforseo_backlinks_history_live` | Write | Backlinks History [Details](operations/post_dataforseo_backlinks_history_live.md) |
| `post_dataforseo_backlinks_page_intersection_live` | Write | Page Intersection [Details](operations/post_dataforseo_backlinks_page_intersection_live.md) |
| `post_dataforseo_backlinks_referring_domains_live` | Write | Referring Domains [Details](operations/post_dataforseo_backlinks_referring_domains_live.md) |
| `post_dataforseo_backlinks_referring_networks_live` | Write | Referring Networks [Details](operations/post_dataforseo_backlinks_referring_networks_live.md) |
| `post_dataforseo_backlinks_summary_live` | Write | Backlinks Summary [Details](operations/post_dataforseo_backlinks_summary_live.md) |
| `post_dataforseo_backlinks_timeseries_new_lost_live` | Write | New & Lost Backlinks Timeseries Summary [Details](operations/post_dataforseo_backlinks_timeseries_new_lost_live.md) |
| `post_dataforseo_backlinks_timeseries_summary_live` | Write | Backlinks Timeseries Summary [Details](operations/post_dataforseo_backlinks_timeseries_summary_live.md) |

### seo-business — AIsa Business Listings & Reviews (22)

| Operation ID | Access | Purpose |
| --- | --- | --- |
| `get_dataforseo_business_google_extended_reviews_fetch` | Read | Get Business Data Google Extended Reviews Results by id [Details](operations/get_dataforseo_business_google_extended_reviews_fetch.md) |
| `get_dataforseo_business_google_gmb_updates_fetch` | Read | Get Google My Business Updates Results by id [Details](operations/get_dataforseo_business_google_gmb_updates_fetch.md) |
| `get_dataforseo_business_google_reviews_fetch` | Read | Get Business Data Google Reviews Results by id [Details](operations/get_dataforseo_business_google_reviews_fetch.md) |
| `get_dataforseo_business_tripadvisor_reviews_fetch` | Read | Get Business Data Tripadvisor Reviews Results by id [Details](operations/get_dataforseo_business_tripadvisor_reviews_fetch.md) |
| `get_dataforseo_business_tripadvisor_search_fetch` | Read | Get Business Data Tripadvisor Search Results by id [Details](operations/get_dataforseo_business_tripadvisor_search_fetch.md) |
| `get_dataforseo_business_trustpilot_reviews_fetch` | Read | Get Business Data Trustpilot Reviews Results by id [Details](operations/get_dataforseo_business_trustpilot_reviews_fetch.md) |
| `get_dataforseo_business_trustpilot_search_fetch` | Read | Get Business Data Trustpilot Search Results by id [Details](operations/get_dataforseo_business_trustpilot_search_fetch.md) |
| `post_dataforseo_business_google_extended_reviews_submit` | Write | Setting Business Data Google Extended Reviews Tasks [Details](operations/post_dataforseo_business_google_extended_reviews_submit.md) |
| `post_dataforseo_business_google_gmb_info_live` | Write | Setting Live Google My Business Info Tasks [Details](operations/post_dataforseo_business_google_gmb_info_live.md) |
| `post_dataforseo_business_google_gmb_updates_submit` | Write | Setting Google My Business Updates Tasks [Details](operations/post_dataforseo_business_google_gmb_updates_submit.md) |
| `post_dataforseo_business_google_hotel_info_live` | Write | Live Google Hotel Info Advanced [Details](operations/post_dataforseo_business_google_hotel_info_live.md) |
| `post_dataforseo_business_google_hotel_info_live_html` | Write | Live Google Hotel Info HTML [Details](operations/post_dataforseo_business_google_hotel_info_live_html.md) |
| `post_dataforseo_business_google_hotel_searches_live` | Write | Live Google Hotel Searches Tasks [Details](operations/post_dataforseo_business_google_hotel_searches_live.md) |
| `post_dataforseo_business_google_qa_live` | Write | Setting Live Google My Business Questions and Answers Tasks [Details](operations/post_dataforseo_business_google_qa_live.md) |
| `post_dataforseo_business_google_reviews_submit` | Write | Setting Business Data Google Reviews Tasks [Details](operations/post_dataforseo_business_google_reviews_submit.md) |
| `post_dataforseo_business_listings_search_live` | Write | Live Business Listings Search Tasks [Details](operations/post_dataforseo_business_listings_search_live.md) |
| `post_dataforseo_business_social_media_pinterest_live` | Write | Live Social Media Pinterest Tasks [Details](operations/post_dataforseo_business_social_media_pinterest_live.md) |
| `post_dataforseo_business_social_media_reddit_live` | Write | Live Social Media Reddit Tasks [Details](operations/post_dataforseo_business_social_media_reddit_live.md) |
| `post_dataforseo_business_tripadvisor_reviews_submit` | Write | Setting Business Data Tripadvisor Reviews Tasks [Details](operations/post_dataforseo_business_tripadvisor_reviews_submit.md) |
| `post_dataforseo_business_tripadvisor_search_submit` | Write | Setting Business Data Tripadvisor Search Tasks [Details](operations/post_dataforseo_business_tripadvisor_search_submit.md) |
| `post_dataforseo_business_trustpilot_reviews_submit` | Write | Setting Business Data Trustpilot Reviews Tasks [Details](operations/post_dataforseo_business_trustpilot_reviews_submit.md) |
| `post_dataforseo_business_trustpilot_search_submit` | Write | Setting Business Data Trustpilot Search Tasks [Details](operations/post_dataforseo_business_trustpilot_search_submit.md) |

### seo-content — AIsa Content & Sentiment (10)

| Operation ID | Access | Purpose |
| --- | --- | --- |
| `get_dataforseo_content_available_filters` | Read | Filters for Content Analysis API [Details](operations/get_dataforseo_content_available_filters.md) |
| `get_dataforseo_content_categories` | Read | List of Categories for Content Analysis API [Details](operations/get_dataforseo_content_categories.md) |
| `get_dataforseo_content_languages` | Read | List of Languages for Content Analysis API [Details](operations/get_dataforseo_content_languages.md) |
| `get_dataforseo_content_locations` | Read | List of Locations for Content Analysis API [Details](operations/get_dataforseo_content_locations.md) |
| `post_dataforseo_content_category_trends_live` | Write | Content Analysis – Category Trends API [Details](operations/post_dataforseo_content_category_trends_live.md) |
| `post_dataforseo_content_phrase_trends_live` | Write | Content Analysis – Phrase Trends API [Details](operations/post_dataforseo_content_phrase_trends_live.md) |
| `post_dataforseo_content_rating_distribution_live` | Write | Content Analysis – Rating Distribution API [Details](operations/post_dataforseo_content_rating_distribution_live.md) |
| `post_dataforseo_content_search_live` | Write | Content Analysis – Search API [Details](operations/post_dataforseo_content_search_live.md) |
| `post_dataforseo_content_sentiment_analysis_live` | Write | Content Analysis – Sentiment Analysis API [Details](operations/post_dataforseo_content_sentiment_analysis_live.md) |
| `post_dataforseo_content_summary_live` | Write | Content Analysis – Summary API [Details](operations/post_dataforseo_content_summary_live.md) |

### seo-domains — AIsa Technologies & Whois (12)

| Operation ID | Access | Purpose |
| --- | --- | --- |
| `get_dataforseo_domains_tech_available_filters` | Read | Filters for Domain Analytics Technologies API [Details](operations/get_dataforseo_domains_tech_available_filters.md) |
| `get_dataforseo_domains_tech_languages` | Read | List of Languages for Domain Analytics Technologies API [Details](operations/get_dataforseo_domains_tech_languages.md) |
| `get_dataforseo_domains_tech_list` | Read | List of Technologies for Domain Analytics Technologies API [Details](operations/get_dataforseo_domains_tech_list.md) |
| `get_dataforseo_domains_tech_locations` | Read | List of Locations for Domain Analytics Technologies API [Details](operations/get_dataforseo_domains_tech_locations.md) |
| `get_dataforseo_domains_whois_available_filters` | Read | Filters for Domain Analytics Whois API [Details](operations/get_dataforseo_domains_whois_available_filters.md) |
| `post_dataforseo_domains_tech_aggregation_live` | Write | Aggregation Technologies [Details](operations/post_dataforseo_domains_tech_aggregation_live.md) |
| `post_dataforseo_domains_tech_domains_by_html_terms_live` | Write | Domains by HTML Terms [Details](operations/post_dataforseo_domains_tech_domains_by_html_terms_live.md) |
| `post_dataforseo_domains_tech_domains_by_technology_live` | Write | Domains by Technology [Details](operations/post_dataforseo_domains_tech_domains_by_technology_live.md) |
| `post_dataforseo_domains_tech_for_domain_live` | Write | Domain Technologies [Details](operations/post_dataforseo_domains_tech_for_domain_live.md) |
| `post_dataforseo_domains_tech_summary_live` | Write | Technologies Summary [Details](operations/post_dataforseo_domains_tech_summary_live.md) |
| `post_dataforseo_domains_tech_technology_stats_live` | Write | Technology Stats [Details](operations/post_dataforseo_domains_tech_technology_stats_live.md) |
| `post_dataforseo_domains_whois_overview_live` | Write | Domain Whois Overview [Details](operations/post_dataforseo_domains_whois_overview_live.md) |

### seo-keywords — AIsa Keyword Volume & Ads (33)

| Operation ID | Access | Purpose |
| --- | --- | --- |
| `get_dataforseo_keywords_bing_audience_industries` | Read | List of Industries for Bing Ads Audience Estimation [Details](operations/get_dataforseo_keywords_bing_audience_industries.md) |
| `get_dataforseo_keywords_bing_audience_job_functions` | Read | List of Job Functions for Bing Ads Audience Estimation [Details](operations/get_dataforseo_keywords_bing_audience_job_functions.md) |
| `get_dataforseo_keywords_bing_kw_for_url_languages` | Read | List of Bing Languages for Keyword Suggestions for URL [Details](operations/get_dataforseo_keywords_bing_kw_for_url_languages.md) |
| `get_dataforseo_keywords_bing_kw_performance_locales` | Read | List of Locations and Languages for Keyword Performance endpoints [Details](operations/get_dataforseo_keywords_bing_kw_performance_locales.md) |
| `get_dataforseo_keywords_bing_languages` | Read | List of Bing Languages for Keywords Data [Details](operations/get_dataforseo_keywords_bing_languages.md) |
| `get_dataforseo_keywords_bing_locations` | Read | List of Bing Locations for Keywords Data [Details](operations/get_dataforseo_keywords_bing_locations.md) |
| `get_dataforseo_keywords_bing_volume_history_locales` | Read | List of Locations and Languages for Bing ‘Search Volume History’ Endpoint [Details](operations/get_dataforseo_keywords_bing_volume_history_locales.md) |
| `get_dataforseo_keywords_clickstream_locales` | Read | List of Locations and Languages for DataForSEO Clickstream Data API [Details](operations/get_dataforseo_keywords_clickstream_locales.md) |
| `get_dataforseo_keywords_gads_ad_traffic_fetch` | Read | Get ‘Ads Traffic By Keywords’ Results by id [Details](operations/get_dataforseo_keywords_gads_ad_traffic_fetch.md) |
| `get_dataforseo_keywords_gads_status` | Read | Google Ads Status [Details](operations/get_dataforseo_keywords_gads_status.md) |
| `get_dataforseo_keywords_google_trends_categories` | Read | List of Google Trends Categories [Details](operations/get_dataforseo_keywords_google_trends_categories.md) |
| `get_dataforseo_keywords_trends_locations` | Read | List of DataForSEO Trends Locations [Details](operations/get_dataforseo_keywords_trends_locations.md) |
| `get_semrush_broad_match_keywords` | Read | Broad Match Keywords [Details](operations/get_semrush_broad_match_keywords.md) |
| `get_semrush_keyword_difficulty` | Read | Keyword Difficulty [Details](operations/get_semrush_keyword_difficulty.md) |
| `get_semrush_keyword_overview` | Read | Keyword Overview [Details](operations/get_semrush_keyword_overview.md) |
| `get_semrush_question_keywords` | Read | Question Keywords [Details](operations/get_semrush_question_keywords.md) |
| `post_dataforseo_keywords_bing_audience_live` | Write | Setting Live ‘Bing Ads Audience Estimation’ Tasks [Details](operations/post_dataforseo_keywords_bing_audience_live.md) |
| `post_dataforseo_keywords_bing_kw_for_keywords_live` | Write | Setting Live ‘Keywords For Keywords’ Tasks [Details](operations/post_dataforseo_keywords_bing_kw_for_keywords_live.md) |
| `post_dataforseo_keywords_bing_kw_for_site_live` | Write | Setting Live ‘Keywords For Site’ Tasks [Details](operations/post_dataforseo_keywords_bing_kw_for_site_live.md) |
| `post_dataforseo_keywords_bing_kw_for_url_live` | Write | Setting Live ‘Bing Ads Keyword Suggestions for URL’ Tasks [Details](operations/post_dataforseo_keywords_bing_kw_for_url_live.md) |
| `post_dataforseo_keywords_bing_kw_performance_live` | Write | Setting Live ‘Bing Keyword Performance’ Tasks [Details](operations/post_dataforseo_keywords_bing_kw_performance_live.md) |
| `post_dataforseo_keywords_bing_search_volume_live` | Write | Setting Live ‘Search Volume’ Tasks [Details](operations/post_dataforseo_keywords_bing_search_volume_live.md) |
| `post_dataforseo_keywords_clickstream_bulk_volume_live` | Write | Setting Live ‘Bulk Clickstream Search Volume’ Tasks [Details](operations/post_dataforseo_keywords_clickstream_bulk_volume_live.md) |
| `post_dataforseo_keywords_clickstream_global_volume_live` | Write | Setting Live ‘Clickstream Global Search Volume’ Tasks [Details](operations/post_dataforseo_keywords_clickstream_global_volume_live.md) |
| `post_dataforseo_keywords_clickstream_search_volume_live` | Write | Setting Live ‘DataForSEO Search Volume’ Tasks [Details](operations/post_dataforseo_keywords_clickstream_search_volume_live.md) |
| `post_dataforseo_keywords_gads_ad_traffic_submit` | Write | Setting ‘Ad Traffic By Keywords’ Tasks [Details](operations/post_dataforseo_keywords_gads_ad_traffic_submit.md) |
| `post_dataforseo_keywords_gads_kw_for_keywords_live` | Write | Setting Live ‘Keywords For Keywords’ Tasks [Details](operations/post_dataforseo_keywords_gads_kw_for_keywords_live.md) |
| `post_dataforseo_keywords_gads_kw_for_site_live` | Write | Setting Live ‘Keywords For Site’ Tasks [Details](operations/post_dataforseo_keywords_gads_kw_for_site_live.md) |
| `post_dataforseo_keywords_gads_search_volume_live` | Write | Setting Live ‘Google Ads Search Volume’ Tasks [Details](operations/post_dataforseo_keywords_gads_search_volume_live.md) |
| `post_dataforseo_keywords_trends_demography_live` | Write | Setting Live ‘DataForSEO Trends Demography’ Tasks [Details](operations/post_dataforseo_keywords_trends_demography_live.md) |
| `post_dataforseo_keywords_trends_explore_live` | Write | Setting Live ‘DataForSEO Trends Explore’ Tasks [Details](operations/post_dataforseo_keywords_trends_explore_live.md) |
| `post_dataforseo_keywords_trends_merged_data_live` | Write | Setting Live ‘DataForSEO Trends Merged Data’ Tasks [Details](operations/post_dataforseo_keywords_trends_merged_data_live.md) |
| `post_dataforseo_keywords_trends_subregion_interests_live` | Write | Setting Live ‘DataForSEO Trends Subregion Interests’ Tasks [Details](operations/post_dataforseo_keywords_trends_subregion_interests_live.md) |

### seo-labs — AIsa Domain & Keyword Research (46)

| Operation ID | Access | Purpose |
| --- | --- | --- |
| `get_ahrefs_domain_rating` | Read | Domain Rating [Details](operations/get_ahrefs_domain_rating.md) |
| `get_ahrefs_site_metrics` | Read | Site Metrics [Details](operations/get_ahrefs_site_metrics.md) |
| `get_dataforseo_labs_available_filters` | Read | Filters for DataForSEO Labs API [Details](operations/get_dataforseo_labs_available_filters.md) |
| `get_dataforseo_labs_google_available_history` | Read | DataForSEO Labs Google Available History [Details](operations/get_dataforseo_labs_google_available_history.md) |
| `get_dataforseo_labs_google_categories_for_kw_languages` | Read | List of Languages for Google Categories for Keywords API [Details](operations/get_dataforseo_labs_google_categories_for_kw_languages.md) |
| `get_dataforseo_labs_status` | Read | DataForSEO Labs Status [Details](operations/get_dataforseo_labs_status.md) |
| `get_semrush_domain_organic_keywords` | Read | Domain Organic Keywords [Details](operations/get_semrush_domain_organic_keywords.md) |
| `get_semrush_domain_overview` | Read | Domain Overview [Details](operations/get_semrush_domain_overview.md) |
| `get_semrush_domain_paid_keywords` | Read | Domain Paid Keywords [Details](operations/get_semrush_domain_paid_keywords.md) |
| `get_semrush_domain_rank_history` | Read | Domain Rank History [Details](operations/get_semrush_domain_rank_history.md) |
| `get_semrush_domain_vs_domain` | Read | Domain vs Domain [Details](operations/get_semrush_domain_vs_domain.md) |
| `get_semrush_organic_competitors` | Read | Organic Competitors [Details](operations/get_semrush_organic_competitors.md) |
| `get_semrush_url_organic_keywords` | Read | URL Organic Keywords [Details](operations/get_semrush_url_organic_keywords.md) |
| `post_dataforseo_labs_amazon_bulk_volume_live` | Write | Amazon Bulk Search Volume [Details](operations/post_dataforseo_labs_amazon_bulk_volume_live.md) |
| `post_dataforseo_labs_amazon_product_competitors_live` | Write | Product Competitors [Details](operations/post_dataforseo_labs_amazon_product_competitors_live.md) |
| `post_dataforseo_labs_amazon_product_kw_overlap_live` | Write | Keyword Intersections [Details](operations/post_dataforseo_labs_amazon_product_kw_overlap_live.md) |
| `post_dataforseo_labs_amazon_product_rank_overview_live` | Write | Product Rank Overview [Details](operations/post_dataforseo_labs_amazon_product_rank_overview_live.md) |
| `post_dataforseo_labs_amazon_ranked_keywords_live` | Write | Ranked Keywords [Details](operations/post_dataforseo_labs_amazon_ranked_keywords_live.md) |
| `post_dataforseo_labs_amazon_related_keywords_live` | Write | Related Keywords [Details](operations/post_dataforseo_labs_amazon_related_keywords_live.md) |
| `post_dataforseo_labs_apple_app_competitors_live` | Write | App Store App Competitors Live [Details](operations/post_dataforseo_labs_apple_app_competitors_live.md) |
| `post_dataforseo_labs_apple_app_intersection_live` | Write | App Store App Intersection Live [Details](operations/post_dataforseo_labs_apple_app_intersection_live.md) |
| `post_dataforseo_labs_apple_bulk_app_metrics_live` | Write | App Store Bulk App Metrics Live [Details](operations/post_dataforseo_labs_apple_bulk_app_metrics_live.md) |
| `post_dataforseo_labs_apple_keywords_for_app_live` | Write | App Store Keywords For App Live [Details](operations/post_dataforseo_labs_apple_keywords_for_app_live.md) |
| `post_dataforseo_labs_google_app_competitors_live` | Write | Google Play App Competitors Live [Details](operations/post_dataforseo_labs_google_app_competitors_live.md) |
| `post_dataforseo_labs_google_app_intersection_live` | Write | Google Play App Intersection Live [Details](operations/post_dataforseo_labs_google_app_intersection_live.md) |
| `post_dataforseo_labs_google_bulk_app_metrics_live` | Write | Google Play Bulk App Metrics Live [Details](operations/post_dataforseo_labs_google_bulk_app_metrics_live.md) |
| `post_dataforseo_labs_google_bulk_keyword_difficulty_live` | Write | Bulk Keyword Difficulty [Details](operations/post_dataforseo_labs_google_bulk_keyword_difficulty_live.md) |
| `post_dataforseo_labs_google_bulk_traffic_estimation_live` | Write | Bulk Traffic Estimation [Details](operations/post_dataforseo_labs_google_bulk_traffic_estimation_live.md) |
| `post_dataforseo_labs_google_categories_for_domain_live` | Write | Categories For Domain [Details](operations/post_dataforseo_labs_google_categories_for_domain_live.md) |
| `post_dataforseo_labs_google_categories_for_kw_live` | Write | Categories for Keywords [Details](operations/post_dataforseo_labs_google_categories_for_kw_live.md) |
| `post_dataforseo_labs_google_domain_rank_overview_live` | Write | Domain Rank Overview [Details](operations/post_dataforseo_labs_google_domain_rank_overview_live.md) |
| `post_dataforseo_labs_google_historical_bulk_traffic_live` | Write | Historical Bulk Traffic Estimation [Details](operations/post_dataforseo_labs_google_historical_bulk_traffic_live.md) |
| `post_dataforseo_labs_google_historical_keyword_data_live` | Write | Historical Keyword Data [Details](operations/post_dataforseo_labs_google_historical_keyword_data_live.md) |
| `post_dataforseo_labs_google_historical_rank_live` | Write | Historical Rank Overview [Details](operations/post_dataforseo_labs_google_historical_rank_live.md) |
| `post_dataforseo_labs_google_keyword_ideas_live` | Write | Keyword Ideas [Details](operations/post_dataforseo_labs_google_keyword_ideas_live.md) |
| `post_dataforseo_labs_google_keyword_overview_live` | Write | Keyword Overview [Details](operations/post_dataforseo_labs_google_keyword_overview_live.md) |
| `post_dataforseo_labs_google_keyword_suggestions_live` | Write | Keyword Suggestions [Details](operations/post_dataforseo_labs_google_keyword_suggestions_live.md) |
| `post_dataforseo_labs_google_keywords_for_app_live` | Write | Google Play Keywords For App Live [Details](operations/post_dataforseo_labs_google_keywords_for_app_live.md) |
| `post_dataforseo_labs_google_keywords_for_categories_live` | Write | Keywords For Categories [Details](operations/post_dataforseo_labs_google_keywords_for_categories_live.md) |
| `post_dataforseo_labs_google_kw_for_site_live` | Write | Keywords For Site [Details](operations/post_dataforseo_labs_google_kw_for_site_live.md) |
| `post_dataforseo_labs_google_related_keywords_live` | Write | Related Keywords [Details](operations/post_dataforseo_labs_google_related_keywords_live.md) |
| `post_dataforseo_labs_google_relevant_pages_live` | Write | Relevant Pages [Details](operations/post_dataforseo_labs_google_relevant_pages_live.md) |
| `post_dataforseo_labs_google_search_intent_live` | Write | Search Intent [Details](operations/post_dataforseo_labs_google_search_intent_live.md) |
| `post_dataforseo_labs_google_serp_competitors_live` | Write | SERP Competitors [Details](operations/post_dataforseo_labs_google_serp_competitors_live.md) |
| `post_dataforseo_labs_google_subdomains_live` | Write | Subdomains [Details](operations/post_dataforseo_labs_google_subdomains_live.md) |
| `post_dataforseo_labs_google_top_searches_live` | Write | Top Searches [Details](operations/post_dataforseo_labs_google_top_searches_live.md) |

### seo-merchant — AIsa Shopping & Marketplace (22)

| Operation ID | Access | Purpose |
| --- | --- | --- |
| `get_dataforseo_merchant_amazon_asin_fetch` | Read | Get Amazon ASIN Results by id [Details](operations/get_dataforseo_merchant_amazon_asin_fetch.md) |
| `get_dataforseo_merchant_amazon_asin_fetch_html` | Read | Get Amazon ASIN HTML Results by id [Details](operations/get_dataforseo_merchant_amazon_asin_fetch_html.md) |
| `get_dataforseo_merchant_amazon_languages` | Read | List of Amazon Languages for Merchant API [Details](operations/get_dataforseo_merchant_amazon_languages.md) |
| `get_dataforseo_merchant_amazon_locations` | Read | List of Amazon Locations for Merchant API [Details](operations/get_dataforseo_merchant_amazon_locations.md) |
| `get_dataforseo_merchant_amazon_products_fetch` | Read | Get Amazon Products Results by id [Details](operations/get_dataforseo_merchant_amazon_products_fetch.md) |
| `get_dataforseo_merchant_amazon_products_fetch_html` | Read | Get Amazon Products HTML Results by id [Details](operations/get_dataforseo_merchant_amazon_products_fetch_html.md) |
| `get_dataforseo_merchant_amazon_sellers_fetch` | Read | Get Amazon Sellers Results by id [Details](operations/get_dataforseo_merchant_amazon_sellers_fetch.md) |
| `get_dataforseo_merchant_amazon_sellers_fetch_html` | Read | Get Amazon Sellers HTML Results by id [Details](operations/get_dataforseo_merchant_amazon_sellers_fetch_html.md) |
| `get_dataforseo_merchant_google_languages` | Read | List of Google Shopping Languages for Merchant API [Details](operations/get_dataforseo_merchant_google_languages.md) |
| `get_dataforseo_merchant_google_locations` | Read | List of Google Shopping Locations for Merchant API [Details](operations/get_dataforseo_merchant_google_locations.md) |
| `get_dataforseo_merchant_google_product_info_fetch` | Read | Get Google Shopping Product Info Results by id [Details](operations/get_dataforseo_merchant_google_product_info_fetch.md) |
| `get_dataforseo_merchant_google_products_fetch` | Read | Get Google Shopping Products Results by id [Details](operations/get_dataforseo_merchant_google_products_fetch.md) |
| `get_dataforseo_merchant_google_products_fetch_html` | Read | Get Google Shopping Products HTML Results by id [Details](operations/get_dataforseo_merchant_google_products_fetch_html.md) |
| `get_dataforseo_merchant_google_reviews_fetch` | Read | Get Google Shopping Reviews Results by id [Details](operations/get_dataforseo_merchant_google_reviews_fetch.md) |
| `get_dataforseo_merchant_google_sellers_fetch` | Read | Get Google Shopping Sellers Results by id [Details](operations/get_dataforseo_merchant_google_sellers_fetch.md) |
| `post_dataforseo_merchant_amazon_asin_submit` | Write | Setting Amazon ASIN Tasks [Details](operations/post_dataforseo_merchant_amazon_asin_submit.md) |
| `post_dataforseo_merchant_amazon_products_submit` | Write | Setting Amazon Products Tasks [Details](operations/post_dataforseo_merchant_amazon_products_submit.md) |
| `post_dataforseo_merchant_amazon_sellers_submit` | Write | Setting Amazon Sellers Tasks [Details](operations/post_dataforseo_merchant_amazon_sellers_submit.md) |
| `post_dataforseo_merchant_google_product_info_submit` | Write | Setting Google Shopping Product Info Tasks [Details](operations/post_dataforseo_merchant_google_product_info_submit.md) |
| `post_dataforseo_merchant_google_products_submit` | Write | Setting Google Shopping Products Tasks [Details](operations/post_dataforseo_merchant_google_products_submit.md) |
| `post_dataforseo_merchant_google_reviews_submit` | Write | Setting Google Shopping Reviews Tasks [Details](operations/post_dataforseo_merchant_google_reviews_submit.md) |
| `post_dataforseo_merchant_google_sellers_submit` | Write | Setting Google Shopping Sellers Tasks [Details](operations/post_dataforseo_merchant_google_sellers_submit.md) |

### seo-onpage — AIsa On-Page Audit (20)

| Operation ID | Access | Purpose |
| --- | --- | --- |
| `get_dataforseo_on_page_available_filters` | Read | Filters and customizable thresholds at DataForSEO OnPage API [Details](operations/get_dataforseo_on_page_available_filters.md) |
| `get_dataforseo_on_page_lighthouse_audits` | Read | Audits in OnPage Lighthouse API [Details](operations/get_dataforseo_on_page_lighthouse_audits.md) |
| `get_dataforseo_on_page_lighthouse_languages` | Read | List of Languages for OnPage Lighthouse API [Details](operations/get_dataforseo_on_page_lighthouse_languages.md) |
| `get_dataforseo_on_page_lighthouse_versions` | Read | Lighthouse versions supported in OnPage API [Details](operations/get_dataforseo_on_page_lighthouse_versions.md) |
| `get_dataforseo_on_page_summary` | Read | OnPage API Summary [Details](operations/get_dataforseo_on_page_summary.md) |
| `post_dataforseo_on_page_content_parsing` | Write | OnPage API Content Parsing [Details](operations/post_dataforseo_on_page_content_parsing.md) |
| `post_dataforseo_on_page_duplicate_content` | Write | OnPage API Duplicate Content [Details](operations/post_dataforseo_on_page_duplicate_content.md) |
| `post_dataforseo_on_page_duplicate_tags` | Write | OnPage API Duplicate Tags [Details](operations/post_dataforseo_on_page_duplicate_tags.md) |
| `post_dataforseo_on_page_force_stop` | Write | OnPage API Force Stop [Details](operations/post_dataforseo_on_page_force_stop.md) |
| `post_dataforseo_on_page_keyword_density` | Write | Keyword Density [Details](operations/post_dataforseo_on_page_keyword_density.md) |
| `post_dataforseo_on_page_lighthouse_live_json` | Write | Live OnPage Lighthouse JSON [Details](operations/post_dataforseo_on_page_lighthouse_live_json.md) |
| `post_dataforseo_on_page_links` | Write | Links [Details](operations/post_dataforseo_on_page_links.md) |
| `post_dataforseo_on_page_microdata` | Write | OnPage API Microdata [Details](operations/post_dataforseo_on_page_microdata.md) |
| `post_dataforseo_on_page_non_indexable` | Write | OnPage API Non-indexable Pages [Details](operations/post_dataforseo_on_page_non_indexable.md) |
| `post_dataforseo_on_page_page_screenshot` | Write | OnPage API Page Screenshot [Details](operations/post_dataforseo_on_page_page_screenshot.md) |
| `post_dataforseo_on_page_raw_html` | Write | OnPage API Raw HTML [Details](operations/post_dataforseo_on_page_raw_html.md) |
| `post_dataforseo_on_page_resources` | Write | OnPage API Resources [Details](operations/post_dataforseo_on_page_resources.md) |
| `post_dataforseo_on_page_submit` | Write | Setting OnPage Tasks [Details](operations/post_dataforseo_on_page_submit.md) |
| `post_dataforseo_on_page_uncrawlable_resources` | Write | Uncrawlable Resources [Details](operations/post_dataforseo_on_page_uncrawlable_resources.md) |
| `post_dataforseo_on_page_waterfall` | Write | OnPage API Waterfall [Details](operations/post_dataforseo_on_page_waterfall.md) |

### seo-serp — AIsa SERP - Google (38)

| Operation ID | Access | Purpose |
| --- | --- | --- |
| `get_dataforseo_serp_gads_advertisers_locations` | Read | List of Google Ads Advertisers Locations for SERP API [Details](operations/get_dataforseo_serp_gads_advertisers_locations.md) |
| `get_dataforseo_serp_gads_search_locations` | Read | List of Google Ads Search Locations for SERP API [Details](operations/get_dataforseo_serp_gads_search_locations.md) |
| `get_dataforseo_serp_google_ai_mode_languages` | Read | List of Google AI Mode Languages for SERP [Details](operations/get_dataforseo_serp_google_ai_mode_languages.md) |
| `get_dataforseo_serp_google_events_locations` | Read | List of Google Events Locations for SERP API [Details](operations/get_dataforseo_serp_google_events_locations.md) |
| `get_dataforseo_serp_google_jobs_fetch` | Read | Get Google Jobs Advanced Results by id [Details](operations/get_dataforseo_serp_google_jobs_fetch.md) |
| `get_dataforseo_serp_google_jobs_fetch_html` | Read | Get Google Jobs HTML Results by id [Details](operations/get_dataforseo_serp_google_jobs_fetch_html.md) |
| `get_dataforseo_serp_google_jobs_locations` | Read | List of Google Jobs Locations for SERP API [Details](operations/get_dataforseo_serp_google_jobs_locations.md) |
| `get_dataforseo_serp_google_search_by_image_fetch` | Read | Get Google Search By Image SERP Advanced Results by id [Details](operations/get_dataforseo_serp_google_search_by_image_fetch.md) |
| `get_dataforseo_serp_google_search_by_image_fetch_html` | Read | Get Google Search By Image HTML Results by id [Details](operations/get_dataforseo_serp_google_search_by_image_fetch_html.md) |
| `get_semrush_organic_results` | Read | Organic Results [Details](operations/get_semrush_organic_results.md) |
| `get_semrush_paid_results` | Read | Paid Results [Details](operations/get_semrush_paid_results.md) |
| `post_dataforseo_serp_gads_advertisers_live` | Write | Live Google Ads Advertisers Advanced [Details](operations/post_dataforseo_serp_gads_advertisers_live.md) |
| `post_dataforseo_serp_gads_search_live` | Write | Live Google Ads Search Advanced [Details](operations/post_dataforseo_serp_gads_search_live.md) |
| `post_dataforseo_serp_google_ai_mode_live` | Write | Live Google AI Mode SERP [Details](operations/post_dataforseo_serp_google_ai_mode_live.md) |
| `post_dataforseo_serp_google_ai_mode_live_html` | Write | Live Google Ai Mode SERP HTML [Details](operations/post_dataforseo_serp_google_ai_mode_live_html.md) |
| `post_dataforseo_serp_google_autocomplete_live` | Write | Live Google Autocomplete Advanced [Details](operations/post_dataforseo_serp_google_autocomplete_live.md) |
| `post_dataforseo_serp_google_dataset_info_live` | Write | Live Google Dataset Info Advanced [Details](operations/post_dataforseo_serp_google_dataset_info_live.md) |
| `post_dataforseo_serp_google_dataset_search_live` | Write | Live Google Dataset Search Advanced [Details](operations/post_dataforseo_serp_google_dataset_search_live.md) |
| `post_dataforseo_serp_google_events_live` | Write | Live Google Events SERP Advanced [Details](operations/post_dataforseo_serp_google_events_live.md) |
| `post_dataforseo_serp_google_finance_explore_live` | Write | Live Google Finance Explore Advanced [Details](operations/post_dataforseo_serp_google_finance_explore_live.md) |
| `post_dataforseo_serp_google_finance_explore_live_html` | Write | Live Google Finance Explore SERP HTML [Details](operations/post_dataforseo_serp_google_finance_explore_live_html.md) |
| `post_dataforseo_serp_google_finance_markets_live` | Write | Live Google Finance Markets Advanced [Details](operations/post_dataforseo_serp_google_finance_markets_live.md) |
| `post_dataforseo_serp_google_finance_markets_live_html` | Write | Live Google Finance Markets SERP HTML [Details](operations/post_dataforseo_serp_google_finance_markets_live_html.md) |
| `post_dataforseo_serp_google_finance_quote_live` | Write | Live Google Finance Quote Advanced [Details](operations/post_dataforseo_serp_google_finance_quote_live.md) |
| `post_dataforseo_serp_google_finance_quote_live_html` | Write | Live Google Finance Quote SERP HTML [Details](operations/post_dataforseo_serp_google_finance_quote_live_html.md) |
| `post_dataforseo_serp_google_finance_ticker_search_live` | Write | Live Google Finance Ticker Search Advanced [Details](operations/post_dataforseo_serp_google_finance_ticker_search_live.md) |
| `post_dataforseo_serp_google_images_live` | Write | Live Google Images SERP [Details](operations/post_dataforseo_serp_google_images_live.md) |
| `post_dataforseo_serp_google_images_live_html` | Write | Live Google Images SERP HTML [Details](operations/post_dataforseo_serp_google_images_live_html.md) |
| `post_dataforseo_serp_google_jobs_submit` | Write | Setting Google Jobs Tasks [Details](operations/post_dataforseo_serp_google_jobs_submit.md) |
| `post_dataforseo_serp_google_local_finder_live` | Write | Live Google Local Finder SERP [Details](operations/post_dataforseo_serp_google_local_finder_live.md) |
| `post_dataforseo_serp_google_local_finder_live_html` | Write | Live Google Local Finder SERP HTML [Details](operations/post_dataforseo_serp_google_local_finder_live_html.md) |
| `post_dataforseo_serp_google_maps_live` | Write | Live Google Maps SERP [Details](operations/post_dataforseo_serp_google_maps_live.md) |
| `post_dataforseo_serp_google_news_live` | Write | Live Google News SERP [Details](operations/post_dataforseo_serp_google_news_live.md) |
| `post_dataforseo_serp_google_news_live_html` | Write | Live Google News SERP HTML [Details](operations/post_dataforseo_serp_google_news_live_html.md) |
| `post_dataforseo_serp_google_organic_live` | Write | Live Google Organic SERP Advanced [Details](operations/post_dataforseo_serp_google_organic_live.md) |
| `post_dataforseo_serp_google_organic_live_html` | Write | Live Google Organic SERP HTML [Details](operations/post_dataforseo_serp_google_organic_live_html.md) |
| `post_dataforseo_serp_google_organic_live_regular` | Write | Live Google Organic SERP Regular [Details](operations/post_dataforseo_serp_google_organic_live_regular.md) |
| `post_dataforseo_serp_google_search_by_image_submit` | Write | Setting Google Search By Image SERP Tasks [Details](operations/post_dataforseo_serp_google_search_by_image_submit.md) |

### seo-serp-other-engines — AIsa SERP - Other Engines (34)

| Operation ID | Access | Purpose |
| --- | --- | --- |
| `get_dataforseo_serp_baidu_languages` | Read | List of Baidu Languages for SERP [Details](operations/get_dataforseo_serp_baidu_languages.md) |
| `get_dataforseo_serp_baidu_locations` | Read | List of Baidu Locations for SERP [Details](operations/get_dataforseo_serp_baidu_locations.md) |
| `get_dataforseo_serp_baidu_organic_fetch` | Read | Get Baidu Organic SERP Advanced Results by id [Details](operations/get_dataforseo_serp_baidu_organic_fetch.md) |
| `get_dataforseo_serp_baidu_organic_fetch_html` | Read | Get Baidu Organic HTML Results by id [Details](operations/get_dataforseo_serp_baidu_organic_fetch_html.md) |
| `get_dataforseo_serp_baidu_organic_fetch_regular` | Read | Get Baidu Organic SERP Results by id（regular） [Details](operations/get_dataforseo_serp_baidu_organic_fetch_regular.md) |
| `get_dataforseo_serp_bing_languages` | Read | List of Bing Languages for SERP [Details](operations/get_dataforseo_serp_bing_languages.md) |
| `get_dataforseo_serp_bing_locations` | Read | List of Bing Locations for SERP [Details](operations/get_dataforseo_serp_bing_locations.md) |
| `get_dataforseo_serp_naver_organic_fetch` | Read | Get Naver Organic SERP Advanced Results by id [Details](operations/get_dataforseo_serp_naver_organic_fetch.md) |
| `get_dataforseo_serp_naver_organic_fetch_html` | Read | Get Naver Organic HTML Results by id [Details](operations/get_dataforseo_serp_naver_organic_fetch_html.md) |
| `get_dataforseo_serp_naver_organic_fetch_regular` | Read | Get Naver Organic SERP Results by id（regular） [Details](operations/get_dataforseo_serp_naver_organic_fetch_regular.md) |
| `get_dataforseo_serp_seznam_languages` | Read | List of Seznam Languages for SERP [Details](operations/get_dataforseo_serp_seznam_languages.md) |
| `get_dataforseo_serp_seznam_locations` | Read | List of Seznam Locations for SERP [Details](operations/get_dataforseo_serp_seznam_locations.md) |
| `get_dataforseo_serp_seznam_organic_fetch` | Read | Get Seznam Organic SERP Advanced Results by id [Details](operations/get_dataforseo_serp_seznam_organic_fetch.md) |
| `get_dataforseo_serp_seznam_organic_fetch_html` | Read | Get Seznam Organic HTML Results by id [Details](operations/get_dataforseo_serp_seznam_organic_fetch_html.md) |
| `get_dataforseo_serp_seznam_organic_fetch_regular` | Read | Get Seznam Organic SERP Results by id（regular） [Details](operations/get_dataforseo_serp_seznam_organic_fetch_regular.md) |
| `get_dataforseo_serp_yahoo_languages` | Read | List of Yahoo Languages for SERP [Details](operations/get_dataforseo_serp_yahoo_languages.md) |
| `get_dataforseo_serp_yahoo_locations` | Read | List of Yahoo Locations for SERP [Details](operations/get_dataforseo_serp_yahoo_locations.md) |
| `get_dataforseo_serp_youtube_languages` | Read | List of Youtube Languages for SERP [Details](operations/get_dataforseo_serp_youtube_languages.md) |
| `get_dataforseo_serp_youtube_locations` | Read | List of Youtube Locations for SERP [Details](operations/get_dataforseo_serp_youtube_locations.md) |
| `post_dataforseo_serp_ai_summary` | Write | SERP API AI Summary [Details](operations/post_dataforseo_serp_ai_summary.md) |
| `post_dataforseo_serp_baidu_organic_submit` | Write | Setting Baidu Organic SERP Tasks [Details](operations/post_dataforseo_serp_baidu_organic_submit.md) |
| `post_dataforseo_serp_bing_organic_live` | Write | Live Bing Organic SERP Advanced [Details](operations/post_dataforseo_serp_bing_organic_live.md) |
| `post_dataforseo_serp_bing_organic_live_html` | Write | Live Bing Organic SERP HTML [Details](operations/post_dataforseo_serp_bing_organic_live_html.md) |
| `post_dataforseo_serp_bing_organic_live_regular` | Write | Live Bing Organic SERP Regular [Details](operations/post_dataforseo_serp_bing_organic_live_regular.md) |
| `post_dataforseo_serp_naver_organic_submit` | Write | Setting Naver Organic SERP Tasks [Details](operations/post_dataforseo_serp_naver_organic_submit.md) |
| `post_dataforseo_serp_screenshot` | Write | SERP API Page Screenshot [Details](operations/post_dataforseo_serp_screenshot.md) |
| `post_dataforseo_serp_seznam_organic_submit` | Write | Setting Seznam Organic SERP Tasks [Details](operations/post_dataforseo_serp_seznam_organic_submit.md) |
| `post_dataforseo_serp_yahoo_organic_live` | Write | Live Yahoo Organic SERP Advanced [Details](operations/post_dataforseo_serp_yahoo_organic_live.md) |
| `post_dataforseo_serp_yahoo_organic_live_html` | Write | Live Yahoo Organic SERP HTML [Details](operations/post_dataforseo_serp_yahoo_organic_live_html.md) |
| `post_dataforseo_serp_yahoo_organic_live_regular` | Write | Live Yahoo Organic SERP Regular [Details](operations/post_dataforseo_serp_yahoo_organic_live_regular.md) |
| `post_dataforseo_serp_youtube_organic_live` | Write | Live YouTube Organic Advanced [Details](operations/post_dataforseo_serp_youtube_organic_live.md) |
| `post_dataforseo_serp_youtube_video_comments_live` | Write | Live YouTube Comments Advanced [Details](operations/post_dataforseo_serp_youtube_video_comments_live.md) |
| `post_dataforseo_serp_youtube_video_info_live` | Write | Live YouTube Video Info Advanced [Details](operations/post_dataforseo_serp_youtube_video_info_live.md) |
| `post_dataforseo_serp_youtube_video_subtitles_live` | Write | Live YouTube Subtitles Advanced [Details](operations/post_dataforseo_serp_youtube_video_subtitles_live.md) |

## finance — AIsa Finance

### marketpulse — AIsa MarketPulse (21)

| Operation ID | Access | Purpose |
| --- | --- | --- |
| `edinet_filings_digest` | Read · composed | EDINET filings digest: one day's disclosures, filterable [Details](operations/edinet_filings_digest.md) |
| `get_edinet_documents` | Read | List EDINET documents [Details](operations/get_edinet_documents.md) |
| `get_financial_analyst_estimates` | Read | Analyst Estimates [Details](operations/get_financial_analyst_estimates.md) |
| `get_financial_company_facts` | Read | Get company facts [Details](operations/get_financial_company_facts.md) |
| `get_financial_earnings` | Read | Get earnings snapshot [Details](operations/get_financial_earnings.md) |
| `get_financial_filings` | Read | Get SEC filings [Details](operations/get_financial_filings.md) |
| `get_financial_filings_items` | Read | Get SEC filing items [Details](operations/get_financial_filings_items.md) |
| `get_financial_financial_metrics` | Read | Get financial metrics [Details](operations/get_financial_financial_metrics.md) |
| `get_financial_financial_metrics_snapshot` | Read | Financial Metrics Snapshot (Real-Time) [Details](operations/get_financial_financial_metrics_snapshot.md) |
| `get_financial_financials` | Read | Get all financial statements [Details](operations/get_financial_financials.md) |
| `get_financial_financials_balance_sheets` | Read | Get balance sheets [Details](operations/get_financial_financials_balance_sheets.md) |
| `get_financial_financials_cash_flow_statements` | Read | Get cash flow statements [Details](operations/get_financial_financials_cash_flow_statements.md) |
| `get_financial_financials_income_statements` | Read | Get income statements [Details](operations/get_financial_financials_income_statements.md) |
| `get_financial_insider_trades` | Read | Get insider trades [Details](operations/get_financial_insider_trades.md) |
| `get_financial_macro_interest_rates` | Read | Interest Rates (Historical) [Details](operations/get_financial_macro_interest_rates.md) |
| `get_financial_macro_interest_rates_snapshot` | Read | Interest Rates (Real-Time) [Details](operations/get_financial_macro_interest_rates_snapshot.md) |
| `get_financial_news` | Read | Get news articles Also exposed by: stock-pulse. [Details](operations/get_financial_news.md) |
| `get_financial_prices` | Read | Get historical stock price data [Details](operations/get_financial_prices.md) |
| `get_financial_prices_snapshot` | Read | Price Snapshot (Real-Time) Also exposed by: stock-pulse. [Details](operations/get_financial_prices_snapshot.md) |
| `post_financial_financials_search_line_items` | Write | Search specific financial metrics [Details](operations/post_financial_financials_search_line_items.md) |
| `post_financial_financials_search_screener` | Write | Search financial statements [Details](operations/post_financial_financials_search_screener.md) |

### crypto-market-data — AIsa Crypto Market Data (21)

| Operation ID | Access | Purpose |
| --- | --- | --- |
| `get_coingecko_coins_categories` | Read | Categories with Market Data [Details](operations/get_coingecko_coins_categories.md) |
| `get_coingecko_coins_categories_list` | Read | Categories List [Details](operations/get_coingecko_coins_categories_list.md) |
| `get_coingecko_coins_id` | Read | Coin Data by ID [Details](operations/get_coingecko_coins_id.md) |
| `get_coingecko_coins_id_history` | Read | Coin Historical Data [Details](operations/get_coingecko_coins_id_history.md) |
| `get_coingecko_coins_id_market_chart` | Read | Coin Historical Chart [Details](operations/get_coingecko_coins_id_market_chart.md) |
| `get_coingecko_coins_id_market_chart_range` | Read | Coin Market Chart Range [Details](operations/get_coingecko_coins_id_market_chart_range.md) |
| `get_coingecko_coins_id_ohlc` | Read | Coin OHLC [Details](operations/get_coingecko_coins_id_ohlc.md) |
| `get_coingecko_coins_id_tickers` | Read | Coin Tickers [Details](operations/get_coingecko_coins_id_tickers.md) |
| `get_coingecko_coins_list` | Read | Coins List (ID Map) [Details](operations/get_coingecko_coins_list.md) |
| `get_coingecko_coins_markets` | Read | Coins Markets [Details](operations/get_coingecko_coins_markets.md) |
| `get_coingecko_exchanges` | Read | Exchanges List [Details](operations/get_coingecko_exchanges.md) |
| `get_coingecko_exchanges_id` | Read | Exchange Data by ID [Details](operations/get_coingecko_exchanges_id.md) |
| `get_coingecko_exchanges_id_tickers` | Read | Exchange Tickers [Details](operations/get_coingecko_exchanges_id_tickers.md) |
| `get_coingecko_exchanges_list` | Read | Exchanges List (ID Map) [Details](operations/get_coingecko_exchanges_list.md) |
| `get_coingecko_search_trending` | Read | Trending Search [Details](operations/get_coingecko_search_trending.md) |
| `get_coingecko_simple_price` | Read | Simple Price [Details](operations/get_coingecko_simple_price.md) |
| `get_coingecko_simple_supported_vs_currencies` | Read | Supported Currencies [Details](operations/get_coingecko_simple_supported_vs_currencies.md) |
| `get_coingecko_simple_token_price_id` | Read | Coin Price by Token Address [Details](operations/get_coingecko_simple_token_price_id.md) |
| `get_coingecko_token_data` | Read | Coin Data by Token Address [Details](operations/get_coingecko_token_data.md) |
| `get_coingecko_token_market_chart` | Read | Coin Historical Chart by Contract [Details](operations/get_coingecko_token_market_chart.md) |
| `get_coingecko_token_market_chart_range` | Read | Coin Market Chart Range by Contract [Details](operations/get_coingecko_token_market_chart_range.md) |

### prediction-market-data — AIsa Prediction Market Data (5)

| Operation ID | Access | Purpose |
| --- | --- | --- |
| `get_kalshi_markets` | Read | Get Kalshi Markets [Details](operations/get_kalshi_markets.md) |
| `get_kalshi_trades` | Read | Get Kalshi Trades [Details](operations/get_kalshi_trades.md) |
| `get_polymarket_activity` | Read | Get Polymarket Wallet Activity [Details](operations/get_polymarket_activity.md) |
| `get_polymarket_events` | Read | Get Polymarket Events [Details](operations/get_polymarket_events.md) |
| `get_polymarket_markets` | Read | Get Polymarket Markets [Details](operations/get_polymarket_markets.md) |

### stock-pulse — Stock Pulse (2)

| Operation ID | Access | Purpose |
| --- | --- | --- |
| `get_twitter_tweet_advanced_search` | Read | Advanced Search Also exposed by: twitter-api. [Details](operations/get_twitter_tweet_advanced_search.md) |
| `twitter_stock_pulse` | Read · composed | Stock Pulse: X chatter joined with market data [Details](operations/twitter_stock_pulse.md) |

## social — AIsa Social

### twitter-api — AIsa Twitter API (28)

| Operation ID | Access | Purpose |
| --- | --- | --- |
| `get_twitter_article` | Read | Get Article [Details](operations/get_twitter_article.md) |
| `get_twitter_community_info` | Read | Get Community Info By Id [Details](operations/get_twitter_community_info.md) |
| `get_twitter_community_members` | Read | Get Community Members [Details](operations/get_twitter_community_members.md) |
| `get_twitter_community_moderators` | Read | Get Community Moderators [Details](operations/get_twitter_community_moderators.md) |
| `get_twitter_community_tweets` | Read | Get Community Tweets [Details](operations/get_twitter_community_tweets.md) |
| `get_twitter_community_tweets_all` | Read | Search Tweets From All Communities [Details](operations/get_twitter_community_tweets_all.md) |
| `get_twitter_list_followers` | Read | Get List Followers [Details](operations/get_twitter_list_followers.md) |
| `get_twitter_list_members` | Read | Get List Members [Details](operations/get_twitter_list_members.md) |
| `get_twitter_list_tweets_timeline` | Read | Get List Tweet Timeline [Details](operations/get_twitter_list_tweets_timeline.md) |
| `get_twitter_spaces_detail` | Read | Get Space Detail [Details](operations/get_twitter_spaces_detail.md) |
| `get_twitter_trends` | Read | Get Trends [Details](operations/get_twitter_trends.md) |
| `get_twitter_tweet_quotes` | Read | Get Tweet Quotations [Details](operations/get_twitter_tweet_quotes.md) |
| `get_twitter_tweet_replies` | Read | Get Tweet Replies [Details](operations/get_twitter_tweet_replies.md) |
| `get_twitter_tweet_replies_v2` | Read | Get Tweet Replies V2 [Details](operations/get_twitter_tweet_replies_v2.md) |
| `get_twitter_tweet_retweeters` | Read | Get Tweet Retweeters [Details](operations/get_twitter_tweet_retweeters.md) |
| `get_twitter_tweet_thread_context` | Read | Get Tweet Thread Context [Details](operations/get_twitter_tweet_thread_context.md) |
| `get_twitter_tweets` | Read | Get Tweets by IDs [Details](operations/get_twitter_tweets.md) |
| `get_twitter_user_about` | Read | Get User Profile About [Details](operations/get_twitter_user_about.md) |
| `get_twitter_user_batch_info_by_ids` | Read | Batch Get User Info By UserIds [Details](operations/get_twitter_user_batch_info_by_ids.md) |
| `get_twitter_user_check_follow_relationship` | Read | Check Follow Relationship [Details](operations/get_twitter_user_check_follow_relationship.md) |
| `get_twitter_user_followers` | Read | Get User Followers [Details](operations/get_twitter_user_followers.md) |
| `get_twitter_user_followings` | Read | Get User Followings [Details](operations/get_twitter_user_followings.md) |
| `get_twitter_user_info` | Read | Get User Info [Details](operations/get_twitter_user_info.md) |
| `get_twitter_user_last_tweets` | Read | Get User Last Tweets [Details](operations/get_twitter_user_last_tweets.md) |
| `get_twitter_user_mentions` | Read | Get User Mentions [Details](operations/get_twitter_user_mentions.md) |
| `get_twitter_user_search` | Read | Search User by Keyword [Details](operations/get_twitter_user_search.md) |
| `get_twitter_user_tweet_timeline` | Read | Get User Tweet Timeline [Details](operations/get_twitter_user_tweet_timeline.md) |
| `get_twitter_user_verified_followers` | Read | Get User Verified Followers [Details](operations/get_twitter_user_verified_followers.md) |

### instagram — AIsa Instagram (17)

| Operation ID | Access | Purpose |
| --- | --- | --- |
| `get_instagram_basic_profile` | Read | Basic Profile [Details](operations/get_instagram_basic_profile.md) |
| `get_instagram_media_transcript` | Read | Media Transcript [Details](operations/get_instagram_media_transcript.md) |
| `get_instagram_post` | Read | Post [Details](operations/get_instagram_post.md) |
| `get_instagram_post_comments` | Read | Post Comments [Details](operations/get_instagram_post_comments.md) |
| `get_instagram_profile` | Read | Profile [Details](operations/get_instagram_profile.md) |
| `get_instagram_reels_search` | Read | Search Reels [Details](operations/get_instagram_reels_search.md) |
| `get_instagram_reels_trending` | Read | Trending Reels [Details](operations/get_instagram_reels_trending.md) |
| `get_instagram_search_hashtag` | Read | Search Hashtag [Details](operations/get_instagram_search_hashtag.md) |
| `get_instagram_search_profiles` | Read | Search Profiles [Details](operations/get_instagram_search_profiles.md) |
| `get_instagram_song_reels` | Read | Song Reels [Details](operations/get_instagram_song_reels.md) |
| `get_instagram_user_embed` | Read | User Embed [Details](operations/get_instagram_user_embed.md) |
| `get_instagram_user_highlight_detail` | Read | Highlight Detail [Details](operations/get_instagram_user_highlight_detail.md) |
| `get_instagram_user_highlights` | Read | User Highlights [Details](operations/get_instagram_user_highlights.md) |
| `get_instagram_user_posts` | Read | User Posts [Details](operations/get_instagram_user_posts.md) |
| `get_instagram_user_reels` | Read | User Reels [Details](operations/get_instagram_user_reels.md) |
| `instagram_posts_digest` | Read · composed | Instagram posts digest: a timeline page at ~3% of the size [Details](operations/instagram_posts_digest.md) |
| `instagram_profile_digest` | Read · composed | Instagram profile digest: the profile card at ~1% of the size [Details](operations/instagram_profile_digest.md) |

### reddit — AIsa Reddit (5)

| Operation ID | Access | Purpose |
| --- | --- | --- |
| `get_reddit_post_comments` | Read | Post Comments [Details](operations/get_reddit_post_comments.md) |
| `get_reddit_search` | Read | Search Reddit [Details](operations/get_reddit_search.md) |
| `get_reddit_subreddit` | Read | Subreddit Posts [Details](operations/get_reddit_subreddit.md) |
| `get_reddit_subreddit_details` | Read | Subreddit Details [Details](operations/get_reddit_subreddit_details.md) |
| `get_reddit_subreddit_search` | Read | Search Within Subreddit [Details](operations/get_reddit_subreddit_search.md) |

### pinterest — AIsa Pinterest (4)

| Operation ID | Access | Purpose |
| --- | --- | --- |
| `get_pinterest_board` | Read | Board [Details](operations/get_pinterest_board.md) |
| `get_pinterest_pin` | Read | Pin [Details](operations/get_pinterest_pin.md) |
| `get_pinterest_search` | Read | Search [Details](operations/get_pinterest_search.md) |
| `get_pinterest_user_boards` | Read | User Boards [Details](operations/get_pinterest_user_boards.md) |

### youtube-search — AIsa YouTube Search (1)

| Operation ID | Access | Purpose |
| --- | --- | --- |
| `get_youtube_search` | Read | YouTube Search [Details](operations/get_youtube_search.md) |

## search — AIsa Web Search & Research

### web-search — AIsa Web Search (27)

| Operation ID | Access | Purpose |
| --- | --- | --- |
| `get_exa_agent_run` | Read | Poll a research Agent run. [Details](operations/get_exa_agent_run.md) |
| `get_firecrawl_batch_scrape_job` | Read | Poll a batch scrape job. [Details](operations/get_firecrawl_batch_scrape_job.md) |
| `get_firecrawl_crawl_job` | Read | Poll a crawl job. [Details](operations/get_firecrawl_crawl_job.md) |
| `post_anthropic_websearch_search` | Read | Model-grounded web search (Anthropic). [Details](operations/post_anthropic_websearch_search.md) |
| `post_exa_agent_runs` | Read | Submit an asynchronous research Agent run. [Details](operations/post_exa_agent_runs.md) |
| `post_exa_answer` | Read | Get a direct, cited answer to a question. [Details](operations/post_exa_answer.md) |
| `post_exa_contents` | Read | Extract full page contents for a set of URLs. [Details](operations/post_exa_contents.md) |
| `post_exa_search` | Read | Run a neural semantic web search. [Details](operations/post_exa_search.md) |
| `post_firecrawl_batch_scrape` | Read | Submit an asynchronous batch scrape job. [Details](operations/post_firecrawl_batch_scrape.md) |
| `post_firecrawl_crawl` | Read | Submit an asynchronous crawl job. [Details](operations/post_firecrawl_crawl.md) |
| `post_firecrawl_map` | Read | Discover the URLs on a website. [Details](operations/post_firecrawl_map.md) |
| `post_firecrawl_scrape` | Read | Scrape a single page and return its main content as markdown. [Details](operations/post_firecrawl_scrape.md) |
| `post_firecrawl_search` | Read | Run a web search and return ranked results. [Details](operations/post_firecrawl_search.md) |
| `post_openai_websearch_search` | Read | Model-grounded web search (OpenAI). [Details](operations/post_openai_websearch_search.md) |
| `post_oxylabs_ai_search` | Read | Query an AI answer engine for GEO/AEO visibility. [Details](operations/post_oxylabs_ai_search.md) |
| `post_perplexity_sonar` | Read | Sonar — lightweight search + answer [Details](operations/post_perplexity_sonar.md) |
| `post_perplexity_sonar_deep_research` | Read | Sonar Deep Research — exhaustive research & comprehensive reports [Details](operations/post_perplexity_sonar_deep_research.md) |
| `post_perplexity_sonar_pro` | Read | Sonar Pro — advanced search for complex queries [Details](operations/post_perplexity_sonar_pro.md) |
| `post_perplexity_sonar_reasoning_pro` | Read | Sonar Reasoning Pro — chain-of-thought reasoning with search [Details](operations/post_perplexity_sonar_reasoning_pro.md) |
| `post_scholar_search_explain` | Read | Explain search results [Details](operations/post_scholar_search_explain.md) |
| `post_scholar_search_mixed` | Read | Smart search combining web and academic results [Details](operations/post_scholar_search_mixed.md) |
| `post_scholar_search_scholar` | Read | Search academic papers [Details](operations/post_scholar_search_scholar.md) |
| `post_scholar_search_web` | Read | Search the web [Details](operations/post_scholar_search_web.md) |
| `post_tavily_crawl` | Read | Graph-based website traversal tool using Tavily Crawl. [Details](operations/post_tavily_crawl.md) |
| `post_tavily_extract` | Read | Extract web page content from specified URLs using Tavily Extract. [Details](operations/post_tavily_extract.md) |
| `post_tavily_map` | Read | Generate comprehensive site maps using Tavily Map. [Details](operations/post_tavily_map.md) |
| `post_tavily_search` | Read | Execute a search query using Tavily Search. [Details](operations/post_tavily_search.md) |

## sales — AIsa Sales

### apollo — AIsa Apollo (54)

| Operation ID | Access | Purpose |
| --- | --- | --- |
| `get_apollo_account_stages` | Read | List Account Stages [Details](operations/get_apollo_account_stages.md) |
| `get_apollo_accounts_id` | Read | View an Account [Details](operations/get_apollo_accounts_id.md) |
| `get_apollo_contact_stages` | Read | List Contact Stages [Details](operations/get_apollo_contact_stages.md) |
| `get_apollo_contacts_contact_id` | Read | View a Contact [Details](operations/get_apollo_contacts_contact_id.md) |
| `get_apollo_email_accounts` | Read | Get a List of Email Accounts [Details](operations/get_apollo_email_accounts.md) |
| `get_apollo_emailer_messages_id_activities` | Read | Check Email Stats [Details](operations/get_apollo_emailer_messages_id_activities.md) |
| `get_apollo_emailer_messages_search` | Read | Search for Outreach Emails [Details](operations/get_apollo_emailer_messages_search.md) |
| `get_apollo_fields` | Read | Get a List of Fields [Details](operations/get_apollo_fields.md) |
| `get_apollo_labels` | Read | Get a List of All Lists [Details](operations/get_apollo_labels.md) |
| `get_apollo_notes` | Read | Get a List of Notes [Details](operations/get_apollo_notes.md) |
| `get_apollo_opportunities_opportunity_id` | Read | View Deal [Details](operations/get_apollo_opportunities_opportunity_id.md) |
| `get_apollo_opportunities_search` | Read | List All Deals [Details](operations/get_apollo_opportunities_search.md) |
| `get_apollo_opportunity_stages` | Read | List Deal Stages [Details](operations/get_apollo_opportunity_stages.md) |
| `get_apollo_organizations_enrich` | Read | Organization Enrichment [Details](operations/get_apollo_organizations_enrich.md) |
| `get_apollo_organizations_id` | Read | Get Complete Organization Info [Details](operations/get_apollo_organizations_id.md) |
| `get_apollo_organizations_organization_id_job_postings` | Read | Organization Job Postings [Details](operations/get_apollo_organizations_organization_id_job_postings.md) |
| `get_apollo_phone_calls_search` | Read | Search for Calls [Details](operations/get_apollo_phone_calls_search.md) |
| `get_apollo_typed_custom_fields` | Read | Get a List of All Custom Fields [Details](operations/get_apollo_typed_custom_fields.md) |
| `get_apollo_users_search` | Read | Get a List of Users [Details](operations/get_apollo_users_search.md) |
| `patch_apollo_accounts_account_id` | Write | Update an Account [Details](operations/patch_apollo_accounts_account_id.md) |
| `patch_apollo_contacts_contact_id` | Write | Update a Contact [Details](operations/patch_apollo_contacts_contact_id.md) |
| `patch_apollo_opportunities_opportunity_id` | Write | Update Deal [Details](operations/patch_apollo_opportunities_opportunity_id.md) |
| `post_apollo_accounts` | Write | Create an Account [Details](operations/post_apollo_accounts.md) |
| `post_apollo_accounts_bulk_create` | Write | Bulk Create Accounts [Details](operations/post_apollo_accounts_bulk_create.md) |
| `post_apollo_accounts_bulk_update` | Write | Bulk Update Accounts [Details](operations/post_apollo_accounts_bulk_update.md) |
| `post_apollo_accounts_search` | Read | Search for Accounts [Details](operations/post_apollo_accounts_search.md) |
| `post_apollo_accounts_update_owners` | Write | Update Account Owner for Multiple Accounts [Details](operations/post_apollo_accounts_update_owners.md) |
| `post_apollo_contacts` | Write | Create a Contact [Details](operations/post_apollo_contacts.md) |
| `post_apollo_contacts_bulk_create` | Write | Bulk Create Contacts [Details](operations/post_apollo_contacts_bulk_create.md) |
| `post_apollo_contacts_bulk_update` | Write | Bulk Update Contacts [Details](operations/post_apollo_contacts_bulk_update.md) |
| `post_apollo_contacts_search` | Read | Search for Contacts [Details](operations/post_apollo_contacts_search.md) |
| `post_apollo_contacts_update_owners` | Write | Update Contact Owner for Multiple Contacts [Details](operations/post_apollo_contacts_update_owners.md) |
| `post_apollo_contacts_update_stages` | Write | Update Contact Stage for Multiple Contacts [Details](operations/post_apollo_contacts_update_stages.md) |
| `post_apollo_emailer_campaigns_add_contact_ids` | Write | Add Contacts to a Sequence [Details](operations/post_apollo_emailer_campaigns_add_contact_ids.md) |
| `post_apollo_emailer_campaigns_remove_or_stop_contact_ids` | Write | Update Contact Status in a Sequence [Details](operations/post_apollo_emailer_campaigns_remove_or_stop_contact_ids.md) |
| `post_apollo_emailer_campaigns_search` | Read | Search for Sequences [Details](operations/post_apollo_emailer_campaigns_search.md) |
| `post_apollo_emailer_campaigns_sequence_id_abort` | Write | Deactivate a Sequence [Details](operations/post_apollo_emailer_campaigns_sequence_id_abort.md) |
| `post_apollo_emailer_campaigns_sequence_id_approve` | Write | Activate a Sequence [Details](operations/post_apollo_emailer_campaigns_sequence_id_approve.md) |
| `post_apollo_emailer_campaigns_sequence_id_archive` | Write | Archive a Sequence [Details](operations/post_apollo_emailer_campaigns_sequence_id_archive.md) |
| `post_apollo_fields` | Write | Create a Custom Field [Details](operations/post_apollo_fields.md) |
| `post_apollo_mixed_companies_search` | Read | Organization Search [Details](operations/post_apollo_mixed_companies_search.md) |
| `post_apollo_mixed_people_api_search` | Read | People API Search [Details](operations/post_apollo_mixed_people_api_search.md) |
| `post_apollo_news_articles_search` | Read | News Articles Search [Details](operations/post_apollo_news_articles_search.md) |
| `post_apollo_opportunities` | Write | Create Deal [Details](operations/post_apollo_opportunities.md) |
| `post_apollo_organizations_bulk_enrich` | Read | Bulk Organization Enrichment [Details](operations/post_apollo_organizations_bulk_enrich.md) |
| `post_apollo_people_bulk_match` | Read | Bulk People Enrichment [Details](operations/post_apollo_people_bulk_match.md) |
| `post_apollo_people_match` | Read | People Enrichment [Details](operations/post_apollo_people_match.md) |
| `post_apollo_phone_calls` | Write | Create Call Records [Details](operations/post_apollo_phone_calls.md) |
| `post_apollo_reports_sync_report` | Read | Query Analytics Report [Details](operations/post_apollo_reports_sync_report.md) |
| `post_apollo_tasks` | Write | Create a Task [Details](operations/post_apollo_tasks.md) |
| `post_apollo_tasks_bulk_create` | Write | Bulk Create Tasks [Details](operations/post_apollo_tasks_bulk_create.md) |
| `post_apollo_tasks_search` | Read | Search for Tasks [Details](operations/post_apollo_tasks_search.md) |
| `post_apollo_usage_stats_api_usage_stats` | Read | View API Usage Stats and Rate Limits [Details](operations/post_apollo_usage_stats_api_usage_stats.md) |
| `put_apollo_phone_calls_id` | Write | Update Call Records [Details](operations/put_apollo_phone_calls_id.md) |

### creator-discovery — AIsa Creator Discovery (2)

| Operation ID | Access | Purpose |
| --- | --- | --- |
| `post_waveinflu_email_lookup` | Read | Email Lookup [Details](operations/post_waveinflu_email_lookup.md) |
| `post_waveinflu_similar_creators` | Read | Similar Creators [Details](operations/post_waveinflu_similar_creators.md) |

### similarweb — AIsa Similarweb (23)

| Operation ID | Access | Purpose |
| --- | --- | --- |
| `get_similarweb_ad_networks` | Read | Ad Networks [Details](operations/get_similarweb_ad_networks.md) |
| `get_similarweb_audience_interest` | Read | Audience Interest [Details](operations/get_similarweb_audience_interest.md) |
| `get_similarweb_audience_overlap` | Read | Audience Overlap [Details](operations/get_similarweb_audience_overlap.md) |
| `get_similarweb_deduplicated_audience` | Read | Deduplicated Audience [Details](operations/get_similarweb_deduplicated_audience.md) |
| `get_similarweb_demographics` | Read | Demographics [Details](operations/get_similarweb_demographics.md) |
| `get_similarweb_keyword_competitors` | Read | Keyword Competitors [Details](operations/get_similarweb_keyword_competitors.md) |
| `get_similarweb_keywords` | Read | Website Keywords [Details](operations/get_similarweb_keywords.md) |
| `get_similarweb_landing_pages` | Read | Landing Pages [Details](operations/get_similarweb_landing_pages.md) |
| `get_similarweb_marketing_channel_sources_legacy` | Read | Marketing Channel Sources [Details](operations/get_similarweb_marketing_channel_sources_legacy.md) |
| `get_similarweb_popular_pages` | Read | Popular Pages [Details](operations/get_similarweb_popular_pages.md) |
| `get_similarweb_ppc_spend` | Read | PPC Spend [Details](operations/get_similarweb_ppc_spend.md) |
| `get_similarweb_ranking` | Read | Website Ranking [Details](operations/get_similarweb_ranking.md) |
| `get_similarweb_referrals` | Read | Referrals [Details](operations/get_similarweb_referrals.md) |
| `get_similarweb_serp_players_aggregated` | Read | SERP Players - Aggregated [Details](operations/get_similarweb_serp_players_aggregated.md) |
| `get_similarweb_serp_players_timeseries` | Read | SERP Players - Clicks over time [Details](operations/get_similarweb_serp_players_timeseries.md) |
| `get_similarweb_similar_sites` | Read | SimilarSites [Details](operations/get_similarweb_similar_sites.md) |
| `get_similarweb_subdomains` | Read | Website Subdomains [Details](operations/get_similarweb_subdomains.md) |
| `get_similarweb_technologies` | Read | Website Technologies [Details](operations/get_similarweb_technologies.md) |
| `get_similarweb_top_sites_ranking` | Read | Top Sites Ranking [Details](operations/get_similarweb_top_sites_ranking.md) |
| `get_similarweb_traffic_engagement` | Read | Traffic & Engagement [Details](operations/get_similarweb_traffic_engagement.md) |
| `get_similarweb_website_top_geographies` | Read | Website Top Geographies [Details](operations/get_similarweb_website_top_geographies.md) |
| `get_similarweb_website_traffic_snapshot` | Read | Website Traffic Snapshot [Details](operations/get_similarweb_website_traffic_snapshot.md) |
| `get_similarweb_website_traffic_trend` | Read | Website Traffic Trend [Details](operations/get_similarweb_website_traffic_trend.md) |

## mail — AIsa Agent Mail

### agentmail — AIsa AgentMail (49)

| Operation ID | Access | Purpose |
| --- | --- | --- |
| `delete_agentmail_inbox` | Write | Delete Inbox [Details](operations/delete_agentmail_inbox.md) |
| `delete_agentmail_inbox_draft` | Write | Delete Draft [Details](operations/delete_agentmail_inbox_draft.md) |
| `delete_agentmail_inbox_list_entry` | Write | Delete Inbox List Entry [Details](operations/delete_agentmail_inbox_list_entry.md) |
| `delete_agentmail_inbox_message` | Write | Delete Message [Details](operations/delete_agentmail_inbox_message.md) |
| `delete_agentmail_inbox_thread` | Write | Delete Thread [Details](operations/delete_agentmail_inbox_thread.md) |
| `delete_agentmail_list_entry` | Write | Delete Account List Entry [Details](operations/delete_agentmail_list_entry.md) |
| `delete_agentmail_thread` | Write | Delete Any Thread [Details](operations/delete_agentmail_thread.md) |
| `get_agentmail_draft` | Read | Get Any Draft [Details](operations/get_agentmail_draft.md) |
| `get_agentmail_draft_attachment` | Read | Get Any Draft Attachment [Details](operations/get_agentmail_draft_attachment.md) |
| `get_agentmail_drafts` | Read | List All Drafts [Details](operations/get_agentmail_drafts.md) |
| `get_agentmail_inbox` | Read | Get Inbox [Details](operations/get_agentmail_inbox.md) |
| `get_agentmail_inbox_draft` | Read | Get Draft [Details](operations/get_agentmail_inbox_draft.md) |
| `get_agentmail_inbox_draft_attachment` | Read | Get Draft Attachment [Details](operations/get_agentmail_inbox_draft_attachment.md) |
| `get_agentmail_inbox_drafts` | Read | List Drafts [Details](operations/get_agentmail_inbox_drafts.md) |
| `get_agentmail_inbox_events` | Read | List Inbox Events [Details](operations/get_agentmail_inbox_events.md) |
| `get_agentmail_inbox_list_entries` | Read | List Inbox List Entries [Details](operations/get_agentmail_inbox_list_entries.md) |
| `get_agentmail_inbox_list_entry` | Read | Get Inbox List Entry [Details](operations/get_agentmail_inbox_list_entry.md) |
| `get_agentmail_inbox_message` | Read | Get Message [Details](operations/get_agentmail_inbox_message.md) |
| `get_agentmail_inbox_message_attachment` | Read | Get Message Attachment [Details](operations/get_agentmail_inbox_message_attachment.md) |
| `get_agentmail_inbox_message_raw` | Read | Get Raw Message [Details](operations/get_agentmail_inbox_message_raw.md) |
| `get_agentmail_inbox_messages` | Read | List Messages [Details](operations/get_agentmail_inbox_messages.md) |
| `get_agentmail_inbox_messages_search` | Read | Search Messages [Details](operations/get_agentmail_inbox_messages_search.md) |
| `get_agentmail_inbox_metrics` | Read | Query Inbox Metrics [Details](operations/get_agentmail_inbox_metrics.md) |
| `get_agentmail_inbox_thread` | Read | Get Thread [Details](operations/get_agentmail_inbox_thread.md) |
| `get_agentmail_inbox_thread_attachment` | Read | Get Thread Attachment [Details](operations/get_agentmail_inbox_thread_attachment.md) |
| `get_agentmail_inbox_threads` | Read | List Threads [Details](operations/get_agentmail_inbox_threads.md) |
| `get_agentmail_inbox_threads_search` | Read | Search Threads [Details](operations/get_agentmail_inbox_threads_search.md) |
| `get_agentmail_inboxes` | Read | List Inboxes [Details](operations/get_agentmail_inboxes.md) |
| `get_agentmail_list_entries` | Read | List Account List Entries [Details](operations/get_agentmail_list_entries.md) |
| `get_agentmail_list_entry` | Read | Get Account List Entry [Details](operations/get_agentmail_list_entry.md) |
| `get_agentmail_metrics` | Read | Query Account Metrics [Details](operations/get_agentmail_metrics.md) |
| `get_agentmail_thread` | Read | Get Any Thread [Details](operations/get_agentmail_thread.md) |
| `get_agentmail_thread_attachment` | Read | Get Any Thread Attachment [Details](operations/get_agentmail_thread_attachment.md) |
| `get_agentmail_threads` | Read | List All Threads [Details](operations/get_agentmail_threads.md) |
| `get_agentmail_threads_search` | Read | Search All Threads [Details](operations/get_agentmail_threads_search.md) |
| `patch_agentmail_inbox` | Write | Update Inbox [Details](operations/patch_agentmail_inbox.md) |
| `patch_agentmail_inbox_draft` | Write | Update Draft [Details](operations/patch_agentmail_inbox_draft.md) |
| `patch_agentmail_inbox_message` | Write | Update Message Labels [Details](operations/patch_agentmail_inbox_message.md) |
| `patch_agentmail_inbox_thread` | Write | Update Thread Labels [Details](operations/patch_agentmail_inbox_thread.md) |
| `patch_agentmail_thread` | Write | Update Any Thread Labels [Details](operations/patch_agentmail_thread.md) |
| `post_agentmail_inbox` | Write | Create Inbox [Details](operations/post_agentmail_inbox.md) |
| `post_agentmail_inbox_draft` | Write | Create Draft [Details](operations/post_agentmail_inbox_draft.md) |
| `post_agentmail_inbox_draft_send` | Write | Send Draft [Details](operations/post_agentmail_inbox_draft_send.md) |
| `post_agentmail_inbox_list_entry` | Write | Create Inbox List Entry [Details](operations/post_agentmail_inbox_list_entry.md) |
| `post_agentmail_inbox_message_forward` | Write | Forward Message [Details](operations/post_agentmail_inbox_message_forward.md) |
| `post_agentmail_inbox_message_reply` | Write | Reply To Message [Details](operations/post_agentmail_inbox_message_reply.md) |
| `post_agentmail_inbox_message_reply_all` | Write | Reply All To Message [Details](operations/post_agentmail_inbox_message_reply_all.md) |
| `post_agentmail_inbox_message_send` | Write | Send Message [Details](operations/post_agentmail_inbox_message_send.md) |
| `post_agentmail_list_entry` | Write | Create Account List Entry [Details](operations/post_agentmail_list_entry.md) |

## Account helper

`account` — Read AIsa account balance, subscription wallet and recent usage with use. This helper is additional to the 575 migrated operations.
