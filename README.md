# AIsa API · 本地 stdio MCP

把 AIsa 已有 API 和任务 workflows 带到 Codex、Claude Code、Hermes。采用 TypeScript / Node.js，通过 npm 分发；本地运行 MCP，HTTP 请求直接发送到 `api.aisa.one`，认证与计费仍由 AIsa 网关处理。

当前迁移包含 **26 个 server、571 个原子 API 工具、4 个组合工具、25 份 skills、3 份参考资源**。API 范围以 aisa-mcp 已支持的 operation 为准；不包含 docs 中尚未由 aisa-mcp 暴露的其他接口。

## 开发版使用

需要 Node.js 22 或更新版本。以下命令从源码构建和安装；npm 接入命令见下方。

```sh
npm ci
npm run generate
npm run build
node dist/cli.js setup --client codex
```

`setup` 引导 OAuth 登录，也支持 `--auth key`。省略 `--client` 会检测并配置已存在的 Codex、Claude Code 和 Hermes。安装后重启或刷新客户端以加载 MCP 和 skills。

也可以在启动环境提供 `AISA_API_KEY`，直接执行 `node dist/cli.js serve`。凭据不要写进源码或聊天记录。

标准 npm 接入命令：

```sh
npx -y @hzlmy2002/aisa-api@0.1.0 setup
npx -y @hzlmy2002/aisa-api@0.1.0 setup --client codex
npx -y @hzlmy2002/aisa-api@0.1.0 serve
```

## 工具与 skills

默认只展示 8 个工具，避免把数百个 API schema 常驻上下文：

| 工具 | 用途 |
| --- | --- |
| `search` | 按任务、provider 或 operation ID 搜索 API |
| `get_details` | 查看原 MCP 描述、参数 schema、annotations 和路由 |
| `use` | 使用原 operation ID 和参数执行任意已支持操作 |
| `batch_use` | 最多 20 个独立操作，最多 5 个操作并发 |
| `list_categories` | 浏览分类与 server 清单 |
| `search_skills` | 用中英文任务描述查找 workflow |
| `list_resources` | 列出 skills 和参考资源 |
| `read_resource` | 读取指定 skill 或参考资源 |

`account` 是额外的辅助操作，可通过 `use` 读取余额、订阅钱包和近期用量。

```json
{"operation_id":"get_coingecko_simple_price","arguments":{"ids":"bitcoin","vs_currencies":"usd"},"max_price_usd":0.01}
```

可以固定展示部分或全部工具，`setup` 会将这些参数保存在客户端配置中：

```sh
node dist/cli.js setup --client codex --modules seo,gtm
node dist/cli.js serve --server similarweb
node dist/cli.js serve --modules seo-all
node dist/cli.js serve --all-tools
```

`--server` 和 `--modules` 控制直接列出的工具，全量 API 仍能通过 `use` 调用。未固定展示的工具不能直接用工具名调用。

17 个原 workflow prompts 已转为 skills，保留输入默认值、步骤、停止条件和 `uses` 工具引用；另提供 6 个分类 skill、GTM skill 和 AIsa 入口 skill。安装目录：

| 客户端 | skills | MCP 配置 |
| --- | --- | --- |
| Codex | `~/.agents/skills/aisa-*` | `~/.codex/config.toml` |
| Claude Code | `~/.claude/skills/aisa-*` | `~/.claude.json` |
| Hermes | `~/.hermes/skills/aisa-*` | `~/.hermes/config.yaml` |

本地 OAuth 和安装所有权记录存储在 `~/.aisa/aisa-api/`，不读取或清除 scene-agent 的共享 OAuth 文件。安装/升级/卸载会保留其他 MCP 配置，并在文件被用户修改时停止覆盖。

```sh
node dist/cli.js status
node dist/cli.js uninstall --client codex
```

## API 行为

- 工具名称、描述、输入 schema、annotations 从原 MCP 的实际工具表迁入；路由来自 docs OpenAPI。
- 49 个 AgentMail 工具的原 schema 含必填 `Authorization`；本地版从有效工具参数中移除该字段，由配置凭据统一注入。原始快照不改动，适配清单记录在 `catalog/adaptations.json`。
- JSON 对象请求体保持原 MCP 的平铺参数；DataForSEO 等数组请求体使用 `body: [...]`。
- `$ref` 生成的参数和同名参数位置映射来自原 MCP 快照，不另写一套近似 schema。
- 返回上游 JSON，不强制第三方响应通过 output schema；顶层数组在 MCP `structuredContent` 中放入 `result`。文本响应保留为 `text` 和 `content_type`。
- HTTP 200 中的 provider 错误字段原样保留，不被伪装成正常数据；调用方应检查 provider 状态。
- 继承 server 的超时设置；不自动重试可能已计费的请求。
- `max_price_usd` 传为 `X-AISA-Max-Price-USD`，是**每笔上游请求**的上限，包括组合工具的每个子请求，不是整个任务的总预算。直接固定展示的 API 参数保持原 schema；需要价格帽时通过 `use` / `batch_use` 执行。
- 本地 `get_details` 的价格为 unknown，实际价格和可用性由网关决定。工具搜索为本地词项匹配，不依赖服务端 tool-router。

## 构建与验证

```sh
npm run generate
npm run check
npm test
npm pack
```

OAuth 测试需要允许监听临时 loopback 端口，其余测试使用 mock/隔离目录，不读取开发者真实凭据。`npm pack` 会重新生成目录并编译，产物包含 JS、工具目录和 skills，不要求用户安装 Python，也不依赖旁边的 scene-agent、aisa-mcp 或 docs 源码目录。

可选真实验证：将临时 key 注入 `AISA_API_KEY` 后运行 `node scripts/live-smoke.mjs`。固定使用三个只读 API，不调用 Similarweb，不自动重试。默认单笔价格帽 `$0.01`，可用 `AISA_SMOKE_MAX_PRICE_USD` 调整，脚本最高允许 `$0.05`；结果仅记录状态和返回字段名称，不保存 key 或完整数据。

## 来源与更新

- `upstream/servers`：原 MCP 的支持清单与 server 信息。
- `upstream/specs`：docs 中对应的 33 份 OpenAPI。
- `upstream/tool-contracts.json`：原 FastMCP 实际注册的 575 份工具契约和参数位置映射。
- `upstream/prompts`、`upstream/modules.yaml`、`upstream/resources`：workflow、分类和参考内容。
- `upstream/snapshot.json`：来源 commit 与内容校验值。

`scripts/generate-catalog.mjs` 和 `scripts/generate-skills.mjs` 在 Node.js 中生成发行数据。源文件变化会触发校验失败，更新时需一起审查操作覆盖、工具契约、参数映射和快照，避免生成出新路由配旧 schema 的版本。运行时不下载 specs。

发布使用 `npm publish --access public`；执行前应确认 npm 账号具有 `@hzlmy2002` scope 的发布权限。
