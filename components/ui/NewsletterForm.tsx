'use client';

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { Mail, Loader2, CheckCircle2 } from 'lucide-react';
import { subscribeToNewsletter, type NewsletterState } from '@/app/actions/newsletter';

const initialState: NewsletterState = { status: 'idle', message: '' };

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      aria-label="Subscribe"
      className="stamp-shadow flex h-11 w-11 shrink-0 items-center justify-center rounded bg-accent text-accent-ink transition-colors hover:bg-accent-hover disabled:opacity-60"
    >
      {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Mail className="h-4 w-4" />}
    </button>
  );
}

export default function NewsletterForm() {
  const [state, formAction] = useActionState(subscribeToNewsletter, initialState);

  if (state.status === 'success') {
    return (
      <p className="flex items-center gap-2 text-sm font-semibold text-accent">
        <CheckCircle2 className="h-4 w-4" /> {state.message}
      </p>
    );
  }

  return (
    <form action={formAction} className="space-y-2">
      {/* Honeypot */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="nl_company_website">Website</label>
        <input type="text" id="nl_company_website" name="company_website" tabIndex={-1} autoComplete="off" />
      </div>
      <div className="flex gap-2">
        <input
          type="email"
          name="email"
          required
          placeholder="you@company.co.uk"
          className="w-full min-w-0 rounded border border-line bg-surface px-3 py-2.5 text-sm text-ink placeholder:text-ink-secondary outline-none transition-colors focus:border-accent"
        />
        <SubmitButton />
      </div>
      {state.status === 'error' && <p className="text-xs text-accent">{state.message}</p>}
    </form>
  );
}
