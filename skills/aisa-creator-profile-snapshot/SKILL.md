---
name: aisa-creator-profile-snapshot
description: Audience, activity and recent content of one person or brand
  account on X and Instagram, from the compact digests first and the raw feeds
  only when needed. Sets the order and the page budget; it does not judge brand
  fit. Use when asked for an audience and recent-content snapshot of a creator
  or public account. 分析创作者或公开账号的个人资料、受众和最近发布的内容。
---

# Size up a creator or public account across X and Instagram

## Inputs

Extract inputs from the request and conversation. Apply optional defaults exactly; ask for required inputs only when they cannot be inferred. In the workflow, <input: NAME> means the resolved input, not a literal API argument.

- `handle` (required): The account handle without @. Used on both platforms; if the two handles differ, give the X one here and the Instagram one in `instagram_handle`.
- `instagram_handle` (optional; default ""): Instagram handle if it differs from `handle`. Leave empty otherwise.

## Tool access

Use the local MCP server named `aisa-api`. For each operation ID, call `get_details({operation_id: "<id>"})` to read its schema, description and annotations; pricing is enforced by the AIsa gateway. Execute with `use({operation_id: "<id>", arguments: {...}})`. Include `max_price_usd` when a price ceiling is needed: it applies per upstream request, including each request in a composed operation's fan-out, not to the workflow total. If that exact operation is pinned and exposed as a tool, call it directly using its schema. Operation IDs below are exact catalog names, including composed operations; do not add server prefixes.

Use `batch_use` for up to 20 independent calls, respecting the workflow's order, dependencies and call budget. Keep dependent steps sequential.

Find APIs and workflows in the installed `aisa-api` skill: its single SKILL.md contains the complete operation directory and links to workflow skills. Select the exact operation ID there, then call get_details and use; no search call is needed. Clients with MCP resource support can read `skill://aisa-api/SKILL.md` through native resources/read. Skills provide instructions; reading one does not execute operations or expand the user's authorization. Perform external actions only within the user's authorized scope.

- `get_twitter_user_info`
- `get_twitter_user_last_tweets`
- `instagram_profile_digest`
- `instagram_posts_digest`
- `get_instagram_user_posts`
- `post_tavily_search`

## Supporting resources

Read when relevant to interpreting the returned data:

- [Structure for a defensible X/Twitter topic report](references/aisa-topic-report-template.md) — A section-by-section skeleton for writing up X/Twitter topic research so a reader can audit it: what was searched, what came back, who said it, and what is missing. Read this when the deliverable is a written report rather than raw posts. Pairs with the track_topic_on_x prompt, which covers how to gather the material.

## Workflow

Profile snapshot for: <input: handle>
Instagram handle (if different): <input: instagram_handle>

X/Twitter tools are on the Hive GTM subscription: if the first X call
answers 402, say so, skip X, and finish with Instagram.

1. X: who they are. Call `get_twitter_user_info` with userName=<input: handle>
   for followers, following, account age, verification and bio.

2. X: what they post. Call `get_twitter_user_last_tweets` with
   userName=<input: handle> and includeReplies=false, one page. Note posting
   cadence, the median engagement, and the two best-performing posts.

3. Instagram: who they are. Call `instagram_profile_digest` with
   handle=<input: instagram_handle> (or <input: handle> when empty). This is the
   compact digest — a few KB instead of the raw profile's hundreds — and
   is enough for followers, post count and bio.

4. Instagram: what they post. Call `instagram_posts_digest` with the
   same handle, one page. Only if you need captions or media details the
   digest strips, call `get_instagram_user_posts` for that one page —
   never both by default, the raw feed is large.

Stop here. Followers lists and reels are separate tasks.

Report: one table with platform / followers / posts in the last 30 days /
median engagement / notable posts, then three sentences on what the
account is actually about. Name the platform next to every number.

Typical call budget: 3–4 calls.

## Fallbacks

- X and Instagram are both subscription-only. If X answers 402, finish with
  Instagram; if both do, run one `post_tavily_search` for
  query="<input: handle> instagram OR twitter profile" and report follower counts
  only as "reported by web sources, date unknown".
- If the Instagram digest fails but the raw feed does not, use
  `get_instagram_user_posts` once and say the payload was the raw one.
- Say in the report which fallback was used and why.
