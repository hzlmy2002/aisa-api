# AIsa Similarweb

Website and search intelligence from Similarweb through AIsa: monthly traffic and engagement for any domain, its rank, where the traffic comes from by marketing channel, which sites refer it, what it spends on paid search and which ad networks carry its display, who the audience is and what else that audience visits, which sites are similar and how much audience they share, what the site is built with, which of its pages and subdomains earn the traffic, and which keywords and search rivals it has. Calls are billed in Data Credits, per row or per requested metric; use `limit` to bound cost and `max_price_usd` to cap a call. Data vintage: Similarweb reports complete months — a month becomes queryable only after it closes, so say which months a number covers. Every endpoint requires the Hive GTM Growth subscription; without it calls answer 402 — the pay-per-call cross-checks for traffic and authority are DataForSEO Labs' bulk traffic estimation and domain rank overview, one search away.


23 operations. Follow only the needed detail links, then call use; get_details is a fallback.

- [get_similarweb_ad_networks](../operations/get_similarweb_ad_networks.md) — Ad Networks
- [get_similarweb_audience_interest](../operations/get_similarweb_audience_interest.md) — Audience Interest
- [get_similarweb_audience_overlap](../operations/get_similarweb_audience_overlap.md) — Audience Overlap
- [get_similarweb_deduplicated_audience](../operations/get_similarweb_deduplicated_audience.md) — Deduplicated Audience
- [get_similarweb_demographics](../operations/get_similarweb_demographics.md) — Demographics
- [get_similarweb_keyword_competitors](../operations/get_similarweb_keyword_competitors.md) — Keyword Competitors
- [get_similarweb_keywords](../operations/get_similarweb_keywords.md) — Website Keywords
- [get_similarweb_landing_pages](../operations/get_similarweb_landing_pages.md) — Landing Pages
- [get_similarweb_marketing_channel_sources_legacy](../operations/get_similarweb_marketing_channel_sources_legacy.md) — Marketing Channel Sources
- [get_similarweb_popular_pages](../operations/get_similarweb_popular_pages.md) — Popular Pages
- [get_similarweb_ppc_spend](../operations/get_similarweb_ppc_spend.md) — PPC Spend
- [get_similarweb_ranking](../operations/get_similarweb_ranking.md) — Website Ranking
- [get_similarweb_referrals](../operations/get_similarweb_referrals.md) — Referrals
- [get_similarweb_serp_players_aggregated](../operations/get_similarweb_serp_players_aggregated.md) — SERP Players - Aggregated
- [get_similarweb_serp_players_timeseries](../operations/get_similarweb_serp_players_timeseries.md) — SERP Players - Clicks over time
- [get_similarweb_similar_sites](../operations/get_similarweb_similar_sites.md) — SimilarSites
- [get_similarweb_subdomains](../operations/get_similarweb_subdomains.md) — Website Subdomains
- [get_similarweb_technologies](../operations/get_similarweb_technologies.md) — Website Technologies
- [get_similarweb_top_sites_ranking](../operations/get_similarweb_top_sites_ranking.md) — Top Sites Ranking
- [get_similarweb_traffic_engagement](../operations/get_similarweb_traffic_engagement.md) — Traffic & Engagement
- [get_similarweb_website_top_geographies](../operations/get_similarweb_website_top_geographies.md) — Website Top Geographies
- [get_similarweb_website_traffic_snapshot](../operations/get_similarweb_website_traffic_snapshot.md) — Website Traffic Snapshot
- [get_similarweb_website_traffic_trend](../operations/get_similarweb_website_traffic_trend.md) — Website Traffic Trend
