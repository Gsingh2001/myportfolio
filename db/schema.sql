-- 24xDev — one-time database setup.
--
-- Run this once against your new Neon/Postgres database (Vercel dashboard →
-- Storage → your database → Query tab, or the Neon console's SQL editor)
-- after connecting the "Neon for Vercel" integration. Safe to re-run —
-- everything uses IF NOT EXISTS / ON CONFLICT.

CREATE TABLE IF NOT EXISTS posts (
  id SERIAL PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  cover_image TEXT,
  tags TEXT[] NOT NULL DEFAULT '{}',
  published BOOLEAN NOT NULL DEFAULT false,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS posts_published_idx ON posts (published, published_at DESC);

CREATE TABLE IF NOT EXISTS subscribers (
  id SERIAL PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Optional: a sample post so /blog isn't empty the moment this runs.
-- Delete it any time via: DELETE FROM posts WHERE slug = 'welcome-to-the-24xdev-blog';
INSERT INTO posts (slug, title, excerpt, content, tags, published, published_at)
VALUES (
  'welcome-to-the-24xdev-blog',
  'Welcome to the 24xDev blog',
  'We''re writing about the Next.js, AI automation and infrastructure decisions behind the software we ship for clients across the UK.',
  E'We''re kicking off the 24xDev blog as a place to write about how we actually build software — the frameworks we pick, the AI workflows we automate, and the trade-offs behind the projects we ship for clients across Sheffield, London, Birmingham, Manchester and the rest of the UK.\n\nExpect posts on:\n\n- Next.js and modern web architecture\n- AI and LLM integration in real production systems\n- Practical SEO and performance engineering\n- Lessons from real client projects\n\nIf there''s a topic you''d like us to cover, [get in touch](/contact) — we read every message.',
  ARRAY['Announcements'],
  true,
  now()
)
ON CONFLICT (slug) DO NOTHING;
