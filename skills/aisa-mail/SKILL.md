---
name: aisa-mail
description: "Use AgentMail for agent email: create and manage inboxes, list or
  read messages and threads, find attachments, prepare and manage drafts, send
  or reply to messages, and manage email resources. Use when asked to work with
  AgentMail or an agent inbox, or when an email task needs a programmatic
  mailbox. 代理邮箱、创建邮箱、收件箱、查邮件、读邮件、会话、附件、邮件草稿、发邮件、回复邮件、邮件自动化。"
---

# AIsa Agent Mail

Inboxes, threads, drafts and sending for agents through AgentMail.

Optional input: `task` (default `""`) — what you want to find out.

49 operations across these servers: `agentmail`. Read [operation coverage](references/operations.md) to select an operation, then read its schema.

Use the local MCP server named `aisa-api`. Read the linked local operation details for its full description, input schema, defaults and annotations; then execute with `use({operation_id: "<id>", arguments: {...}})`. You do not need to call get_details when the installed details already provide the contract. Use `get_details({operation_id: "<id>"})` if local details are missing or the installed skills and running server differ; the running server's schema takes precedence. Prices and live availability are enforced by the AIsa gateway, not these static files.

Include `max_price_usd` when needed: it applies to each upstream request, including composed fan-outs, not the workflow total. Use `batch_use` for up to 20 independent calls; keep dependent steps sequential. If the exact operation is pinned, it can also be called directly with its schema.

A matching workflow already links its required operations: read those details directly without loading the global directory. For other tasks, start with the short installed `aisa-api` skill and follow a relevant server index. Use `search` only when the right operation is unclear. Native MCP resources/read can read `skill://aisa-api/SKILL.md` or `skill://aisa-api/references/operations/<operation_id>.md`. Skills do not execute actions or expand the user's authorization.

Plan the minimal call set; use a tool's list input instead of looping when available. Label unavailable sources and any substitutes.
