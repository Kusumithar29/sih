'use client'

import { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import { Pause, Play, Square, Volume2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useLanguage } from '@/components/providers/language-provider'
import { languages, type Lang } from '@/lib/languages'
import { ui } from '@/lib/i18n'
import { detectSpeechLanguage, findSpeechVoice, splitSpeechText } from '@/lib/speech'

type Playback = 'idle' | 'reading' | 'paused'
type Notice = 'finished' | 'stopped' | 'speechUnavailable' | 'voiceMissing' | 'speechError' | null

export function ReadAloud() {
  const { lang } = useLanguage()
  const pathname = usePathname()
  return <SpeechControls key={`${pathname}:${lang}`} />
}

function SpeechControls() {
  const { t, lang } = useLanguage()
  const [supported, setSupported] = useState<boolean | null>(null)
  const [selection, setSelection] = useState<{ text: string; language: Lang } | null>(null)
  const [playback, setPlayback] = useState<Playback>('idle')
  const [notice, setNotice] = useState<Notice>(null)
  const toolbar = useRef<HTMLElement>(null)
  const voices = useRef<SpeechSynthesisVoice[]>([])
  const utterance = useRef<SpeechSynthesisUtterance | null>(null)
  const session = useRef(0)

  useEffect(() => {
    const available = 'speechSynthesis' in window && 'SpeechSynthesisUtterance' in window
    setSupported(available)
    const synth = available ? window.speechSynthesis : null
    const updateVoices = () => { voices.current = synth?.getVoices() ?? [] }
    updateVoices()
    synth?.addEventListener('voiceschanged', updateVoices)

    const captureSelection = () => {
      const selected = window.getSelection()
      if (selected?.anchorNode && toolbar.current?.contains(selected.anchorNode)) return
      if (selected?.focusNode && toolbar.current?.contains(selected.focusNode)) return
      const text = selected?.toString().trim() ?? ''
      // Keep the captured text when keyboard focus moves into the playback controls.
      if (!text && toolbar.current?.contains(document.activeElement)) return
      setSelection(text ? { text, language: detectSpeechLanguage(text, lang) } : null)
      setNotice(null)
    }
    document.addEventListener('selectionchange', captureSelection)
    const cancelOnExit = () => {
      session.current += 1
      synth?.cancel()
      utterance.current = null
      setPlayback('idle')
    }
    window.addEventListener('pagehide', cancelOnExit)
    return () => {
      document.removeEventListener('selectionchange', captureSelection)
      window.removeEventListener('pagehide', cancelOnExit)
      synth?.removeEventListener('voiceschanged', updateVoices)
      session.current += 1
      synth?.cancel()
      utterance.current = null
    }
  }, [lang])

  const stop = () => {
    session.current += 1
    window.speechSynthesis.cancel()
    utterance.current = null
    setPlayback('idle')
    setNotice('stopped')
  }

  const listen = () => {
    if (!supported || !selection) return
    const synth = window.speechSynthesis
    const job = ++session.current
    synth.cancel()
    if (synth.paused) synth.resume()
    utterance.current = null
    setPlayback('idle')
    voices.current = synth.getVoices()
    const voice = findSpeechVoice(voices.current, selection.language)
    if (!voice) {
      setNotice('voiceMissing')
      return
    }
    const chunks = splitSpeechText(selection.text)
    const locale = languages.find((language) => language.code === selection.language)!.locale
    setNotice(null)
    setPlayback('reading')

    const speakChunk = (index: number) => {
      if (session.current !== job) return
      if (index >= chunks.length) {
        utterance.current = null
        setPlayback('idle')
        setNotice('finished')
        return
      }
      const speech = new SpeechSynthesisUtterance(chunks[index])
      speech.voice = voice
      speech.lang = locale
      speech.rate = 0.95
      speech.onend = () => speakChunk(index + 1)
      speech.onerror = () => {
        if (session.current !== job) return
        session.current += 1
        utterance.current = null
        setPlayback('idle')
        setNotice('speechError')
      }
      utterance.current = speech
      try {
        synth.speak(speech)
      } catch {
        session.current += 1
        utterance.current = null
        setPlayback('idle')
        setNotice('speechError')
      }
    }
    speakChunk(0)
  }

  const togglePause = () => {
    if (playback === 'paused') {
      window.speechSynthesis.resume()
      setPlayback('reading')
    } else {
      window.speechSynthesis.pause()
      setPlayback('paused')
    }
  }

  const message = supported === false
    ? t(ui.speechUnavailable)
    : notice ? t(ui[notice]) : playback !== 'idle' ? t(ui[playback]) : t(ui.voiceNote)

  return (
    <aside
      ref={toolbar}
      aria-label={t(ui.speechTitle)}
      data-speech-controls
      data-ready={supported !== null}
      className="fixed inset-x-3 bottom-3 z-50 mx-auto max-w-3xl rounded-2xl border border-border bg-card/95 p-3 shadow-xl backdrop-blur-md sm:inset-x-6 sm:bottom-5 sm:p-4"
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex min-w-0 flex-1 items-center gap-3">
          <span className="hidden size-10 shrink-0 items-center justify-center rounded-full bg-muted text-primary sm:flex">
            <Volume2 className="size-5" aria-hidden="true" />
          </span>
          <div className="flex min-w-0 flex-col gap-1">
            <p className="text-sm font-semibold">{t(ui.speechTitle)}</p>
            <p id="speech-selection" className="line-clamp-2 text-xs leading-relaxed text-muted-foreground">
              {selection ? <><span>{t(ui.selected)}: </span><span lang={selection.language}>{selection.text.slice(0, 110)}{selection.text.length > 110 ? '…' : ''}</span></> : t(ui.selectionHint)}
            </p>
          </div>
        </div>
        <div className="flex shrink-0 flex-wrap items-center justify-end gap-2" onPointerDown={(event) => event.preventDefault()}>
          {playback === 'idle' ? (
            <Button size="lg" onClick={listen} disabled={!supported || !selection} aria-describedby="speech-selection speech-status" title={t(ui.voiceNote)}>
              <Volume2 data-icon="inline-start" aria-hidden="true" />
              {t(ui.listen)}
            </Button>
          ) : (
            <>
              <Button variant="secondary" size="lg" onClick={togglePause}>
                {playback === 'paused' ? <Play data-icon="inline-start" aria-hidden="true" /> : <Pause data-icon="inline-start" aria-hidden="true" />}
                {t(playback === 'paused' ? ui.resume : ui.pause)}
              </Button>
              <Button variant="outline" size="icon-lg" onClick={stop} aria-label={t(ui.stop)} title={t(ui.stop)}>
                <Square aria-hidden="true" />
              </Button>
            </>
          )}
        </div>
      </div>
      <p id="speech-status" role="status" aria-live="polite" aria-atomic="true" className={message ? 'mt-2 text-xs leading-relaxed text-muted-foreground' : 'sr-only'}>
        {message}
      </p>
    </aside>
  )
}
