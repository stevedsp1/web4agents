import * as React from "react";

const HONEYPOT_NAME = "url_secondary";

export interface HoneypotFieldProps {
  name?: string;
}

export function HoneypotField({ name = HONEYPOT_NAME }: HoneypotFieldProps) {
  return (
    <div
      className="absolute -left-[9999px] top-0 h-0 w-0 overflow-hidden"
      aria-hidden="true"
    >
      <label htmlFor={`honeypot-${name}`}>Leave this empty</label>
      <input
        type="text"
        id={`honeypot-${name}`}
        name={name}
        tabIndex={-1}
        autoComplete="off"
      />
    </div>
  );
}
