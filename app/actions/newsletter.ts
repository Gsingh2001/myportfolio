'use server';

import { sql } from '@/lib/db';

export type NewsletterState = {
  status: 'idle' | 'success' | 'error';
  message: string;
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Server Action backing the footer newsletter signup. Stores emails in the
 * `subscribers` table (see db/schema.sql). Degrades gracefully — still
 * validates and returns success even if DATABASE_URL isn't set yet, just
 * logging instead of persisting, so the form never looks broken to a
 * visitor while the database is being set up.
 */
export async function subscribeToNewsletter(
  _prevState: NewsletterState,
  formData: FormData,
): Promise<NewsletterState> {
  // Honeypot — invisible to real visitors, bots tend to fill every field.
  if (formData.get('company_website')) {
    return { status: 'success', message: "You're on the list." };
  }

  const email = String(formData.get('email') || '').trim().toLowerCase();
  if (!email || !EMAIL_PATTERN.test(email)) {
    return { status: 'error', message: 'Please enter a valid email address.' };
  }

  if (!sql) {
    console.log('Newsletter signup received (DATABASE_URL not set, not persisted):', email);
    return { status: 'success', message: "You're on the list — we'll be in touch." };
  }

  try {
    await sql`
      INSERT INTO subscribers (email)
      VALUES (${email})
      ON CONFLICT (email) DO NOTHING
    `;
  } catch (err) {
    console.error('Newsletter signup failed:', err);
    return { status: 'error', message: 'Something went wrong — please try again.' };
  }

  return { status: 'success', message: "You're on the list — we'll be in touch." };
}
