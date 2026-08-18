import { NextResponse } from 'next/server';
import { put } from '@vercel/blob';
import { isAuthorizedAdmin } from '@/lib/adminAuth';

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/avif'];
const MAX_BYTES = 4.5 * 1024 * 1024; // 4.5MB — Vercel's server-upload limit for route handlers

/**
 * POST /api/upload?filename=my-image.jpg — upload a cover image to Vercel
 * Blob and get back a public URL to use as `coverImage` when creating a
 * blog post. Requires `Authorization: Bearer <ADMIN_API_TOKEN>`, same as
 * the /api/posts write routes.
 *
 * Requires the BLOB_READ_WRITE_TOKEN env var, which Vercel injects
 * automatically once a Blob store is connected to this project (run
 * `vercel env pull` locally to get it into .env.local for local testing).
 */
export async function POST(request: Request) {
  if (!isAuthorizedAdmin(request)) {
    return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
  }

  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return NextResponse.json(
      { error: 'Blob storage is not configured yet. Connect a Blob store to this project in Vercel.' },
      { status: 503 },
    );
  }

  const { searchParams } = new URL(request.url);
  const filename = searchParams.get('filename');
  if (!filename) {
    return NextResponse.json({ error: 'Missing "filename" query parameter.' }, { status: 400 });
  }
  if (!request.body) {
    return NextResponse.json({ error: 'Missing request body — send the image as raw binary data.' }, { status: 400 });
  }

  const contentType = request.headers.get('content-type') || '';
  if (!ALLOWED_TYPES.includes(contentType)) {
    return NextResponse.json(
      { error: `Unsupported content type "${contentType}". Allowed: ${ALLOWED_TYPES.join(', ')}.` },
      { status: 400 },
    );
  }

  const contentLength = Number(request.headers.get('content-length') ?? '0');
  if (contentLength > MAX_BYTES) {
    return NextResponse.json({ error: 'Image is too large — 4.5MB max.' }, { status: 413 });
  }

  const safeName = filename.replace(/[^a-zA-Z0-9._-]/g, '-');

  try {
    const blob = await put(`blog/${Date.now()}-${safeName}`, request.body, {
      access: 'public',
      contentType,
    });
    return NextResponse.json({ url: blob.url }, { status: 201 });
  } catch (err) {
    console.error('POST /api/upload failed:', err);
    return NextResponse.json({ error: 'Upload failed.' }, { status: 500 });
  }
}
