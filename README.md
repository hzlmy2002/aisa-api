# AIsa API · Local stdio MCP

Bring AIsa APIs and task workflows to Codex, Claude Code, and Hermes. Built with TypeScript and Node.js and distributed through npm, this package runs the MCP server locally and sends HTTP requests directly to `api.aisa.one`. The AIsa gateway handles authentication and billing.

The package includes **26 server definitions, 571 atomic API tools, 4 composed tools, 27 skills, and 3 migrated reference resources**. API coverage matches the operations supported by aisa-mcp; it does not include additional endpoints documented in docs but not exposed by that MCP.

## Installation

Requires **Node.js 20.6.0 or newer**. Node.js 22/24 LTS is recommended for new installations. Node 18 passes the current execution tests, but a dependency requires Node >=20, so Node 18 is not supported.

Install from npm:

```sh
npx -y @hzlmy2002/aisa-api@0.1.2 setup
```

Without `--client`, setup detects and configures existing Codex, Claude Code, and Hermes installations. To select one client or start the server directly:

```sh
npx -y @hzlmy2002/aisa-api@0.1.2 setup --client codex
npx -y @hzlmy2002/aisa-api@0.1.2 serve
```

`setup` guides you through OAuth sign-in and also supports `--auth key`. Restart or refresh the configured clients after installation to load the MCP server and skills. You can also provide `AISA_API_KEY` in the server's launch environment. Do not put credentials in source files or conversation history.

The versioned npm commands require that release to be available in the registry. For development, build and install from source:

```sh
npm ci
npm run generate
npm run build
node dist/cli.js setup --client codex
```

## Tools and skills

Version `0.1.2` includes directory-based discovery, broader skill descriptions, creator outreach and recent-topic research workflows, and Node.js >=20.6.0 compatibility.

The server exposes four tools by default. The short [aisa-api/SKILL.md](skills/aisa-api/SKILL.md) entry links to 26 server indexes grouped by category. Each index links to complete local operation details. These 575 detail files preserve descriptions, input/output schemas, defaults, and annotations. Read the relevant contract and call `use` without an extra `get_details` request.

```text
skills/aisa-api/
  SKILL.md                          Short navigation entry
  references/
    servers/<server>.md             Operations grouped by server
    operations/<operation_id>.md    Complete operation contracts
    workflows.md                    Task workflow index
    directory.md                    Optional full directory
```

When a workflow matches the task, read its linked operation details directly. The full directory is available for global browsing but should not be loaded in full by default. Use `get_details` when files are missing, local details differ from the running server, or argument validation suggests a version mismatch. The running server's schema takes precedence. Static files do not promise live pricing, balance, or availability.

| Tool | Purpose |
| --- | --- |
| `search` | Discover an operation when the directory does not identify it clearly |
| `get_details` | Retrieve the running contract when local details are missing or outdated |
| `use` | Execute any supported operation using its original ID and arguments |
| `batch_use` | Execute up to 20 independent operations, with at most 5 running concurrently |

`search_skills`, `list_categories`, `list_resources`, and `read_resource` are hidden by default. Enable them for legacy workflows with `serve --discovery-tools` or `setup --discovery-tools`. Native MCP `resources/list` and `resources/read` remain available. The entry URI is `skill://aisa-api/SKILL.md`; server indexes and operation details use `skill://aisa-api/references/servers/<server>.md` and `skill://aisa-api/references/operations/<operation_id>.md`. Details can be read by URI without adding hundreds of files to the default resource listing.

`account` is an additional helper operation available through `use` for reading balance, subscription wallet, and recent usage.

Example arguments for `use`:

```json
{"operation_id":"get_coingecko_simple_price","arguments":{"ids":"bitcoin","vs_currencies":"usd"},"max_price_usd":0.01}
```

You can explicitly expose selected API tools, or all of them. `setup` saves these options in the client configuration. The following examples use a source build:

```sh
node dist/cli.js setup --client codex --modules seo,gtm
node dist/cli.js serve --server similarweb
node dist/cli.js serve --modules seo-all
node dist/cli.js serve --all-tools
```

`--server` and `--modules` control which API tools appear directly in the tool list. All supported operations remain available through `use`. Operations that are not exposed directly cannot be called by tool name.

