"use client";

import * as React from "react";

/**
 * Runs axe-core accessibility checks in development.
 * Only active when NODE_ENV !== "production". Renders nothing.
 */
export function AxeMonitor() {
  React.useEffect(() => {
    if (typeof window === "undefined" || process.env.NODE_ENV === "production") {
      return;
    }
    let cancelled = false;
    Promise.all([
      import("@axe-core/react"),
      import("react-dom"),
    ]).then(([axeModule, ReactDOMModule]) => {
      if (cancelled) return;
      const reactAxe = axeModule.default;
      const ReactDOM = ReactDOMModule.default;
      reactAxe(React, ReactDOM, 1000).catch(() => {
        // Ignore axe init errors (e.g. in test env)
      });
    });
    return () => {
      cancelled = true;
    };
  }, []);
  return null;
}
