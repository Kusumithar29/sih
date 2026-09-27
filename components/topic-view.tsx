'use client'

import Image from 'next/image'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { useLanguage } from '@/components/providers/language-provider'
import { PinwheelLink } from '@/components/providers/pinwheel-transition'
import { ui } from '@/lib/i18n'
import { getAdjacentTopics, getTopic } from '@/lib/topics'

export function TopicView({ slug }: { slug: string }) {
  const { t, lang } = useLanguage()
  const topic = getTopic(slug)
  if (!topic) return null
  const { prev, next } = getAdjacentTopics(slug)
  const otherLang = lang === 'en' ? 'kn' : 'en'

  return (
    <>
      <section className="mx-auto max-w-7xl px-4 pt-8 md:px-8 md:pt-12">
        <PinwheelLink
          href="/#explore"
          className="inline-flex items-center gap-2 text-sm font-semibold text-accent transition-colors hover:text-secondary"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          {t(ui.backToWheel)}
        </PinwheelLink>

        <div className="mt-8 grid items-center gap-10 md:grid-cols-2">
          <div className="relative mx-auto aspect-square w-full max-w-md">
            <div aria-hidden="true" className="absolute -inset-3 rounded-full border-2 border-dashed border-accent/50" />
            <div className="relative size-full overflow-hidden rounded-full border-4 border-primary shadow-2xl">
              <Image
                src={topic.image || '/placeholder.svg'}
                alt={t(topic.title)}
                fill
                priority
                sizes="(min-width: 768px) 448px, 90vw"
                className="object-cover"
              />
            </div>
          </div>

          <div className="text-center md:text-left">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-accent">{t(topic.tagline)}</p>
            <h1 className="mt-4 text-balance font-serif text-4xl font-bold text-foreground md:text-6xl">
              {t(topic.title)}
            </h1>
            <p lang={otherLang} className="mt-2 font-serif text-xl text-secondary md:text-2xl">
              {topic.title[otherLang]}
            </p>
            <div className="mt-6 flex items-center justify-center gap-3 md:justify-start" aria-hidden="true">
              <span className="h-px w-12 bg-accent" />
              <span className="size-2 rotate-45 bg-primary" />
              <span className="h-px w-12 bg-accent" />
            </div>
            <p className="mt-6 text-pretty text-base leading-relaxed text-foreground/80 md:text-lg">{t(topic.intro)}</p>
          </div>
        </div>
      </section>

      <section aria-labelledby="highlights-heading" className="mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-24">
        <h2 id="highlights-heading" className="font-serif text-2xl font-bold text-foreground md:text-3xl">
          {t(ui.highlightsHeading)}
        </h2>
        <ul className="mt-8 grid gap-5 md:grid-cols-3">
          {topic.highlights.map((highlight, index) => (
            <li
              key={highlight.name.en}
              className="relative overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-sm"
            >
              <span aria-hidden="true" className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-primary via-secondary to-accent" />
              <span className="font-serif text-sm font-bold text-accent">0{index + 1}</span>
              <h3 className="mt-2 font-serif text-xl font-bold text-foreground">{t(highlight.name)}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{t(highlight.description)}</p>
            </li>
          ))}
        </ul>

        <nav aria-label={t(ui.topicNavigation)} className="mt-14 grid gap-4 sm:grid-cols-2">
          <PinwheelLink
            href={`/explore/${prev.slug}`}
            className="group flex items-center gap-4 rounded-2xl border border-border bg-card p-5 transition-colors hover:border-secondary"
          >
            <ArrowLeft className="size-5 shrink-0 text-secondary transition-transform group-hover:-translate-x-1" aria-hidden="true" />
            <span>
              <span className="block text-xs font-semibold uppercase tracking-widest text-muted-foreground">{t(ui.previous)}</span>
              <span className="font-serif text-lg font-bold text-foreground">{t(prev.title)}</span>
            </span>
          </PinwheelLink>
          <PinwheelLink
            href={`/explore/${next.slug}`}
            className="group flex items-center justify-end gap-4 rounded-2xl border border-border bg-card p-5 text-right transition-colors hover:border-secondary"
          >
            <span>
              <span className="block text-xs font-semibold uppercase tracking-widest text-muted-foreground">{t(ui.next)}</span>
              <span className="font-serif text-lg font-bold text-foreground">{t(next.title)}</span>
            </span>
            <ArrowRight className="size-5 shrink-0 text-secondary transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </PinwheelLink>
        </nav>
      </section>
    </>
  )
}
