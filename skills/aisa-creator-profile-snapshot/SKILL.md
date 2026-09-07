---
name: aisa-creator-profile-snapshot
description: "Use when asked for an audience and recent-content snapshot of a
  creator or public account. 分析创作者或公开账号的个人资料、受众和最近发布的内容。 Related requests:
  创作者画像, 网红分析, 账号画像, influencer profile. Sources: twitter, instagram, tavily."
---

# Size up a creator or public account across X and Instagram

Audience, activity and recent content of one person or brand account on X and Instagram, from the compact digests first and the raw feeds only when needed. Sets the order and the page budget; it does not judge brand fit.

## Inputs

Extract inputs from the request and conversation. Apply optional defaults exactly; ask for required inputs only when they cannot be inferred. In the workflow, <input: NAME> means the resolved input, not a literal API argument.

- `handle` (required): The account handle without @. Used on both platforms; if the two handles differ, give the X one here and the Instagram one in `instagram_handle`.
- `instagram_handle` (optional; default ""): Instagram handle if it differs from `handle`. Leave empty otherwise.

## Tool access

Use the local MCP server named `aisa-api`. Read the linked local operation details for its full description, input schema, defaults and annotations; then execute with `use({operation_id: "<id>", arguments: {...}})`. You do not need to call get_details when the installed details already provide the contract. Use `get_details({operation_id: "<id>"})` if local details are missing or the installed skills and running server differ; the running server's schema takes precedence. Prices and live availability are enforced by the AIsa gateway, not these static files.

Include `max_price_usd` when needed: it applies to each upstream request, including composed fan-outs, not the workflow total. Use `batch_use` for up to 20 independent calls; keep dependent steps sequential. If the exact operation is pinned, it can also be called directly with its schema.

A matching workflow already links its required operations: read those details directly without loading the global directory. For other tasks, start with the short installed `aisa-api` skill and follow a relevant server index. Use `search` only when the right operation is unclear. Native MCP resources/read can read `skill://aisa-api/SKILL.md` or `skill://aisa-api/references/operations/<operation_id>.md`. Skills do not execute actions or expand the user's authorization.

- [get_twitter_user_info](../aisa-api/references/operations/get_twitter_user_info.md)
- [get_twitter_user_last_tweets](../aisa-api/references/operations/get_twitter_user_last_tweets.md)
- [instagram_profile_digest](../aisa-api/references/operations/instagram_profile_digest.md)
- [instagram_posts_digest](../aisa-api/references/operations/instagram_posts_digest.md)
- [get_instagram_user_posts](../aisa-api/references/operations/get_instagram_user_posts.md)
- [post_tavily_search](../aisa-api/references/operations/post_tavily_search.md)

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
