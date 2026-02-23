---
title: "Vector database"
slug: "vector-database"
type: "concept"
description: "Database that stores content (e.g. text chunks) as vector embeddings for similarity search; used by RAG systems to retrieve relevant passages."
category: "core-concepts"
publishedAt: "2026-02-20"
status: "published"
relatedTerms: ["rag", "chunking", "llm-indexing"]
---

## Definition

A **vector database** (or embedding store) stores representations of content as **vectors** (embeddings) in a high-dimensional space. RAG systems embed queries and document chunks into the same space; retrieval is done by similarity search (e.g. nearest neighbors). Before ingestion, content is typically **chunked** (e.g. by heading or token window). How you structure and chunk your web content affects whether it is stored as coherent, retrievable units.

## Relevance to GEO

Your pages are often scraped, chunked, embedded, and stored in vector databases that power AI answers. Self-contained sections, clear headings, and JSON-LD improve the quality of chunks and the likelihood of accurate retrieval and citation.
