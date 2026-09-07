---
name: aisa-api
description: "Complete AIsa API directory: find operation IDs by category and
  provider, then read schemas and execute with the local MCP. AIsa
  全量接口目录，按分类和服务查找接口及任务 skills。"
---

# AIsa API directory

Choose the relevant API from this file, read its schema with get_details, then execute with use. The default MCP surface is only get_details, use and batch_use. All 575 migrated operations remain available through use.

Use the local MCP server named `aisa-api`. For each operation ID, call `get_details({operation_id: "<id>"})` to read its schema, description and annotations; pricing is enforced by the AIsa gateway. Execute with `use({operation_id: "<id>", arguments: {...}})`. Include `max_price_usd` when a price ceiling is needed: it applies per upstream request, including each request in a composed operation's fan-out, not to the workflow total. If that exact operation is pinned and exposed as a tool, call it directly using its schema. Operation IDs below are exact catalog names, including composed operations; do not add server prefixes.

Use `batch_use` for up to 20 independent calls, respecting the workflow's order, dependencies and call budget. Keep dependent steps sequential.

Find APIs and workflows in the installed `aisa-api` skill: its single SKILL.md contains the complete operation directory and links to workflow skills. Select the exact operation ID there, then call get_details and use; no search call is needed. Clients with MCP resource support can read `skill://aisa-api/SKILL.md` through native resources/read. Skills provide instructions; reading one does not execute operations or expand the user's authorization. Perform external actions only within the user's authorized scope.

## Workflow skills

For a multi-step task, read the matching installed workflow before choosing calls:

- [aisa-enrich-lead-list](../aisa-enrich-lead-list/SKILL.md) — Use when given a list of leads to enrich with contact and company details in bulk. 批量补全销售线索的联系人、工作邮箱和公司资料。
- [aisa-find-people-at-company](../aisa-find-people-at-company/SKILL.md) — Use when asked to find people in specific roles at a company and retrieve their work contact details. 按公司和职位寻找决策人、高管及其工作联系方式。
- [aisa-crypto-market-health](../aisa-crypto-market-health/SKILL.md) — Use when asked for a market-wide crypto overview covering large coins, sectors, attention and Bitcoin history. 查看加密市场整体行情、热门币种、板块表现和比特币历史走势。
- [aisa-look-up-token-market](../aisa-look-up-token-market/SKILL.md) — Use when asked to identify a coin or token and retrieve its price, market history or venue liquidity. 通过币名或合约地址识别代币，查询价格、历史走势和交易所流动性。
- [aisa-company-fundamentals](../aisa-company-fundamentals/SKILL.md) — Use when asked to assemble financial statements, metrics or filings for a US-listed company. 研究美股公司基本面，整理财务报表、估值指标和监管披露。
- [aisa-stock-snapshot-brief](../aisa-stock-snapshot-brief/SKILL.md) — Use when asked for a concise current company brief covering price, valuation, earnings, insiders and news. 汇总单只股票的最新股价、估值、财报预期、内部交易和新闻。
- [aisa-compare-event-odds](../aisa-compare-event-odds/SKILL.md) — Use when asked to compare the market-implied odds of the same event across prediction markets. 对比同一事件在不同预测市场上的概率、赔率和成交情况。
- [aisa-brand-mentions-across-social](../aisa-brand-mentions-across-social/SKILL.md) — Use when asked to collect brand or product mentions across X, Reddit and Instagram. 跨多个社交平台收集品牌或产品提及，对比各平台反馈。
- [aisa-competitor-teardown](../aisa-competitor-teardown/SKILL.md) — Use when asked to analyze a competitor or map a market starting from a domain. 从域名分析竞争对手的网站流量、受众地域、相似网站和竞争格局。
- [aisa-creator-profile-snapshot](../aisa-creator-profile-snapshot/SKILL.md) — Use when asked for an audience and recent-content snapshot of a creator or public account. 分析创作者或公开账号的个人资料、受众和最近发布的内容。
- [aisa-seo-ai-visibility](../aisa-seo-ai-visibility/SKILL.md) — Use when asked how a brand appears in AI answers or which sources those answers cite. 检查品牌在 AI 回答中的可见度、提及情况和引用来源。
- [aisa-seo-keyword-opportunity](../aisa-seo-keyword-opportunity/SKILL.md) — Use when asked to assess a keyword opportunity or find easier related search terms. 研究关键词搜索量、竞争难度和相关长尾词，寻找自然搜索机会。
- [aisa-seo-site-audit](../aisa-seo-site-audit/SKILL.md) — Use when asked to audit the SEO health of a website, including authority, backlinks and page speed. 审计网站 SEO 健康情况，检查权威度、外链、关键词排名和页面速度。
- [aisa-stock-chatter-workflow](../aisa-stock-chatter-workflow/SKILL.md) — Use when asked what X is saying about stocks together with the market data behind those mentions. 分析股票相关社交舆情，结合行情和新闻核对热门股票讨论。
- [aisa-track-topic-on-x](../aisa-track-topic-on-x/SKILL.md) — Use when asked to investigate posts, authors or discussions about a topic on X/Twitter. 追踪 X、Twitter、推特上的话题讨论，分析发帖作者、关注点和回复，整理带来源的报告。
- [aisa-research-brief](../aisa-research-brief/SKILL.md) — Use when asked to research one question on the open web and produce a short sourced brief. 围绕一个问题进行公开网页研究，交叉核实资料，撰写带引用的简报。
- [aisa-search-youtube-deliberately](../aisa-search-youtube-deliberately/SKILL.md) — Use when asked to search YouTube with deliberate locale or filter choices and report the returned results. 按语言、地区和筛选条件搜索 YouTube 视频，整理搜索结果。

## Directory overview

575 operations below, each listed once. Read means read-only according to the original annotations; Write means the operation may change upstream state. A composed operation can make multiple billed API requests. Full parameters and descriptions are available through get_details.

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
| `get_dataforseo_ai_chat_gpt_llm_responses_models` | Read | List of ChatGPT models for LLM Responses |
| `get_dataforseo_ai_claude_llm_responses_models` | Read | List of Claude Models for LLM Responses |
| `get_dataforseo_ai_gemini_llm_responses_models` | Read | List of Gemini models for LLM Responses |
| `get_dataforseo_ai_gemini_llm_scraper_languages` | Read | Gemini LLM Scraper Languages List |
| `get_dataforseo_ai_gemini_llm_scraper_locations` | Read | Gemini LLM Scraper Locations List |
| `get_dataforseo_ai_keyword_locales` | Read | List of Locations and Languages for AI Keyword Data API |
| `get_dataforseo_ai_llm_mentions_available_filters` | Read | Filters for AI Optimization LLM Mentions API |
| `get_dataforseo_ai_llm_mentions_locales` | Read | List of Locations and Languages for AI Optimization LLM Mentions API |
| `get_dataforseo_ai_perplexity_llm_responses_models` | Read | List of Perplexity models for LLM Responses |
| `post_dataforseo_ai_chat_gpt_llm_responses_live` | Write | Live ChatGPT LLM Responses |
| `post_dataforseo_ai_chat_gpt_llm_scraper_live` | Write | Live ChatGPT LLM Scraper |
| `post_dataforseo_ai_chat_gpt_llm_scraper_live_html` | Write | Live ChatGPT LLM Scraper API HTML |
| `post_dataforseo_ai_claude_llm_responses_live` | Write | Live Claude LLM Responses |
| `post_dataforseo_ai_gemini_llm_responses_live` | Write | Live Gemini LLM Responses |
| `post_dataforseo_ai_gemini_llm_scraper_live` | Write | Live Gemini LLM Scraper Advanced |
| `post_dataforseo_ai_gemini_llm_scraper_live_html` | Write | Live Gemini LLM Scraper HTML |
| `post_dataforseo_ai_keyword_volume_live` | Write | AI Keyword Data Keyword Search Volume |
| `post_dataforseo_ai_llm_mentions_aggregated_metrics_live` | Write | Live LLM Mentions Aggregated Metrics |
| `post_dataforseo_ai_llm_mentions_cross_metrics_live` | Write | Live LLM Mentions Cross Aggregated Metrics |
| `post_dataforseo_ai_llm_mentions_search_live` | Write | Live LLM Mentions |
| `post_dataforseo_ai_llm_mentions_top_domains_live` | Write | Live LLM Mentions Top Domains |
| `post_dataforseo_ai_llm_mentions_top_pages_live` | Write | Live LLM Mentions Top Pages |
| `post_dataforseo_ai_perplexity_llm_responses_live` | Write | Live Perplexity LLM Responses |

