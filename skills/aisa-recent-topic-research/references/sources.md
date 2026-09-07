# Select sources and bound retrieval

Resolve relative dates from the current date, not from remembered examples. State the start/end date and timezone. Default to the last 30 days. Search filters narrow retrieval; validate returned dates because source filters differ.

| Question | Initial sources | Parameters to check in the linked contract |
| --- | --- | --- |
| Company developments or launch facts | Tavily web search | start_date, end_date, max_results=8; prefer primary announcements |
| Reactions or social discussion | X and/or Reddit, plus web for factual context | X query date operators and queryType=Latest; Reddit sort=new and the nearest timeframe |
| Product or competitor comparison | Web plus the most relevant community source | Comparable query variants and the same date window |

Default to at most three initial searches, one page per selected source. Inspect snippets, retain at most 12 evidence items, then extract at most three pages in one Tavily call or read comments on at most two Reddit threads when needed. Allow at most two additional search/page calls to close a specific gap; stop if they yield no new relevant evidence. A larger explicit research request can justify a larger stated budget.

When a platform request fails on access, quota or availability, do not repeat it unchanged. If useful, substitute one Tavily query restricted to that platform's domain within the remaining budget; label it as web-index evidence, not direct platform coverage. Report failures separately from zero matches.

This workflow directly covers web, X and Reddit only. A request about another platform can be researched through clearly labelled indexed pages if appropriate; do not claim native TikTok, GitHub, Hacker News, Instagram or YouTube coverage from this workflow. For native data, consult the relevant AIsa server index only when the task needs it. Do not invoke external scripts, secondary model gateways or a scheduler merely to run this brief.
