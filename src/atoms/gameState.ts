import type { Game } from '@/types'
import { atomWithStorage } from 'jotai/utils'

const defaultGame = {
  players: [],
  word: {
    label: '',
    clue: '',
  },
  preview: {
    enabled: true,
    currentPlayer: null,
    hasNextPlayer: false,
  },
  initialPlayer: null,
}

export const gameState = atomWithStorage<Game>('gameState', defaultGame)