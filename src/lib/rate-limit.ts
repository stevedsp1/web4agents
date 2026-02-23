/** In-memory rate limit. */
const WINDOW_MS = 60 * 1000;
const MAX_REQUESTS_POST = 5;
const MAX_REQUESTS_GET = 60;
const store = new Map<string, { count: number; resetAt: number }>();

function getIdentifier(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  const real = request.headers.get("x-real-ip");
  if (real) return real;
  return "unknown";
}

function checkLimit(key: string, maxRequests: number): { success: boolean } {
  const now = Date.now();
  const entry = store.get(key);
  if (!entry) {
    store.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return { success: true };
  }
  if (now >= entry.resetAt) {
    store.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return { success: true };
  }
  entry.count++;
  if (entry.count > maxRequests) return { success: false };
  return { success: true };
}

/** Rate limit for POST (forms): 5 requests per minute per IP. */
export async function rateLimit(request: Request): Promise<{ success: boolean }> {
  return checkLimit(`post:${getIdentifier(request)}`, MAX_REQUESTS_POST);
}

/** Rate limit for GET (public API): 60 requests per minute per IP. */
export async function rateLimitGet(request: Request): Promise<{ success: boolean }> {
  return checkLimit(`get:${getIdentifier(request)}`, MAX_REQUESTS_GET);
}