### seo-apps — AIsa App Store Data (29)

| Operation ID | Access | Purpose |
| --- | --- | --- |
| `get_dataforseo_app_apple_app_info_fetch` | Read | Get Apple App Info Results by id |
| `get_dataforseo_app_apple_app_list_fetch` | Read | Get Apple App List Results by id |
| `get_dataforseo_app_apple_app_listings_categories` | Read | List of App Store Listings Categories for App Data API |
| `get_dataforseo_app_apple_app_reviews_fetch` | Read | Get Apple App Reviews Results by id |
| `get_dataforseo_app_apple_app_searches_fetch` | Read | Get Apple App Searches Results by id |
| `get_dataforseo_app_apple_categories` | Read | List of Apple App Categories for App Data API |
| `get_dataforseo_app_apple_languages` | Read | List of Apple Languages for App Data API |
| `get_dataforseo_app_apple_locations` | Read | List of Apple Locations for App Data API |
| `get_dataforseo_app_google_app_info_fetch` | Read | Get Google App Info Results by id |
| `get_dataforseo_app_google_app_info_fetch_html` | Read | Get Google App Info HTML Results by id |
| `get_dataforseo_app_google_app_list_fetch` | Read | Get Google App List Results by id |
| `get_dataforseo_app_google_app_list_fetch_html` | Read | Get Google App List HTML Results by id |
| `get_dataforseo_app_google_app_listings_categories` | Read | List of Google App Listings Categories for App Data API |
| `get_dataforseo_app_google_app_reviews_fetch` | Read | Get Google App Reviews Results by id |
| `get_dataforseo_app_google_app_searches_fetch` | Read | Get Google App Searches Results by id |
| `get_dataforseo_app_google_app_searches_fetch_html` | Read | Get Google App Searches HTML Results by id |
| `get_dataforseo_app_google_categories` | Read | List of Google App Categories for App Data API |
| `get_dataforseo_app_google_languages` | Read | List of Google Languages for App Data API |
| `get_dataforseo_app_google_locations` | Read | List of Google Locations for App Data API |
| `post_dataforseo_app_apple_app_info_submit` | Write | Setting Apple App Info Tasks |
| `post_dataforseo_app_apple_app_list_submit` | Write | Setting Apple App List Tasks |
| `post_dataforseo_app_apple_app_listings_search_live` | Write | Live Apple App Listings Search Results |
| `post_dataforseo_app_apple_app_reviews_submit` | Write | Setting Apple App Reviews Tasks |
| `post_dataforseo_app_apple_app_searches_submit` | Write | Setting Apple App Searches Tasks |
| `post_dataforseo_app_google_app_info_submit` | Write | Setting Google App Info Tasks |
| `post_dataforseo_app_google_app_list_submit` | Write | Setting Google App List Tasks |
| `post_dataforseo_app_google_app_listings_search_live` | Write | Live Google App Listings Search Results |
| `post_dataforseo_app_google_app_reviews_submit` | Write | Setting Google App Reviews Tasks |
| `post_dataforseo_app_google_app_searches_submit` | Write | Setting Google App Searches Tasks |

### seo-backlinks — AIsa Backlinks (27)

| Operation ID | Access | Purpose |
| --- | --- | --- |
| `get_dataforseo_backlinks_index` | Read | Backlinks Index |
| `get_semrush_backlink_anchors` | Read | Backlink Anchors |
| `get_semrush_backlink_competitors` | Read | Backlink Competitors |
| `get_semrush_backlinks` | Read | Backlinks |
| `get_semrush_backlinks_overview` | Read | Backlinks Overview |
| `get_semrush_indexed_pages` | Read | Indexed Pages |
| `get_semrush_referring_domains` | Read | Referring Domains |
| `post_dataforseo_backlinks_anchors_live` | Write | Anchors |
| `post_dataforseo_backlinks_backlinks_live` | Write | Backlinks |
| `post_dataforseo_backlinks_bulk_backlinks_live` | Write | Bulk Backlinks |
| `post_dataforseo_backlinks_bulk_new_lost_backlinks_live` | Write | Bulk New & Lost Backlinks |
| `post_dataforseo_backlinks_bulk_new_lost_ref_domains_live` | Write | Bulk New & Lost Referring Domains |
| `post_dataforseo_backlinks_bulk_pages_summary_live` | Write | Bulk Pages Summary |
| `post_dataforseo_backlinks_bulk_ranks_live` | Write | Bulk Ranks |
| `post_dataforseo_backlinks_bulk_referring_domains_live` | Write | Bulk Referring Domains |
| `post_dataforseo_backlinks_bulk_spam_score_live` | Write | Bulk Spam Score |
| `post_dataforseo_backlinks_competitors_live` | Write | Competitors |
| `post_dataforseo_backlinks_domain_intersection_live` | Write | Domain Intersection |
| `post_dataforseo_backlinks_domain_pages_live` | Write | Domain Pages |
| `post_dataforseo_backlinks_domain_pages_summary_live` | Write | Domain Pages Summary |
| `post_dataforseo_backlinks_history_live` | Write | Backlinks History |
| `post_dataforseo_backlinks_page_intersection_live` | Write | Page Intersection |
| `post_dataforseo_backlinks_referring_domains_live` | Write | Referring Domains |
| `post_dataforseo_backlinks_referring_networks_live` | Write | Referring Networks |
| `post_dataforseo_backlinks_summary_live` | Write | Backlinks Summary |
| `post_dataforseo_backlinks_timeseries_new_lost_live` | Write | New & Lost Backlinks Timeseries Summary |
| `post_dataforseo_backlinks_timeseries_summary_live` | Write | Backlinks Timeseries Summary |

### seo-business — AIsa Business Listings & Reviews (22)

| Operation ID | Access | Purpose |
| --- | --- | --- |
| `get_dataforseo_business_google_extended_reviews_fetch` | Read | Get Business Data Google Extended Reviews Results by id |
| `get_dataforseo_business_google_gmb_updates_fetch` | Read | Get Google My Business Updates Results by id |
| `get_dataforseo_business_google_reviews_fetch` | Read | Get Business Data Google Reviews Results by id |
| `get_dataforseo_business_tripadvisor_reviews_fetch` | Read | Get Business Data Tripadvisor Reviews Results by id |
| `get_dataforseo_business_tripadvisor_search_fetch` | Read | Get Business Data Tripadvisor Search Results by id |
| `get_dataforseo_business_trustpilot_reviews_fetch` | Read | Get Business Data Trustpilot Reviews Results by id |
| `get_dataforseo_business_trustpilot_search_fetch` | Read | Get Business Data Trustpilot Search Results by id |
| `post_dataforseo_business_google_extended_reviews_submit` | Write | Setting Business Data Google Extended Reviews Tasks |
| `post_dataforseo_business_google_gmb_info_live` | Write | Setting Live Google My Business Info Tasks |
| `post_dataforseo_business_google_gmb_updates_submit` | Write | Setting Google My Business Updates Tasks |
| `post_dataforseo_business_google_hotel_info_live` | Write | Live Google Hotel Info Advanced |
| `post_dataforseo_business_google_hotel_info_live_html` | Write | Live Google Hotel Info HTML |
| `post_dataforseo_business_google_hotel_searches_live` | Write | Live Google Hotel Searches Tasks |
| `post_dataforseo_business_google_qa_live` | Write | Setting Live Google My Business Questions and Answers Tasks |
| `post_dataforseo_business_google_reviews_submit` | Write | Setting Business Data Google Reviews Tasks |
| `post_dataforseo_business_listings_search_live` | Write | Live Business Listings Search Tasks |
| `post_dataforseo_business_social_media_pinterest_live` | Write | Live Social Media Pinterest Tasks |
| `post_dataforseo_business_social_media_reddit_live` | Write | Live Social Media Reddit Tasks |
| `post_dataforseo_business_tripadvisor_reviews_submit` | Write | Setting Business Data Tripadvisor Reviews Tasks |
| `post_dataforseo_business_tripadvisor_search_submit` | Write | Setting Business Data Tripadvisor Search Tasks |
| `post_dataforseo_business_trustpilot_reviews_submit` | Write | Setting Business Data Trustpilot Reviews Tasks |
| `post_dataforseo_business_trustpilot_search_submit` | Write | Setting Business Data Trustpilot Search Tasks |

