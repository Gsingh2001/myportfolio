import { NextResponse } from 'next/server';
import { z } from 'zod';
import { generateDraft, isGeminiConfigured } from '@/lib/gemini';
import { checkRateLimit, getClientIp } from '@/lib/rateLimit';
import { QUOTE_ANALYSIS_SYSTEM_PROMPT } from '@/lib/siteContext';

const QuoteAnalysisSchema = z.object({
  projectType: z.string().trim().max(80).optional().default(''),
  budget: z.string().trim().max(80).optional().default(''),
  timeline: z.string().trim().max(80).optional().default(''),
  message: z.string().trim().min(1, 'A project description is required.').max(4000),
});

/**
 * POST /api/quote-analysis — called from the contact-page quote form right
 * before it submits to Formspree. Gemini drafts a short internal triage
 * note (suggested tier, likely scope, clarifying questions) which gets
 * tucked into a hidden form field so it rides along in the same
 * notification email the team already receives — no new admin UI or
 * database table needed.
 *
 * This is always best-effort: the calling form treats any non-200 response,
 * timeout, or network error as "skip the AI note" and submits normally, so
 * a Gemini outage never blocks a real quote request from going out.
 */
export async function POST(request: Request) {
  if (!isGeminiConfigured) {
    return NextResponse.json({ error: 'Gemini is not configured.' }, { status: 503 });
  }

  const ip = getClientIp(request);
  const { allowed } = checkRateLimit(`quote:${ip}`, 8, 60_000);
  if (!allowed) {
    return NextResponse.json({ error: 'Too many requests.' }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body.' }, { status: 400 });
  }

  const parsed = QuoteAnalysisSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }

  const { projectType, budget, timeline, message } = parsed.data;

  const prompt = `A prospective client just submitted a quote request on 24xDev's website.

Project type: ${projectType || 'Not specified'}
Stated budget: ${budget || 'Not specified'}
Timeline: ${timeline || 'Not specified'}

Their project description:
"""
${message}
"""

Draft an internal note for the 24xDev team (not sent to the client) covering:
1. A suggested pricing tier (Launch / Growth / Scale) and rough estimate.
2. The key scope items you'd expect this project to need.
3. Two or three clarifying questions worth asking before quoting.

Keep it tight — plain text or simple markdown, under 180 words.`;

  try {
    const draft = await generateDraft(prompt, QUOTE_ANALYSIS_SYSTEM_PROMPT);
    return NextResponse.json({ draft });
  } catch (err) {
    console.error('Gemini quote analysis failed:', err);
    return NextResponse.json({ error: 'AI analysis unavailable.' }, { status: 503 });
  }
}
