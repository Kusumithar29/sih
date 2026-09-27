'use client'

import { useLanguage } from '@/components/providers/language-provider'
import { ui } from '@/lib/i18n'

export function SiteFooter() {
  const { t } = useLanguage()
  return (
    <footer className="border-t border-border bg-foreground text-background">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-6 text-sm md:flex-row md:px-8">
        <p className="font-serif font-bold tracking-wide text-primary">{t(ui.brand)}</p>
        <p className="text-background/80">{t(ui.footer)}</p>
      </div>
    </footer>
  )
}
