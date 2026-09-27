import { Award, BarChart3, CheckCircle2, Clock3, History, Map, Target, Trophy, type LucideIcon } from 'lucide-react'
import { Link } from 'wouter'
import { useGetGameStats } from '@workspace/api-client-react'
import { games, completedCount } from '@/lib/games'
import { getPlayerId } from '@/lib/player'

function formatTime(seconds: number) {
  if (!seconds) return '—'
  return `${Math.floor(seconds / 60)}m ${seconds % 60}s`
}

export function PassportPage() {
  const playerId = getPlayerId()
  const { data: stats } = useGetGameStats({ playerId })
  const complete = completedCount(stats?.gameProgress)
  const statCards: { label: string; value: string | number; icon: LucideIcon }[] = [
    { label: 'Best score', value: stats?.bestScore ?? 0, icon: Trophy },
    { label: 'Best accuracy', value: stats ? `${Math.round(stats.bestAccuracy)}%` : '—', icon: Target },
    { label: 'Fastest time', value: formatTime(stats?.fastestTime ?? 0), icon: Clock3 },
    { label: 'Attempts', value: stats?.attempts ?? 0, icon: BarChart3 },
    { label: 'Wins', value: stats?.wins ?? 0, icon: Award },
  ]
  return (
    <div className="page-enter mx-auto max-w-7xl px-5 py-10 md:px-8 md:py-16">
      <section>
          <p className="text-xs font-bold uppercase tracking-[0.32em] text-accent">Your progress</p>
          <h1 className="mt-3 font-serif text-4xl font-bold text-secondary md:text-6xl">Heritage Passport</h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-foreground/75">Every completed game marks a place in the archive. Compare your best run in each game, then keep playing to fill the five-game Karnataka set.</p>
          <div className="mt-8 rounded-3xl border border-accent/35 bg-card p-5 shadow-sm sm:p-6">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.24em] text-accent">Overall record</p>
                <h2 className="mt-1 font-serif text-2xl font-bold text-secondary">Personal Best</h2>
              </div>
              <span className="rounded-full bg-muted px-3 py-1 font-mono text-xs text-muted-foreground">{complete}/5 games completed</span>
            </div>
          <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {statCards.map(({ label, value, icon: Icon }) => (
              <div key={label} className="rounded-2xl border border-border bg-background p-4">
                <Icon className="size-4 text-accent" />
                <p className="mt-4 font-mono text-xl font-bold text-secondary">{value}</p>
                <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">{label}</p>
              </div>
            ))}
          </div>
          </div>
      </section>

      <section className="mt-10">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-accent">By game</p>
            <h2 className="mt-2 font-serif text-3xl font-bold text-secondary">Your five-game set</h2>
          </div>
          <p className="text-sm text-muted-foreground">Best recorded performance for each game</p>
        </div>
        <div className="mt-5 grid gap-5 lg:grid-cols-2">
          {games.map((game) => {
            const done = Boolean(stats?.gameProgress?.[game.id])
            const gameStat = stats?.gameStats?.[game.id]
            const history = gameStat?.recentResults ?? []
            const gameCards: { label: string; value: string | number; icon: LucideIcon }[] = [
              { label: 'Score', value: gameStat?.bestScore ?? 0, icon: Trophy },
              { label: 'Accuracy', value: gameStat ? `${Math.round(gameStat.bestAccuracy)}%` : '—', icon: Target },
              { label: 'Fastest time', value: formatTime(gameStat?.fastestTime ?? 0), icon: Clock3 },
              { label: 'Attempts', value: gameStat?.attempts ?? 0, icon: BarChart3 },
              { label: 'Wins', value: gameStat?.wins ?? 0, icon: Award },
            ]
            return (
              <article key={game.id} className="overflow-hidden rounded-3xl border border-border bg-card shadow-sm">
                <div className="relative h-40 overflow-hidden">
                  <img src={game.image} alt="" className="size-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/25 to-transparent" />
                  <div className="absolute inset-x-5 bottom-4 flex items-end justify-between gap-3 text-background">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-primary">{game.place.split(' · ')[1]}</p>
                      <h3 className="mt-1 font-serif text-2xl font-bold">{game.name}</h3>
                    </div>
                    <span className={`rounded-full px-3 py-1 text-xs font-bold ${done ? 'bg-primary text-primary-foreground' : 'bg-background/15 text-background'}`}>{done ? 'Completed' : 'Not played'}</span>
                  </div>
                </div>
                <div className="p-5">
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
                    {gameCards.map(({ label, value, icon: Icon }) => (
                      <div key={label} className="rounded-xl border border-border bg-background p-3 sm:min-w-0">
                        <Icon className="size-3.5 text-accent" />
                        <p className="mt-2 truncate font-mono text-sm font-bold text-secondary">{value}</p>
                        <p className="mt-1 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">{label}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-5 border-t border-border pt-4">
                    <div className="flex items-center justify-between gap-3">
                      <h4 className="flex items-center gap-2 font-serif font-bold"><History className="size-4 text-accent" /> Game history</h4>
                      <Link href={`/games/${game.id}`} className="text-xs font-bold text-secondary hover:underline">{done ? 'Play again' : 'Play now'}</Link>
                    </div>
                    {history.length > 0 ? (
                      <div className="mt-3 space-y-2">
                        {history.slice(0, 3).map((result) => (
                          <div key={result.id} className="flex items-center justify-between gap-3 rounded-lg bg-muted/55 px-3 py-2 text-xs">
                            <span className="font-semibold capitalize">{result.result} · {result.difficulty}</span>
                            <span className="font-mono text-muted-foreground">{result.score} pts · {Math.round(result.accuracy)}% · {formatTime(result.durationSeconds)}</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="mt-3 rounded-lg border border-dashed border-border px-3 py-3 text-xs text-muted-foreground">No attempts yet. Your completed rounds will appear here.</p>
                    )}
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </section>

      <section className="mt-10 rounded-3xl border border-border bg-foreground p-6 text-background shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-3"><Map className="size-5 text-primary" /><h2 className="font-serif text-2xl font-bold">Passport progress</h2></div>
            <p className="mt-2 text-sm text-background/65">Complete all five games to fill your Karnataka set.</p>
          </div>
          <span className="font-mono text-sm text-primary">{complete}/5 complete</span>
        </div>
        <div className="mt-5 h-2 overflow-hidden rounded-full bg-background/15"><div className="h-full rounded-full bg-primary transition-all" style={{ width: `${(complete / 5) * 100}%` }} /></div>
        <div className="mt-5 grid gap-2 sm:grid-cols-5">
          {games.map((game) => {
            const done = Boolean(stats?.gameProgress?.[game.id])
            return <Link href={`/games/${game.id}`} key={game.id} className="flex items-center gap-2 rounded-xl border border-background/15 bg-background/5 px-3 py-2 text-xs transition hover:bg-background/10"><CheckCircle2 className={`size-4 ${done ? 'text-primary' : 'text-background/35'}`} /><span className="truncate">{game.name}</span></Link>
          })}
        </div>
        <Link href="/games" className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-primary px-5 py-3 font-serif font-bold text-primary-foreground">Choose a game</Link>
      </section>
    </div>
  )
}