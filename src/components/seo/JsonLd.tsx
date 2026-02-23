import * as React from "react";

export interface JsonLdProps {
  /** Single JSON-LD object or array of objects (multiple graphs in one script). */
  data: Record<string, unknown> | Record<string, unknown>[];
}

export function JsonLd({ data }: JsonLdProps) {
  const serialized =
    Array.isArray(data) ? JSON.stringify(data) : JSON.stringify(data);
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serialized }}
    />
  );
}
