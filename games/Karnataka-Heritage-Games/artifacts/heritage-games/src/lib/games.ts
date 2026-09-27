export type GameDefinition = {
  id: string
  name: string
  altName: string
  place: string
  tagline: string
  description: string
  image: string
  difficulty: 'easy' | 'medium' | 'hard'
  players: string
  time: string
  lesson: string
  accent: string
  board: 'tiger' | 'mancala' | 'grid' | 'cross' | 'stones'
  steps: string[]
}

export const games: GameDefinition[] = [
  {
    id: 'aadu-huli-aata',
    name: 'Aadu Huli Aata',
    altName: 'Goat and Tiger',
    place: 'Karnataka · Village courtyards',
    tagline: 'Outwit the tiger. Protect the herd.',
    description: 'A strategy game of courage and patience, played across a hand-drawn triangular board.',
    image: '/games/images/topics/toys.png',
    difficulty: 'hard',
    players: '2 players',
    time: '15–25 min',
    lesson: 'Learn how rural Karnataka turns a simple board into a story about community and cunning.',
    accent: 'saffron',
    board: 'tiger',
    steps: ['Place the three tigers at the top.', 'Move goats to safe points and surround the tigers.', 'A tiger captures by jumping over a goat.'],
  },
  {
    id: 'ali-guli-mane',
    name: 'Ali Guli Mane',
    altName: 'Chenne Mane',
    place: 'Karnataka · Courtyard games',
    tagline: 'Count, sow, and carry the rhythm home.',
    description: 'The classic two-row seed game where every handful changes the next move.',
    image: '/games/images/topics/art.png',
    difficulty: 'medium',
    players: '2 players',
    time: '10–18 min',
    lesson: 'Notice the rhythm of counting and sharing that gives the game its Kannada name.',
    accent: 'vermilion',
    board: 'mancala',
    steps: ['Choose a pocket on your side.', 'Sow one seed at a time, moving clockwise.', 'Collect the most seeds to win the round.'],
  },
  {
    id: 'chowka-bara',
    name: 'Chowka Bara',
    altName: 'Pachisi of the plateau',
    place: 'Karnataka · Family gatherings',
    tagline: 'Four corners. One lucky throw.',
    description: 'A lively race around a cross-shaped board, made for teasing, luck, and a little comeback.',
    image: '/games/images/topics/festivals.png',
    difficulty: 'easy',
    players: '2–4 players',
    time: '15–30 min',
    lesson: 'Discover how chance and ceremony meet in one of Karnataka’s most loved family games.',
    accent: 'turmeric',
    board: 'cross',
    steps: ['Bring your pieces onto the outer path.', 'Throw and move toward the home square.', 'Land on an opponent to send them back.'],
  },
  {
    id: 'pagade',
    name: 'Pagade',
    altName: 'The royal race',
    place: 'Karnataka · Palace and home',
    tagline: 'A game of passage, patience, and luck.',
    description: 'A polished race game whose four-armed board echoes the movement of a royal procession.',
    image: '/games/images/topics/monuments.png',
    difficulty: 'medium',
    players: '2–4 players',
    time: '20–35 min',
    lesson: 'Follow an old route from the palace floor to a shared home in the centre.',
    accent: 'indigo',
    board: 'grid',
    steps: ['Choose a token to enter the route.', 'Use the cowrie result to move.', 'Secure all four tokens in the centre first.'],
  },
  {
    id: 'navakankari',
    name: 'Navakankari',
    altName: 'Nine stones',
    place: 'Karnataka · Open-air play',
    tagline: 'Place three. Make a line. Think ahead.',
    description: 'A quiet, tactical alignment game where every stone marks a small piece of territory.',
    image: '/games/images/topics/paintings.png',
    difficulty: 'easy',
    players: '2 players',
    time: '8–15 min',
    lesson: 'See the geometry behind a game often scratched into a verandah floor with chalk.',
    accent: 'terracotta',
    board: 'stones',
    steps: ['Place a stone on any open point.', 'Make a line of three to remove a rival stone.', 'Slide stones until one player has two left.'],
  },
]

export const getGame = (gameId: string) => games.find((game) => game.id === gameId)

export const completedCount = (progress: Record<string, boolean> | undefined) =>
  games.filter((game) => progress?.[game.id]).length
