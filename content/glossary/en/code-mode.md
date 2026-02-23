---
title: "Code Mode"
slug: "code-mode"
type: "concept"
description: "MCP design that exposes few tools (e.g. search + execute) and runs agent-supplied code server-side to keep token usage fixed."
category: "agent-facing"
publishedAt: "2026-02-23"
status: "published"
relatedTerms: ["mcp", "token", "openapi"]
---

## Definition

**Code Mode** is a way to design an MCP server for very large APIs: instead of one tool per endpoint (which would exhaust the context window), the server exposes only two tools (e.g. `search()` to explore the spec, `execute()` to call the API). The agent sends code (e.g. JavaScript) that runs in a sandbox on the server; the token footprint stays fixed (~1,000 tokens) regardless of API size.

## See also

Related: MCP, Token, OpenAPI. See [Code Mode: give agents an entire API in 1,000 tokens](https://blog.cloudflare.com/code-mode-mcp/).
