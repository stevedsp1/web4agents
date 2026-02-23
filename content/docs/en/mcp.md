---
title: "Model Context Protocol (MCP)"
slug: "mcp"
description: "What MCP is, how it works, and how to expose your services to AI agents through a standardized protocol."
category: "protocols"
order: 1
publishedAt: "2026-02-01"
status: "published"
---

## What is the Model Context Protocol?

The **Model Context Protocol (MCP)** is an open standard developed by Anthropic (announced in November 2024) that defines a unified way for AI agents to connect to external tools, data sources, and services. It is the "USB-C of AI integrations": a single interface that any agent can use to interact with any MCP-compatible server.

Before MCP, each AI assistant had its own proprietary plugin or tool format. MCP standardizes the connection layer, allowing a single server implementation to be used by Claude, any future MCP-compatible agent, or a custom agent built on top of an LLM.

The specification is open source and available at [modelcontextprotocol.io](https://modelcontextprotocol.io).

## MCP architecture

```
AI Agent (MCP Client)
        ↕ MCP protocol (JSON-RPC over stdio / SSE / HTTP)
MCP Server
        ↕ Business logic
Your API / Database / Service
```

**Three key concepts:**

| Concept | Description |
|---------|-------------|
| **Tools** | Functions the agent can call (e.g., `search_products`, `create_invoice`) |
| **Resources** | Data sources the agent can read (e.g., a database, a file, a calendar) |
| **Prompts** | Pre-defined prompt templates the agent can invoke |

## MCP vs. traditional API integration

| | Traditional API | MCP |
|---|---|---|
| Discovery | Manual documentation | Auto-discoverable via tool list |
| Authentication | Per-integration setup | Standardized, per-server |
| Schema | OpenAPI / custom | JSON Schema in MCP spec |
| Agent compatibility | One integration per agent | One server, all MCP agents |
| Streaming | Rarely supported | Native (SSE) |

## How to expose your service via MCP

### 1. Install the MCP SDK

```bash
npm install @modelcontextprotocol/sdk
```

### 2. Create an MCP server

```typescript
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";

const server = new Server(
  { name: "my-service", version: "1.0.0" },
  { capabilities: { tools: {} } }
);

server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [
    {
      name: "get_product",
      description: "Retrieve a product by its ID",
      inputSchema: {
        type: "object",
        properties: {
          id: { type: "string", description: "The product ID" },
        },
        required: ["id"],
      },
    },
  ],
}));

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  if (request.params.name === "get_product") {
    const { id } = request.params.arguments as { id: string };
    const product = await fetchProduct(id); // your business logic
    return {
      content: [{ type: "text", text: JSON.stringify(product) }],
    };
  }
  throw new Error("Unknown tool");
});

const transport = new StdioServerTransport();
await server.connect(transport);
```

### 3. Transport options

| Transport | Use case |
|-----------|---------|
| **stdio** | Local MCP servers (CLI tools, desktop apps) |
| **SSE (Server-Sent Events)** | Remote servers accessible via HTTP |
| **HTTP streaming** | REST-compatible remote servers |

For web services, use SSE or HTTP streaming to make your MCP server accessible to remote agents.

## Token-efficient tool design

A key insight from Cloudflare's February 2026 implementation of MCP: **fewer tools with broader capabilities beat many narrow tools**. Exposing 2,500 API endpoints as 2,500 tools would consume over 1 million tokens of context just for the tool list. **Code Mode** is one approach: the server exposes only two tools (e.g. `search()` to explore the API spec, `execute()` to run requests). The agent sends code (e.g. JavaScript) that runs in a sandbox on the server; the token footprint stays fixed (~1,000 tokens) regardless of API size. See [Code Mode: give agents an entire API in 1,000 tokens](https://blog.cloudflare.com/code-mode-mcp/).

**Principles for efficient MCP tool design:**
- Group related operations into a single tool with an `action` parameter
- Write concise tool descriptions (aim for under 200 tokens each)
- Use `enum` types to constrain inputs and reduce ambiguity
- Return structured data (JSON) that agents can further process

## MCP for content and documentation sites

If your site is primarily informational, an MCP server enables agents to:

- **Search** your content programmatically
- **Retrieve** specific articles, docs, or glossary entries by slug
- **List** available resources in a structured format

Example tool set for a docs site:

```typescript
tools: [
  {
    name: "search_docs",
    description: "Search the documentation. Returns a list of matching pages.",
    inputSchema: {
      type: "object",
      properties: {
        query: { type: "string" },
        category: { type: "string", enum: ["seo", "structure", "content", "protocols"] },
      },
      required: ["query"],
    },
  },
  {
    name: "get_doc_page",
    description: "Retrieve the full content of a documentation page by slug.",
    inputSchema: {
      type: "object",
      properties: {
        slug: { type: "string" },
      },
      required: ["slug"],
    },
  },
]
```

## Current ecosystem

As of early 2026, MCP is supported by:

- **Claude** (Anthropic) — native MCP client
- **Claude Code** — uses MCP for tool integrations
- **Cursor** — supports MCP servers for IDE integrations
- **OpenCode** — MCP-compatible
- Various open-source agent frameworks (LangChain, AutoGen, CrewAI)

Anthropic maintains a registry of official MCP servers at [github.com/modelcontextprotocol/servers](https://github.com/modelcontextprotocol/servers).

## Security considerations

MCP servers have full access to the tools and data you expose. Key security practices:

- Validate all input parameters server-side
- Authenticate requests (OAuth 2.0 or API keys)
- Rate-limit MCP endpoints
- Log all tool invocations for audit purposes
- Scope permissions: expose only what the agent needs
- Never expose administrative operations without explicit authorization

## Related documentation

- [OpenAPI for Agents](/docs/openapi-for-agents) — REST-first approach to agent integration
- [llms.txt](/docs/llms-txt) — signal your MCP server URL to agents
- [Public API Reference](/docs/public-api) — your existing REST API
