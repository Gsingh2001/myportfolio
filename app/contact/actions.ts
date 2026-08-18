'use server';

export type QuoteFormState = {
  status: 'idle' | 'success' | 'error';
  message: string;
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Server Action powering the "Get a Quote" form on /contact.
 *
 * This is the Vercel/Next.js-native way to handle forms — no third-party
 * form service required. The form posts straight to this function, which
 * runs on the server.
 *
 * To actually deliver submissions to an inbox, set these environment
 * variables in your Vercel project settings:
 *   RESEND_API_KEY     - an API key from https://resend.com (free tier available)
 *   CONTACT_EMAIL       - where quote requests should be sent (defaults below)
 *   CONTACT_FROM_EMAIL  - the "from" address Resend sends as (must be a
 *                          verified domain in Resend)
 *
 * Until RESEND_API_KEY is set, submissions are still validated and
 * accepted, but only logged to the server/function console rather than
 * emailed — check your Vercel deployment logs to see them.
 */
export async function submitQuoteRequest(
  _prevState: QuoteFormState,
  formData: FormData,
): Promise<QuoteFormState> {
  // Honeypot spam trap — invisible to real visitors, but bots often fill
  // every field they can find.
  if (formData.get('company_website')) {
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
  const budget = String(formData.get('budget') || '').trim();
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
    message,
  ].join('\n');

  if (resendKey) {
    try {
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${resendKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: fromEmail,
          to: toEmail,
          reply_to: email,
          subject: `New quote request from ${name}${company ? ` (${company})` : ''}`,
          text: summaryLines,
        }),
      });

      if (!res.ok) {
        console.error('Resend API responded with an error:', await res.text());
      }
    } catch (err) {
      console.error('Failed to send quote request email:', err);
    }
  } else {
    console.log('New quote request received (set RESEND_API_KEY to email it):\n' + summaryLines);
  }

  return {
    status: 'success',
    message: `Thanks ${name.split(' ')[0]} — we've received your request and will reply within 1 business day.`,
  };
}
