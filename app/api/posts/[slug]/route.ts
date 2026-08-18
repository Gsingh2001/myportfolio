import { NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { isAuthorizedAdmin } from '@/lib/adminAuth';

const NOT_CONFIGURED = {
  error: 'Database is not configured yet. Set DATABASE_URL in your Vercel project environment variables.',
};

type RouteParams = { params: Promise<{ slug: string }> };

/**
 * GET /api/posts/:slug — fetch a single published post (public).
 * Send `Authorization: Bearer <ADMIN_API_TOKEN>` to also fetch drafts.
 */
export async function GET(request: Request, { params }: RouteParams) {
  if (!sql) return NextResponse.json(NOT_CONFIGURED, { status: 503 });
  const { slug } = await params;
  const admin = isAuthorizedAdmin(request);

  try {
    const rows = admin
      ? await sql`SELECT * FROM posts WHERE slug = ${slug} LIMIT 1`
      : await sql`SELECT * FROM posts WHERE slug = ${slug} AND published = true LIMIT 1`;

    if (rows.length === 0) {
      return NextResponse.json({ error: 'Post not found.' }, { status: 404 });
    }
    return NextResponse.json({ post: rows[0] });
  } catch (err) {
    console.error(`GET /api/posts/${slug} failed:`, err);
    return NextResponse.json({ error: 'Failed to load post.' }, { status: 500 });
  }
}

/**
 * PUT /api/posts/:slug — partially update a post. Requires
 * `Authorization: Bearer <ADMIN_API_TOKEN>`. Any field omitted from the
 * body is left unchanged. Flipping `published` from false → true stamps
 * `published_at` with the current time (once); flipping it to false clears
 * `published_at`.
 */
export async function PUT(request: Request, { params }: RouteParams) {
  if (!sql) return NextResponse.json(NOT_CONFIGURED, { status: 503 });
  if (!isAuthorizedAdmin(request)) {
    return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
  }
  const { slug } = await params;

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body.' }, { status: 400 });
  }

  try {
    const rows = await sql`SELECT * FROM posts WHERE slug = ${slug} LIMIT 1`;
    if (rows.length === 0) {
      return NextResponse.json({ error: 'Post not found.' }, { status: 404 });
    }
    const current = rows[0] as Record<string, unknown>;

    const nextTitle = body.title !== undefined ? String(body.title).trim() : (current.title as string);
    const nextExcerpt = body.excerpt !== undefined ? String(body.excerpt).trim() : (current.excerpt as string);
    const nextContent = body.content !== undefined ? String(body.content).trim() : (current.content as string);
    const nextCoverImage =
      body.coverImage !== undefined
        ? String(body.coverImage).trim() || null
        : (current.cover_image as string | null);
    const nextTags = Array.isArray(body.tags)
      ? body.tags.map((t) => String(t))
      : (current.tags as string[]);
    const wasPublished = Boolean(current.published);
    const nextPublished = body.published !== undefined ? Boolean(body.published) : wasPublished;
    const nextPublishedAt = !nextPublished
      ? null
      : nextPublished && !wasPublished
        ? new Date().toISOString()
        : (current.published_at as string | null);

    const updated = await sql`
      UPDATE posts
      SET title = ${nextTitle},
          excerpt = ${nextExcerpt},
          content = ${nextContent},
          cover_image = ${nextCoverImage},
          tags = ${nextTags},
          published = ${nextPublished},
          published_at = ${nextPublishedAt},
          updated_at = now()
      WHERE slug = ${slug}
      RETURNING id, slug, title, excerpt, published, published_at, updated_at
    `;
    return NextResponse.json({ post: updated[0] });
  } catch (err) {
    console.error(`PUT /api/posts/${slug} failed:`, err);
    return NextResponse.json({ error: 'Failed to update post.' }, { status: 500 });
  }
}

/**
 * DELETE /api/posts/:slug — permanently delete a post. Requires
 * `Authorization: Bearer <ADMIN_API_TOKEN>`.
 */
export async function DELETE(request: Request, { params }: RouteParams) {
  if (!sql) return NextResponse.json(NOT_CONFIGURED, { status: 503 });
  if (!isAuthorizedAdmin(request)) {
    return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
  }
  const { slug } = await params;

  try {
    const rows = await sql`DELETE FROM posts WHERE slug = ${slug} RETURNING id`;
    if (rows.length === 0) {
      return NextResponse.json({ error: 'Post not found.' }, { status: 404 });
    }
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(`DELETE /api/posts/${slug} failed:`, err);
    return NextResponse.json({ error: 'Failed to delete post.' }, { status: 500 });
  }
}
