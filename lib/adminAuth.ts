/**
 * Minimal bearer-token check protecting the write side of the blog API
 * (POST/PUT/DELETE on /api/posts). Set ADMIN_API_TOKEN in your Vercel
 * project's environment variables to any long random string, then send it
 * as `Authorization: Bearer <token>` when creating/editing/deleting posts.
 *
 * If ADMIN_API_TOKEN is unset, every write request is rejected — the API
 * fails closed rather than open.
 */
export function isAuthorizedAdmin(request: Request): boolean {
  const token = process.env.ADMIN_API_TOKEN;
  if (!token) return false;

  const header = request.headers.get('authorization') || '';
  const match = header.match(/^Bearer\s+(.+)$/i);
  return Boolean(match) && match![1] === token;
}
