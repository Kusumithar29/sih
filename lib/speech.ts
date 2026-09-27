import type { Lang } from './languages'

const scripts: [Lang, RegExp][] = [
  ['kn', /\p{Script=Kannada}/gu],
  ['ta', /\p{Script=Tamil}/gu],
  ['te', /\p{Script=Telugu}/gu],
  ['hi', /\p{Script=Devanagari}/gu],
  ['ml', /\p{Script=Malayalam}/gu],
  ['en', /\p{Script=Latin}/gu],
]

export function detectSpeechLanguage(text: string, fallback: Lang): Lang {
  let language = fallback
  let highestCount = 0
  for (const [code, pattern] of scripts) {
    const count = text.match(pattern)?.length ?? 0
    if (count > highestCount) {
      highestCount = count
      language = code
    }
  }
  return language
}

export function splitSpeechText(text: string, maxLength = 220): string[] {
  const words = text.trim().split(/\s+/u).filter(Boolean)
  const chunks: string[] = []
  let current = ''
  for (const word of words) {
    if (current && current.length + word.length + 1 > maxLength) {
      chunks.push(current)
      current = ''
    }
    current = current ? `${current} ${word}` : word
    if (current.length >= maxLength || /[.!?।]$/u.test(current)) {
      chunks.push(current)
      current = ''
    }
  }
  if (current) chunks.push(current)
  return chunks
}

export function findSpeechVoice(voices: SpeechSynthesisVoice[], language: Lang) {
  const normalize = (locale: string) => locale.toLowerCase().replaceAll('_', '-')
  return voices.find((voice) => normalize(voice.lang) === `${language}-in`)
    ?? voices.find((voice) => normalize(voice.lang).split('-')[0] === language)
}
