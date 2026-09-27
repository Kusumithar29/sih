'use client'

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { isLanguage, type Lang, type Localized } from '@/lib/languages'

type LanguageContextValue = {
  lang: Lang
  setLanguage: (language: Lang) => void
  t: (value: Localized) => string
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

export function LanguageProvider({ children, initialLanguage }: { children: React.ReactNode; initialLanguage: Lang }) {
  const [lang, setLang] = useState<Lang>(initialLanguage)

  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  const setLanguage = useCallback((language: Lang) => {
    if (!isLanguage(language)) return
    setLang(language)
    document.cookie = `karunadu-lang=${language}; Path=/; Max-Age=31536000; SameSite=Lax${location.protocol === 'https:' ? '; Secure' : ''}`
  }, [])

  const value = useMemo<LanguageContextValue>(
    () => ({ lang, setLanguage, t: (copy) => copy[lang] }),
    [lang, setLanguage],
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) throw new Error('useLanguage must be used within LanguageProvider')
  return context
}
