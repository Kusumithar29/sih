import { ArrowRight, Clock3, Gamepad2, Map, Trophy } from 'lucide-react'
import { Link } from 'wouter'
import { useGetGameStats } from '@workspace/api-client-react'
import { games, completedCount } from '@/lib/games'
import { getPlayerId } from '@/lib/player'

export function GamesPage() {
  const playerId = getPlayerId()
  const { data: stats } = useGetGameStats({ playerId })
  const progress = stats?.gameProgress
  const complete = completedCount(progress)

  return (
    <div className="page-enter mx-auto max-w-7xl px-5 py-10 md:px-8 md:py-16">
      <div className="grid gap-8 lg:grid-cols-[1fr_330px] lg:items-end">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.32em] text-accent">Play the archive</p>
          <h1 className="mt-3 max-w-3xl font-serif text-4xl font-bold leading-tight text-secondary md:text-6xl">Games carried through generations.</h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-foreground/75">Choose a rule set, learn the rhythm, and play your way through five Karnataka classics.</p>
        </div>
        <div className="rounded-2xl border border-accent/35 bg-card p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 font-serif font-bold"><Map className="size-4 text-accent" /> Heritage Passport</div>
            <span className="font-mono text-sm text-secondary">{complete}/5</span>
          </div>
          <div className="mt-4 h-2 overflow-hidden rounded-full bg-muted"><div className="h-full rounded-full bg-primary transition-all" style={{ width: `${(complete / 5) * 100}%` }} /></div>
          <Link href="/passport" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-secondary hover:underline">View your passport <ArrowRight className="size-3" /></Link>
        </div>
      </div>
      <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {games.map((game, index) => {
          const done = Boolean(progress?.[game.id])
          return (
            <article key={game.id} className="group overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition hover:-translate-y-1 hover:shadow-lg" style={{ animationDelay: `${index * 80}ms` }}>
              <div className="relative aspect-[1.7] overflow-hidden">
                <img src={game.image} alt="" className="size-full object-cover transition duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/85 via-transparent" />
                <div className="absolute inset-x-4 bottom-4 flex items-end justify-between gap-3 text-background">
                  <div><p className="text-xs uppercase tracking-[.22em] text-primary">{game.place.split(' · ')[1]}</p><h2 className="mt-1 font-serif text-2xl font-bold">{game.name}</h2></div>
                  {done && <span className="rounded-full bg-primary px-2.5 py-1 text-xs font-bold text-primary-foreground">Completed</span>}
                </div>
              </div>
              <div className="p-5">
                <p className="font-serif text-lg font-bold">{game.tagline}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{game.description}</p>
                <div className="mt-4 flex flex-wrap gap-3 text-xs font-semibold text-muted-foreground">
                  <span className="inline-flex items-center gap-1"><Gamepad2 className="size-3.5 text-accent" /> {game.players}</span>
                  <span className="inline-flex items-center gap-1"><Clock3 className="size-3.5 text-accent" /> {game.time}</span>
                  <span className="inline-flex items-center gap-1"><Trophy className="size-3.5 text-accent" /> {game.difficulty}</span>
                </div>
                <Link href={`/games/${game.id}`} className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 font-serif font-bold text-primary-foreground transition hover:brightness-105">Set up game <ArrowRight className="size-4" /></Link>
              </div>
            </article>
          )
        })}
      </div>
    </div>
  )
}