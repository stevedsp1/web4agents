---
title: "Model Context Protocol (MCP)"
slug: "mcp"
type: "standard"
description: "Open standard for connecting AI agents to external tools, resources, and prompts — the 'USB-C of AI integrations'."
category: "agent-facing"
publishedAt: "2026-02-20"
status: "published"
website: "https://modelcontextprotocol.io"
relatedTerms: ["anthropic", "geo", "openapi-for-agents", "code-mode"]
---

## Definition

The **Model Context Protocol (MCP)** is an open standard (Anthropic, November 2024) that defines a unified way for AI agents to connect to external tools, data sources, and services. Before MCP, each assistant had its own plugin format; MCP standardizes the connection layer so one server can serve Claude and any MCP-compatible agent.

MCP exposes three concepts: **Tools** (functions the agent can call), **Resources** (data the agent can read), and **Prompts** (pre-defined prompt templates). The protocol runs over JSON-RPC via stdio, SSE, or HTTP.

## Relevance to GEO

Exposing your API or data via an MCP server makes it discoverable and usable by a growing ecosystem of agents without building a custom integration per platform.