### seo-content — AIsa Content & Sentiment (10)

| Operation ID | Access | Purpose |
| --- | --- | --- |
| `get_dataforseo_content_available_filters` | Read | Filters for Content Analysis API |
| `get_dataforseo_content_categories` | Read | List of Categories for Content Analysis API |
| `get_dataforseo_content_languages` | Read | List of Languages for Content Analysis API |
| `get_dataforseo_content_locations` | Read | List of Locations for Content Analysis API |
| `post_dataforseo_content_category_trends_live` | Write | Content Analysis – Category Trends API |
| `post_dataforseo_content_phrase_trends_live` | Write | Content Analysis – Phrase Trends API |
| `post_dataforseo_content_rating_distribution_live` | Write | Content Analysis – Rating Distribution API |
| `post_dataforseo_content_search_live` | Write | Content Analysis – Search API |
| `post_dataforseo_content_sentiment_analysis_live` | Write | Content Analysis – Sentiment Analysis API |
| `post_dataforseo_content_summary_live` | Write | Content Analysis – Summary API |

### seo-domains — AIsa Technologies & Whois (12)

| Operation ID | Access | Purpose |
| --- | --- | --- |
| `get_dataforseo_domains_tech_available_filters` | Read | Filters for Domain Analytics Technologies API |
| `get_dataforseo_domains_tech_languages` | Read | List of Languages for Domain Analytics Technologies API |
| `get_dataforseo_domains_tech_list` | Read | List of Technologies for Domain Analytics Technologies API |
| `get_dataforseo_domains_tech_locations` | Read | List of Locations for Domain Analytics Technologies API |
| `get_dataforseo_domains_whois_available_filters` | Read | Filters for Domain Analytics Whois API |
| `post_dataforseo_domains_tech_aggregation_live` | Write | Aggregation Technologies |
| `post_dataforseo_domains_tech_domains_by_html_terms_live` | Write | Domains by HTML Terms |
| `post_dataforseo_domains_tech_domains_by_technology_live` | Write | Domains by Technology |
| `post_dataforseo_domains_tech_for_domain_live` | Write | Domain Technologies |
| `post_dataforseo_domains_tech_summary_live` | Write | Technologies Summary |
| `post_dataforseo_domains_tech_technology_stats_live` | Write | Technology Stats |
| `post_dataforseo_domains_whois_overview_live` | Write | Domain Whois Overview |

### seo-keywords — AIsa Keyword Volume & Ads (33)

| Operation ID | Access | Purpose |
| --- | --- | --- |
| `get_dataforseo_keywords_bing_audience_industries` | Read | List of Industries for Bing Ads Audience Estimation |
| `get_dataforseo_keywords_bing_audience_job_functions` | Read | List of Job Functions for Bing Ads Audience Estimation |
| `get_dataforseo_keywords_bing_kw_for_url_languages` | Read | List of Bing Languages for Keyword Suggestions for URL |
| `get_dataforseo_keywords_bing_kw_performance_locales` | Read | List of Locations and Languages for Keyword Performance endpoints |
| `get_dataforseo_keywords_bing_languages` | Read | List of Bing Languages for Keywords Data |
| `get_dataforseo_keywords_bing_locations` | Read | List of Bing Locations for Keywords Data |
| `get_dataforseo_keywords_bing_volume_history_locales` | Read | List of Locations and Languages for Bing ‘Search Volume History’ Endpoint |
| `get_dataforseo_keywords_clickstream_locales` | Read | List of Locations and Languages for DataForSEO Clickstream Data API |
| `get_dataforseo_keywords_gads_ad_traffic_fetch` | Read | Get ‘Ads Traffic By Keywords’ Results by id |
| `get_dataforseo_keywords_gads_status` | Read | Google Ads Status |
| `get_dataforseo_keywords_google_trends_categories` | Read | List of Google Trends Categories |
| `get_dataforseo_keywords_trends_locations` | Read | List of DataForSEO Trends Locations |
| `get_semrush_broad_match_keywords` | Read | Broad Match Keywords |
| `get_semrush_keyword_difficulty` | Read | Keyword Difficulty |
| `get_semrush_keyword_overview` | Read | Keyword Overview |
| `get_semrush_question_keywords` | Read | Question Keywords |
| `post_dataforseo_keywords_bing_audience_live` | Write | Setting Live ‘Bing Ads Audience Estimation’ Tasks |
| `post_dataforseo_keywords_bing_kw_for_keywords_live` | Write | Setting Live ‘Keywords For Keywords’ Tasks |
| `post_dataforseo_keywords_bing_kw_for_site_live` | Write | Setting Live ‘Keywords For Site’ Tasks |
| `post_dataforseo_keywords_bing_kw_for_url_live` | Write | Setting Live ‘Bing Ads Keyword Suggestions for URL’ Tasks |
| `post_dataforseo_keywords_bing_kw_performance_live` | Write | Setting Live ‘Bing Keyword Performance’ Tasks |
| `post_dataforseo_keywords_bing_search_volume_live` | Write | Setting Live ‘Search Volume’ Tasks |
| `post_dataforseo_keywords_clickstream_bulk_volume_live` | Write | Setting Live ‘Bulk Clickstream Search Volume’ Tasks |
| `post_dataforseo_keywords_clickstream_global_volume_live` | Write | Setting Live ‘Clickstream Global Search Volume’ Tasks |
| `post_dataforseo_keywords_clickstream_search_volume_live` | Write | Setting Live ‘DataForSEO Search Volume’ Tasks |
| `post_dataforseo_keywords_gads_ad_traffic_submit` | Write | Setting ‘Ad Traffic By Keywords’ Tasks |
| `post_dataforseo_keywords_gads_kw_for_keywords_live` | Write | Setting Live ‘Keywords For Keywords’ Tasks |
| `post_dataforseo_keywords_gads_kw_for_site_live` | Write | Setting Live ‘Keywords For Site’ Tasks |
| `post_dataforseo_keywords_gads_search_volume_live` | Write | Setting Live ‘Google Ads Search Volume’ Tasks |
| `post_dataforseo_keywords_trends_demography_live` | Write | Setting Live ‘DataForSEO Trends Demography’ Tasks |
| `post_dataforseo_keywords_trends_explore_live` | Write | Setting Live ‘DataForSEO Trends Explore’ Tasks |
| `post_dataforseo_keywords_trends_merged_data_live` | Write | Setting Live ‘DataForSEO Trends Merged Data’ Tasks |
| `post_dataforseo_keywords_trends_subregion_interests_live` | Write | Setting Live ‘DataForSEO Trends Subregion Interests’ Tasks |

### seo-labs — AIsa Domain & Keyword Research (46)

