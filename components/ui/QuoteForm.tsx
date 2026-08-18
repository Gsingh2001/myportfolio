'use client';

import { useForm, ValidationError } from '@formspree/react';
import { CheckCircle2, Loader2, Send } from 'lucide-react';

const inputClass =
  'w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900/60 px-4 py-3 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 outline-none transition-colors focus:border-cyan-500 dark:focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20';

const labelClass = 'block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2';

const fieldErrorClass = 'mt-1.5 text-xs text-red-600 dark:text-red-400';

export default function QuoteForm() {
  // NEXT_PUBLIC_QUOTE_FORM is set as a Vercel project environment variable
  // by the Formspree x Vercel integration. For local `next dev`/`next build`,
  // add the same value to a .env.local file (gitignored).
  const [state, handleSubmit] = useForm(process.env.NEXT_PUBLIC_QUOTE_FORM as string);

  if (state.succeeded) {
    return (
      <div className="rounded-2xl border border-emerald-300 dark:border-emerald-500/30 bg-emerald-50 dark:bg-emerald-950/20 p-8 text-center">
        <CheckCircle2 className="mx-auto h-10 w-10 text-emerald-600 dark:text-emerald-400" />
        <h3 className="mt-4 text-lg font-bold text-slate-900 dark:text-white">Request received</h3>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
          Thanks — we&apos;ve received your request and will reply within 1 business day.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Formspree honeypot — hidden from real users. Bots tend to fill every
          field they can find; Formspree silently discards submissions where
          this field is non-empty instead of forwarding them to your inbox. */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="_gotcha">Website</label>
        <input type="text" id="_gotcha" name="_gotcha" tabIndex={-1} autoComplete="off" />
      </div>
      <input type="hidden" name="_subject" value="New quote request — 24xDev" />

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
      <ValidationError errors={state.errors} className="flex items-start gap-2 rounded-xl border border-red-300 dark:border-red-500/30 bg-red-50 dark:bg-red-950/20 px-4 py-3 text-sm text-red-700 dark:text-red-400" />

      <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between pt-2">
        <p className="text-xs text-slate-500 dark:text-slate-500">We reply within 1 business day. No spam, ever.</p>
        <button
          type="submit"
          disabled={state.submitting}
          className="group relative inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 dark:from-cyan-400 dark:to-blue-500 px-8 py-4 text-sm font-black text-white dark:text-black shadow-lg shadow-cyan-500/20 transition-all duration-300 hover:scale-[1.01] disabled:opacity-70 disabled:hover:scale-100 sm:w-auto"
        >
          {state.submitting ? (
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
