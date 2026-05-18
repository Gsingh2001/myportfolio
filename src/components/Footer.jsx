import { personal } from '../data'

export default function Footer() {
  return (
    <footer className="border-t border-ink-100 py-10">
      <div className="container-narrow flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-ink-500">
          © {new Date().getFullYear()} {personal.name}. All rights reserved.
        </p>
        <p className="text-xs text-ink-400 font-mono">
          Built with React, Vite & Tailwind CSS.
        </p>
      </div>
    </footer>
  )
}
