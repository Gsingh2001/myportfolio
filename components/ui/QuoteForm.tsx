'use client';

import { useActionState, useEffect, useRef, useState } from 'react';
import { AlertCircle, CheckCircle2, Loader2, Send } from 'lucide-react';
import { submitQuoteRequest, type QuoteFormState } from '@/app/contact/actions';

const inputClass =
  'w-full rounded-2xl border border-line bg-surface px-4 py-3 text-sm text-ink placeholder:text-ink-secondary outline-none transition-colors focus:border-accent';

const labelClass = 'mb-2 block text-xs font-medium text-ink-secondary';

const initialState: QuoteFormState = { status: 'idle', message: '' };

export default function QuoteForm() {
  const [attempt, setAttempt] = useState(0);

  return <QuoteFormFields key={attempt} onSendAnother={() => setAttempt((value) => value + 1)} />;
}

function QuoteFormFields({ onSendAnother }: { onSendAnother: () => void }) {
  const [state, formAction, pending] = useActionState(submitQuoteRequest, initialState);
  const statusRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (state.status === 'idle') return;
    statusRef.current?.focus();
    statusRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, [state.status, state.message]);

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
    return (
      <div
        ref={statusRef}
        tabIndex={-1}
        role="status"
        className="rounded-3xl border border-line bg-surface-alt px-8 py-10 text-center outline-none"
      >
        <CheckCircle2 className="mx-auto h-10 w-10 text-accent" aria-hidden="true" />
        <h3 className="mt-4 font-display text-2xl font-semibold text-ink">Request received</h3>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-ink-secondary">{state.message}</p>
        <button
          type="button"
          onClick={onSendAnother}
          className="mt-6 text-sm font-medium text-accent underline-offset-4 hover:underline"
        >
          Send another request
        </button>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-5">
      <div className="hidden" aria-hidden="true">
        <label htmlFor="_gotcha">Website</label>
        <input type="text" id="_gotcha" name="_gotcha" tabIndex={-1} autoComplete="off" />
      </div>

      {state.status === 'error' ? (
        <div
          ref={statusRef}
          tabIndex={-1}
          role="alert"
          className="flex items-start gap-3 rounded-2xl border border-accent bg-surface-alt px-4 py-3 text-sm text-ink outline-none"
        >
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
          <p>
            <span className="font-medium">Not sent.</span> {state.message}
          </p>
        </div>
      ) : null}

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelClass}>Full name *</label>
          <input id="name" name="name" required autoComplete="name" className={inputClass} placeholder="Jordan Smith" />
        </div>
        <div>
          <label htmlFor="email" className={labelClass}>Email *</label>
          <input id="email" name="email" type="email" required autoComplete="email" className={inputClass} placeholder="jordan@company.co.uk" />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="phone" className={labelClass}>Phone (optional)</label>
          <input id="phone" name="phone" type="tel" autoComplete="tel" className={inputClass} placeholder="07123 456789" />
        </div>
        <div>
          <label htmlFor="companyName" className={labelClass}>Company (optional)</label>
          <input id="companyName" name="companyName" autoComplete="organization" className={inputClass} placeholder="Acme Ltd" />
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
          <label htmlFor="stage" className={labelClass}>Where are you?</label>
          <select id="stage" name="stage" defaultValue="" className={inputClass}>
            <option value="">Select one</option>
            <option>Exploring the idea</option>
            <option>Ready to brief a team</option>
            <option>Replacing an existing site</option>
            <option>Need it launched soon</option>
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

      <div className="flex flex-col items-start gap-3 pt-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-ink-secondary">We reply within 1 business day. No spam, ever.</p>
        <button
          type="submit"
          disabled={pending}
          className="stamp-shadow inline-flex w-full items-center justify-center gap-2 rounded-full bg-ink px-8 py-4 text-sm font-medium text-paper transition-colors hover:bg-accent hover:text-accent-ink disabled:opacity-70 sm:w-auto"
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
