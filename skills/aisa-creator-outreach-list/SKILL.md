---
name: aisa-creator-outreach-list
description: "Find similar YouTube or TikTok creators, research influencers,
  look up creator emails, or build a KOL outreach shortlist from a profile or
  campaign brief. 达人拓展、相似博主、网红名单、创作者邮箱、KOL联系表、YouTube和TikTok达人发现、Instagram邮箱查询。
  Related requests: influencer prospecting, creator contact list, 达人名单. Sources:
  waveinflu."
---

# Find similar creators and build a contact list

Discover creators from a seed profile or content brief, then fill missing contact data and produce a traceable shortlist.

## Inputs

Extract inputs from the request and conversation. Apply optional defaults exactly; ask for required inputs only when they cannot be inferred. In the workflow, <input: NAME> means the resolved input, not a literal API argument.

- `brief` (required): Seed creator profile URL or content direction, target platform, and any audience filters.

## Tool access

Use the aisa-api MCP. Read only the linked contracts needed for the current step, then call use with operation_id and arguments. get_details is the fallback for missing or mismatched local contracts. Keep dependent steps sequential; batch_use is for independent calls. max_price_usd applies per upstream request, not to the whole workflow. Credentials come from setup. Read supporting references only at the step that links them.

- [post_waveinflu_similar_creators](../aisa-api/references/operations/post_waveinflu_similar_creators.md)
- [post_waveinflu_email_lookup](../aisa-api/references/operations/post_waveinflu_email_lookup.md)

## Workflow

Brief: <input: brief>

1. Read [discovery rules](references/discovery.md) to resolve the seed, target platform, filters and call budget.
2. Read only the needed operation contract: use `post_waveinflu_similar_creators` for discovery and `post_waveinflu_email_lookup` for contact-only requests or missing emails. Preserve emails already returned by discovery; do not pay to retrieve the same data again unless fresh verification was requested.
3. Deduplicate and keep provider similarity order. Batch independent missing-email lookups within the chosen shortlist.
4. Read [report format](references/report.md) when preparing the deliverable. Report missing contacts and failed lookups separately. Stop at the requested shortlist; collecting contacts does not authorize outreach.
