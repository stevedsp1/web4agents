---
title: "Token (LLM)"
slug: "token"
type: "concept"
description: "Unit of text (roughly a word or subword) that LLMs process; context and cost are measured in tokens."
category: "core-concepts"
publishedAt: "2026-02-20"
status: "published"
relatedTerms: ["rag", "markdown-for-agents", "chunking"]
---

## Definition

A **token** is the basic unit of text that language models process — roughly a word or subword (e.g. "optimization" might be one or two tokens). LLM context windows, API pricing, and RAG chunk sizes are typically measured in tokens. HTML is token-heavy (tags, classes, scripts); Markdown is more token-efficient. Serving Markdown via content negotiation can reduce token count by 60–80% per page, lowering cost and fitting more useful content in the context window.

## Relevance to GEO

Dense, well-structured content (clear headings, minimal boilerplate) uses tokens efficiently. Chunking strategies for RAG are defined in token ranges (e.g. 512–2,000 tokens per chunk). Optimizing for token efficiency improves retrieval quality and citation likelihood.
