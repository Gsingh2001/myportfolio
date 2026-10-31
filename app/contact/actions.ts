'use server';

import { generateDraft, isGeminiConfigured } from '@/lib/gemini';
import { QUOTE_ANALYSIS_SYSTEM_PROMPT } from '@/lib/siteContext';

export type QuoteFormState = {
  status: 'idle' | 'success' | 'error';
  message: string;
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const FORMSPREE_ID = process.env.QUOTE_FORM_ID?.trim() || process.env.NEXT_PUBLIC_QUOTE_FORM?.trim() || 'xkjwporb';

/**
 * Quote requests run in a Server Action on Vercel. Vercel has no form inbox,
 * so delivery is Resend when RESEND_API_KEY is set, and otherwise the
 * existing Formspree form so the message still reaches the inbox.
 */
export async function submitQuoteRequest(
  _prevState: QuoteFormState,
  formData: FormData,
): Promise<QuoteFormState> {
  if (String(formData.get('_gotcha') || formData.get('company_website') || '').trim()) {
    return {
      status: 'success',
      message: "Thanks — we've received your request and will reply within 1 business day.",
    };
  }

  const name = String(formData.get('name') || '').trim();
  const email = String(formData.get('email') || '').trim();
  const phone = String(formData.get('phone') || '').trim();
  const company = String(formData.get('companyName') || '').trim();
  const projectType = String(formData.get('projectType') || '').trim();
<<<<<<< Updated upstream
  const budget = String(formData.get('budget') || '').trim();
=======
  const stage = String(formData.get('stage') || '').trim();
>>>>>>> Stashed changes
  const timeline = String(formData.get('timeline') || '').trim();
  const message = String(formData.get('message') || '').trim();

  if (!name || !email || !message) {
    return {
      status: 'error',
      message: 'Please fill in your name, email and a short project description.',
    };
  }

  if (!EMAIL_PATTERN.test(email)) {
    return {
      status: 'error',
      message: "That email address doesn't look right — please double-check it.",
    };
  }

<<<<<<< Updated upstream
  const resendKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_EMAIL || 'contact@24xdev.co.uk';
  const fromEmail = process.env.CONTACT_FROM_EMAIL || 'quotes@24xdev.co.uk';

  const summaryLines = [
    `Name: ${name}`,
    `Email: ${email}`,
    `Phone: ${phone || '—'}`,
    `Company: ${company || '—'}`,
    `Project type: ${projectType || '—'}`,
    `Budget: ${budget || '—'}`,
    `Timeline: ${timeline || '—'}`,
    '',
    'Message:',
=======
  const aiDraft = await draftInternalNote({ projectType, stage, timeline, message });
  const fields = {
    name,
    email,
    phone: phone || '—',
    companyName: company || '—',
    projectType: projectType || '—',
    stage: stage || '—',
    timeline: timeline || '—',
>>>>>>> Stashed changes
    message,
    aiDraftAnalysis: aiDraft,
  };

  const delivered = await deliverQuote(fields);
  if (!delivered.ok) {
    return {
      status: 'error',
      message: `We couldn't send that just now. Email contact@24xdev.co.uk and we'll reply within one business day.`,
    };
  }

  return {
    status: 'success',
    message: `Thanks ${name.split(' ')[0]} — we've received your request and will reply within 1 business day.`,
  };
}

async function draftInternalNote(input: {
  projectType: string;
  stage: string;
  timeline: string;
  message: string;
}): Promise<string> {
  if (!isGeminiConfigured) return '';
  try {
    const prompt = `A prospective client just submitted a free-quote request on 24xDev's website.
The public site does not publish prices. Do not invent pound amounts or rates.

Project type: ${input.projectType || 'Not specified'}
Stage: ${input.stage || 'Not specified'}
Timeline: ${input.timeline || 'Not specified'}

Their project description:
"""
${input.message}
"""

Draft an internal note for the 24xDev team (not sent to the client) covering:
1. A suggested scope shape (marketing site, web app, e-commerce, AI, dashboard) — no prices.
2. The key scope items you'd expect this project to need.
3. Two or three clarifying questions worth asking before sending the quote.

Keep it tight — plain text, under 180 words.`;

    const draft = await Promise.race([
      generateDraft(prompt, QUOTE_ANALYSIS_SYSTEM_PROMPT),
      new Promise<string>((resolve) => setTimeout(() => resolve(''), 7000)),
    ]);
    return draft.trim();
  } catch (err) {
    console.error('Quote analysis skipped:', err);
    return '';
  }
}

async function deliverQuote(fields: Record<string, string>): Promise<{ ok: boolean }> {
  const resendKey = process.env.RESEND_API_KEY;
  if (resendKey) {
    const sent = await sendWithResend(resendKey, fields);
    if (sent) return { ok: true };
  }

  return sendWithFormspree(fields);
}

async function sendWithResend(apiKey: string, fields: Record<string, string>): Promise<boolean> {
  const toEmail = process.env.CONTACT_EMAIL || 'contact@24xdev.co.uk';
  const fromEmail = process.env.CONTACT_FROM_EMAIL || 'quotes@24xdev.co.uk';
  const text = [
    `Name: ${fields.name}`,
    `Email: ${fields.email}`,
    `Phone: ${fields.phone}`,
    `Company: ${fields.companyName}`,
    `Project type: ${fields.projectType}`,
    `Stage: ${fields.stage}`,
    `Timeline: ${fields.timeline}`,
    '',
    'Message:',
    fields.message,
    '',
    fields.aiDraftAnalysis ? `Internal note:\n${fields.aiDraftAnalysis}` : '',
  ]
    .filter(Boolean)
    .join('\n');

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: fromEmail,
        to: toEmail,
        reply_to: fields.email,
        subject: `New quote request from ${fields.name}${fields.companyName !== '—' ? ` (${fields.companyName})` : ''}`,
        text,
      }),
    });
    if (!res.ok) {
      console.error('Resend API responded with an error:', await res.text());
      return false;
    }
    return true;
  } catch (err) {
    console.error('Failed to send quote request email:', err);
    return false;
  }
}

async function sendWithFormspree(fields: Record<string, string>): Promise<{ ok: boolean }> {
  try {
    const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...fields,
        _subject: `New quote request from ${fields.name}`,
        _replyto: fields.email,
      }),
    });
    if (!res.ok) {
      console.error('Formspree responded with an error:', res.status, await res.text());
      return { ok: false };
    }
    return { ok: true };
  } catch (err) {
    console.error('Failed to forward quote request:', err);
    return { ok: false };
  }
}
