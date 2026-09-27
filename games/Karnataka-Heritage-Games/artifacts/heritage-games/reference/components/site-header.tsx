'use client'

import { Crown, Languages } from 'lucide-react'
import { useLanguage } from '@/components/providers/language-provider'
import { PinwheelLink } from '@/components/providers/pinwheel-transition'
import { ui } from '@/lib/i18n'
import { isLanguage, languages } from '@/lib/languages'
import { NativeSelect, NativeSelectOption } from '@/components/ui/native-select'

export function SiteHeader() {
  const { t, lang, setLanguage } = useLanguage()

  const links = [
    { href: '/#explore', label: t(ui.navExplore) },
    { href: '/explore/monuments', label: t(ui.navHeritage) },
    { href: '/explore/attire', label: t(ui.navAttire) },
    { href: '/explore/food', label: t(ui.navFood) },
  ]

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 md:h-20 md:px-8">
        <PinwheelLink href="/" className="flex items-center gap-3">
          <span className="flex size-10 items-center justify-center rounded-full border-2 border-accent text-accent md:size-11">
            <Crown className="size-5" aria-hidden="true" />
          </span>
          <span className="font-serif text-lg font-bold tracking-wide text-foreground md:text-xl">
            {t(ui.brand)}
          </span>
        </PinwheelLink>

        <nav aria-label={t(ui.mainNavigation)} className="hidden lg:block">
          <ul className="flex items-center gap-8">
            {links.map((link) => (
              <li key={link.href}>
                <PinwheelLink
                  href={link.href}
                  className="text-sm font-medium text-foreground/80 transition-colors hover:text-secondary"
                >
                  {link.label}
                </PinwheelLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <Languages className="hidden size-4 text-accent sm:block" aria-hidden="true" />
          <NativeSelect
            id="site-language"
            aria-label={t(ui.language)}
            value={lang}
            onChange={(event) => {
              if (isLanguage(event.target.value)) setLanguage(event.target.value)
            }}
          >
            {languages.map((language) => (
              <NativeSelectOption key={language.code} value={language.code} lang={language.code}>
                {language.label}
              </NativeSelectOption>
            ))}
          </NativeSelect>
        </div>
      </div>
    </header>
  )
}
