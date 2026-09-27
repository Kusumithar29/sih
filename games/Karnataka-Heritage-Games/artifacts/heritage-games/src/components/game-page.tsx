import { useEffect, useMemo, useRef, useState } from 'react'
import { ArrowLeft, Bot, CircleHelp, Clock3, Flag, RotateCcw, Sparkles, Users, WandSparkles } from 'lucide-react'
import { Link, useLocation, useRoute } from 'wouter'
import { useCreateGameResult } from '@workspace/api-client-react'
import { games, getGame } from '@/lib/games'
import { getPlayerId } from '@/lib/player'

type Difficulty = 'easy' | 'medium' | 'hard'
type Mode = 'computer' | 'local'
type Result = 'win' | 'loss' | 'draw'

const emptyRace = () => [0, 0, 0, 0]
const navLines = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]]
const aaduNeighbors = (index: number) => {
  const row = Math.floor(index / 5)
  const col = index % 5
  return [index - 5, index + 5, col > 0 ? index - 1 : -1, col < 4 ? index + 1 : -1].filter((value) => value >= 0 && value < 15 && Math.floor(value / 5) >= 0 && Math.floor(value / 5) < 3)
}

function chooseComputerMove(values: number[], difficulty: Difficulty) {
  if (!values.length) return undefined
  if (difficulty === 'easy') return values[0]
  if (difficulty === 'medium') return values[Math.floor((values.length - 1) / 2)]
  return values[values.length - 1]
}

function gameTitle(id: string) {
  return getGame(id) ?? games[0]
}

