import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'

const links = [
  { href: '/#about', label: 'About' },
  { href: '/#skills', label: 'Skills' },
  { href: '/#projects', label: 'Projects' },
  { href: '/#experience', label: 'Experience' },
  { href: '/#education', label: 'Education' },
  { href: '/#contact', label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { pathname, hash } = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // When on home page, scroll to hash after navigation.
  useEffect(() => {
    if (pathname === '/' && hash) {
      const el = document.querySelector(hash)
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [pathname, hash])

  const onHome = pathname === '/'

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled || !onHome
          ? 'bg-white/80 backdrop-blur-md border-b border-ink-100'
          : 'bg-transparent'
      }`}
    >
      <div className="container-narrow flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2 font-semibold tracking-tight">
          <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-ink-900 text-white text-sm">
            G
          </span>
          <span className="hidden sm:inline">Gurmanpreet Singh</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <Link
              key={l.href}
              to={l.href}
              className="text-sm text-ink-600 hover:text-ink-900 transition-colors link-underline"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <Link
          to="/#contact"
          className="hidden md:inline-flex items-center text-sm font-medium px-4 py-2 rounded-full bg-ink-900 text-white hover:bg-ink-700 transition-colors"
        >
          Get in touch
        </Link>

        <button
          aria-label="Toggle menu"
          className="md:hidden p-2 -mr-2 text-ink-900"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-ink-100 bg-white">
          <div className="container-narrow py-4 flex flex-col gap-3">
            {links.map((l) => (
              <Link
                key={l.href}
                to={l.href}
                onClick={() => setOpen(false)}
                className="text-sm text-ink-700 hover:text-ink-900 py-1"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}
