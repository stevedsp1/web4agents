---
title: "Chunking"
slug: "chunking"
type: "concept"
description: "Splitting content into smaller segments (chunks) for RAG indexing; strategy determines retrieval quality."
category: "core-concepts"
publishedAt: "2026-02-20"
status: "published"
relatedTerms: ["rag", "semantic-density", "rag-optimization"]
---

## Definition

**Chunking** is the process of dividing a document or page into smaller units (chunks), typically 512–2,000 tokens, before storing them in a vector database for RAG. The chunking strategy (by heading, by paragraph, by sentence, or fixed token windows) determines whether retrieved chunks are coherent and self-contained. Poor chunking (e.g. splitting mid-sentence) leads to incomplete or confusing retrieval.

## Relevance to GEO

Structuring pages with clear headings and self-contained sections allows RAG systems to chunk along natural boundaries. Content optimized for chunking is more likely to be retrieved as complete, usable units by AI agents.
