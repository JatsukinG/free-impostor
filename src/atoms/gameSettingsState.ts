import type { GameSettings } from '@/types'
import { atomWithStorage } from 'jotai/utils'

const defaultGameSettings: GameSettings = {
  players: ['Jugador 1', 'Jugador 2', 'Jugador 3'],
  impostors: 1,
  categories: ['develop'],
  time: 60,
  wordMode: 'random',
}

export const gameSettingsState = atomWithStorage<GameSettings>(
    'gameSettings',
    defaultGameSettings,
)