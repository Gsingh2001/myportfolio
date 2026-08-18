import { NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { isAuthorizedAdmin } from '@/lib/adminAuth';

const NOT_CONFIGURED = {
  error: 'Database is not configured yet. Set DATABASE_URL in your Vercel project environment variables.',
};

const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

/**
 * GET /api/posts        — list published posts (public)
 * GET /api/posts?limit=N — cap the number returned (default 50, max 100)
 *
 * Send `Authorization: Bearer <ADMIN_API_TOKEN>` to also include drafts.
 */
export async function GET(request: Request) {
  if (!sql) return NextResponse.json(NOT_CONFIGURED, { status: 503 });

  const { searchParams } = new URL(request.url);
  const rawLimit = Number(searchParams.get('limit'));
  const limit = Number.isFinite(rawLimit) && rawLimit > 0 ? Math.min(Math.floor(rawLimit), 100) : 50;
  const includeDrafts = isAuthorizedAdmin(request);

  try {
    const rows = includeDrafts
      ? await sql`
          SELECT id, slug, title, excerpt, cover_image, tags, published, published_at, created_at, updated_at
          FROM posts
          ORDER BY COALESCE(published_at, created_at) DESC
          LIMIT ${limit}
        `
      : await sql`
          SELECT id, slug, title, excerpt, cover_image, tags, published, published_at, created_at, updated_at
          FROM posts
          WHERE published = true
          ORDER BY published_at DESC
          LIMIT ${limit}
        `;

    return NextResponse.json({ posts: rows });
  } catch (err) {
    console.error('GET /api/posts failed:', err);
    return NextResponse.json({ error: 'Failed to load posts.' }, { status: 500 });
  }
}

/**
 * POST /api/posts — create a post. Requires
 * `Authorization: Bearer <ADMIN_API_TOKEN>`.
 *
 * Body: { slug, title, excerpt, content, coverImage?, tags?, published? }
 */
export async function POST(request: Request) {
  if (!sql) return NextResponse.json(NOT_CONFIGURED, { status: 503 });
  if (!isAuthorizedAdmin(request)) {
    return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body.' }, { status: 400 });
  }

  const slug = String(body.slug ?? '').trim().toLowerCase();
  const title = String(body.title ?? '').trim();
  const excerpt = String(body.excerpt ?? '').trim();
  const content = String(body.content ?? '').trim();
  const coverImage = body.coverImage ? String(body.coverImage).trim() : null;
  const tags = Array.isArray(body.tags) ? body.tags.map((t) => String(t)) : [];
  const published = Boolean(body.published);
  const publishedAt = published ? new Date().toISOString() : null;

  if (!slug || !title || !excerpt || !content) {
    return NextResponse.json(
      { error: 'slug, title, excerpt and content are all required.' },
      { status: 400 },
    );
  }
  if (!SLUG_PATTERN.test(slug)) {
    return NextResponse.json(
      { error: 'slug must be lowercase letters, numbers and hyphens only, e.g. "my-first-post".' },
      { status: 400 },
    );
  }

  try {
    const rows = await sql`
      INSERT INTO posts (slug, title, excerpt, content, cover_image, tags, published, published_at)
      VALUES (${slug}, ${title}, ${excerpt}, ${content}, ${coverImage}, ${tags}, ${published}, ${publishedAt})
      RETURNING id, slug, title, excerpt, published, published_at, created_at
    `;
    return NextResponse.json({ post: rows[0] }, { status: 201 });
  } catch (err: unknown) {
    const code = (err as { code?: string } | null)?.code;
    if (code === '23505') {
      return NextResponse.json({ error: `A post with slug "${slug}" already exists.` }, { status: 409 });
    }
    console.error('POST /api/posts failed:', err);
    return NextResponse.json({ error: 'Failed to create post.' }, { status: 500 });
  }
}
