---
title: "humans.txt"
slug: "humans-txt"
type: "standard"
description: "Plain-text file at the site root that describes the people behind the project; supports E-E-A-T and identity signals."
category: "agent-facing"
publishedAt: "2026-02-20"
status: "published"
website: "http://humanstxt.org"
relatedTerms: ["llms-txt", "eeat", "robots-txt"]
---

## Definition

**humans.txt** is a plain-text file at the root of a site (`/humans.txt`) that describes the team behind the project: developers, designers, contributors. Created in 2012 (inspired by robots.txt), it uses simple sections such as `/* TEAM */`, `/* THANKS */`, `/* SITE */`. There is no machine consensus for parsing it; crawlers do not consume it automatically.

## Relevance to GEO

humans.txt is a weak direct signal for AI agents but can reinforce E-E-A-T (authorship, transparency). For agent discoverability, llms.txt and JSON-LD are primary; humans.txt is an optional identity and trust supplement. Link it in the layout with `<link rel="author" href="/humans.txt" />`.
