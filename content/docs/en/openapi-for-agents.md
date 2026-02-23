---
title: "OpenAPI for Agents"
slug: "openapi-for-agents"
description: "How to design and expose an OpenAPI specification that AI agents can discover, understand, and use autonomously."
category: "protocols"
order: 2
publishedAt: "2026-02-01"
status: "published"
---

## Why OpenAPI matters for AI agents

**OpenAPI** (formerly Swagger) is the de facto standard for describing REST APIs in a machine-readable format. In the context of AI agents, an OpenAPI specification serves as a self-describing interface: agents can read it, understand what your API does, and call it autonomously — without human mediation.

OpenAPI is the foundation for AI agent tool use in frameworks like:
- OpenAI GPT Actions (ChatGPT plugins successor)
- LangChain and LangGraph tool definitions
- AutoGen, CrewAI, and most open-source agent frameworks

If your service has a REST API, an OpenAPI spec is the fastest path to agent interoperability.

## OpenAPI specification fundamentals

An OpenAPI document describes:

```yaml
openapi: "3.1.0"
info:
  title: My Service API
  version: "1.0.0"
  description: |
    Provides access to product catalog, pricing, and inventory.
    Use this API to retrieve product details and check stock availability.
servers:
  - url: https://api.example.com/v1
paths:
  /products/{id}:
    get:
      operationId: getProduct
      summary: Retrieve a product by ID
      parameters:
        - name: id
          in: path
          required: true
          schema:
            type: string
      responses:
        "200":
          description: Product details
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/Product"
```

## Writing agent-friendly OpenAPI specs

Standard OpenAPI is designed for developers. Agent-optimized OpenAPI requires extra attention to descriptions and schemas.

### 1. Write descriptions agents can act on

Agents use `summary` and `description` to decide *which* endpoint to call. Be explicit about the use case:

**Too vague:**
```yaml
summary: Get product
```

**Agent-optimized:**
```yaml
summary: Retrieve a product's name, price, description, and stock status by its ID
description: |
  Returns complete product details. Use this when you need to answer 
  questions about a specific product. The product ID is a UUID found 
  in search results or product listings.
```

### 2. Use `operationId` consistently

`operationId` is how agents identify and call your endpoints. Make it a clear, action-verb-first identifier:

```yaml
operationId: getProductById          # ✓ Clear
operationId: searchProducts          # ✓ Clear
operationId: op1                     # ✗ Meaningless to agents
operationId: products_get_by_id_api  # ✗ Redundant
```

### 3. Describe all parameters and their valid values

```yaml
parameters:
  - name: status
    in: query
    description: Filter products by stock status. Use "in_stock" for available products.
    schema:
      type: string
      enum: ["in_stock", "out_of_stock", "discontinued"]
      default: "in_stock"
```

### 4. Document error responses

Agents need to know what to do when an endpoint fails:

```yaml
responses:
  "404":
    description: Product not found. The ID provided does not match any known product.
  "429":
    description: Rate limit exceeded. Retry after 60 seconds.
```

### 5. Use `x-agent-hint` extensions for agent-specific context

The OpenAPI specification allows custom extensions (prefixed with `x-`). Use them to add agent-specific guidance:

```yaml
paths:
  /products/search:
    get:
      x-agent-hint: |
        Prefer this endpoint for answering user questions about product availability.
        Use /products/{id} only when you already know the exact product ID.
```

## Token-efficient API design

The OpenAPI spec itself is loaded into an agent's context window. For large APIs (hundreds of endpoints), the spec can consume thousands of tokens. Strategies to reduce this:

- **Group related operations** under shared path prefixes
- **Use `$ref` schemas** to avoid duplicating response schemas
- **Keep descriptions concise** — one sentence per field is enough
- **Publish multiple specs** for different agent roles (read-only vs. write)
- **Consider MCP** for very large APIs (see [MCP documentation](/docs/mcp))

## Publishing your OpenAPI spec for discovery

### Serve it at a known URL

Expose your spec at a predictable location:

```
https://api.example.com/openapi.json
https://api.example.com/openapi.yaml
https://api.example.com/.well-known/openapi.yaml
```

### Reference it in llms.txt

Add your API spec to `llms.txt` so agents can discover it:

```
# API
- OpenAPI specification: https://api.example.com/openapi.json
- Authentication: Bearer token via /auth/token
- Rate limits: 1000 req/hour for unauthenticated, 10000 for authenticated
```

### Add a Link header

Include a `Link` header in all API responses pointing to the spec:

```
Link: <https://api.example.com/openapi.json>; rel="describedby"; type="application/json"
```

## Authentication for agents

Agents need to authenticate without human intervention. Supported methods:

| Method | OpenAPI declaration | Agent support |
|--------|--------------------|-----------| 
| API Key (header) | `securitySchemes: apiKey` | Universal |
| Bearer token | `securitySchemes: http, bearer` | Universal |
| OAuth 2.0 (client credentials) | `securitySchemes: oauth2` | Good (machine-to-machine) |
| OAuth 2.0 (authorization code) | Same | Limited (requires user interaction) |

For agents, prefer **API Key** or **OAuth 2.0 Client Credentials** (machine-to-machine, no user redirect).

## OpenAPI vs. MCP: when to use which

| Scenario | Recommendation |
|----------|---------------|
| You already have a REST API | Start with OpenAPI — zero server changes |
| You need streaming responses | MCP (native SSE support) |
| Very large API (500+ endpoints) | MCP with grouped tools |
| Maximum agent ecosystem compatibility | Both: OpenAPI for REST clients, MCP for agent-native |
| Content/data retrieval only | OpenAPI is sufficient |
| Complex multi-step workflows | MCP enables richer tool orchestration |

## Validating your spec

Use these tools to validate your OpenAPI spec before publishing:

- [Swagger Editor](https://editor.swagger.io/) — online validation and preview
- [Redocly CLI](https://redocly.com/docs/cli/) — linting and bundling
- [Spectral](https://stoplight.io/open-source/spectral) — custom linting rules

## Full example: product search API

```yaml
openapi: "3.1.0"
info:
  title: Product Catalog API
  version: "1.0.0"
  description: |
    Read-only access to the product catalog. 
    Use to answer questions about products, pricing, and availability.
servers:
  - url: https://api.example.com/v1

paths:
  /products/search:
    get:
      operationId: searchProducts
      summary: Search products by keyword, category, or price range
      parameters:
        - name: q
          in: query
          required: true
          description: Search query (product name, description, or SKU)
          schema:
            type: string
        - name: category
          in: query
          description: Filter by category slug (e.g., "electronics", "clothing")
          schema:
            type: string
        - name: max_price
          in: query
          description: Maximum price in USD
          schema:
            type: number
      responses:
        "200":
          description: List of matching products
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: "#/components/schemas/ProductSummary"

components:
  schemas:
    ProductSummary:
      type: object
      properties:
        id:
          type: string
          description: Unique product identifier (UUID)
        name:
          type: string
        price:
          type: number
          description: Price in USD
        in_stock:
          type: boolean
        url:
          type: string
          description: Canonical URL of the product page
```