| Operation ID | Access | Purpose |
| --- | --- | --- |
| `get_ahrefs_domain_rating` | Read | Domain Rating |
| `get_ahrefs_site_metrics` | Read | Site Metrics |
| `get_dataforseo_labs_available_filters` | Read | Filters for DataForSEO Labs API |
| `get_dataforseo_labs_google_available_history` | Read | DataForSEO Labs Google Available History |
| `get_dataforseo_labs_google_categories_for_kw_languages` | Read | List of Languages for Google Categories for Keywords API |
| `get_dataforseo_labs_status` | Read | DataForSEO Labs Status |
| `get_semrush_domain_organic_keywords` | Read | Domain Organic Keywords |
| `get_semrush_domain_overview` | Read | Domain Overview |
| `get_semrush_domain_paid_keywords` | Read | Domain Paid Keywords |
| `get_semrush_domain_rank_history` | Read | Domain Rank History |
| `get_semrush_domain_vs_domain` | Read | Domain vs Domain |
| `get_semrush_organic_competitors` | Read | Organic Competitors |
| `get_semrush_url_organic_keywords` | Read | URL Organic Keywords |
| `post_dataforseo_labs_amazon_bulk_volume_live` | Write | Amazon Bulk Search Volume |
| `post_dataforseo_labs_amazon_product_competitors_live` | Write | Product Competitors |
| `post_dataforseo_labs_amazon_product_kw_overlap_live` | Write | Keyword Intersections |
| `post_dataforseo_labs_amazon_product_rank_overview_live` | Write | Product Rank Overview |
| `post_dataforseo_labs_amazon_ranked_keywords_live` | Write | Ranked Keywords |
| `post_dataforseo_labs_amazon_related_keywords_live` | Write | Related Keywords |
| `post_dataforseo_labs_apple_app_competitors_live` | Write | App Store App Competitors Live |
| `post_dataforseo_labs_apple_app_intersection_live` | Write | App Store App Intersection Live |
| `post_dataforseo_labs_apple_bulk_app_metrics_live` | Write | App Store Bulk App Metrics Live |
| `post_dataforseo_labs_apple_keywords_for_app_live` | Write | App Store Keywords For App Live |
| `post_dataforseo_labs_google_app_competitors_live` | Write | Google Play App Competitors Live |
| `post_dataforseo_labs_google_app_intersection_live` | Write | Google Play App Intersection Live |
| `post_dataforseo_labs_google_bulk_app_metrics_live` | Write | Google Play Bulk App Metrics Live |
| `post_dataforseo_labs_google_bulk_keyword_difficulty_live` | Write | Bulk Keyword Difficulty |
| `post_dataforseo_labs_google_bulk_traffic_estimation_live` | Write | Bulk Traffic Estimation |
| `post_dataforseo_labs_google_categories_for_domain_live` | Write | Categories For Domain |
| `post_dataforseo_labs_google_categories_for_kw_live` | Write | Categories for Keywords |
| `post_dataforseo_labs_google_domain_rank_overview_live` | Write | Domain Rank Overview |
| `post_dataforseo_labs_google_historical_bulk_traffic_live` | Write | Historical Bulk Traffic Estimation |
| `post_dataforseo_labs_google_historical_keyword_data_live` | Write | Historical Keyword Data |
| `post_dataforseo_labs_google_historical_rank_live` | Write | Historical Rank Overview |
| `post_dataforseo_labs_google_keyword_ideas_live` | Write | Keyword Ideas |
| `post_dataforseo_labs_google_keyword_overview_live` | Write | Keyword Overview |
| `post_dataforseo_labs_google_keyword_suggestions_live` | Write | Keyword Suggestions |
| `post_dataforseo_labs_google_keywords_for_app_live` | Write | Google Play Keywords For App Live |
| `post_dataforseo_labs_google_keywords_for_categories_live` | Write | Keywords For Categories |
| `post_dataforseo_labs_google_kw_for_site_live` | Write | Keywords For Site |
| `post_dataforseo_labs_google_related_keywords_live` | Write | Related Keywords |
| `post_dataforseo_labs_google_relevant_pages_live` | Write | Relevant Pages |
| `post_dataforseo_labs_google_search_intent_live` | Write | Search Intent |
| `post_dataforseo_labs_google_serp_competitors_live` | Write | SERP Competitors |
| `post_dataforseo_labs_google_subdomains_live` | Write | Subdomains |
| `post_dataforseo_labs_google_top_searches_live` | Write | Top Searches |

### seo-merchant — AIsa Shopping & Marketplace (22)

| Operation ID | Access | Purpose |
| --- | --- | --- |
| `get_dataforseo_merchant_amazon_asin_fetch` | Read | Get Amazon ASIN Results by id |
| `get_dataforseo_merchant_amazon_asin_fetch_html` | Read | Get Amazon ASIN HTML Results by id |
| `get_dataforseo_merchant_amazon_languages` | Read | List of Amazon Languages for Merchant API |
| `get_dataforseo_merchant_amazon_locations` | Read | List of Amazon Locations for Merchant API |
| `get_dataforseo_merchant_amazon_products_fetch` | Read | Get Amazon Products Results by id |
| `get_dataforseo_merchant_amazon_products_fetch_html` | Read | Get Amazon Products HTML Results by id |
| `get_dataforseo_merchant_amazon_sellers_fetch` | Read | Get Amazon Sellers Results by id |
| `get_dataforseo_merchant_amazon_sellers_fetch_html` | Read | Get Amazon Sellers HTML Results by id |
| `get_dataforseo_merchant_google_languages` | Read | List of Google Shopping Languages for Merchant API |
| `get_dataforseo_merchant_google_locations` | Read | List of Google Shopping Locations for Merchant API |
| `get_dataforseo_merchant_google_product_info_fetch` | Read | Get Google Shopping Product Info Results by id |
| `get_dataforseo_merchant_google_products_fetch` | Read | Get Google Shopping Products Results by id |
| `get_dataforseo_merchant_google_products_fetch_html` | Read | Get Google Shopping Products HTML Results by id |
| `get_dataforseo_merchant_google_reviews_fetch` | Read | Get Google Shopping Reviews Results by id |
| `get_dataforseo_merchant_google_sellers_fetch` | Read | Get Google Shopping Sellers Results by id |
| `post_dataforseo_merchant_amazon_asin_submit` | Write | Setting Amazon ASIN Tasks |
| `post_dataforseo_merchant_amazon_products_submit` | Write | Setting Amazon Products Tasks |
| `post_dataforseo_merchant_amazon_sellers_submit` | Write | Setting Amazon Sellers Tasks |
| `post_dataforseo_merchant_google_product_info_submit` | Write | Setting Google Shopping Product Info Tasks |
| `post_dataforseo_merchant_google_products_submit` | Write | Setting Google Shopping Products Tasks |
| `post_dataforseo_merchant_google_reviews_submit` | Write | Setting Google Shopping Reviews Tasks |
| `post_dataforseo_merchant_google_sellers_submit` | Write | Setting Google Shopping Sellers Tasks |

### seo-onpage — AIsa On-Page Audit (20)

