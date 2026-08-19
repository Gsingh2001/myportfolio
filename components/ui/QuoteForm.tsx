'use client';

import { useState, type FormEvent } from 'react';
import { useForm, ValidationError } from '@formspree/react';
import { CheckCircle2, Loader2, Send, Sparkles } from 'lucide-react';

const inputClass =
  'w-full rounded border border-line bg-surface px-4 py-3 text-sm text-ink placeholder:text-ink-secondary outline-none transition-colors focus:border-accent';

const labelClass = 'block text-xs font-bold uppercase tracking-wider text-ink-secondary mb-2 font-mono';

const fieldErrorClass = 'mt-1.5 text-xs text-accent';

export default function QuoteForm() {
  // NEXT_PUBLIC_QUOTE_FORM is set as a Vercel project environment variable
  // by the Formspree x Vercel integration. For local `next dev`/`next build`,
  // add the same value to a .env.local file (gitignored).
  const [state, handleSubmit] = useForm(process.env.NEXT_PUBLIC_QUOTE_FORM as string);
  const [analyzing, setAnalyzing] = useState(false);

  // Best-effort Gemini pre-analysis: before the real Formspree submission
  // goes out, we ask /api/quote-analysis to draft a short internal triage
  // note (suggested tier, scope, clarifying questions) and drop it into the
  // hidden `aiDraftAnalysis` field below, so it rides along in the same
  // notification email the team already gets. If Gemini isn't configured,
  // times out, or errors, we simply skip it and submit the form as normal —
  // this must never block or slow down a real quote request meaningfully.
  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    const form = e.currentTarget;
    setAnalyzing(true);
    try {
      const formData = new FormData(form);
      const res = await fetch('/api/quote-analysis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          projectType: String(formData.get('projectType') ?? ''),
          budget: String(formData.get('budget') ?? ''),
          timeline: String(formData.get('timeline') ?? ''),
          message: String(formData.get('message') ?? ''),
        }),
        signal: AbortSignal.timeout(8000),
      });
      if (res.ok) {
        const data = await res.json().catch(() => null);
        if (data?.draft) {
          const hidden = form.elements.namedItem('aiDraftAnalysis') as HTMLInputElement | null;
          if (hidden) hidden.value = data.draft;
        }
      }
    } catch {
      // Gemini unavailable, rate-limited, or slow — fine, submit without it.
    } finally {
      setAnalyzing(false);
    }

    handleSubmit(e);
  }

  if (state.succeeded) {
    return (
      <div className="rounded border border-line bg-surface-alt p-8 text-center">
        <CheckCircle2 className="mx-auto h-10 w-10 text-accent" />
        <h3 className="mt-4 font-display text-lg font-semibold text-ink">Request received</h3>
        <p className="mt-2 text-sm text-ink-secondary">
          Thanks — we&apos;ve received your request and will reply within 1 business day.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      {/* Formspree honeypot — hidden from real users. Bots tend to fill every
          field they can find; Formspree silently discards submissions where
          this field is non-empty instead of forwarding them to your inbox. */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="_gotcha">Website</label>
        <input type="text" id="_gotcha" name="_gotcha" tabIndex={-1} autoComplete="off" />
      </div>
      <input type="hidden" name="_subject" value="New quote request — 24xDev" />
      {/* Populated client-side (if Gemini is configured) right before submit
          with an AI-drafted scope/estimate note, so it lands in the same
          notification email as the raw submission. */}
      <input type="hidden" name="aiDraftAnalysis" defaultValue="" />

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelClass}>Full name *</label>
          <input id="name" name="name" required className={inputClass} placeholder="Jordan Smith" />
          <ValidationError prefix="Name" field="name" errors={state.errors} className={fieldErrorClass} />
        </div>
        <div>
          <label htmlFor="email" className={labelClass}>Email *</label>
          <input id="email" name="email" type="email" required className={inputClass} placeholder="jordan@company.co.uk" />
          <ValidationError prefix="Email" field="email" errors={state.errors} className={fieldErrorClass} />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="phone" className={labelClass}>Phone (optional)</label>
          <input id="phone" name="phone" type="tel" className={inputClass} placeholder="07123 456789" />
        </div>
        <div>
          <label htmlFor="companyName" className={labelClass}>Company (optional)</label>
          <input id="companyName" name="companyName" className={inputClass} placeholder="Acme Ltd" />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-3">
        <div>
          <label htmlFor="projectType" className={labelClass}>Project type</label>
          <select id="projectType" name="projectType" defaultValue="" className={inputClass}>
            <option value="" disabled>Select one</option>
            <option>New website</option>
            <option>Web application</option>
            <option>E-commerce store</option>
            <option>AI / automation</option>
            <option>Custom dashboard</option>
            <option>Ongoing support</option>
            <option>Something else</option>
          </select>
        </div>
        <div>
          <label htmlFor="budget" className={labelClass}>Budget (GBP)</label>
          <select id="budget" name="budget" defaultValue="" className={inputClass}>
            <option value="" disabled>Select a range</option>
            <option>Under £2,000</option>
            <option>£2,000 – £5,000</option>
            <option>£5,000 – £15,000</option>
            <option>£15,000+</option>
            <option>Not sure yet</option>
          </select>
        </div>
        <div>
          <label htmlFor="timeline" className={labelClass}>Timeline</label>
          <select id="timeline" name="timeline" defaultValue="" className={inputClass}>
            <option value="" disabled>Select one</option>
            <option>ASAP</option>
            <option>Within 1 month</option>
            <option>1–3 months</option>
            <option>Just exploring</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="message" className={labelClass}>Tell us about your project *</label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className={inputClass}
          placeholder="What are you trying to build, and what problem should it solve?"
        />
        <ValidationError prefix="Message" field="message" errors={state.errors} className={fieldErrorClass} />
      </div>

      {/* Form-level errors (e.g. rate limiting, misconfiguration) — renders
          nothing when there are none, so no empty box appears. */}
      <ValidationError
        errors={state.errors}
        className="flex items-start gap-2 rounded border border-accent bg-surface-alt px-4 py-3 text-sm text-accent"
      />

      <div className="flex flex-col items-start gap-3 pt-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="flex items-center gap-1.5 text-xs text-ink-secondary">
          {analyzing ? (
            <>
              <Sparkles className="h-3.5 w-3.5 animate-pulse text-accent" /> Reviewing your project with AI...
            </>
          ) : (
            'We reply within 1 business day. No spam, ever.'
          )}
        </p>
        <button
          type="submit"
          disabled={state.submitting || analyzing}
          className="stamp-shadow inline-flex w-full items-center justify-center gap-2 rounded bg-accent px-8 py-4 font-mono text-sm font-bold uppercase tracking-wide text-accent-ink transition-colors hover:bg-accent-hover disabled:opacity-70 sm:w-auto"
        >
          {analyzing ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" /> Analyzing...
            </>
          ) : state.submitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" /> Sending...
            </>
          ) : (
            <>
              Request My Free Quote <Send className="h-4 w-4" />
            </>
          )}
        </button>
      </div>
    </form>
  );
}
