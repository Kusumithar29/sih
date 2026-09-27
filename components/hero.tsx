'use client'

import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { useLanguage } from '@/components/providers/language-provider'
import { PinwheelLink } from '@/components/providers/pinwheel-transition'
import { ui } from '@/lib/i18n'

export function Hero() {
  const { t, lang } = useLanguage()

  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-12 md:grid-cols-2 md:px-8 md:py-20">
        <div className="flex flex-col items-center text-center md:items-start md:text-left">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-accent">
            <span lang="kn">ಕರುನಾಡು</span> <span aria-hidden="true">·</span> {t(ui.eyebrow)}
          </p>

          <h1
            className={`mt-5 bg-gradient-to-r from-secondary via-accent to-secondary bg-clip-text font-serif font-bold text-transparent ${
              lang !== 'en' ? 'text-4xl leading-relaxed sm:text-5xl lg:text-6xl' : 'text-5xl sm:text-6xl lg:text-7xl xl:text-8xl'
            }`}
          >
            {t(ui.heroTitle)}
          </h1>

          <div className="mt-6 flex items-center gap-3" aria-hidden="true">
            <span className="h-px w-16 bg-accent" />
            <span className="size-2 rotate-45 bg-primary" />
            <span className="size-3 rotate-45 border border-secondary" />
            <span className="size-2 rotate-45 bg-primary" />
            <span className="h-px w-16 bg-accent" />
          </div>

          <p className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-foreground/80 md:text-lg">
            {t(ui.heroBody)}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <PinwheelLink
              href="#explore"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-3.5 font-serif text-base font-bold tracking-wide text-primary-foreground shadow-[0_8px_24px_-8px_rgba(198,40,40,0.45)] transition-transform hover:scale-[1.03]"
            >
              {t(ui.beginJourney)}
              <ArrowRight className="size-4" aria-hidden="true" />
            </PinwheelLink>
            <PinwheelLink
              href="/explore/festivals"
              className="inline-flex items-center justify-center rounded-full border-2 border-accent px-7 py-3.5 font-serif text-base font-bold tracking-wide text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              {t(ui.discoverFestivals)}
            </PinwheelLink>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-sm md:max-w-md">
          <div aria-hidden="true" className="absolute -inset-3 rounded-t-full rounded-b-3xl border-2 border-dashed border-accent/50" />
          <div className="relative aspect-[3/4] overflow-hidden rounded-t-full rounded-b-3xl border-4 border-primary bg-card shadow-2xl">
            <Image
              src="/images/karnataka-collage.jpg"
              alt={t(ui.heroImageAlt)}
              fill
              priority
              sizes="(min-width: 768px) 448px, 90vw"
              className="object-cover object-top"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