export function GamePage() {
  const [, params] = useRoute('/games/:gameId')
  const [, navigate] = useLocation()
  const game = gameTitle(params?.gameId ?? games[0].id)
  const createResult = useCreateGameResult()
  const [difficulty, setDifficulty] = useState<Difficulty>('easy')
  const [mode, setMode] = useState<Mode>('computer')
  const [started, setStarted] = useState(false)
  const [finished, setFinished] = useState(false)
  const [turn, setTurn] = useState<1 | 2>(1)
  const [selected, setSelected] = useState<number | null>(null)
  const [board, setBoard] = useState<number[]>([])
  const [tokens, setTokens] = useState<[number[], number[]]>([emptyRace(), emptyRace()])
  const [stores, setStores] = useState<[number, number]>([0, 0])
  const [placed, setPlaced] = useState<[number, number]>([0, 0])
  const [goatCount, setGoatCount] = useState(0)
  const [captured, setCaptured] = useState(0)
  const [lastRoll, setLastRoll] = useState<number | null>(null)
  const [validMoves, setValidMoves] = useState(0)
  const [invalidMoves, setInvalidMoves] = useState(0)
  const [moves, setMoves] = useState(0)
  const [seconds, setSeconds] = useState(0)
  const [message, setMessage] = useState('Choose a difficulty and start a game.')
  const startedAt = useRef<string>('')
  const computerBusy = useRef(false)

  const isMancala = game.board === 'mancala'
  const isNavakankari = game.board === 'stones'
  const isAadu = game.board === 'tiger'
  const isRace = !isMancala && !isNavakankari && !isAadu

  useEffect(() => {
    if (!started || finished) return
    const timer = window.setInterval(() => setSeconds(Math.floor((Date.now() - new Date(startedAt.current).getTime()) / 1000)), 1000)
    return () => window.clearInterval(timer)
  }, [started, finished])

  const reset = () => {
    setStarted(false)
    setFinished(false)
    setTurn(1)
    setSelected(null)
    setLastRoll(null)
    setValidMoves(0)
    setInvalidMoves(0)
    setMoves(0)
    setSeconds(0)
    setStores([0, 0])
    setPlaced([0, 0])
    setGoatCount(0)
    setCaptured(0)
    setTokens([emptyRace(), emptyRace()])
    if (isMancala) setBoard([4, 4, 4, 4, 4, 4, 0, 4, 4, 4, 4, 4, 4, 0])
    else if (isNavakankari) setBoard(Array(9).fill(0))
    else if (isAadu) setBoard([2, 2, 2, ...Array(12).fill(0)])
    else setBoard([])
    setMessage('Choose a difficulty and start a game.')
  }

  useEffect(() => { reset() }, [game.id])

  const start = () => {
    startedAt.current = new Date().toISOString()
    setStarted(true)
    setFinished(false)
    setMessage(mode === 'computer' ? 'Your turn. Legal moves are highlighted.' : 'Player 1, make the first move.')
  }

  const finish = (result: Result, extraStats: Record<string, number> = {}) => {
    setFinished(true)
    setMessage(result === 'win' ? 'You completed the game.' : result === 'loss' ? 'The opposing side completed the game.' : 'The game ended in a draw.')
    const total = Math.max(moves + 1, 1)
    const accuracy = Math.round((validMoves / total) * 100)
    const payload = {
      playerId: getPlayerId(),
      gameId: game.id,
      gameName: game.name,
      difficulty,
      score: Math.max(0, validMoves * 100 - invalidMoves * 10 + captured * 50 + (result === 'win' ? 250 : 0)),
      accuracy,
      durationSeconds: Math.max(seconds, 1),
      totalMoves: total,
      validMoves,
      invalidMoves,
      stats: { captures: captured, piecesCompleted: extraStats.piecesCompleted ?? 0, seedsCollected: extraStats.seedsCollected ?? stores[0], mills: extraStats.mills ?? 0 },
      result,
      startedAt: startedAt.current || new Date().toISOString(),
      completedAt: new Date().toISOString(),
    }
    window.sessionStorage.setItem('last-heritage-result', JSON.stringify(payload))
    createResult.mutate({ data: payload }, { onSuccess: () => navigate(`/games/${game.id}/result`) })
    window.setTimeout(() => navigate(`/games/${game.id}/result`), 700)
  }

  const markInvalid = (text = 'That move is not legal. Try a highlighted space.') => {
    setInvalidMoves((value) => value + 1)
    setMessage(text)
  }

  const navLegal = useMemo(() => {
    if (!started || finished) return []
    if (placed[turn - 1] < 3) return board.map((value, index) => value === 0 ? index : -1).filter((index) => index >= 0)
    if (selected !== null) return navLines.flatMap((line) => line.includes(selected) ? line : []).filter((index) => index !== selected && board[index] === 0)
    return board.map((value, index) => value === turn ? index : -1).filter((index) => index >= 0)
  }, [board, finished, placed, selected, started, turn])

  const aaduLegal = useMemo(() => {
    if (!started || finished) return []
    if (turn === 1 && goatCount < 6) return board.map((value, index) => value === 0 ? index : -1).filter((index) => index >= 0)
    if (selected === null) return board.map((value, index) => value === turn ? index : -1).filter((index) => index >= 0)
    return aaduNeighbors(selected).filter((index) => board[index] === 0)
  }, [board, finished, goatCount, selected, started, turn])

  const raceLegal = useMemo(() => {
    if (lastRoll === null) return []
    return tokens[turn - 1].map((position, index) => position + lastRoll <= 16 ? index : -1).filter((index) => index >= 0)
  }, [lastRoll, tokens, turn])

  const completeTurn = (nextTurn: 1 | 2, text: string) => {
    setMoves((value) => value + 1)
    setValidMoves((value) => value + 1)
    setSelected(null)
    setLastRoll(null)
    setTurn(nextTurn)
    setMessage(text)
  }

  const playMancala = (index: number) => {
    if (turn === 2 && mode === 'computer') return
    const ownPit = turn === 1 ? index >= 0 && index < 6 : index >= 7 && index < 13
    if (!ownPit || board[index] === 0) return markInvalid()
    const next = [...board]
    let seeds = next[index]
    next[index] = 0
    let cursor = index
    while (seeds > 0) {
      cursor = (cursor + 1) % 14
      if ((turn === 1 && cursor === 13) || (turn === 2 && cursor === 6)) continue
      next[cursor] += 1
      seeds -= 1
    }
    const ownStore = turn === 1 ? 6 : 13
    const extraTurn = cursor === ownStore
    if (next[cursor] === 1 && ((turn === 1 && cursor < 6) || (turn === 2 && cursor > 6 && cursor < 13))) {
      const opposite = 12 - cursor
      const storeIndex = turn === 1 ? 6 : 13
      setStores((current) => [storeIndex === 6 ? current[0] + next[opposite] + 1 : current[0], storeIndex === 13 ? current[1] + next[opposite] + 1 : current[1]])
      next[storeIndex] += next[opposite] + 1
      next[cursor] = 0
      next[opposite] = 0
    }
    setBoard(next)
    const ownEmpty = next.slice(turn === 1 ? 0 : 7, turn === 1 ? 6 : 13).every((value) => value === 0)
    if (ownEmpty) {
      const otherStart = turn === 1 ? 7 : 0
      const other = next.slice(otherStart, otherStart + 6).reduce((sum, value) => sum + value, 0)
      next[turn === 1 ? 13 : 6] += other
      const winner = next[6] === next[13] ? 'draw' : next[6] > next[13] ? 'win' : 'loss'
      setBoard(next)
      finish(winner, { seedsCollected: next[6] })
      return
    }
    completeTurn(extraTurn ? turn : turn === 1 ? 2 : 1, extraTurn ? 'You earned another turn.' : 'Seeds are moving. The next player is up.')
  }

  const playNavakankari = (index: number) => {
    if (turn === 2 && mode === 'computer') return
    if (placed[turn - 1] < 3) {
      if (!navLegal.includes(index)) return markInvalid()
      const next = [...board]; next[index] = turn; setBoard(next)
      const nextPlaced: [number, number] = [...placed] as [number, number]
      nextPlaced[turn - 1] += 1; setPlaced(nextPlaced)
      const hasMill = navLines.some((line) => line.every((point) => next[point] === turn))
      if (hasMill) setCaptured((value) => value + 1)
      completeTurn(turn === 1 ? 2 : 1, hasMill ? 'A line of three. A mill is recorded.' : 'Stone placed. Look ahead.')
      return
    }
    if (selected === null) {
      if (board[index] !== turn) return markInvalid('Select one of your stones.')
      setSelected(index); setMessage('Now choose a highlighted empty point.')
      return
    }
    if (!navLegal.includes(index)) return markInvalid()
    const next = [...board]; next[selected] = 0; next[index] = turn
    setBoard(next)
    const hasMill = navLines.some((line) => line.every((point) => next[point] === turn))
    const opponent = turn === 1 ? 2 : 1
    const opponentCount = next.filter((value) => value === opponent).length
    if (hasMill) setCaptured((value) => value + 1)
    if (opponentCount < 3) { finish('win', { mills: hasMill ? 1 : 0 }); return }
    completeTurn(turn === 1 ? 2 : 1, hasMill ? 'Mill made. One point of territory is yours.' : 'Stone moved.')
  }

  const playAadu = (index: number) => {
    if (turn === 2 && mode === 'computer') return
    if (turn === 1 && goatCount < 6) {
      if (!aaduLegal.includes(index)) return markInvalid()
      const next = [...board]; next[index] = 1; setBoard(next); setGoatCount((value) => value + 1)
      completeTurn(2, 'Goat placed. The tiger is watching.')
      return
    }
    if (selected === null) {
      if (board[index] !== turn) return markInvalid(turn === 1 ? 'Select one of your goats.' : 'Select one of the tigers.')
      setSelected(index); setMessage('Choose a highlighted destination.')
      return
    }
    const canJump = turn === 2 && Math.abs(index - selected) === 2 && board[(index + selected) / 2] === 1 && board[index] === 0
    if (!aaduLegal.includes(index) && !canJump) return markInvalid()
    const next = [...board]; next[selected] = 0; next[index] = turn
    if (canJump) { next[(index + selected) / 2] = 0; setCaptured((value) => value + 1) }
    setBoard(next)
    if (captured + (canJump ? 1 : 0) >= 3) { finish('loss', { captures: captured + 1 }); return }
    const goatMoves = next.some((value, point) => value === 1 && aaduNeighbors(point).some((target) => next[target] === 0))
    if (!goatMoves && goatCount >= 6) { finish('loss', { captures: captured }); return }
    completeTurn(turn === 1 ? 2 : 1, canJump ? 'Tiger captured a goat.' : 'Move complete. Protect the herd.')
  }

  const rollRace = () => {
    if (turn === 2 && mode === 'computer') return
    if (lastRoll !== null) return markInvalid('Move a highlighted token before throwing again.')
    const roll = ((moves * (difficulty === 'hard' ? 3 : difficulty === 'medium' ? 2 : 1) + 2) % 4) + 1
    setLastRoll(roll)
    const legal = tokens[turn - 1].map((position, index) => position + roll <= 16 ? index : -1).filter((index) => index >= 0)
    if (!legal.length) {
      setMessage(`The throw was ${roll}. No token can move.`)
      completeTurn(turn === 1 ? 2 : 1, 'No legal token; the turn passes.')
    } else setMessage(`The throw is ${roll}. Choose a highlighted token.`)
  }

  const moveRace = (tokenIndex: number) => {
    if (turn === 2 && mode === 'computer') return
    if (lastRoll === null || !raceLegal.includes(tokenIndex)) return markInvalid()
    const next: [number[], number[]] = [tokens[0].slice(), tokens[1].slice()]
    next[turn - 1][tokenIndex] += lastRoll
    setTokens(next)
    if (next[turn - 1].every((position) => position >= 16)) { finish('win', { piecesCompleted: 4 }); return }
    completeTurn(turn === 1 ? 2 : 1, 'Token moved along the shared path.')
  }

  const computerTurn = () => {
    if (computerBusy.current || !started || finished || mode !== 'computer' || turn !== 2) return
    computerBusy.current = true
    if (isMancala) {
      const legal = board.map((value, index) => value > 0 && index >= 7 && index < 13 ? index : -1).filter((index) => index >= 0)
      const choice = chooseComputerMove(legal, difficulty)
      if (choice !== undefined) playMancala(choice)
    } else if (isNavakankari) {
      const legal = navLegal
      const choice = chooseComputerMove(legal, difficulty)
      if (choice !== undefined) playNavakankari(choice)
    } else if (isAadu) {
      if (selected !== null) {
        const choice = chooseComputerMove(aaduLegal, difficulty)
        if (choice !== undefined) playAadu(choice)
      } else {
        const choice = chooseComputerMove(aaduLegal, difficulty)
        if (choice !== undefined) { setSelected(choice); setMessage('The tiger is choosing a path.') }
      }
    } else {
      const roll = ((moves * 2 + 1) % 4) + 1
      const legal = tokens[1].map((position, index) => position + roll <= 16 ? index : -1).filter((index) => index >= 0)
      if (legal.length) {
        const next: [number[], number[]] = [tokens[0].slice(), tokens[1].slice()]
        next[1][chooseComputerMove(legal, difficulty) ?? legal[0]] += roll
        setTokens(next)
        if (next[1].every((position) => position >= 16)) finish('loss', { piecesCompleted: 4 })
        else completeTurn(1, `Computer threw ${roll} and moved a token.`)
      } else completeTurn(1, `Computer threw ${roll}; no token could move.`)
    }
    window.setTimeout(() => { computerBusy.current = false }, 500)
  }

  useEffect(() => {
    if (!started || finished || mode !== 'computer' || turn !== 2) return
    const timeout = window.setTimeout(computerTurn, 500)
    return () => window.clearTimeout(timeout)
  }, [started, finished, mode, turn, board, selected, tokens, moves])

  const legal = isMancala ? board.map((value, index) => value > 0 && (turn === 1 ? index < 6 : index > 6 && index < 13) ? index : -1).filter((index) => index >= 0) : isNavakankari ? navLegal : isAadu ? aaduLegal : raceLegal

  return (
    <div className="page-enter mx-auto max-w-7xl px-5 py-8 md:px-8 md:py-12">
      <Link href="/games" className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-secondary"><ArrowLeft className="size-4" /> All games</Link>
      <div className="mt-6 grid gap-8 lg:grid-cols-[minmax(0,1fr)_330px]">
        <section>
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div><p className="text-xs font-bold uppercase tracking-[.3em] text-accent">{game.place}</p><h1 className="mt-2 font-serif text-4xl font-bold text-secondary md:text-6xl">{game.name}</h1><p className="mt-2 font-serif text-lg text-foreground/75">{game.altName} · {game.tagline}</p></div>
            {started && <div className="rounded-full border border-border bg-card px-4 py-2 font-mono text-sm"><Clock3 className="mr-2 inline size-4 text-accent" />{String(Math.floor(seconds / 60)).padStart(2, '0')}:{String(seconds % 60).padStart(2, '0')}</div>}
          </div>
          {!started ? (
            <div className="mt-8 overflow-hidden rounded-3xl border border-border bg-card shadow-sm">
              <div className="grid gap-0 md:grid-cols-[.8fr_1.2fr]">
                <img src={game.image} alt="" className="h-full min-h-64 w-full object-cover" />
                <div className="p-6 md:p-8"><div className="flex items-center gap-2 text-sm font-bold text-accent"><Sparkles className="size-4" /> A clear rule variant</div><h2 className="mt-3 font-serif text-2xl font-bold">Ready when you are.</h2><p className="mt-3 text-sm leading-relaxed text-muted-foreground">{game.lesson}</p><div className="mt-7 grid gap-4 sm:grid-cols-2"><label className="text-sm font-semibold">Difficulty<select value={difficulty} onChange={(event) => setDifficulty(event.target.value as Difficulty)} className="mt-2 h-11 w-full rounded-xl border border-input bg-background px-3"><option value="easy">Easy · hints and simpler play</option><option value="medium">Medium · normal play</option><option value="hard">Hard · stronger opposition</option></select></label><label className="text-sm font-semibold">Opponent<select value={mode} onChange={(event) => setMode(event.target.value as Mode)} className="mt-2 h-11 w-full rounded-xl border border-input bg-background px-3"><option value="computer">Player vs Computer</option><option value="local">Player vs Player</option></select></label></div><button type="button" onClick={start} className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 font-serif font-bold text-primary-foreground transition hover:brightness-105">Begin {game.name} <WandSparkles className="size-4" /></button></div>
              </div>
            </div>
          ) : (
            <div className="mt-8 rounded-3xl border border-border bg-card p-4 shadow-sm sm:p-6">
              <div className="mb-5 flex flex-wrap items-center justify-between gap-3"><div className="flex items-center gap-2 font-serif font-bold">{mode === 'computer' ? <Bot className="size-4 text-accent" /> : <Users className="size-4 text-accent" />}{turn === 1 ? 'Player 1 turn' : mode === 'computer' ? 'Computer turn' : 'Player 2 turn'}</div><div className="flex gap-2 text-xs font-mono text-muted-foreground"><span>{validMoves} valid</span><span>{invalidMoves} invalid</span><span>{moves} moves</span></div></div>
              {isMancala && <div className="board-shadow rounded-2xl bg-[#a66a3f]/15 p-4 sm:p-7"><div className="grid grid-cols-7 gap-2 sm:gap-3"><div className="row-span-2 flex min-h-24 items-center justify-center rounded-full border-2 border-accent bg-card text-center font-serif text-xl font-bold text-secondary">{board[13] ?? 0}<small className="block text-[9px] uppercase tracking-widest text-muted-foreground">P2 store</small></div>{[7, 8, 9, 10, 11, 12].map((index) => <button key={index} type="button" disabled={turn === 2 && mode === 'computer'} onClick={() => playMancala(index)} className={`aspect-square rounded-full border-2 bg-card font-mono text-lg font-bold transition hover:-translate-y-1 ${legal.includes(index) ? 'border-primary ring-4 ring-primary/30' : 'border-accent/40'}`}>{board[index]}</button>)}<div className="row-span-2 flex min-h-24 items-center justify-center rounded-full border-2 border-accent bg-card text-center font-serif text-xl font-bold text-secondary">{board[6] ?? 0}<small className="block text-[9px] uppercase tracking-widest text-muted-foreground">P1 store</small></div>{[0, 1, 2, 3, 4, 5].reverse().map((index) => <button key={index} type="button" onClick={() => playMancala(index)} className={`aspect-square rounded-full border-2 bg-card font-mono text-lg font-bold transition hover:-translate-y-1 ${legal.includes(index) ? 'border-primary ring-4 ring-primary/30' : 'border-accent/40'}`}>{board[index]}</button>)}</div></div>}
              {isNavakankari && <div className="mx-auto max-w-md rounded-2xl bg-[#a66a3f]/15 p-6 sm:p-10"><div className="grid grid-cols-3 gap-4">{board.map((value, index) => <button key={index} type="button" onClick={() => playNavakankari(index)} className={`flex aspect-square items-center justify-center rounded-full border-2 text-xl font-bold transition hover:scale-105 ${value === 1 ? 'bg-secondary text-background' : value === 2 ? 'bg-foreground text-background' : 'bg-card'} ${legal.includes(index) ? 'border-primary ring-4 ring-primary/30' : 'border-accent/40'}`}>{value ? (value === 1 ? 'P1' : 'P2') : index + 1}</button>)}</div><p className="mt-5 text-center text-xs text-muted-foreground">{placed[0] < 3 || placed[1] < 3 ? 'Place three stones each.' : 'Select a stone, then move it to an empty point.'}</p></div>}
              {isAadu && <div className="mx-auto max-w-lg rounded-2xl bg-[#a66a3f]/15 p-5 sm:p-8"><div className="grid grid-cols-5 gap-3">{board.map((value, index) => <button key={index} type="button" onClick={() => playAadu(index)} className={`flex aspect-square items-center justify-center rounded-full border-2 text-xs font-bold transition hover:scale-105 ${value === 1 ? 'bg-primary text-primary-foreground' : value === 2 ? 'bg-foreground text-background' : 'bg-card'} ${legal.includes(index) ? 'border-secondary ring-4 ring-secondary/25' : 'border-accent/40'}`}>{value === 1 ? 'goat' : value === 2 ? 'tiger' : index + 1}</button>)}</div><p className="mt-5 text-center text-xs text-muted-foreground">Goats placed: {goatCount}/6 · Tiger captures: {captured}/3</p></div>}
              {isRace && <div className="rounded-2xl bg-[#a66a3f]/15 p-5 sm:p-8"><div className="grid gap-3 sm:grid-cols-2">{tokens.map((playerTokens, playerIndex) => <div key={playerIndex} className="rounded-2xl border border-accent/30 bg-card p-4"><p className="mb-3 text-xs font-bold uppercase tracking-widest text-accent">Player {playerIndex + 1}</p><div className="grid grid-cols-4 gap-2">{playerTokens.map((position, tokenIndex) => <button key={tokenIndex} type="button" onClick={() => moveRace(tokenIndex)} className={`rounded-xl border-2 px-2 py-3 text-center font-mono text-sm transition hover:-translate-y-1 ${turn === playerIndex + 1 && legal.includes(tokenIndex) ? 'border-primary bg-primary/15 ring-4 ring-primary/20' : 'border-border bg-background'}`}>T{tokenIndex + 1}<span className="mt-1 block text-lg font-bold">{position}/16</span></button>)}</div></div>)}</div><button type="button" onClick={rollRace} className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 font-serif font-bold text-primary-foreground disabled:opacity-50" disabled={lastRoll !== null || (turn === 2 && mode === 'computer')}>Throw cowries {lastRoll !== null ? `· ${lastRoll}` : ''}<Flag className="size-4" /></button></div>}
              <div className="mt-5 flex flex-wrap items-center justify-between gap-3"><p className="text-sm text-foreground/75">{message}</p><button type="button" onClick={reset} className="inline-flex items-center gap-2 text-xs font-bold text-muted-foreground hover:text-secondary"><RotateCcw className="size-3.5" /> Reset game</button></div>
            </div>
          )}
        </section>
        <aside className="h-fit rounded-3xl border border-border bg-card p-6">
          <div className="flex items-center gap-2 font-serif text-xl font-bold"><CircleHelp className="size-5 text-accent" /> How to play</div>
          <ol className="mt-5 space-y-4">{game.steps.map((step, index) => <li key={step} className="flex gap-3 text-sm leading-relaxed text-muted-foreground"><span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">{index + 1}</span>{step}</li>)}</ol>
          <div className="mt-7 border-t border-border pt-5"><p className="text-xs font-bold uppercase tracking-widest text-accent">Rule variant</p><p className="mt-2 text-sm leading-relaxed text-muted-foreground">{game.lesson}</p></div>
          <div className="mt-5 rounded-xl bg-muted/65 p-3 text-xs leading-relaxed text-muted-foreground"><strong className="text-foreground">Difficulty changes play.</strong> Easy shows more guidance and predictable opposition. Hard chooses stronger deterministic moves and gives fewer hints.</div>
        </aside>
      </div>
    </div>
  )
}