| Operation ID | Access | Purpose |
| --- | --- | --- |
| `get_dataforseo_on_page_available_filters` | Read | Filters and customizable thresholds at DataForSEO OnPage API |
| `get_dataforseo_on_page_lighthouse_audits` | Read | Audits in OnPage Lighthouse API |
| `get_dataforseo_on_page_lighthouse_languages` | Read | List of Languages for OnPage Lighthouse API |
| `get_dataforseo_on_page_lighthouse_versions` | Read | Lighthouse versions supported in OnPage API |
| `get_dataforseo_on_page_summary` | Read | OnPage API Summary |
| `post_dataforseo_on_page_content_parsing` | Write | OnPage API Content Parsing |
| `post_dataforseo_on_page_duplicate_content` | Write | OnPage API Duplicate Content |
| `post_dataforseo_on_page_duplicate_tags` | Write | OnPage API Duplicate Tags |
| `post_dataforseo_on_page_force_stop` | Write | OnPage API Force Stop |
| `post_dataforseo_on_page_keyword_density` | Write | Keyword Density |
| `post_dataforseo_on_page_lighthouse_live_json` | Write | Live OnPage Lighthouse JSON |
| `post_dataforseo_on_page_links` | Write | Links |
| `post_dataforseo_on_page_microdata` | Write | OnPage API Microdata |
| `post_dataforseo_on_page_non_indexable` | Write | OnPage API Non-indexable Pages |
| `post_dataforseo_on_page_page_screenshot` | Write | OnPage API Page Screenshot |
| `post_dataforseo_on_page_raw_html` | Write | OnPage API Raw HTML |
| `post_dataforseo_on_page_resources` | Write | OnPage API Resources |
| `post_dataforseo_on_page_submit` | Write | Setting OnPage Tasks |
| `post_dataforseo_on_page_uncrawlable_resources` | Write | Uncrawlable Resources |
| `post_dataforseo_on_page_waterfall` | Write | OnPage API Waterfall |

### seo-serp — AIsa SERP - Google (38)

| Operation ID | Access | Purpose |
| --- | --- | --- |
| `get_dataforseo_serp_gads_advertisers_locations` | Read | List of Google Ads Advertisers Locations for SERP API |
| `get_dataforseo_serp_gads_search_locations` | Read | List of Google Ads Search Locations for SERP API |
| `get_dataforseo_serp_google_ai_mode_languages` | Read | List of Google AI Mode Languages for SERP |
| `get_dataforseo_serp_google_events_locations` | Read | List of Google Events Locations for SERP API |
| `get_dataforseo_serp_google_jobs_fetch` | Read | Get Google Jobs Advanced Results by id |
| `get_dataforseo_serp_google_jobs_fetch_html` | Read | Get Google Jobs HTML Results by id |
| `get_dataforseo_serp_google_jobs_locations` | Read | List of Google Jobs Locations for SERP API |
| `get_dataforseo_serp_google_search_by_image_fetch` | Read | Get Google Search By Image SERP Advanced Results by id |
| `get_dataforseo_serp_google_search_by_image_fetch_html` | Read | Get Google Search By Image HTML Results by id |
| `get_semrush_organic_results` | Read | Organic Results |
| `get_semrush_paid_results` | Read | Paid Results |
| `post_dataforseo_serp_gads_advertisers_live` | Write | Live Google Ads Advertisers Advanced |
| `post_dataforseo_serp_gads_search_live` | Write | Live Google Ads Search Advanced |
| `post_dataforseo_serp_google_ai_mode_live` | Write | Live Google AI Mode SERP |
| `post_dataforseo_serp_google_ai_mode_live_html` | Write | Live Google Ai Mode SERP HTML |
| `post_dataforseo_serp_google_autocomplete_live` | Write | Live Google Autocomplete Advanced |
| `post_dataforseo_serp_google_dataset_info_live` | Write | Live Google Dataset Info Advanced |
| `post_dataforseo_serp_google_dataset_search_live` | Write | Live Google Dataset Search Advanced |
| `post_dataforseo_serp_google_events_live` | Write | Live Google Events SERP Advanced |
| `post_dataforseo_serp_google_finance_explore_live` | Write | Live Google Finance Explore Advanced |
| `post_dataforseo_serp_google_finance_explore_live_html` | Write | Live Google Finance Explore SERP HTML |
| `post_dataforseo_serp_google_finance_markets_live` | Write | Live Google Finance Markets Advanced |
| `post_dataforseo_serp_google_finance_markets_live_html` | Write | Live Google Finance Markets SERP HTML |
| `post_dataforseo_serp_google_finance_quote_live` | Write | Live Google Finance Quote Advanced |
| `post_dataforseo_serp_google_finance_quote_live_html` | Write | Live Google Finance Quote SERP HTML |
| `post_dataforseo_serp_google_finance_ticker_search_live` | Write | Live Google Finance Ticker Search Advanced |
| `post_dataforseo_serp_google_images_live` | Write | Live Google Images SERP |
| `post_dataforseo_serp_google_images_live_html` | Write | Live Google Images SERP HTML |
| `post_dataforseo_serp_google_jobs_submit` | Write | Setting Google Jobs Tasks |
| `post_dataforseo_serp_google_local_finder_live` | Write | Live Google Local Finder SERP |
| `post_dataforseo_serp_google_local_finder_live_html` | Write | Live Google Local Finder SERP HTML |
| `post_dataforseo_serp_google_maps_live` | Write | Live Google Maps SERP |
| `post_dataforseo_serp_google_news_live` | Write | Live Google News SERP |
| `post_dataforseo_serp_google_news_live_html` | Write | Live Google News SERP HTML |
| `post_dataforseo_serp_google_organic_live` | Write | Live Google Organic SERP Advanced |
| `post_dataforseo_serp_google_organic_live_html` | Write | Live Google Organic SERP HTML |
| `post_dataforseo_serp_google_organic_live_regular` | Write | Live Google Organic SERP Regular |
| `post_dataforseo_serp_google_search_by_image_submit` | Write | Setting Google Search By Image SERP Tasks |

### seo-serp-other-engines — AIsa SERP - Other Engines (34)

| Operation ID | Access | Purpose |
| --- | --- | --- |
| `get_dataforseo_serp_baidu_languages` | Read | List of Baidu Languages for SERP |
| `get_dataforseo_serp_baidu_locations` | Read | List of Baidu Locations for SERP |
| `get_dataforseo_serp_baidu_organic_fetch` | Read | Get Baidu Organic SERP Advanced Results by id |
| `get_dataforseo_serp_baidu_organic_fetch_html` | Read | Get Baidu Organic HTML Results by id |
| `get_dataforseo_serp_baidu_organic_fetch_regular` | Read | Get Baidu Organic SERP Results by id（regular） |
| `get_dataforseo_serp_bing_languages` | Read | List of Bing Languages for SERP |
| `get_dataforseo_serp_bing_locations` | Read | List of Bing Locations for SERP |
| `get_dataforseo_serp_naver_organic_fetch` | Read | Get Naver Organic SERP Advanced Results by id |
| `get_dataforseo_serp_naver_organic_fetch_html` | Read | Get Naver Organic HTML Results by id |
| `get_dataforseo_serp_naver_organic_fetch_regular` | Read | Get Naver Organic SERP Results by id（regular） |
| `get_dataforseo_serp_seznam_languages` | Read | List of Seznam Languages for SERP |
| `get_dataforseo_serp_seznam_locations` | Read | List of Seznam Locations for SERP |
| `get_dataforseo_serp_seznam_organic_fetch` | Read | Get Seznam Organic SERP Advanced Results by id |
| `get_dataforseo_serp_seznam_organic_fetch_html` | Read | Get Seznam Organic HTML Results by id |
| `get_dataforseo_serp_seznam_organic_fetch_regular` | Read | Get Seznam Organic SERP Results by id（regular） |
| `get_dataforseo_serp_yahoo_languages` | Read | List of Yahoo Languages for SERP |
| `get_dataforseo_serp_yahoo_locations` | Read | List of Yahoo Locations for SERP |
| `get_dataforseo_serp_youtube_languages` | Read | List of Youtube Languages for SERP |
| `get_dataforseo_serp_youtube_locations` | Read | List of Youtube Locations for SERP |
| `post_dataforseo_serp_ai_summary` | Write | SERP API AI Summary |
| `post_dataforseo_serp_baidu_organic_submit` | Write | Setting Baidu Organic SERP Tasks |
| `post_dataforseo_serp_bing_organic_live` | Write | Live Bing Organic SERP Advanced |
| `post_dataforseo_serp_bing_organic_live_html` | Write | Live Bing Organic SERP HTML |
| `post_dataforseo_serp_bing_organic_live_regular` | Write | Live Bing Organic SERP Regular |
| `post_dataforseo_serp_naver_organic_submit` | Write | Setting Naver Organic SERP Tasks |
| `post_dataforseo_serp_screenshot` | Write | SERP API Page Screenshot |
| `post_dataforseo_serp_seznam_organic_submit` | Write | Setting Seznam Organic SERP Tasks |
| `post_dataforseo_serp_yahoo_organic_live` | Write | Live Yahoo Organic SERP Advanced |
| `post_dataforseo_serp_yahoo_organic_live_html` | Write | Live Yahoo Organic SERP HTML |
| `post_dataforseo_serp_yahoo_organic_live_regular` | Write | Live Yahoo Organic SERP Regular |
| `post_dataforseo_serp_youtube_organic_live` | Write | Live YouTube Organic Advanced |
| `post_dataforseo_serp_youtube_video_comments_live` | Write | Live YouTube Comments Advanced |
| `post_dataforseo_serp_youtube_video_info_live` | Write | Live YouTube Video Info Advanced |
| `post_dataforseo_serp_youtube_video_subtitles_live` | Write | Live YouTube Subtitles Advanced |

