'use client';

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { CheckCircle2, AlertCircle, Loader2, Send } from 'lucide-react';
import { submitQuoteRequest, type QuoteFormState } from '@/app/contact/actions';

const initialState: QuoteFormState = { status: 'idle', message: '' };

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="group relative inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 dark:from-cyan-400 dark:to-blue-500 px-8 py-4 text-sm font-black text-white dark:text-black shadow-lg shadow-cyan-500/20 transition-all duration-300 hover:scale-[1.01] disabled:opacity-70 disabled:hover:scale-100 sm:w-auto"
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
  );
}

const inputClass =
  'w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900/60 px-4 py-3 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 outline-none transition-colors focus:border-cyan-500 dark:focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20';

const labelClass = 'block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2';

export default function QuoteForm() {
  const [state, formAction] = useActionState(submitQuoteRequest, initialState);

  if (state.status === 'success') {
    return (
      <div className="rounded-2xl border border-emerald-300 dark:border-emerald-500/30 bg-emerald-50 dark:bg-emerald-950/20 p-8 text-center">
        <CheckCircle2 className="mx-auto h-10 w-10 text-emerald-600 dark:text-emerald-400" />
        <h3 className="mt-4 text-lg font-bold text-slate-900 dark:text-white">Request received</h3>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{state.message}</p>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-5">
      {/* Honeypot field — hidden from real users; bots tend to fill every field they find */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="company_website">Website</label>
        <input type="text" id="company_website" name="company_website" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelClass}>Full name *</label>
          <input id="name" name="name" required className={inputClass} placeholder="Jordan Smith" />
        </div>
        <div>
          <label htmlFor="email" className={labelClass}>Email *</label>
          <input id="email" name="email" type="email" required className={inputClass} placeholder="jordan@company.co.uk" />
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
      </div>

      {state.status === 'error' && (
        <div className="flex items-start gap-2 rounded-xl border border-red-300 dark:border-red-500/30 bg-red-50 dark:bg-red-950/20 px-4 py-3 text-sm text-red-700 dark:text-red-400">
          <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" /> {state.message}
        </div>
      )}

      <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between pt-2">
        <p className="text-xs text-slate-500 dark:text-slate-500">We reply within 1 business day. No spam, ever.</p>
        <SubmitButton />
      </div>
    </form>
  );
}
