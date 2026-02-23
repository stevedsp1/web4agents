---
title: "OpenAPI"
slug: "openapi"
type: "standard"
description: "Standard for describing REST APIs in a machine-readable format; enables AI agents to discover and call APIs autonomously."
category: "agent-facing"
publishedAt: "2026-02-20"
status: "published"
website: "https://www.openapis.org"
relatedTerms: ["mcp", "geo", "public-api"]
---

## Definition

**OpenAPI** (formerly Swagger) is the de facto standard for describing REST APIs in a machine-readable format (YAML or JSON). An OpenAPI specification documents endpoints, parameters, request/response schemas, and authentication. In the context of AI agents, it serves as a self-describing interface: agents can read the spec, understand what the API does, and call it without human mediation. Used by GPT Actions, LangChain tools, and most agent frameworks.

## Relevance to GEO

Exposing a public API with an OpenAPI spec makes your data and actions available to AI agents. Combined with MCP or tool-use APIs, it is a core way to make your site actionable, not just readable.
