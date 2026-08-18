import { neon } from '@neondatabase/serverless';

/**
 * Shared Postgres client for the blog + newsletter features, backed by a
 * Neon Postgres database provisioned via the Vercel Marketplace ("Neon for
 * Vercel" integration — Vercel's own "Vercel Postgres" product was retired
 * in favour of this in December 2024).
 *
 * `sql` is `null` until `DATABASE_URL` is set in the project's environment
 * variables. Every call site in this app checks for that and degrades
 * gracefully (empty lists, "coming soon" states, a clear 503 from the API)
 * instead of crashing pages when the database hasn't been connected yet.
 */
const connectionString = process.env.DATABASE_URL;

export const sql = connectionString ? neon(connectionString) : null;

export const isDatabaseConfigured = Boolean(connectionString);