## finance — AIsa Finance

### marketpulse — AIsa MarketPulse (21)

| Operation ID | Access | Purpose |
| --- | --- | --- |
| `edinet_filings_digest` | Read · composed | EDINET filings digest: one day's disclosures, filterable |
| `get_edinet_documents` | Read | List EDINET documents |
| `get_financial_analyst_estimates` | Read | Analyst Estimates |
| `get_financial_company_facts` | Read | Get company facts |
| `get_financial_earnings` | Read | Get earnings snapshot |
| `get_financial_filings` | Read | Get SEC filings |
| `get_financial_filings_items` | Read | Get SEC filing items |
| `get_financial_financial_metrics` | Read | Get financial metrics |
| `get_financial_financial_metrics_snapshot` | Read | Financial Metrics Snapshot (Real-Time) |
| `get_financial_financials` | Read | Get all financial statements |
| `get_financial_financials_balance_sheets` | Read | Get balance sheets |
| `get_financial_financials_cash_flow_statements` | Read | Get cash flow statements |
| `get_financial_financials_income_statements` | Read | Get income statements |
| `get_financial_insider_trades` | Read | Get insider trades |
| `get_financial_macro_interest_rates` | Read | Interest Rates (Historical) |
| `get_financial_macro_interest_rates_snapshot` | Read | Interest Rates (Real-Time) |
| `get_financial_news` | Read | Get news articles Also exposed by: stock-pulse. |
| `get_financial_prices` | Read | Get historical stock price data |
| `get_financial_prices_snapshot` | Read | Price Snapshot (Real-Time) Also exposed by: stock-pulse. |
| `post_financial_financials_search_line_items` | Write | Search specific financial metrics |
| `post_financial_financials_search_screener` | Write | Search financial statements |

### crypto-market-data — AIsa Crypto Market Data (21)

| Operation ID | Access | Purpose |
| --- | --- | --- |
| `get_coingecko_coins_categories` | Read | Categories with Market Data |
| `get_coingecko_coins_categories_list` | Read | Categories List |
| `get_coingecko_coins_id` | Read | Coin Data by ID |
| `get_coingecko_coins_id_history` | Read | Coin Historical Data |
| `get_coingecko_coins_id_market_chart` | Read | Coin Historical Chart |
| `get_coingecko_coins_id_market_chart_range` | Read | Coin Market Chart Range |
| `get_coingecko_coins_id_ohlc` | Read | Coin OHLC |
| `get_coingecko_coins_id_tickers` | Read | Coin Tickers |
| `get_coingecko_coins_list` | Read | Coins List (ID Map) |
| `get_coingecko_coins_markets` | Read | Coins Markets |
| `get_coingecko_exchanges` | Read | Exchanges List |
| `get_coingecko_exchanges_id` | Read | Exchange Data by ID |
| `get_coingecko_exchanges_id_tickers` | Read | Exchange Tickers |
| `get_coingecko_exchanges_list` | Read | Exchanges List (ID Map) |
| `get_coingecko_search_trending` | Read | Trending Search |
| `get_coingecko_simple_price` | Read | Simple Price |
| `get_coingecko_simple_supported_vs_currencies` | Read | Supported Currencies |
| `get_coingecko_simple_token_price_id` | Read | Coin Price by Token Address |
| `get_coingecko_token_data` | Read | Coin Data by Token Address |
| `get_coingecko_token_market_chart` | Read | Coin Historical Chart by Contract |
| `get_coingecko_token_market_chart_range` | Read | Coin Market Chart Range by Contract |

### prediction-market-data — AIsa Prediction Market Data (5)

| Operation ID | Access | Purpose |
| --- | --- | --- |
| `get_kalshi_markets` | Read | Get Kalshi Markets |
| `get_kalshi_trades` | Read | Get Kalshi Trades |
| `get_polymarket_activity` | Read | Get Polymarket Wallet Activity |
| `get_polymarket_events` | Read | Get Polymarket Events |
| `get_polymarket_markets` | Read | Get Polymarket Markets |

### stock-pulse — Stock Pulse (2)

| Operation ID | Access | Purpose |
| --- | --- | --- |
| `get_twitter_tweet_advanced_search` | Read | Advanced Search Also exposed by: twitter-api. |
| `twitter_stock_pulse` | Read · composed | Stock Pulse: X chatter joined with market data |

## social — AIsa Social

### twitter-api — AIsa Twitter API (28)

| Operation ID | Access | Purpose |
| --- | --- | --- |
| `get_twitter_article` | Read | Get Article |
| `get_twitter_community_info` | Read | Get Community Info By Id |
| `get_twitter_community_members` | Read | Get Community Members |
| `get_twitter_community_moderators` | Read | Get Community Moderators |
| `get_twitter_community_tweets` | Read | Get Community Tweets |
| `get_twitter_community_tweets_all` | Read | Search Tweets From All Communities |
| `get_twitter_list_followers` | Read | Get List Followers |
| `get_twitter_list_members` | Read | Get List Members |
| `get_twitter_list_tweets_timeline` | Read | Get List Tweet Timeline |
| `get_twitter_spaces_detail` | Read | Get Space Detail |
| `get_twitter_trends` | Read | Get Trends |
| `get_twitter_tweet_quotes` | Read | Get Tweet Quotations |
| `get_twitter_tweet_replies` | Read | Get Tweet Replies |
| `get_twitter_tweet_replies_v2` | Read | Get Tweet Replies V2 |
| `get_twitter_tweet_retweeters` | Read | Get Tweet Retweeters |
| `get_twitter_tweet_thread_context` | Read | Get Tweet Thread Context |
| `get_twitter_tweets` | Read | Get Tweets by IDs |
| `get_twitter_user_about` | Read | Get User Profile About |
| `get_twitter_user_batch_info_by_ids` | Read | Batch Get User Info By UserIds |
| `get_twitter_user_check_follow_relationship` | Read | Check Follow Relationship |
| `get_twitter_user_followers` | Read | Get User Followers |
| `get_twitter_user_followings` | Read | Get User Followings |
| `get_twitter_user_info` | Read | Get User Info |
| `get_twitter_user_last_tweets` | Read | Get User Last Tweets |
| `get_twitter_user_mentions` | Read | Get User Mentions |
| `get_twitter_user_search` | Read | Search User by Keyword |
| `get_twitter_user_tweet_timeline` | Read | Get User Tweet Timeline |
| `get_twitter_user_verified_followers` | Read | Get User Verified Followers |

### instagram — AIsa Instagram (17)

