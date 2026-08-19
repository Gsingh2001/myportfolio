/**
 * Lightweight in-memory sliding-window rate limiter guarding the Gemini
 * endpoints (/api/chat, /api/quote-analysis) from abuse — each call to the
 * model costs money, so these routes are the ones on the site most worth
 * protecting.
 *
 * Deliberately dependency-free (a plain Map, not the `lru-cache` package):
 * this project also depends on the `vercel` CLI, which drags in its own old
 * transitive copy of `lru-cache` that npm's flat install can end up
 * hoisting to the top level — causing `new LRUCache()` to resolve to the
 * wrong export shape at runtime. A ~15-line Map is simpler and sidesteps
 * that version conflict entirely. Stale keys are swept opportunistically on
 * each call so memory doesn't grow unbounded.
 *
 * Caveat: this state lives in the serverless function's memory, so it
 * resets on cold starts and isn't shared across concurrent instances.
 * That's an acceptable trade-off for a small business site — if traffic
 * grows enough for that to matter, swap this for a shared store (e.g.
 * Upstash Redis).
 */
const buckets = new Map<string, number[]>();

const MAX_TRACKED_KEYS = 5000;
const STALE_AFTER_MS = 10 * 60_000;

function sweepStaleKeys(now: number) {
  if (buckets.size <= MAX_TRACKED_KEYS) return;
  for (const [key, timestamps] of buckets) {
    const newest = timestamps[timestamps.length - 1] ?? 0;
    if (now - newest > STALE_AFTER_MS) buckets.delete(key);
  }
}

export function checkRateLimit(key: string, limit: number, windowMs: number): { allowed: boolean; remaining: number } {
  const now = Date.now();
  sweepStaleKeys(now);

  const timestamps = (buckets.get(key) ?? []).filter((t) => now - t < windowMs);

  if (timestamps.length >= limit) {
    buckets.set(key, timestamps);
    return { allowed: false, remaining: 0 };
  }

  timestamps.push(now);
  buckets.set(key, timestamps);
  return { allowed: true, remaining: limit - timestamps.length };
}

/** Best-effort client IP extraction behind Vercel's proxy. */
export function getClientIp(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) return forwarded.split(',')[0].trim();
  return request.headers.get('x-real-ip') ?? 'unknown';
}
