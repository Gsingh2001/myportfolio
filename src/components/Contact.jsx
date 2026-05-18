import { ArrowUpRight, Github, Linkedin, Mail, Globe } from 'lucide-react'
import { personal } from '../data'

const channels = (p) => [
  {
    icon: Mail,
    label: 'Email',
    value: p.email,
    href: `mailto:${p.email}`,
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    value: 'linkedin.com/in/gsingh07',
    href: p.linkedin,
  },
  {
    icon: Github,
    label: 'GitHub',
    value: 'github.com/Gsingh2001',
    href: p.github,
  },
  {
    icon: Globe,
    label: 'Website',
    value: '24xdev.co.uk',
    href: p.website,
  },
]

export default function Contact() {
  const items = channels(personal)
  return (
    <section id="contact" className="section">
      <div className="container-narrow">
        <p className="section-title">Contact</p>
        <h2 className="heading">
          Let's build something.
        </h2>
        <p className="mt-4 max-w-xl text-ink-600 leading-relaxed">
          Open to AI Engineering, Applied AI, and research roles in the UK. The fastest way
          to reach me is by email.
        </p>

        <div className="mt-10 grid sm:grid-cols-2 gap-4">
          {items.map((c) => (
            <a
              key={c.label}
              href={c.href}
              target={c.href.startsWith('mailto') ? undefined : '_blank'}
              rel="noreferrer"
              className="group flex items-center justify-between gap-4 rounded-2xl border border-ink-100 p-5 hover:border-ink-900 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-ink-50 flex items-center justify-center text-ink-700 group-hover:bg-ink-900 group-hover:text-white transition-colors">
                  <c.icon size={18} />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-ink-500">
                    {c.label}
                  </p>
                  <p className="mt-0.5 text-sm font-medium text-ink-900">{c.value}</p>
                </div>
              </div>
              <ArrowUpRight
                size={20}
                className="text-ink-300 group-hover:text-ink-900 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all"
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
