import { ArrowUpRight, Github, Linkedin, Mail, Globe } from 'lucide-react';
import { personal } from './data';
import { containerNarrow, section, sectionTitle, heading } from './ui';
import Reveal from '@/components/ui/Reveal';

const channels = (p: typeof personal) => [
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
];

export default function Contact() {
  const items = channels(personal);
  return (
    <section id="contact" className={section}>
      <div className={containerNarrow}>
        <p className={sectionTitle}>Contact</p>
        <h2 className={heading}>Let&apos;s build something.</h2>
        <p className="mt-4 max-w-xl text-[#5a5a66] leading-relaxed">
          Open to AI Engineering, Applied AI, and research roles in the UK. The fastest way
          to reach me is by email.
        </p>

        <div className="mt-10 grid sm:grid-cols-2 gap-4">
          {items.map((c, i) => (
            <Reveal key={c.label} delay={i * 0.05}>
              <a
                href={c.href}
                target={c.href.startsWith('mailto') ? undefined : '_blank'}
                rel="noreferrer"
                className="group flex items-center justify-between gap-4 rounded-2xl border border-[#eeeef0] p-5 hover:border-[#1a1a1f] transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#f7f7f8] flex items-center justify-center text-[#494953] group-hover:bg-[#1a1a1f] group-hover:text-white transition-colors">
                    <c.icon size={18} />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wider text-[#71717f]">{c.label}</p>
                    <p className="mt-0.5 text-sm font-medium text-[#1a1a1f]">{c.value}</p>
                  </div>
                </div>
                <ArrowUpRight
                  size={20}
                  className="text-[#b6b6c0] group-hover:text-[#1a1a1f] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all"
                />
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
