---
title: "RAG (Retrieval-Augmented Generation)"
slug: "rag"
type: "concept"
description: "Technique where an LLM retrieves relevant documents or chunks from an external store before generating a response, instead of relying only on training data."
category: "core-concepts"
publishedAt: "2026-02-20"
status: "published"
relatedTerms: ["geo", "llm-indexing", "schema-org", "json-ld"]
---

## Definition

**RAG (Retrieval-Augmented Generation)** is a technique where a language model retrieves relevant documents or text chunks from an external database (or index) before generating a response. The model augments its answer with up-to-date, source-specific content rather than relying solely on its training data.

Production AI assistants (e.g. Perplexity, ChatGPT with browsing) often use RAG: user query → retrieve relevant chunks → inject into context → generate answer with citations. Your website content can feed these pipelines if it is structured for retrieval (clear headings, self-contained sections, JSON-LD, semantic density).

## Relevance to GEO

Structuring content for RAG — chunk-friendly sections, FAQ-style Q&A, `datePublished`/`dateModified` in JSON-LD, Schema.org types — increases the chance your content is retrieved and cited accurately by RAG-based agents.
