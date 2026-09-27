export const languages = [
  { code: 'en', label: 'English', locale: 'en-IN' },
  { code: 'kn', label: 'ಕನ್ನಡ', locale: 'kn-IN' },
  { code: 'ta', label: 'தமிழ்', locale: 'ta-IN' },
  { code: 'te', label: 'తెలుగు', locale: 'te-IN' },
  { code: 'hi', label: 'हिन्दी', locale: 'hi-IN' },
  { code: 'ml', label: 'മലയാളം', locale: 'ml-IN' },
] as const

export type Lang = (typeof languages)[number]['code']
export type AdditionalLang = Exclude<Lang, 'en' | 'kn'>
export type Localized = Record<Lang, string>

export function isLanguage(value: unknown): value is Lang {
  return languages.some((language) => language.code === value)
}

export function localized(en: string, kn: string, ta: string, te: string, hi: string, ml: string): Localized {
  return { en, kn, ta, te, hi, ml }
}
