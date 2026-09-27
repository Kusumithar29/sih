'use client'

import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Crown } from 'lucide-react'

type Phase = 'idle' | 'covering' | 'covered' | 'revealing'

const TransitionContext = createContext<{ navigate: (href: string) => void } | null>(null)

export function PinwheelTransitionProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [phase, setPhase] = useState<Phase>('idle')
  const pendingHref = useRef<string | null>(null)

  const navigate = useCallback(
    (href: string) => {
      if (phase !== 'idle') return
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (reduceMotion) {
        router.push(href)
        return
      }
      pendingHref.current = href
      setPhase('covering')
    },
    [phase, router],
  )

  useEffect(() => {
    if (phase === 'covered') setPhase('revealing')
    // Reveal only once the new route has rendered.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  useEffect(() => {
    if (phase !== 'covered') return
    const fallback = window.setTimeout(() => setPhase('revealing'), 2500)
    return () => window.clearTimeout(fallback)
  }, [phase])

  const handleCoverEnd = () => {
    if (phase !== 'covering' || !pendingHref.current) return
    const href = pendingHref.current
    pendingHref.current = null
    setPhase('covered')
    const [path, hash] = href.split('#')
    if (path === pathname || (path === '' && hash)) {
      if (hash) document.getElementById(hash)?.scrollIntoView()
      setPhase('revealing')
      return
    }
    router.push(href)
  }

  const handleRevealEnd = () => {
    if (phase === 'revealing') setPhase('idle')
  }

  return (
    <TransitionContext.Provider value={{ navigate }}>
      {children}
      {phase !== 'idle' && (
        <div aria-hidden="true" className="pointer-events-auto fixed inset-0 z-[100]">
          <div data-phase={phase} className="pinwheel-layer absolute inset-0 bg-primary" />
          <div
            data-phase={phase}
            className="pinwheel-layer pinwheel-lag absolute inset-0 flex items-center justify-center bg-secondary"
            onAnimationEnd={phase === 'covering' ? handleCoverEnd : handleRevealEnd}
          >
            <span className="flex size-20 items-center justify-center rounded-full border-2 border-primary text-primary">
              <Crown className="size-9" />
            </span>
          </div>
        </div>
      )}
    </TransitionContext.Provider>
  )
}

export function usePinwheelNavigate() {
  const context = useContext(TransitionContext)
  if (!context) throw new Error('usePinwheelNavigate must be used within PinwheelTransitionProvider')
  return context.navigate
}

export function PinwheelLink({
  href,
  children,
  ...props
}: React.ComponentProps<typeof Link> & { href: string }) {
  const navigate = usePinwheelNavigate()
  return (
    <Link
      href={href}
      {...props}
      onClick={(event) => {
        if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return
        event.preventDefault()
        navigate(href)
      }}
    >
      {children}
    </Link>
  )
}
