export type Category = 'animals' | 'food'

export interface GameSettings {
  players: string[]
  impostors: number
  categories: Category[]
  time: number
}

export interface Player {
  name: string
  isImpostor: boolean
  index: number
}

export interface Word {
  label: string
  clue: string
}

interface Preview {
  enabled: boolean
  currentPlayer: Player | null
  hasNextPlayer: boolean
}

export interface Game {
  players: Player[]
  word: Word
  preview: Preview
  initialPlayer: Player | null,
}