The skills include 17 migrated workflow prompts, preserving their input defaults, steps, stopping conditions, and `uses` references; two additional layered workflows for creator outreach and recent-topic research; six category skills; a GTM skill; and the AIsa entry skill.

| Client | Skills location | MCP configuration |
| --- | --- | --- |
| Codex | `~/.agents/skills/aisa-*` | `~/.codex/config.toml` |
| Claude Code | `~/.claude/skills/aisa-*` | `~/.claude.json` |
| Hermes | `~/.hermes/skills/aisa-*` | `~/.hermes/config.yaml` |

Local OAuth credentials and installation ownership records live in `~/.aisa/aisa-api/`. This package does not read or clear scene-agent's shared OAuth file. Installation, upgrades, and uninstallation preserve unrelated MCP configuration and stop before overwriting user-modified managed files.

```sh
npx -y @hzlmy2002/aisa-api@0.1.2 status
npx -y @hzlmy2002/aisa-api@0.1.2 uninstall --client codex
```

## API behavior

- Tool names, descriptions, input schemas, and annotations come from the original MCP's registered tool contracts. Routes come from the docs OpenAPI specifications.
- The original schemas for 49 AgentMail tools require `Authorization`. This package removes that field from effective tool arguments and injects configured credentials through the transport. Original snapshots remain unchanged; adaptations are recorded in `catalog/adaptations.json`.
- JSON object bodies retain the original MCP's flat arguments. Array bodies, including DataForSEO requests, use `body: [...]`.
- Parameters derived from `$ref` and mappings for parameters with identical names come from the original MCP snapshot rather than a separately approximated schema.
- Upstream JSON is returned without forcing third-party responses to validate against the output schema. Top-level arrays appear under `result` in MCP `structuredContent`. Text responses retain `text` and `content_type`.
- Provider error fields inside HTTP 200 responses are preserved. Callers should inspect provider status rather than assuming every HTTP 200 response contains successful data.
- Operations inherit their server timeout settings. Requests that may already have been billed are not automatically retried.
- `max_price_usd` is sent as `X-AISA-Max-Price-USD`. It limits **each upstream request**, including every subrequest of composed tools, rather than the total workflow budget. Directly exposed API tools retain their original schemas; use `use` or `batch_use` when a price cap is needed.
- `get_details` reports pricing as unknown; the gateway determines actual pricing and availability. Tool search uses local term matching and does not depend on the hosted tool router.

## Building and verification

```sh
npm run generate
npm run check
npm test
npm pack
```

OAuth tests require permission to listen on temporary loopback ports. Other tests use mocks and isolated directories; they do not read the developer's real credentials. `npm pack` regenerates the catalogs and compiles the code. The package includes JavaScript, tool catalogs, skills, and references. End users do not need Python or adjacent scene-agent, aisa-mcp, or docs source directories.

For optional live verification, provide a temporary key through `AISA_API_KEY` and run `node scripts/live-smoke.mjs`. It calls three fixed read-only APIs, does not call Similarweb, and does not retry automatically. The default per-request price cap is `$0.01`, configurable with `AISA_SMOKE_MAX_PRICE_USD` up to `$0.05`. Results record only status and response field names, not the key or complete response data.

## Sources and updates

- `upstream/servers`: Original MCP coverage and server metadata.
- `upstream/specs`: The 33 corresponding OpenAPI specifications from docs.
- `upstream/tool-contracts.json`: The 575 registered FastMCP tool contracts and parameter location mappings.
- `upstream/prompts`, `upstream/modules.yaml`, and `upstream/resources`: Workflows, categories, and reference content.
- `upstream/snapshot.json`: Source commits and content checksums.

`scripts/generate-catalog.mjs` and `scripts/generate-skills.mjs` generate release data using Node.js. Changes to pinned source files fail checksum validation. When updating sources, review operation coverage, tool contracts, parameter mappings, and snapshots together to avoid pairing new routes with old schemas. Specifications are not downloaded at runtime.

Publish with `npm publish --access public` after confirming that the npm account has publishing permission for the `@hzlmy2002` scope.

Local workflow extension sources live in `workflows/`. Their entries link to task-specific references and operation contracts for on-demand reading. See [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md) for attribution and adaptation notes.
