'use client';

<<<<<<< Updated upstream
import { useState, type FormEvent } from 'react';
import { useForm, ValidationError } from '@formspree/react';
import { CheckCircle2, Loader2, Send, Sparkles } from 'lucide-react';
=======
import { useActionState, useEffect } from 'react';
import { CheckCircle2, Loader2, Send } from 'lucide-react';
import { submitQuoteRequest, type QuoteFormState } from '@/app/contact/actions';
>>>>>>> Stashed changes

const inputClass =
  'w-full rounded border border-line bg-surface px-4 py-3 text-sm text-ink placeholder:text-ink-secondary outline-none transition-colors focus:border-accent';

const labelClass = 'block text-xs font-bold uppercase tracking-wider text-ink-secondary mb-2 font-mono';

<<<<<<< Updated upstream
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
=======
const initialState: QuoteFormState = { status: 'idle', message: '' };

export default function QuoteForm() {
  const [state, formAction, pending] = useActionState(submitQuoteRequest, initialState);

  useEffect(() => {
    if (state.status !== 'success') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let cancelled = false;
    import('canvas-confetti').then(({ default: confetti }) => {
      if (cancelled) return;
      confetti({
        particleCount: 90,
        spread: 70,
        origin: { y: 0.65 },
        colors: ['#c2410c', '#12141a', '#f4f5f7', '#f97316'],
      });
    });
    return () => {
      cancelled = true;
    };
  }, [state.status]);

  if (state.status === 'success') {
>>>>>>> Stashed changes
    return (
      <div className="rounded border border-line bg-surface-alt p-8 text-center">
        <CheckCircle2 className="mx-auto h-10 w-10 text-accent" />
        <h3 className="mt-4 font-display text-lg font-semibold text-ink">Request received</h3>
        <p className="mt-2 text-sm text-ink-secondary">{state.message}</p>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-5">
      <div className="hidden" aria-hidden="true">
        <label htmlFor="_gotcha">Website</label>
        <input type="text" id="_gotcha" name="_gotcha" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelClass}>Full name *</label>
          <input id="name" name="name" required className={inputClass} placeholder="Jordan Smith" />
        </div>
        <div>
          <label htmlFor="email" className={labelClass}>Email *</label>
          <input id="email" name="email" type="email" required autoComplete="email" className={inputClass} placeholder="jordan@company.co.uk" />
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
            <option value="">Select one</option>
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
<<<<<<< Updated upstream
          <label htmlFor="budget" className={labelClass}>Budget (GBP)</label>
          <select id="budget" name="budget" defaultValue="" className={inputClass}>
            <option value="" disabled>Select a range</option>
            <option>Under £2,000</option>
            <option>£2,000 – £5,000</option>
            <option>£5,000 – £15,000</option>
            <option>£15,000+</option>
            <option>Not sure yet</option>
=======
          <label htmlFor="stage" className={labelClass}>Where are you?</label>
          <select id="stage" name="stage" defaultValue="" className={inputClass}>
            <option value="">Select one</option>
            <option>Exploring the idea</option>
            <option>Ready to brief a team</option>
            <option>Replacing an existing site</option>
            <option>Need it launched soon</option>
>>>>>>> Stashed changes
          </select>
        </div>
        <div>
          <label htmlFor="timeline" className={labelClass}>Timeline</label>
          <select id="timeline" name="timeline" defaultValue="" className={inputClass}>
            <option value="">Select one</option>
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
      </div>

      {state.status === 'error' ? (
        <p className="rounded border border-accent bg-surface-alt px-4 py-3 text-sm text-accent" role="alert">
          {state.message}
        </p>
      ) : null}

      <div className="flex flex-col items-start gap-3 pt-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-ink-secondary">We reply within 1 business day. No spam, ever.</p>
        <button
          type="submit"
<<<<<<< Updated upstream
          disabled={state.submitting || analyzing}
          className="stamp-shadow inline-flex w-full items-center justify-center gap-2 rounded bg-accent px-8 py-4 font-mono text-sm font-bold uppercase tracking-wide text-accent-ink transition-colors hover:bg-accent-hover disabled:opacity-70 sm:w-auto"
=======
          disabled={pending}
          className="stamp-shadow inline-flex w-full items-center justify-center gap-2 rounded-full bg-ink px-8 py-4 text-sm font-medium text-paper transition-colors hover:bg-accent hover:text-accent-ink disabled:opacity-70 sm:w-auto"
>>>>>>> Stashed changes
        >
          {pending ? (
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
