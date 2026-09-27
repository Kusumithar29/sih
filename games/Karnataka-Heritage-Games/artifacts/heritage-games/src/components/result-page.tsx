import { ArrowLeft, CheckCircle2, Clock3, Flag, RotateCcw, Sparkles, Target, Trophy, type LucideIcon } from 'lucide-react'
import { Link, useRoute } from 'wouter'
import { getGame } from '@/lib/games'

type SavedResult = { gameId: string; gameName: string; difficulty: string; score: number; accuracy: number; durationSeconds: number; totalMoves: number; result: string }

export function ResultPage() {
  const [, params] = useRoute('/games/:gameId/result')
  const game = getGame(params?.gameId ?? '')
  let result: SavedResult | null = null
  try { result = JSON.parse(window.sessionStorage.getItem('last-heritage-result') ?? 'null') as SavedResult | null } catch { result = null }
  const value = result ?? { gameId: game?.id ?? '', gameName: game?.name ?? 'Heritage game', difficulty: 'easy', score: 0, accuracy: 0, durationSeconds: 0, totalMoves: 0, result: 'win' }
  const won = value.result === 'win'
  const time = `${Math.floor(value.durationSeconds / 60)}m ${value.durationSeconds % 60}s`
  const statCards: { label: string; stat: string | number; icon: LucideIcon }[] = [
    { label: 'Score', stat: value.score, icon: Trophy },
    { label: 'Accuracy', stat: `${Math.round(value.accuracy)}%`, icon: Target },
    { label: 'Time', stat: time, icon: Clock3 },
    { label: 'Moves', stat: value.totalMoves, icon: Flag },
  ]
  return (
    <div className="page-enter mx-auto max-w-4xl px-5 py-12 md:px-8 md:py-20">
      <Link href="/games" className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-secondary"><ArrowLeft className="size-4" /> Back to games</Link>
      <div className="mt-8 overflow-hidden rounded-3xl border border-border bg-card shadow-xl">
        <div className="relative overflow-hidden bg-foreground px-6 py-12 text-center text-background sm:px-12"><div className="pulse-ring absolute left-1/2 top-1/2 size-64 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/40" /><Sparkles className="relative mx-auto size-9 text-primary" /><p className="relative mt-5 text-xs font-bold uppercase tracking-[.32em] text-primary">{won ? 'Game complete' : 'Round complete'}</p><h1 className="relative mt-3 font-serif text-4xl font-bold sm:text-6xl">{won ? 'A fine play.' : 'The story continues.'}</h1><p className="relative mt-3 text-background/70">{value.gameName} · {value.difficulty} · {won ? 'You won' : value.result}</p></div>
        <div className="p-6 sm:p-10"><div className="grid grid-cols-2 gap-3 sm:grid-cols-4">{statCards.map(({ label, stat, icon: Icon }) => <div key={label} className="rounded-2xl border border-border bg-background p-4 text-center"><Icon className="mx-auto size-5 text-accent" /><p className="mt-3 font-mono text-2xl font-bold text-secondary">{stat}</p><p className="mt-1 text-xs font-bold uppercase tracking-widest text-muted-foreground">{label}</p></div>)}</div><div className="mt-8 flex flex-col items-center justify-between gap-4 rounded-2xl border border-accent/25 bg-muted/55 p-5 text-center sm:flex-row sm:text-left"><div className="flex items-center gap-3"><CheckCircle2 className="size-6 text-accent" /><div><p className="font-serif font-bold">Added to your Heritage Passport</p><p className="text-sm text-muted-foreground">Your best score, time, and accuracy update automatically.</p></div></div><Link href="/passport" className="font-semibold text-secondary hover:underline">View passport</Link></div><div className="mt-8 flex flex-col gap-3 sm:flex-row"><Link href={`/games/${value.gameId}`} className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 font-serif font-bold text-primary-foreground"><RotateCcw className="size-4" /> Play again</Link><Link href="/games" className="inline-flex flex-1 items-center justify-center rounded-full border-2 border-accent px-5 py-3 font-serif font-bold">Choose another game</Link></div></div>
      </div>
    </div>
  )
}