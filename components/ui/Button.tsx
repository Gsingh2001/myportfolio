import Link from 'next/link';
import type { ButtonHTMLAttributes, ComponentProps, ReactNode } from 'react';
import { cn } from '@/lib/cn';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

type BaseProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: ReactNode;
};

type ButtonAsButton = BaseProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseProps> & {
    href?: undefined;
    external?: undefined;
  };

type ButtonAsLink = BaseProps &
  Omit<ComponentProps<typeof Link>, keyof BaseProps> & { href: string; external?: boolean };

type ButtonProps = ButtonAsButton | ButtonAsLink;

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'bg-accent text-accent-ink hover:bg-accent-hover stamp-shadow',
  secondary: 'border border-ink text-ink hover:bg-ink hover:text-paper stamp-shadow',
  ghost: 'text-ink hover:text-accent',
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-xs',
  md: 'px-6 py-3 text-sm',
  lg: 'px-8 py-4 text-sm',
};

const base =
  'inline-flex items-center justify-center gap-2 rounded font-mono font-semibold uppercase tracking-wide transition-colors duration-150';

/**
 * Polymorphic button — renders a Next.js `<Link>` when `href` is present,
 * otherwise a `<button>`. Deliberately has no `'use client'` directive: it
 * has no hooks/state, so it's safe to import from both Server and Client
 * Component pages without adding to every client bundle.
 */
export default function Button(props: ButtonProps) {
  const { variant = 'primary', size = 'md', className, children } = props;
  const classes = cn(base, variantClasses[variant], sizeClasses[size], className);

  if (props.href) {
    const { href, external, variant: _v, size: _s, className: _c, children: _ch, ...linkRest } = props;
    if (external) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} {...linkRest}>
        {children}
      </Link>
    );
  }

  const { variant: _v2, size: _s2, className: _c2, children: _ch2, href: _h, external: _e, ...buttonRest } = props;
  return (
    <button className={classes} {...buttonRest}>
      {children}
    </button>
  );
}