| Operation ID | Access | Purpose |
| --- | --- | --- |
| `get_instagram_basic_profile` | Read | Basic Profile |
| `get_instagram_media_transcript` | Read | Media Transcript |
| `get_instagram_post` | Read | Post |
| `get_instagram_post_comments` | Read | Post Comments |
| `get_instagram_profile` | Read | Profile |
| `get_instagram_reels_search` | Read | Search Reels |
| `get_instagram_reels_trending` | Read | Trending Reels |
| `get_instagram_search_hashtag` | Read | Search Hashtag |
| `get_instagram_search_profiles` | Read | Search Profiles |
| `get_instagram_song_reels` | Read | Song Reels |
| `get_instagram_user_embed` | Read | User Embed |
| `get_instagram_user_highlight_detail` | Read | Highlight Detail |
| `get_instagram_user_highlights` | Read | User Highlights |
| `get_instagram_user_posts` | Read | User Posts |
| `get_instagram_user_reels` | Read | User Reels |
| `instagram_posts_digest` | Read · composed | Instagram posts digest: a timeline page at ~3% of the size |
| `instagram_profile_digest` | Read · composed | Instagram profile digest: the profile card at ~1% of the size |

### reddit — AIsa Reddit (5)

| Operation ID | Access | Purpose |
| --- | --- | --- |
| `get_reddit_post_comments` | Read | Post Comments |
| `get_reddit_search` | Read | Search Reddit |
| `get_reddit_subreddit` | Read | Subreddit Posts |
| `get_reddit_subreddit_details` | Read | Subreddit Details |
| `get_reddit_subreddit_search` | Read | Search Within Subreddit |

### pinterest — AIsa Pinterest (4)

| Operation ID | Access | Purpose |
| --- | --- | --- |
| `get_pinterest_board` | Read | Board |
| `get_pinterest_pin` | Read | Pin |
| `get_pinterest_search` | Read | Search |
| `get_pinterest_user_boards` | Read | User Boards |

### youtube-search — AIsa YouTube Search (1)

| Operation ID | Access | Purpose |
| --- | --- | --- |
| `get_youtube_search` | Read | YouTube Search |

## search — AIsa Web Search & Research

### web-search — AIsa Web Search (27)

| Operation ID | Access | Purpose |
| --- | --- | --- |
| `get_exa_agent_run` | Read | Poll a research Agent run. |
| `get_firecrawl_batch_scrape_job` | Read | Poll a batch scrape job. |
| `get_firecrawl_crawl_job` | Read | Poll a crawl job. |
| `post_anthropic_websearch_search` | Read | Model-grounded web search (Anthropic). |
| `post_exa_agent_runs` | Read | Submit an asynchronous research Agent run. |
| `post_exa_answer` | Read | Get a direct, cited answer to a question. |
| `post_exa_contents` | Read | Extract full page contents for a set of URLs. |
| `post_exa_search` | Read | Run a neural semantic web search. |
| `post_firecrawl_batch_scrape` | Read | Submit an asynchronous batch scrape job. |
| `post_firecrawl_crawl` | Read | Submit an asynchronous crawl job. |
| `post_firecrawl_map` | Read | Discover the URLs on a website. |
| `post_firecrawl_scrape` | Read | Scrape a single page and return its main content as markdown. |
| `post_firecrawl_search` | Read | Run a web search and return ranked results. |
| `post_openai_websearch_search` | Read | Model-grounded web search (OpenAI). |
| `post_oxylabs_ai_search` | Read | Query an AI answer engine for GEO/AEO visibility. |
| `post_perplexity_sonar` | Read | Sonar — lightweight search + answer |
| `post_perplexity_sonar_deep_research` | Read | Sonar Deep Research — exhaustive research & comprehensive reports |
| `post_perplexity_sonar_pro` | Read | Sonar Pro — advanced search for complex queries |
| `post_perplexity_sonar_reasoning_pro` | Read | Sonar Reasoning Pro — chain-of-thought reasoning with search |
| `post_scholar_search_explain` | Read | Explain search results |
| `post_scholar_search_mixed` | Read | Smart search combining web and academic results |
| `post_scholar_search_scholar` | Read | Search academic papers |
| `post_scholar_search_web` | Read | Search the web |
| `post_tavily_crawl` | Read | Graph-based website traversal tool using Tavily Crawl. |
| `post_tavily_extract` | Read | Extract web page content from specified URLs using Tavily Extract. |
| `post_tavily_map` | Read | Generate comprehensive site maps using Tavily Map. |
| `post_tavily_search` | Read | Execute a search query using Tavily Search. |

## sales — AIsa Sales

### apollo — AIsa Apollo (54)

| Operation ID | Access | Purpose |
| --- | --- | --- |
| `get_apollo_account_stages` | Read | List Account Stages |
| `get_apollo_accounts_id` | Read | View an Account |
| `get_apollo_contact_stages` | Read | List Contact Stages |
| `get_apollo_contacts_contact_id` | Read | View a Contact |
| `get_apollo_email_accounts` | Read | Get a List of Email Accounts |
| `get_apollo_emailer_messages_id_activities` | Read | Check Email Stats |
| `get_apollo_emailer_messages_search` | Read | Search for Outreach Emails |
| `get_apollo_fields` | Read | Get a List of Fields |
| `get_apollo_labels` | Read | Get a List of All Lists |
| `get_apollo_notes` | Read | Get a List of Notes |
| `get_apollo_opportunities_opportunity_id` | Read | View Deal |
| `get_apollo_opportunities_search` | Read | List All Deals |
| `get_apollo_opportunity_stages` | Read | List Deal Stages |
| `get_apollo_organizations_enrich` | Read | Organization Enrichment |
| `get_apollo_organizations_id` | Read | Get Complete Organization Info |
| `get_apollo_organizations_organization_id_job_postings` | Read | Organization Job Postings |
| `get_apollo_phone_calls_search` | Read | Search for Calls |
| `get_apollo_typed_custom_fields` | Read | Get a List of All Custom Fields |
| `get_apollo_users_search` | Read | Get a List of Users |
| `patch_apollo_accounts_account_id` | Write | Update an Account |
| `patch_apollo_contacts_contact_id` | Write | Update a Contact |
| `patch_apollo_opportunities_opportunity_id` | Write | Update Deal |
| `post_apollo_accounts` | Write | Create an Account |
| `post_apollo_accounts_bulk_create` | Write | Bulk Create Accounts |
| `post_apollo_accounts_bulk_update` | Write | Bulk Update Accounts |
| `post_apollo_accounts_search` | Read | Search for Accounts |
| `post_apollo_accounts_update_owners` | Write | Update Account Owner for Multiple Accounts |
| `post_apollo_contacts` | Write | Create a Contact |
| `post_apollo_contacts_bulk_create` | Write | Bulk Create Contacts |
| `post_apollo_contacts_bulk_update` | Write | Bulk Update Contacts |
| `post_apollo_contacts_search` | Read | Search for Contacts |
| `post_apollo_contacts_update_owners` | Write | Update Contact Owner for Multiple Contacts |
| `post_apollo_contacts_update_stages` | Write | Update Contact Stage for Multiple Contacts |
| `post_apollo_emailer_campaigns_add_contact_ids` | Write | Add Contacts to a Sequence |
| `post_apollo_emailer_campaigns_remove_or_stop_contact_ids` | Write | Update Contact Status in a Sequence |
| `post_apollo_emailer_campaigns_search` | Read | Search for Sequences |
| `post_apollo_emailer_campaigns_sequence_id_abort` | Write | Deactivate a Sequence |
| `post_apollo_emailer_campaigns_sequence_id_approve` | Write | Activate a Sequence |
| `post_apollo_emailer_campaigns_sequence_id_archive` | Write | Archive a Sequence |
| `post_apollo_fields` | Write | Create a Custom Field |
| `post_apollo_mixed_companies_search` | Read | Organization Search |
| `post_apollo_mixed_people_api_search` | Read | People API Search |
| `post_apollo_news_articles_search` | Read | News Articles Search |
| `post_apollo_opportunities` | Write | Create Deal |
| `post_apollo_organizations_bulk_enrich` | Read | Bulk Organization Enrichment |
| `post_apollo_people_bulk_match` | Read | Bulk People Enrichment |
| `post_apollo_people_match` | Read | People Enrichment |
| `post_apollo_phone_calls` | Write | Create Call Records |
| `post_apollo_reports_sync_report` | Read | Query Analytics Report |
| `post_apollo_tasks` | Write | Create a Task |
| `post_apollo_tasks_bulk_create` | Write | Bulk Create Tasks |
| `post_apollo_tasks_search` | Read | Search for Tasks |
| `post_apollo_usage_stats_api_usage_stats` | Read | View API Usage Stats and Rate Limits |
| `put_apollo_phone_calls_id` | Write | Update Call Records |

