import { Crown, Languages, Map, Menu, X } from 'lucide-react'
import { useState } from 'react'
import { Link, useLocation } from 'wouter'

type SiteShellProps = { children: React.ReactNode; active?: string }

export function SiteShell({ children, active }: SiteShellProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [language, setLanguage] = useState('English')
  const [location] = useLocation()
  const activeRoute = active ?? location
  const links = [
    { href: '/#explore', label: 'Explore' },
    { href: '/games', label: 'Play heritage' },
    { href: '/passport', label: 'My passport' },
  ]

  return (
    <div className="heritage-grain min-h-[100dvh] bg-background text-foreground">
      <header className="sticky top-0 z-50 border-b border-border/75 bg-background/90 backdrop-blur-md">
        <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between gap-4 px-5 md:h-20 md:px-8">
          <Link href="/" className="flex items-center gap-3" data-testid="link-brand-home">
            <span className="flex size-10 items-center justify-center rounded-full border-2 border-accent text-accent transition-transform hover:rotate-12 md:size-11">
              <Crown className="size-5" aria-hidden="true" />
            </span>
            <span className="font-serif text-lg font-bold tracking-wide md:text-xl">Karnataka, in stories</span>
          </Link>
          <nav aria-label="Main navigation" className="hidden lg:block">
            <ul className="flex items-center gap-8">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    data-testid={`link-nav-${link.label.toLowerCase().replaceAll(' ', '-')}`}
                    className={`text-sm font-semibold transition-colors hover:text-secondary ${activeRoute === link.href || (link.href === '/games' && activeRoute.startsWith('/games')) || (link.href === '/passport' && activeRoute === '/passport') ? 'text-secondary' : 'text-foreground/75'}`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="flex items-center gap-2">
            <Languages className="hidden size-4 text-accent sm:block" aria-hidden="true" />
            <select
              aria-label="Language"
              value={language}
              onChange={(event) => setLanguage(event.target.value)}
              data-testid="select-language"
              className="h-9 rounded-full border border-border bg-card px-3 text-xs font-semibold text-foreground outline-none focus:ring-2 focus:ring-accent/50"
            >
              <option>English</option>
              <option>ಕನ್ನಡ</option>
              <option>हिन्दी</option>
            </select>
            <button type="button" aria-label="Toggle navigation" onClick={() => setMenuOpen(!menuOpen)} data-testid="button-toggle-menu" className="ml-1 rounded-full p-2 hover:bg-muted lg:hidden">
              {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>
        {menuOpen && (
          <nav className="border-t border-border/70 bg-background px-5 py-4 lg:hidden">
            <ul className="mx-auto flex max-w-7xl flex-col gap-3">
              {links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} onClick={() => setMenuOpen(false)} data-testid={`link-mobile-${link.label.toLowerCase().replaceAll(' ', '-')}`} className="block rounded-lg px-3 py-2 font-serif text-lg hover:bg-muted">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </header>
      <main>{children}</main>
      <footer className="border-t border-border bg-foreground text-background">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-5 py-8 text-sm md:flex-row md:px-8">
          <Link href="/" className="font-serif text-lg font-bold tracking-wide text-primary" data-testid="link-footer-brand">Karnataka, in stories</Link>
          <p className="text-center text-background/70">Learn a place by playing the games people carried with them.</p>
          <Link href="/passport" className="inline-flex items-center gap-2 text-background/80 transition-colors hover:text-primary" data-testid="link-footer-passport">
            <Map className="size-4" /> Your passport
          </Link>
        </div>
      </footer>
    </div>
  )
}
