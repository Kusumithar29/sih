const PLAYER_KEY = 'karnataka-heritage-player-id'

export function getPlayerId() {
  const stored = window.localStorage.getItem(PLAYER_KEY)
  if (stored) return stored
  const id = `guest-${crypto.randomUUID()}`
  window.localStorage.setItem(PLAYER_KEY, id)
  return id
}