### creator-discovery — AIsa Creator Discovery (2)

| Operation ID | Access | Purpose |
| --- | --- | --- |
| `post_waveinflu_email_lookup` | Read | Email Lookup |
| `post_waveinflu_similar_creators` | Read | Similar Creators |

### similarweb — AIsa Similarweb (23)

| Operation ID | Access | Purpose |
| --- | --- | --- |
| `get_similarweb_ad_networks` | Read | Ad Networks |
| `get_similarweb_audience_interest` | Read | Audience Interest |
| `get_similarweb_audience_overlap` | Read | Audience Overlap |
| `get_similarweb_deduplicated_audience` | Read | Deduplicated Audience |
| `get_similarweb_demographics` | Read | Demographics |
| `get_similarweb_keyword_competitors` | Read | Keyword Competitors |
| `get_similarweb_keywords` | Read | Website Keywords |
| `get_similarweb_landing_pages` | Read | Landing Pages |
| `get_similarweb_marketing_channel_sources_legacy` | Read | Marketing Channel Sources |
| `get_similarweb_popular_pages` | Read | Popular Pages |
| `get_similarweb_ppc_spend` | Read | PPC Spend |
| `get_similarweb_ranking` | Read | Website Ranking |
| `get_similarweb_referrals` | Read | Referrals |
| `get_similarweb_serp_players_aggregated` | Read | SERP Players - Aggregated |
| `get_similarweb_serp_players_timeseries` | Read | SERP Players - Clicks over time |
| `get_similarweb_similar_sites` | Read | SimilarSites |
| `get_similarweb_subdomains` | Read | Website Subdomains |
| `get_similarweb_technologies` | Read | Website Technologies |
| `get_similarweb_top_sites_ranking` | Read | Top Sites Ranking |
| `get_similarweb_traffic_engagement` | Read | Traffic & Engagement |
| `get_similarweb_website_top_geographies` | Read | Website Top Geographies |
| `get_similarweb_website_traffic_snapshot` | Read | Website Traffic Snapshot |
| `get_similarweb_website_traffic_trend` | Read | Website Traffic Trend |

## mail — AIsa Agent Mail

### agentmail — AIsa AgentMail (49)

| Operation ID | Access | Purpose |
| --- | --- | --- |
| `delete_agentmail_inbox` | Write | Delete Inbox |
| `delete_agentmail_inbox_draft` | Write | Delete Draft |
| `delete_agentmail_inbox_list_entry` | Write | Delete Inbox List Entry |
| `delete_agentmail_inbox_message` | Write | Delete Message |
| `delete_agentmail_inbox_thread` | Write | Delete Thread |
| `delete_agentmail_list_entry` | Write | Delete Account List Entry |
| `delete_agentmail_thread` | Write | Delete Any Thread |
| `get_agentmail_draft` | Read | Get Any Draft |
| `get_agentmail_draft_attachment` | Read | Get Any Draft Attachment |
| `get_agentmail_drafts` | Read | List All Drafts |
| `get_agentmail_inbox` | Read | Get Inbox |
| `get_agentmail_inbox_draft` | Read | Get Draft |
| `get_agentmail_inbox_draft_attachment` | Read | Get Draft Attachment |
| `get_agentmail_inbox_drafts` | Read | List Drafts |
| `get_agentmail_inbox_events` | Read | List Inbox Events |
| `get_agentmail_inbox_list_entries` | Read | List Inbox List Entries |
| `get_agentmail_inbox_list_entry` | Read | Get Inbox List Entry |
| `get_agentmail_inbox_message` | Read | Get Message |
| `get_agentmail_inbox_message_attachment` | Read | Get Message Attachment |
| `get_agentmail_inbox_message_raw` | Read | Get Raw Message |
| `get_agentmail_inbox_messages` | Read | List Messages |
| `get_agentmail_inbox_messages_search` | Read | Search Messages |
| `get_agentmail_inbox_metrics` | Read | Query Inbox Metrics |
| `get_agentmail_inbox_thread` | Read | Get Thread |
| `get_agentmail_inbox_thread_attachment` | Read | Get Thread Attachment |
| `get_agentmail_inbox_threads` | Read | List Threads |
| `get_agentmail_inbox_threads_search` | Read | Search Threads |
| `get_agentmail_inboxes` | Read | List Inboxes |
| `get_agentmail_list_entries` | Read | List Account List Entries |
| `get_agentmail_list_entry` | Read | Get Account List Entry |
| `get_agentmail_metrics` | Read | Query Account Metrics |
| `get_agentmail_thread` | Read | Get Any Thread |
| `get_agentmail_thread_attachment` | Read | Get Any Thread Attachment |
| `get_agentmail_threads` | Read | List All Threads |
| `get_agentmail_threads_search` | Read | Search All Threads |
| `patch_agentmail_inbox` | Write | Update Inbox |
| `patch_agentmail_inbox_draft` | Write | Update Draft |
| `patch_agentmail_inbox_message` | Write | Update Message Labels |
| `patch_agentmail_inbox_thread` | Write | Update Thread Labels |
| `patch_agentmail_thread` | Write | Update Any Thread Labels |
| `post_agentmail_inbox` | Write | Create Inbox |
| `post_agentmail_inbox_draft` | Write | Create Draft |
| `post_agentmail_inbox_draft_send` | Write | Send Draft |
| `post_agentmail_inbox_list_entry` | Write | Create Inbox List Entry |
| `post_agentmail_inbox_message_forward` | Write | Forward Message |
| `post_agentmail_inbox_message_reply` | Write | Reply To Message |
| `post_agentmail_inbox_message_reply_all` | Write | Reply All To Message |
| `post_agentmail_inbox_message_send` | Write | Send Message |
| `post_agentmail_list_entry` | Write | Create Account List Entry |

## Account helper

`account` — Read AIsa account balance, subscription wallet and recent usage with use. This helper is additional to the 575 migrated operations.

## Supporting references

Read the relevant reference when interpreting its provider's data:

- [venue_field_map](references/prediction-market-data/aisa-venue-field-map.md) — Field-by-field mapping between Polymarket and Kalshi for the concepts that do not translate cleanly: identifiers, pagination, time filters, and status. Read this before querying both venues for the same question — three of the differences (boolean vs enum status, ISO vs Unix timestamps, offset vs cursor paging) produce wrong results rather than errors.
- [reading_the_bundle](references/stock-pulse/aisa-reading-the-bundle.md) — What each field in the twitter_stock_pulse response actually means, and the three ways it is commonly misread: treating `mentions` as a ranking, missing a partial failure recorded in `coverage`, and not noticing that one tool call billed several upstream calls. Read once before interpreting the bundle; it does not change between calls.
- [topic_report_template](references/twitter-api/aisa-topic-report-template.md) — A section-by-section skeleton for writing up X/Twitter topic research so a reader can audit it: what was searched, what came back, who said it, and what is missing. Read this when the deliverable is a written report rather than raw posts. Pairs with the track_topic_on_x prompt, which covers how to gather the material.

## Credentials

If credentials are missing, configure them locally through the client’s MCP environment or credential settings using the package setup instructions. Do not ask the user to paste API keys into the conversation.
