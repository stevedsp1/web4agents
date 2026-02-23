import * as React from "react";
import { Link } from "@/i18n/navigation";
import { Badge } from "./Badge";

export type CardHref = React.ComponentProps<typeof Link>["href"];

export interface CardBadge {
  label: string;
  type?: "concept" | "tool" | "actor" | "standard";
}

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
  badges?: CardBadge[] | string[];
  date?: string;
  href?: CardHref;
  children?: React.ReactNode;
  className?: string;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      title,
      description,
      badges,
      date,
      href,
      children,
      className = "",
      ...props
    },
    ref
  ) => {
    const content = (
      <>
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            {badges && badges.length > 0 && (
              <div className="mb-3 flex flex-wrap gap-1.5">
                {badges.map((b, i) =>
                  typeof b === "string" ? (
                    <Badge key={i}>{b}</Badge>
                  ) : (
                    <Badge key={i} type={b.type}>
                      {b.label}
                    </Badge>
                  )
                )}
              </div>
            )}
            <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100 tracking-tight">
              {title}
            </h3>
            {description && (
              <p className="mt-1.5 text-sm leading-relaxed text-gray-500 dark:text-gray-400 line-clamp-2">
                {description}
              </p>
            )}
          </div>
          {href && (
            <svg className="mt-1 h-4 w-4 shrink-0 text-gray-400 dark:text-gray-600 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
            </svg>
          )}
        </div>
        {date && (
          <p className="mt-3 text-xs font-medium text-gray-400 dark:text-gray-500 tabular-nums">
            {date}
          </p>
        )}
        {children}
      </>
    );

    const baseClasses =
      "group block rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5 transition-all duration-200 hover:border-gray-300 dark:hover:border-gray-700 hover:shadow-lg hover:shadow-gray-100/60 dark:hover:shadow-gray-900/60 hover:-translate-y-1";

    if (href) {
      return (
        <Link href={href} className={`${baseClasses} ${className}`}>
          {content}
        </Link>
      );
    }

    return (
      <div ref={ref} className={`${baseClasses} ${className}`} {...props}>
        {content}
      </div>
    );
  }
);

Card.displayName = "Card";

export { Card };
