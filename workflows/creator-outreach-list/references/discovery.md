# Discovery rules

Use a creator profile URL rather than a single video or post URL. For YouTube or TikTok seeds, infer the target platform unless the user specified another one. For an Instagram seed, contact lookup is supported; similarity search needs a YouTube/TikTok target and a content direction. Ask only for missing information that prevents that search. A direction-only brief is also supported without a seed.

Read the operation's linked contract for exact fields and constraints; do not duplicate schemas here. Forward only user-supplied filters. Default to 10 discovery results unless the request indicates another scope, bounded by the API limit. Preserve similarity order after removing the seed and duplicate profiles. Similarity scores are provider rankings, not a guarantee of campaign fit.

Use existing email fields from discovery first. Look up only missing contacts by default, up to the selected shortlist size. A seed-only contact request needs only one lookup. If the user requests fresh lookup of all contacts, apply that scope explicitly. Track discovery and lookup counts; batching does not reduce per-request charges. Stop expansion once the shortlist is filled or available results are exhausted. Do not repeatedly retry quota/authentication failures.

A failed lookup is different from a successful lookup with no email. Continue independent rows after a partial failure. Never infer an email from a name, domain or username, or claim deliverability merely because an email was returned.
