"use client";

import * as React from "react";
import { Link } from "@/i18n/navigation";

export type BlogCardHref = React.ComponentProps<typeof Link>["href"];

export interface BlogCardProps {
  title: string;
  href: BlogCardHref;
  imageUrl: string;
  date?: string;
  className?: string;
}

export function BlogCard({ title, href, imageUrl, date, className = "" }: BlogCardProps) {
  const [imageFailed, setImageFailed] = React.useState(false);

  React.useEffect(() => {
    setImageFailed(false);
  }, [imageUrl]);

  const handleError = React.useCallback(() => {
    setImageFailed(true);
  }, []);

  return (
    <Link
      href={href}
      className={`group block overflow-hidden rounded-xl border border-gray-200 bg-gray-100 shadow-sm transition-all duration-200 hover:border-gray-300 hover:shadow-lg hover:-translate-y-1 dark:border-gray-800 dark:bg-gray-900 dark:hover:border-gray-700 ${className}`}
    >
      <div className="relative aspect-[16/10] w-full">
        {!imageFailed ? (
          <img
            src={imageUrl}
            alt=""
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
            onError={handleError}
          />
        ) : (
          <div
            className="absolute inset-0 bg-accent"
            aria-hidden
          />
        )}
        <div
          className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"
          aria-hidden
        />
        <div className="absolute inset-x-0 bottom-0 flex flex-col justify-end p-4">
          <h3 className="text-base font-semibold leading-snug text-white drop-shadow-sm">
            {title}
          </h3>
          {date && (
            <p className="mt-1 text-xs font-medium text-white/90 tabular-nums">
              {date}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}
