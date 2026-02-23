"use client";

import * as React from "react";

export interface BlogImageProps {
  imageUrl: string;
  alt?: string;
  className?: string;
  aspectRatio?: "16/10" | "21/9";
}

export function BlogImage({
  imageUrl,
  alt = "",
  className = "",
  aspectRatio = "16/10",
}: BlogImageProps) {
  const [imageFailed, setImageFailed] = React.useState(false);

  React.useEffect(() => {
    setImageFailed(false);
  }, [imageUrl]);

  const handleError = React.useCallback(() => {
    setImageFailed(true);
  }, []);

  return (
    <div
      className={`relative w-full overflow-hidden rounded-xl border border-gray-200 bg-gray-100 dark:border-gray-800 dark:bg-gray-900 ${className}`}
      style={{ aspectRatio: aspectRatio === "16/10" ? "16/10" : "21/9" }}
    >
      {!imageFailed ? (
        <img
          src={imageUrl}
          alt={alt}
          className="absolute inset-0 h-full w-full object-cover"
          onError={handleError}
        />
      ) : (
        <div className="absolute inset-0 bg-accent" aria-hidden />
      )}
    </div>
  );
}
