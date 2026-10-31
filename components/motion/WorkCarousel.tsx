'use client';

import Link from 'next/link';
import { useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export type WorkSlide = {
  kicker: string;
  title: string;
  text: string;
};

export default function WorkCarousel({ slides }: { slides: WorkSlide[] }) {
  const [emblaRef, embla] = useEmblaCarousel({ loop: true, align: 'start' }, [
    Autoplay({ delay: 4800, stopOnInteraction: true, stopOnMouseEnter: true }),
  ]);

  const scrollPrev = useCallback(() => embla?.scrollPrev(), [embla]);
  const scrollNext = useCallback(() => embla?.scrollNext(), [embla]);

  return (
    <div>
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {slides.map((slide) => (
            <div key={slide.title} className="min-w-0 shrink-0 grow-0 basis-full pr-4 md:basis-1/2 lg:basis-1/3">
              <Link
                href="/portfolio"
                className="group flex h-full min-h-64 flex-col rounded-3xl border border-line bg-surface p-8 transition-colors hover:border-accent"
              >
                <p className="text-xs uppercase tracking-[0.18em] text-accent">{slide.kicker}</p>
                <h3 className="mt-6 font-display text-2xl font-semibold text-ink group-hover:text-accent">{slide.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-secondary">{slide.text}</p>
                <span className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-ink">
                  See the work <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-6 flex gap-2">
        <button
          type="button"
          onClick={scrollPrev}
          aria-label="Previous projects"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-line bg-surface text-ink transition-colors hover:border-accent"
        >
          <ArrowLeft className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={scrollNext}
          aria-label="Next projects"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-line bg-surface text-ink transition-colors hover:border-accent"
        >
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
