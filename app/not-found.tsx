import { Home, Mail, Compass } from 'lucide-react';
import Eyebrow from '@/components/ui/Eyebrow';
import Button from '@/components/ui/Button';

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center bg-paper px-6 py-24 text-center transition-colors duration-300">
      <Eyebrow as="p">Error 404</Eyebrow>
      <h1 className="mt-4 font-display text-4xl font-semibold text-ink sm:text-5xl">This page went missing.</h1>
      <p className="mt-4 max-w-md text-ink-secondary">
        The page you&apos;re looking for doesn&apos;t exist, moved, or the link might be broken.
      </p>
      <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
        <Button href="/" variant="primary">
          <Home className="h-4 w-4" /> Back to homepage
        </Button>
        <Button href="/services" variant="secondary">
          <Compass className="h-4 w-4" /> Explore services
        </Button>
        <Button href="/contact" variant="secondary">
          <Mail className="h-4 w-4" /> Contact us
        </Button>
      </div>
    </div>
  );
}
