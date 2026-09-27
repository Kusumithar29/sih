'use client'

import { useLanguage } from '@/components/providers/language-provider'
import { PinwheelLink, usePinwheelNavigate } from '@/components/providers/pinwheel-transition'
import { ui } from '@/lib/i18n'
import { topics } from '@/lib/topics'

const CENTER = 500
const INNER_RADIUS = 175
const OUTER_RADIUS = 440
const GAP_DEG = 4
const TWIST_DEG = 16
const SLICE_DEG = 360 / topics.length

function polar(radius: number, angleDeg: number) {
  const rad = (angleDeg * Math.PI) / 180
  return { x: CENTER + radius * Math.cos(rad), y: CENTER + radius * Math.sin(rad) }
}

function bladeGeometry(index: number) {
  const start = index * SLICE_DEG - 90 - SLICE_DEG / 2 + GAP_DEG / 2
  const end = start + SLICE_DEG - GAP_DEG
  const p1 = polar(INNER_RADIUS, start)
  const p2 = polar(INNER_RADIUS, end)
  const p3 = polar(OUTER_RADIUS, end + TWIST_DEG)
  const p4 = polar(OUTER_RADIUS, start + TWIST_DEG)
  const path = [
    `M ${p1.x} ${p1.y}`,
    `A ${INNER_RADIUS} ${INNER_RADIUS} 0 0 1 ${p2.x} ${p2.y}`,
    `L ${p3.x} ${p3.y}`,
    `A ${OUTER_RADIUS} ${OUTER_RADIUS} 0 0 0 ${p4.x} ${p4.y}`,
    'Z',
  ].join(' ')
  const mid = (start + end) / 2 + TWIST_DEG * 0.55
  const centroid = polar((INNER_RADIUS + OUTER_RADIUS) / 2 + 10, mid)
  const push = polar(18, mid)
  return { path, centroid, pushX: push.x - CENTER, pushY: push.y - CENTER }
}

export function ExploreWheel() {
  const { t } = useLanguage()
  const navigate = usePinwheelNavigate()

  return (
    <section id="explore" aria-labelledby="explore-heading" className="scroll-mt-20 pb-20 md:pb-28">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-accent">{t(ui.wheelEyebrow)}</p>
          <h2 id="explore-heading" className="mt-3 text-balance font-serif text-3xl font-bold text-foreground md:text-4xl">
            {t(ui.wheelHeading)}
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">{t(ui.wheelHint)}</p>
        </div>

        <div className="relative mx-auto mt-10 aspect-square w-full max-w-[680px]">
          <svg viewBox="0 0 1000 1000" className="size-full overflow-visible" role="list" aria-label={t(ui.wheelHeading)}>
            <defs>
              {topics.map((topic, index) => (
                <clipPath id={`blade-${topic.slug}`} key={topic.slug}>
                  <path d={bladeGeometry(index).path} />
                </clipPath>
              ))}
            </defs>

            <circle cx={CENTER} cy={CENTER} r={OUTER_RADIUS + 34} className="fill-none stroke-accent/30" strokeWidth={2} strokeDasharray="4 10" />

            {topics.map((topic, index) => {
              const { path, centroid, pushX, pushY } = bladeGeometry(index)
              const size = 380
              return (
                <g key={topic.slug} role="listitem" className="wheel-blade-enter" style={{ animationDelay: `${index * 60}ms` }}>
                  <a
                    href={`/explore/${topic.slug}`}
                    aria-label={t(topic.title)}
                    className="group cursor-pointer outline-none"
                    onClick={(event) => {
                      event.preventDefault()
                      navigate(`/explore/${topic.slug}`)
                    }}
                  >
                    <g
                      className="transition-transform duration-300 ease-out group-hover:[transform:translate(var(--px),var(--py))] group-focus-visible:[transform:translate(var(--px),var(--py))]"
                      style={{ '--px': `${pushX}px`, '--py': `${pushY}px` } as React.CSSProperties}
                    >
                      <path d={path} className="fill-card" />
                      <image
                        href={topic.image}
                        x={centroid.x - size / 2}
                        y={centroid.y - size / 2}
                        width={size}
                        height={size}
                        preserveAspectRatio="xMidYMid slice"
                        clipPath={`url(#blade-${topic.slug})`}
                        className="transition-[filter] duration-300 group-hover:brightness-110"
                      />
                      <path
                        d={path}
                        className="fill-foreground/0 stroke-card transition-colors duration-300 group-hover:fill-secondary/10 group-focus-visible:stroke-secondary"
                        strokeWidth={6}
                        strokeLinejoin="round"
                      />
                    </g>
                  </a>
                </g>
              )
            })}

            <circle cx={CENTER} cy={CENTER} r={INNER_RADIUS - 16} className="fill-background" />
            <circle cx={CENTER} cy={CENTER} r={INNER_RADIUS - 30} className="fill-none stroke-accent/50" strokeWidth={2} />
          </svg>

          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className="font-serif text-base font-bold uppercase tracking-wide text-foreground sm:text-2xl md:text-[1.65rem]">
              {t(ui.wheelCenterTop)}
            </span>
            <span className="font-serif text-base font-bold uppercase tracking-wide text-secondary sm:text-2xl md:text-[1.65rem]">
              {t(ui.wheelCenterBottom)}
            </span>
          </div>

          {topics.map((topic, index) => {
            const { centroid } = bladeGeometry(index)
            return (
              <span
                key={topic.slug}
                aria-hidden="true"
                className="pointer-events-none absolute hidden -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full sm:block bg-card/95 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-foreground shadow-md ring-1 ring-primary sm:px-3 sm:py-1 sm:text-xs"
                style={{ left: `${centroid.x / 10}%`, top: `${centroid.y / 10}%` }}
              >
                {t(topic.title)}
              </span>
            )
          })}
        </div>

        <ul className="mt-10 flex flex-wrap justify-center gap-2 md:hidden">
          {topics.map((topic) => (
            <li key={topic.slug}>
              <PinwheelLink
                href={`/explore/${topic.slug}`}
                className="inline-block rounded-full border border-accent/60 bg-card px-3 py-1.5 text-xs font-semibold text-foreground"
              >
                {t(topic.title)}
              </PinwheelLink>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
